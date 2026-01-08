import React from 'react';

export type TodoItemProps = {
  id: string;
  text: string;
  completed?: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed = false, onToggle, onDelete }) => {
  return (
    <li className="flex items-center justify-between p-2 bg-white rounded shadow">
      <label className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
          className="h-4 w-4"
        />
        <span className={`text-gray-800 ${completed ? 'line-through text-gray-400' : ''}`}>
          {text}
        </span>
      </label>

      <button
        type="button"
        aria-label={`delete-${id}`}
        onClick={() => onDelete(id)}
        className="ml-4 text-sm text-red-600 hover:text-red-800"
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;