<template>
  <div id="app" class="container">
    <!-- Subjects -->
    <div v-if="!selectedSubject" class="subjects-container">
      <h1>Asignaturas</h1>
      <button class="quick-note-btn" @click="openSubjectModal">+ Nueva asignatura</button>
      <div class="subjects-grid">
        <div class="subject-card" v-for="(subject, index) in subjects" :key="index">
          <div class="subject-content" @click="openSubject(index)">
            <h3>{{ subject.name }}</h3>
            <p>{{ subject.notes.length }} notas</p>
          </div>
        </div>
      </div>
      <p v-if="subjects.length === 0">Prueba a crear una asignatura.</p>
    </div>

    <!-- Notes from the selected subject -->
    <div v-if="selectedSubject" class="notes-container">
      <p class="back-btn" @click="selectedSubject = null">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="16px" fill="#666">
          <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
        </svg> Volver a asignaturas
      </p>
      <h1 @click="openEditSubjectModal">{{ selectedSubject.name }}</h1>
      <button class="quick-note-btn" @click="openModal('create')">+ Nueva nota rápida</button>
      <div class="notes-grid">
        <div class="note-card" v-for="(note, index) in selectedSubject.notes" :key="index">
          <div @click="openModal('edit', index)" class="note-content">
            <h3>{{ note.title }}</h3>
            <p>{{ note.content }}</p>
          </div>
          <div>
            <div class="metadata">Actualizado el {{ note.updated }}</div>
          </div>
        </div>
        <p v-if="selectedSubject.notes.length === 0">Prueba a crear una nota.</p>
      </div>
    </div>

    <!-- Modal for subjects -->
    <div v-if="showSubjectModal" class="modal">
      <div class="modal-content">
        <div class="modal-close">
          <h2>Nueva Asignatura</h2>
          <span class="modal-cross" @click="closeSubjectModal">&times;</span>
        </div>
        <form @submit.prevent="addSubject">
          <div class="form-group">
            <label for="subjectName">Nombre de la asignatura:</label>
            <input type="text" id="subjectName" v-model="newSubjectName" required>
          </div>
          <div class="modal-buttons">
            <button type="submit" class="submit-btn">Crear</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal para editar nombre de la asignatura -->
    <div v-if="showEditSubjectModal" class="modal">
      <div class="modal-content">
        <div class="modal-close">
          <h2>Editar Asignatura</h2>
          <span class="modal-cross" @click="closeEditSubjectModal">&times;</span>
        </div>
        <form @submit.prevent="editSubject">
          <div class="form-group">
            <label for="editSubjectName">Nuevo nombre de la asignatura:</label>
            <input type="text" id="editSubjectName" v-model="editSubjectName" required>
          </div>
          <div class="modal-buttons">
            <button type="submit" class="submit-btn">Guardar</button>
            <button class="delete-btn" @click="deleteSubject">Eliminar Asignatura</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal for notes -->
    <div v-if="showNoteModal" class="modal">
      <div class="modal-content">
        <div class="modal-close">
          <h2>{{ modalMode === 'create' ? 'Nueva Nota' : 'Editar Nota' }}</h2>
          <span class="modal-cross" @click="closeModal">&times;</span>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="title">Título:</label>
            <input type="text" id="title" v-model="currentNote.title" required>
          </div>
          <div class="form-group">
            <label for="content">Contenido:</label>
            <textarea id="content" v-model="currentNote.content" required></textarea>
          </div>
          <div class="modal-buttons">
            <button type="submit" class="submit-btn">{{ modalMode === 'create' ? 'Crear' : 'Guardar' }}</button>
            <button @click="deleteNote(index)" class="delete-btn">Eliminar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subjects: [
        {
          name: 'Procesos de software 🔥',
          notes: [
            {
              title: 'Clase 1',
              content: 'Metodologías ágiles',
              updated: '2024-10-01 10:00:00'
            },
            {
              title: 'Clase 2',
              content: 'Scrum',
              updated: '2024-10-02 12:30:00'
            }
          ]
        },
        {
          name: 'Sistemas operativos',
          notes: [
            {
              title: 'Clase 1',
              content: 'Comandos de linux',
              updated: '2024-10-01 11:00:00'
            }
          ]
        }
      ],
      selectedSubject: null,
      showNoteModal: false,
      showSubjectModal: false,
      showEditSubjectModal: false,
      editSubjectName: '',
      modalMode: 'create', // It can be 'create' o 'edit'
      currentNote: {
        title: '',
        content: '',
        updated: ''
      },
      newSubjectName: '',
      editingIndex: null
    };
  },
  methods: {
    openSubject(index) {
      this.selectedSubject = this.subjects[index];
    },
    openModal(mode, index = null) {
      this.modalMode = mode;
      this.showNoteModal = true;
      if (mode === 'edit') {
        this.editingIndex = index;
        this.currentNote = { ...this.selectedSubject.notes[index] };
      } else {
        this.currentNote = { title: '', content: '', updated: '' };
      }
    },
    closeModal() {
      this.showNoteModal = false;
      this.currentNote = { title: '', content: '', updated: '' };
    },
    handleSubmit() {
      const now = new Date();
      const timezoneOffset = now.getTimezoneOffset() * 60000;
      const localDate = new Date(now - timezoneOffset);
      const formattedDate = localDate.toISOString().slice(0, 19).replace('T', ' ');  // Format "YYYY-MM-DD HH:MM:SS"
      this.currentNote.updated = formattedDate;

      if (this.modalMode === 'create') {
        this.selectedSubject.notes.push({ ...this.currentNote });
      } else if (this.modalMode === 'edit' && this.editingIndex !== null) {
        this.selectedSubject.notes[this.editingIndex] = { ...this.currentNote };
      }
      this.closeModal();
    },
    deleteNote(index) {
      this.selectedSubject.notes.splice(index, 1);
      this.closeModal();
    },
    addSubject() {
      if (this.newSubjectName) {
        this.subjects.push({
          name: this.newSubjectName,
          notes: []
        });
        this.closeSubjectModal();
      }
    },
    editSubject() {
      this.selectedSubject.name = this.editSubjectName;
      this.closeEditSubjectModal();
    },
    deleteSubject() {
      const subjectIndex = this.subjects.indexOf(this.selectedSubject);
      if (subjectIndex > -1) {
        this.subjects.splice(subjectIndex, 1);
        this.selectedSubject = null;
      }
      this.closeEditSubjectModal();
    },
    openSubjectModal() {
      this.showSubjectModal = true;
    },
    closeSubjectModal() {
      this.showSubjectModal = false;
      this.newSubjectName = '';
    },
    openEditSubjectModal() {
      this.editSubjectName = this.selectedSubject.name;
      this.showEditSubjectModal = true;
    },
    closeEditSubjectModal() {
      this.showEditSubjectModal = false;
    },
  },
  updated() {
    this.subjects.forEach(subject => {
      subject.notes.sort((a, b) => Date.parse(b.updated) - Date.parse(a.updated));
    });
  }
};
</script>

