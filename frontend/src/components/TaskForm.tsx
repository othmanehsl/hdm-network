import React, { useState } from 'react';

interface TaskFormProps {
  initialTask?: { id?: number; name: string };
  onSubmit: (task: { id?: number; name: string }) => void;
  onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialTask, onSubmit, onCancel }) => {
  const [name, setName] = useState(initialTask?.name || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ ...initialTask, name: name.trim() });
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom de la tâche"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">{initialTask ? 'Modifier' : 'Ajouter'}</button>
      {onCancel && <button type="button" onClick={onCancel}>Annuler</button>}
    </form>
  );
};

export default TaskForm;
