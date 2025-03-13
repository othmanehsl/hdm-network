import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import Modal from './Modal';

interface Task {
  id: number;
  name: string;
  description?: string;
  date: string;
  status: string;
  time?: string;
}

const API_URL = 'http://localhost:3000/tasks';

const TodoPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  // Récupération des tâches depuis le backend
  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Création d'une nouvelle tâche
  const handleAddTask = async (task: { name: string; description?: string; date: string; status: string; time?: string }) => {
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
  const handleUpdateTask = async (updatedTask: { id?: number; name: string; description?: string; date: string; status: string; time?: string }) => {
    if (!updatedTask.id) return;
    try {
      const response = await fetch(`${API_URL}/${updatedTask.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });
      const data = await response.json();
      setTasks(tasks.map((t) => (t.id === data.id ? data : t)));
      closeModal();
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

  // Ouvre la modal pour l'édition d'une tâche
  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  // Ferme la modal
  const closeModal = () => {
    setEditingTask(null);
    setModalOpen(false);
  };

  // Filter tasks based on status
  const filteredTasks = filter === 'ALL'
    ? tasks
    : tasks.filter(task => task.status === filter);

  const getStatusClass = (status: string) => {
    switch(status) {
      case 'COMPLETED': return 'completed';
      case 'IN_PROGRESS': return 'in-progress';
      default: return 'not-started';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Loading skeleton
  const renderSkeletons = () => {
    return Array(3).fill(null).map((_, index) => (
      <div className="task-skeleton" key={`skeleton-${index}`}>
        <div className="skeleton-line title"></div>
        <div className="skeleton-line meta"></div>
        <div className="skeleton-line desc"></div>
        <div className="skeleton-line desc"></div>
      </div>
    ));
  };

  return (
    <div>
      <div className="app-header">
        <div className="header-left">
          <h1>Liste des Tâches</h1>
        </div>
        <div className="header-right">
          <div className="task-filters">
            <button 
              className={`filter-button ${filter === 'ALL' ? 'active' : ''}`} 
              onClick={() => setFilter('ALL')}
            >
              Toutes
            </button>
            <button 
              className={`filter-button ${filter === 'NOT_STARTED' ? 'active' : ''}`} 
              onClick={() => setFilter('NOT_STARTED')}
            >
              À faire
            </button>
            <button 
              className={`filter-button ${filter === 'IN_PROGRESS' ? 'active' : ''}`} 
              onClick={() => setFilter('IN_PROGRESS')}
            >
              En cours
            </button>
            <button 
              className={`filter-button ${filter === 'COMPLETED' ? 'active' : ''}`} 
              onClick={() => setFilter('COMPLETED')}
            >
              Terminées
            </button>
          </div>
        </div>
      </div>
      
      {/* Formulaire pour ajouter une tâche */}
      <TaskForm onSubmit={handleAddTask} />

      {/* Liste des tâches */}
      {isLoading ? (
        <ul className="task-list">
          {renderSkeletons()}
        </ul>
      ) : filteredTasks.length > 0 ? (
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li key={task.id} className={`task-card ${getStatusClass(task.status)}`}>
              <div className="task-header">
                <div className="task-title">{task.name}</div>
                <div className={`task-status ${getStatusClass(task.status)}`}>
                  {task.status === 'NOT_STARTED' ? 'À faire' : 
                   task.status === 'IN_PROGRESS' ? 'En cours' : 'Terminée'}
                </div>
              </div>
              <div className="task-meta">
                <span className="task-date">
                  📅 {formatDate(task.date)}
                </span>
                {task.time && (
                  <span className="task-time">
                    🕒 {task.time}
                  </span>
                )}
              </div>
              {task.description && (
                <div className="task-description">{task.description}</div>
              )}
              <div className="task-actions">
                <button className="edit" onClick={() => openEditModal(task)}>
                  ✏️ Modifier
                </button>
                <button className="delete" onClick={() => handleDeleteTask(task.id)}>
                  🗑️ Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="12" y1="18" x2="12" y2="12"></line>
            <line x1="9" y1="15" x2="15" y2="15"></line>
          </svg>
          <h3>Aucune tâche trouvée</h3>
          <p>Ajoutez votre première tâche en utilisant le formulaire ci-dessus</p>
        </div>
      )}

      {/* Modal pour la mise à jour */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="modal-title">Modifier la tâche</h2>
        {editingTask && (
          <TaskForm
            initialTask={editingTask}
            onSubmit={handleUpdateTask}
            onCancel={closeModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default TodoPage;