<style>
.container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
}

.subjects-container {
  width: 100%;
  margin-bottom: 1.25rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: var(--subject-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.subjects-container h1 {
  width: 100%;
  margin-bottom: 1.25rem;
  color: var(--h-color);
  font-size: 1.5rem;
}

.notes-container {
  width: 100%;
  margin-bottom: 1.25rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: var(--notes-container-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.notes-container h1 {
  width: fit-content;
  margin-bottom: 1.25rem;
  color: var(--h-color);
  font-size: 1.5rem;
  cursor: pointer;
}

.quick-note-btn {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(90deg, #e74694, #9061f9 100%);
  color: white;
  text-align: left;
  cursor: pointer;
  transition: 300ms;
}

.quick-note-btn:hover {
  background: linear-gradient(90deg, #c2397c, #744dc9 100%);
}

.delete-note-btn {
  display: block;
  width: fit-content;
  margin: 1.25rem 0;
  padding: 0.625rem;
  border: none;
  border-radius: 8px;
  background: #d63b3b;
  color: white;
  text-align: left;
  cursor: pointer;
}

.subjects-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}

.subject-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  background: var(--subject-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.subject-content {
  width: 100%;
  margin-bottom: 1rem;
  text-wrap: wrap;
}

.subject-card h3 {
  margin-bottom: 0.75rem;
  color: var(--h-color);
  font-size: 1.25rem;
}

.subject-card p {
  color: var(--p-color);
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}

.note-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  background: var(--note-card-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.note-card h3 {
  margin-bottom: 0.75rem;
  color: var(--h-color);
  font-size: 1.25rem;
}

.note-card p {
  overflow: hidden;
  max-height: 3.75rem;
  color: var(--p-color);
  font-size: 0.875rem;
  line-height: 1.4;
}

.note-content {
  width: 100%;
  margin-bottom: 1rem;
  text-wrap: wrap;
}

.note-card .metadata {
  padding-top: 1rem;
  border-top: 1px solid #eee;
  color: var(--p-color);
  font-size: 0.75rem;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  position: relative;
  width: 100%;
  max-width: 500px;
  padding: 1.25rem;
  border-radius: 8px;
  background: var(--color);
}

.modal-close {
  display: flex;
  justify-content: space-between;
}

.modal-content h2 {
  margin-bottom: 1.25rem;
}

.modal-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.modal-cross {
  font-size: 1.5rem;
  cursor: pointer;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.back-btn {
  display: flex;
  width: fit-content;
  margin-bottom: 0.5rem;
  color: var(--p-color);
  font-weight: 300;
  cursor: pointer;
}

.back-btn svg {
  margin-right: 0.5rem;
}

.submit-btn {
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  font-size: 0.875rem;
  line-height: 1.25rem;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #3d8840;
  transition: 300ms;
}

.delete-btn {
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 4px;
  background-color: #d63b3b;
  color: white;
  font-size: .875rem;
  line-height: 1.25rem;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #ad2e2e;
  transition: 300ms;
}

@media (min-width: 576px) {
  .subjects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .notes-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
