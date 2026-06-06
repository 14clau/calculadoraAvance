(function () {
  const STORAGE_TASKS = 'calcAvanceTasks';
  const STORAGE_NOTES = 'calcAvanceNotes';
  const STORAGE_MUSIC = 'calcAvanceMusic';

  const dock = document.getElementById('dock');
  const panelTasks = document.getElementById('dockPanelTasks');
  const panelNotes = document.getElementById('dockPanelNotes');
  const taskList = document.getElementById('dockTaskList');
  const btnAddTask = document.getElementById('dockAddTask');
  const notesArea = document.getElementById('dockNotes');
  const navBtns = document.querySelectorAll('.dock-nav-btn');

  let tasks = [];
  let activePanel = null;
  let musicOn = false;
  let saveNotesTimer = null;

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function load() {
    try {
      const saved = localStorage.getItem(STORAGE_TASKS);
      tasks = saved ? JSON.parse(saved) : [];
      if (!Array.isArray(tasks)) tasks = [];
    } catch (_) {
      tasks = [];
    }

    try {
      notesArea.value = localStorage.getItem(STORAGE_NOTES) || '';
    } catch (_) {}

    try {
      musicOn = localStorage.getItem(STORAGE_MUSIC) === 'true';
    } catch (_) {}

    updateMusicBtn();
    renderTasks();
  }

  function saveTasks() {
    try { localStorage.setItem(STORAGE_TASKS, JSON.stringify(tasks)); } catch (_) {}
  }

  function saveNotes() {
    try { localStorage.setItem(STORAGE_NOTES, notesArea.value); } catch (_) {}
  }

  function saveMusic() {
    try { localStorage.setItem(STORAGE_MUSIC, musicOn ? 'true' : 'false'); } catch (_) {}
  }

  function closePanels() {
    activePanel = null;
    panelTasks.hidden = true;
    panelNotes.hidden = true;
    navBtns.forEach(b => {
      if (b.dataset.dock !== 'music') b.classList.remove('active');
    });
  }

  function openPanel(name) {
    closePanels();
    activePanel = name;
    if (name === 'tasks') {
      panelTasks.hidden = false;
      document.querySelector('[data-dock="tasks"]').classList.add('active');
      const empty = taskList.querySelector('.dock-task-input');
      if (empty) empty.focus();
    } else if (name === 'notes') {
      panelNotes.hidden = false;
      document.querySelector('[data-dock="notes"]').classList.add('active');
      notesArea.focus();
    }
  }

  function togglePanel(name) {
    if (activePanel === name) {
      closePanels();
    } else {
      openPanel(name);
    }
  }

  function updateMusicBtn() {
    const btn = document.querySelector('[data-dock="music"]');
    btn.classList.toggle('active', musicOn);
    btn.setAttribute('aria-pressed', musicOn);
  }

  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = 'dock-task-item' + (task.done ? ' done' : '');
      li.dataset.id = task.id;

      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.className = 'dock-task-check';
      cb.checked = task.done;
      cb.setAttribute('aria-label', 'Marcar tarea');

      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'dock-task-input';
      input.value = task.text;
      input.placeholder = 'Escribe una tarea…';

      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'dock-task-del';
      del.setAttribute('aria-label', 'Eliminar tarea');
      del.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>';

      cb.addEventListener('change', () => {
        task.done = cb.checked;
        li.classList.toggle('done', task.done);
        saveTasks();
      });

      input.addEventListener('input', () => {
        task.text = input.value;
        saveTasks();
      });

      del.addEventListener('click', () => {
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks();
        renderTasks();
      });

      li.append(cb, input, del);
      taskList.appendChild(li);
    });
  }

  function addTask() {
    tasks.push({ id: uid(), text: '', done: false });
    saveTasks();
    renderTasks();
    const last = taskList.querySelector('.dock-task-item:last-child .dock-task-input');
    if (last) last.focus();
  }

  navBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const type = btn.dataset.dock;
      if (type === 'music') {
        musicOn = !musicOn;
        saveMusic();
        updateMusicBtn();
        return;
      }
      togglePanel(type);
    });
  });

  btnAddTask.addEventListener('click', addTask);

  notesArea.addEventListener('input', () => {
    clearTimeout(saveNotesTimer);
    saveNotesTimer = setTimeout(saveNotes, 300);
  });

  document.addEventListener('click', e => {
    if (!dock.contains(e.target)) closePanels();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closePanels();
  });

  load();
})();
