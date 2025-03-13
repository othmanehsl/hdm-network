// src/components/TodoPage.tsx
import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';

interface Task {
  id: number;
  name: string;
}

const API_URL = 'http://localhost:3000/tasks';

const TodoPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Récupérer toutes les tâches
  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Création d'une nouvelle tâche
  const handleAddTask = async (task: { name: string }) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error('Erreur lors de la création de la tâche', error);
    }
  };

  // Mise à jour d'une tâche existante
  const handleUpdateTask = async (updatedTask: { id?: number; name: string }) => {
    if (!updatedTask.id) return;
    try {
      const response = await fetch(`${API_URL}/${updatedTask.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: updatedTask.name }),
      });
      const data = await response.json();
      setTasks(tasks.map((t) => (t.id === data.id ? data : t)));
      setEditingTask(null);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche', error);
    }
  };

  // Suppression d'une tâche
  const handleDeleteTask = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche', error);
    }
  };

  return (
    <div>
      <h1>Liste des Tâches</h1>
      {/* Afficher le formulaire en mode création ou édition */}
      {editingTask ? (
        <TaskForm
          initialTask={editingTask}
          onSubmit={handleUpdateTask}
          onCancel={() => setEditingTask(null)}
        />
      ) : (
        <TaskForm onSubmit={handleAddTask} />
      )}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name}{' '}
            <button onClick={() => setEditingTask(task)}>Modifier</button>
            <button onClick={() => handleDeleteTask(task.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoPage;
