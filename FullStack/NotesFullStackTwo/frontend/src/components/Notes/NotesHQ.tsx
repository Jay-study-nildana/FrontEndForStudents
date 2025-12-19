import React, { useState } from 'react';
import {
  Container,
  ListGroup,
  Spinner,
  Alert,
  Button,
  Modal,
  Form,
  Row,
  Col
} from 'react-bootstrap';
import { useNotes, useCreateNote, useUpdateNote, useDeleteNote } from '../../hooks/useNotes';

export default function NotesHQ() {
  const { notes, loading, error, refetch } = useNotes();
  const { create, creating } = useCreateNote();
  const { update, updating } = useUpdateNote();
  const { remove, deleting } = useDeleteNote();

  const [show, setShow] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  // delete confirmation modal state
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openCreate = () => {
    setLocalError(null);
    setEditingId(null);
    setTitle('');
    setContent('');
    setShow(true);
  };

  const openEdit = (note: any) => {
    setLocalError(null);
    setEditingId(String(note.id ?? note._id ?? ''));
    setTitle(String(note.title ?? ''));
    setContent(String(note.content ?? ''));
    setShow(true);
  };

  const closeForm = () => {
    if (creating || updating) return;
    setShow(false);
    setEditingId(null);
    setTitle('');
    setContent('');
    setLocalError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError(null);
    if (!title.trim()) {
      setLocalError('Title is required');
      return;
    }

    try {
      if (editingId) {
        await update(editingId, { title: title.trim(), content: content.trim() });
      } else {
        await create({ title: title.trim(), content: content.trim() });
      }
      closeForm();
      refetch();
    } catch {
      setLocalError('Failed to save note');
    }
  };

  const submitting = creating || updating;

  // open delete confirmation modal
  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const cancelDelete = () => {
    if (deleting) return;
    setShowDelete(false);
    setDeleteId(null);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await remove(deleteId);
      setShowDelete(false);
      setDeleteId(null);
      refetch();
    } catch {
      // error handled in hook
    }
  };

  return (
    <Container className="py-3">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h3 className="mb-0">Notes HQ</h3>
        <Button variant="primary" onClick={openCreate} disabled={submitting || deleting}>
          {submitting ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Saving…
            </>
          ) : (
            'Add Note'
          )}
        </Button>
      </div>

      {loading && (
        <div className="my-3 d-flex align-items-center">
          <Spinner animation="border" size="sm" className="me-2" />
          <span>Loading notes...</span>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="my-3">
          Error loading notes. <Button variant="link" onClick={refetch}>Retry</Button>
        </Alert>
      )}

      {!loading && !error && (
        <>
          {notes.length === 0 ? (
            <p className="text-muted">No notes yet — placeholder.</p>
          ) : (
            <ListGroup className="my-3">
              {notes.map((n: any, i: number) => {
                const itemId = String(n.id ?? n._id ?? i);
                return (
                  <ListGroup.Item key={itemId}>
                    <Row className="align-items-center">
                      <Col>
                        <strong>{n.title ?? `Note ${i + 1}`}</strong>
                        <div className="text-muted small">{String(n.content ?? '').slice(0, 120)}</div>
                      </Col>
                      <Col xs="auto" className="d-flex align-items-center">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => openEdit(n)}
                          disabled={submitting || deleting}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="ms-2"
                          onClick={() => confirmDelete(itemId)}
                          disabled={submitting || deleting}
                        >
                          {deleting && deleteId === itemId ? (
                            <>
                              <Spinner animation="border" size="sm" className="me-2" />
                              Deleting
                            </>
                          ) : (
                            'Delete'
                          )}
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
        </>
      )}

      <Modal show={show} onHide={closeForm} centered>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{editingId ? 'Edit Note' : 'Add Note'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {localError && <Alert variant="danger">{localError}</Alert>}
            <Form.Group className="mb-3" controlId="noteTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                disabled={submitting}
              />
            </Form.Group>
            <Form.Group className="mb-0" controlId="noteContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter content"
                disabled={submitting}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeForm} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Saving…
                </>
              ) : editingId ? (
                'Update'
              ) : (
                'Save'
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete confirmation modal */}
      <Modal show={showDelete} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this note? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete} disabled={deleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete} disabled={deleting}>
            {deleting ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Deleting…
              </>
            ) : (
              'Delete'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}