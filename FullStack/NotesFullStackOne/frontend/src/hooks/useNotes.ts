// ...existing code...
import { useState, useEffect, useCallback, useRef } from 'react';
import * as api from '../services/api';

type Note = any;

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const abortRef = useRef<AbortController | null>(null);

  const fetchNotes = useCallback(async () => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);
    try {
      const data = await api.getNotes({ signal: controller.signal });
      setNotes(Array.isArray(data) ? data : []);
    } catch (err: any) {
      if (err?.name === 'AbortError') return;
      setError(err);
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  }, []);

  useEffect(() => {
    fetchNotes();
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [fetchNotes]);

  return {
    notes,
    loading,
    error,
    refetch: fetchNotes
  };
}

// ...existing code...
export function useNote(id?: string) {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(id));
  const [error, setError] = useState<any>(null);
  const abortRef = useRef<AbortController | null>(null);

  const fetchNote = useCallback(async () => {
    if (!id) return;
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);
    try {
      const data = await api.getNote(id, { signal: controller.signal });
      setNote(data);
    } catch (err: any) {
      if (err?.name === 'AbortError') return;
      setError(err);
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  }, [id]);

  useEffect(() => {
    fetchNote();
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [fetchNote]);

  return {
    note,
    loading,
    error,
    refetch: fetchNote
  };
}

// ...existing code...
export function useCreateNote() {
  const [creating, setCreating] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const create = useCallback(async (payload: any, options: any = {}) => {
    setCreating(true);
    setError(null);
    try {
      const created = await api.createNote(payload);
      options.onSuccess?.(created);
      return created;
    } catch (err: any) {
      setError(err);
      options.onError?.(err);
      throw err;
    } finally {
      setCreating(false);
    }
  }, []);

  return { creating, error, create };
}

// ...existing code...
export function useUpdateNote() {
  const [updating, setUpdating] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const update = useCallback(async (id: string, payload: any, options: any = {}) => {
    setUpdating(true);
    setError(null);
    try {
      const updated = await api.updateNote(id, payload);
      options.onSuccess?.(updated);
      return updated;
    } catch (err: any) {
      setError(err);
      options.onError?.(err);
      throw err;
    } finally {
      setUpdating(false);
    }
  }, []);

  return { updating, error, update };
}

// ...existing code...
export function useDeleteNote() {
  const [deleting, setDeleting] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const remove = useCallback(async (id: string, options: any = {}) => {
    setDeleting(true);
    setError(null);
    try {
      const res = await api.deleteNote(id);
      options.onSuccess?.(id);
      return res;
    } catch (err: any) {
      setError(err);
      options.onError?.(err);
      throw err;
    } finally {
      setDeleting(false);
    }
  }, []);

  return { deleting, error, remove };
}