import React, { useState } from 'react';

interface TaskFormProps {
  initialTask?: {
    id?: number;
    name: string;
    description?: string;
    date: string;
    status: string;
    time?: string;
  };
  onSubmit: (task: {
    id?: number;
    name: string;
    description?: string;
    date: string;
    status: string;
    time?: string;
  }) => void;
  onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialTask, onSubmit, onCancel }) => {
  const [name, setName] = useState(initialTask?.name || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [date, setDate] = useState(initialTask?.date || '');
  const [time, setTime] = useState(initialTask?.time || '');
  const [status, setStatus] = useState(initialTask?.status || 'NOT_STARTED');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !date) return;
    onSubmit({ ...initialTask, name: name.trim(), description, date, time, status });
    setName('');
    setDescription('');
    setDate('');
    setTime('');
    setStatus('NOT_STARTED');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom de la tâche"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Description de la tâche"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="NOT_STARTED">Non commencée</option>
        <option value="IN_PROGRESS">En cours</option>
        <option value="COMPLETED">Terminée</option>
      </select>
      <button type="submit">{initialTask ? 'Modifier' : 'Ajouter'}</button>
      {onCancel && <button type="button" onClick={onCancel}>Annuler</button>}
    </form>
  );
};

export default TaskForm;
