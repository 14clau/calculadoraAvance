(function () {
  const STORAGE_TASKS = 'calcAvanceTasks';
  const STORAGE_NOTES = 'calcAvanceNotes';
  const STORAGE_SOUND = 'calcAvanceSound';
  const STORAGE_SOUND_VOL = 'calcAvanceSoundVol';

  const dock = document.getElementById('dock');
  const panelTasks = document.getElementById('dockPanelTasks');
  const panelNotes = document.getElementById('dockPanelNotes');
  const panelSounds = document.getElementById('dockPanelSounds');
  const taskList = document.getElementById('dockTaskList');
  const btnAddTask = document.getElementById('dockAddTask');
  const notesArea = document.getElementById('dockNotes');
  const navBtns = document.querySelectorAll('.dock-nav-btn');
  const soundsGrid = document.getElementById('soundsGrid');
  const volumeSlider = document.getElementById('soundsVolume');
  const volumeVal = document.getElementById('soundsVolumeVal');
  const volumeRow = document.getElementById('soundsVolumeRow');

  let tasks = [];
  let activePanel = null;
  let saveNotesTimer = null;

  /* ── AMBIENT SOUNDS SYSTEM ── */
  const SOUNDS = [
    { id: 'rain',          emoji: '🌧️', name: 'Lluvia',         file: 'lofirain.mp3' },
    { id: 'ocean',         emoji: '🌊', name: 'Olas del mar',   file: 'olas.mp3' },
    { id: 'darkacademia',  emoji: '📖', name: 'Dark Academia',  file: 'darkacademia.mp3' },
    { id: 'fire',          emoji: '🔥', name: 'Chimenea',       file: 'chimenea.mp3' },
    { id: 'relax',         emoji: '😎', name: 'Relax',          file: 'relax.mp3' },
    { id: 'ambient',       emoji: '☁️', name: 'Ambient',        file: 'winterambient.mp3' },
    { id: 'whitenoise',    emoji: '🤍', name: 'Ruido blanco',    file: 'blanco.mp3' },
    { id: 'deephouse',     emoji: '🍸', name: 'Deep House',     file: 'deephouse.mp3' },
    { id: 'jazz',          emoji: '🎷', name: 'Jazz',           file: 'jazz.mp3' }
  ];

  let currentAudio = null;      // Audio element currently playing
  let currentSound = null;      // id of playing sound
  let soundVolume = 50;

  function playSound(id) {
    stopSound();

    const sound = SOUNDS.find(s => s.id === id);
    if (!sound) return;

    currentSound = id;
    currentAudio = new Audio('sounds/' + sound.file);
    currentAudio.loop = true;
    currentAudio.volume = soundVolume / 100;
    currentAudio.play().catch(e => console.warn('Audio play error', e));

    updateSoundBtns();
    volumeRow.hidden = false;
    updateMusicBtn();
    saveSound();
  }

  function stopSound() {
    if (currentAudio) {
      try {
        currentAudio.pause();
      } catch (_) {}
      currentAudio = null;
    }
    currentSound = null;
    updateSoundBtns();
    volumeRow.hidden = true;
    updateMusicBtn();
    saveSound();
  }

  function updateSoundBtns() {
    document.querySelectorAll('.sound-btn').forEach(btn => {
      btn.classList.toggle('playing', btn.dataset.soundId === currentSound);
    });
  }

  function updateMusicBtn() {
    const btn = document.querySelector('[data-dock="music"]');
    btn.classList.toggle('active', !!currentSound);
    btn.setAttribute('aria-pressed', !!currentSound);
  }

  function saveSound() {
    try {
      if (currentSound) {
        localStorage.setItem(STORAGE_SOUND, currentSound);
      } else {
        localStorage.removeItem(STORAGE_SOUND);
      }
    } catch (_) {}
  }

  function saveVolume() {
    try { localStorage.setItem(STORAGE_SOUND_VOL, soundVolume); } catch (_) {}
  }

  function renderSounds() {
    soundsGrid.innerHTML = '';
    SOUNDS.forEach(s => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sound-btn';
      btn.dataset.soundId = s.id;
      btn.setAttribute('aria-label', s.name);
      btn.innerHTML = `
        <span class="sound-btn-emoji">${s.emoji}</span>
        <span class="sound-btn-label">${s.name}</span>`;
      btn.addEventListener('click', () => {
        if (currentSound === s.id) {
          stopSound();
        } else {
          playSound(s.id);
        }
      });
      soundsGrid.appendChild(btn);
    });
  }

  /* ── TASKS ── */
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

    // Load sound preferences
    try {
      const vol = localStorage.getItem(STORAGE_SOUND_VOL);
      if (vol !== null) soundVolume = parseInt(vol, 10) || 50;
    } catch (_) {}
    volumeSlider.value = soundVolume;
    volumeVal.textContent = soundVolume + '%';

    renderSounds();
    updateMusicBtn();
    renderTasks();
  }

  function saveTasks() {
    try { localStorage.setItem(STORAGE_TASKS, JSON.stringify(tasks)); } catch (_) {}
  }

  function saveNotes() {
    try { localStorage.setItem(STORAGE_NOTES, notesArea.value); } catch (_) {}
  }

  /* ── PANELS ── */
  function closePanels() {
    activePanel = null;
    panelTasks.hidden = true;
    panelNotes.hidden = true;
    panelSounds.hidden = true;
    navBtns.forEach(b => {
      if (b.dataset.dock !== 'music' || !currentSound) b.classList.remove('active');
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
    } else if (name === 'music') {
      panelSounds.hidden = false;
      document.querySelector('[data-dock="music"]').classList.add('active');
    }
  }

  function togglePanel(name) {
    if (activePanel === name) {
      closePanels();
      // Keep music button active if sound is playing
      if (currentSound) updateMusicBtn();
    } else {
      openPanel(name);
    }
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

  /* ── EVENT LISTENERS ── */
  navBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const type = btn.dataset.dock;
      if (type === 'music') {
        togglePanel('music');
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

  volumeSlider.addEventListener('input', () => {
    soundVolume = parseInt(volumeSlider.value, 10);
    volumeVal.textContent = soundVolume + '%';
    if (currentAudio) currentAudio.volume = soundVolume / 100;
    saveVolume();
  });

  document.addEventListener('click', e => {
    if (!dock.contains(e.target)) closePanels();
    // Keep music button highlighted if sound playing
    if (currentSound) updateMusicBtn();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closePanels();
    if (currentSound) updateMusicBtn();
  });

  load();
})();
