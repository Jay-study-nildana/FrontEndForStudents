// ...existing code...
import { useCallback, useState } from 'react';
import { getTestrolesPublic, useTestrolesApi } from '../services/testrolesapi';

export default function useTestRoles() {
  const { getTestrolesAuthOnly, getTestrolesAdminOnly } = useTestrolesApi();

  const [publicMessage, setPublicMessage] = useState<string | null>(null);
  const [authMessage, setAuthMessage] = useState<string | null>(null);
  const [adminMessage, setAdminMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPublic = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const text = await getTestrolesPublic();
      setPublicMessage(text);
      return text;
    } catch (err: any) {
      setError(err?.message ?? String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAuthOnly = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const text = await getTestrolesAuthOnly();
      setAuthMessage(text);
      return text;
    } catch (err: any) {
      setError(err?.message ?? String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getTestrolesAuthOnly]);

  const fetchAdminOnly = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const text = await getTestrolesAdminOnly();
      setAdminMessage(text);
      return text;
    } catch (err: any) {
      setError(err?.message ?? String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getTestrolesAdminOnly]);

  return {
    publicMessage,
    authMessage,
    adminMessage,
    loading,
    error,
    fetchPublic,
    fetchAuthOnly,
    fetchAdminOnly
  };
}
// ...existing code...