const RUNNING_KEY = 'tracker_running';
const SELECTED_CATEGORY_KEY = 'tracker_selected_category';
const DEFAULT_SWATCH = '#ffc0da';

let currentUser = null;
let categories = [];
let rangeMode = 'week';
let timerInterval = null;
let running = {
  categoryId: null,
  startTime: null,
};

function $(id) {
  return document.getElementById(id);
}

function setStatus(message, isError) {
  const el = $('statusMessage');
  if (!el) return;
  el.textContent = message || '';
  el.classList.toggle('is-error', Boolean(isError));
}

function showConfigWarning() {
  const el = $('configWarning');
  if (!el) return;
  el.hidden = false;
  el.innerHTML =
    'Paste your Supabase project URL and anon key into <code>supabaseClient.js</code>. ' +
    'In Supabase Auth, enable Google and add this redirect URL:<br /><code>' +
    pageUrl('dashboard.html') +
    '</code>';
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function formatElapsed(totalSeconds) {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds % 60);
}

function formatCompact(totalSeconds) {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours === 0 && minutes === 0) return seconds + 's';
  if (hours === 0) return minutes + 'm';
  return hours + 'h ' + pad(minutes) + 'm';
}

function startOfDay(date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function startOfWeek(date) {
  const next = startOfDay(date);
  const day = next.getDay();
  const offset = day === 0 ? 6 : day - 1;
  next.setDate(next.getDate() - offset);
  return next;
}

function formatDateLabel(date) {
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

function getRange(mode) {
  if (mode === 'today') {
    const start = startOfDay(new Date());
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    return {
      start,
      end,
      label: formatDateLabel(start),
    };
  }

  const start = startOfWeek(new Date());
  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  const lastDay = new Date(end);
  lastDay.setDate(lastDay.getDate() - 1);
  return {
    start,
    end,
    label: formatDateLabel(start) + ' – ' + formatDateLabel(lastDay) + ' (mon–sun)',
  };
}

function findCategory(id) {
  return categories.find(function (category) {
    return category.id === id;
  });
}

function updateCategorySwatch() {
  const swatch = $('categorySwatch');
  if (!swatch) return;
  const selected = findCategory($('categorySelect').value);
  swatch.style.background = selected ? selected.color : DEFAULT_SWATCH;
}

function renderCategoryOptions(selectedId) {
  const select = $('categorySelect');
  if (!select) return;

  if (!categories.length) {
    select.innerHTML = '<option value="">create a category first</option>';
    select.disabled = true;
    updateCategorySwatch();
    if (!running.startTime) {
      const startBtn = $('startBtn');
      if (startBtn) startBtn.disabled = true;
    }
    return;
  }

  const preferred =
    selectedId ||
    localStorage.getItem(SELECTED_CATEGORY_KEY) ||
    (running.categoryId || '');

  select.innerHTML = categories
    .map(function (category) {
      const selected = category.id === preferred ? ' selected' : '';
      return (
        '<option value="' +
        category.id +
        '"' +
        selected +
        '>' +
        escapeHtml(category.name) +
        '</option>'
      );
    })
    .join('');

  if (!select.value && categories[0]) {
    select.value = categories[0].id;
  }

  select.disabled = Boolean(running.startTime);
  localStorage.setItem(SELECTED_CATEGORY_KEY, select.value);
  updateCategorySwatch();

  if (!running.startTime) {
    const startBtn = $('startBtn');
    if (startBtn) startBtn.disabled = !categories.length;
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function persistRunning() {
  if (!currentUser || !running.startTime) {
    localStorage.removeItem(RUNNING_KEY);
    return;
  }

  localStorage.setItem(
    RUNNING_KEY,
    JSON.stringify({
      userId: currentUser.id,
      categoryId: running.categoryId,
      startTime: running.startTime.toISOString(),
    })
  );
}

function restoreRunning() {
  const raw = localStorage.getItem(RUNNING_KEY);
  if (!raw || !currentUser) return;

  try {
    const saved = JSON.parse(raw);
    if (saved.userId !== currentUser.id || !saved.startTime) {
      localStorage.removeItem(RUNNING_KEY);
      return;
    }

    running = {
      categoryId: saved.categoryId,
      startTime: new Date(saved.startTime),
    };
    beginTicking();
  } catch (error) {
    localStorage.removeItem(RUNNING_KEY);
  }
}

function beginTicking() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(updateElapsed, 250);
  updateElapsed();
  const startBtn = $('startBtn');
  const stopBtn = $('stopBtn');
  const select = $('categorySelect');
  if (startBtn) startBtn.disabled = true;
  if (stopBtn) stopBtn.disabled = false;
  if (select) {
    if (running.categoryId) select.value = running.categoryId;
    select.disabled = true;
  }
  updateCategorySwatch();
  const selected = findCategory(running.categoryId);
  setStatus(selected ? 'timing ' + selected.name : 'timing…');
}

function updateElapsed() {
  const display = $('elapsedDisplay');
  if (!display) return;
  if (!running.startTime) {
    display.textContent = '00:00:00';
    return;
  }
  display.textContent = formatElapsed((Date.now() - running.startTime.getTime()) / 1000);
}

function resetStopwatchUi() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  running = { categoryId: null, startTime: null };
  persistRunning();
  updateElapsed();
  const startBtn = $('startBtn');
  const stopBtn = $('stopBtn');
  const select = $('categorySelect');
  if (startBtn) startBtn.disabled = !categories.length;
  if (stopBtn) stopBtn.disabled = true;
  if (select) select.disabled = !categories.length;
}

async function loadCategories() {
  const { data, error } = await supabaseClient
    .from('categories')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;
  categories = data || [];
  renderCategoryOptions($('categorySelect') ? $('categorySelect').value : '');
  if (!running.startTime) {
    const startBtn = $('startBtn');
    if (startBtn) startBtn.disabled = !categories.length;
  }
}

function aggregateByCategory(entries) {
  const totals = new Map();

  (entries || []).forEach(function (entry) {
    const category = entry.categories;
    if (!category) return;
    const current = totals.get(category.name) || {
      name: category.name,
      color: category.color,
      seconds: 0,
    };
    current.seconds += entry.duration_seconds || 0;
    totals.set(category.name, current);
  });

  return Array.from(totals.values()).sort(function (a, b) {
    return b.seconds - a.seconds;
  });
}

function renderDashboard(rows) {
  const body = $('dashboardBody');
  if (!body) return;

  if (!rows.length) {
    body.innerHTML = '<p class="tracker-empty">no time logged yet. start the stopwatch!</p>';
    return;
  }

  const maxSeconds = Math.max.apply(
    null,
    rows.map(function (row) {
      return row.seconds;
    })
  );
  const totalSeconds = rows.reduce(function (sum, row) {
    return sum + row.seconds;
  }, 0);

  const bars = rows
    .map(function (row) {
      const width = maxSeconds ? Math.max(6, (row.seconds / maxSeconds) * 100) : 0;
      return (
        '<div class="tracker-bar-row">' +
        '<span class="tracker-bar-name">' +
        escapeHtml(row.name) +
        '</span>' +
        '<div class="tracker-bar-track">' +
        '<div class="tracker-bar-fill" style="width:' +
        width +
        '%;background:' +
        escapeHtml(row.color) +
        '"></div>' +
        '</div>' +
        '<span class="tracker-bar-value">' +
        formatCompact(row.seconds) +
        '</span>' +
        '</div>'
      );
    })
    .join('');

  const tableRows = rows
    .map(function (row) {
      return (
        '<tr>' +
        '<td><span class="tracker-dot" style="background:' +
        escapeHtml(row.color) +
        '"></span>' +
        escapeHtml(row.name) +
        '</td>' +
        '<td>' +
        formatElapsed(row.seconds) +
        '</td>' +
        '</tr>'
      );
    })
    .join('');

  body.innerHTML =
    '<div class="tracker-bars">' +
    bars +
    '</div>' +
    '<table class="tracker-table">' +
    '<thead><tr><th>category</th><th>time</th></tr></thead>' +
    '<tbody>' +
    tableRows +
    '</tbody>' +
    '<tfoot><tr><td>total</td><td>' +
    formatElapsed(totalSeconds) +
    '</td></tr></tfoot>' +
    '</table>';
}

async function loadDashboard() {
  const range = getRange(rangeMode);
  const label = $('rangeLabel');
  if (label) label.textContent = range.label;

  const { data, error } = await supabaseClient
    .from('time_entries')
    .select('duration_seconds, categories(name, color)')
    .gte('start_time', range.start.toISOString())
    .lt('start_time', range.end.toISOString())
    .not('duration_seconds', 'is', null);

  if (error) throw error;
  renderDashboard(aggregateByCategory(data));
}

async function createCategory(event) {
  event.preventDefault();
  if (!currentUser) return;

  const nameInput = $('newCategoryName');
  const colorInput = $('newCategoryColor');
  const name = nameInput.value.trim();
  const color = colorInput.value;

  if (!name) {
    setStatus('give the category a name', true);
    return;
  }

  const button = $('createCategoryBtn');
  button.disabled = true;

  try {
    const { data, error } = await supabaseClient
      .from('categories')
      .insert({
        user_id: currentUser.id,
        name: name,
        color: color,
      })
      .select()
      .single();

    if (error) throw error;

    nameInput.value = '';
    categories.push(data);
    renderCategoryOptions(running.startTime ? running.categoryId : data.id);
    setStatus('added ' + data.name);
  } catch (error) {
    setStatus(error.message || 'could not create category', true);
  } finally {
    button.disabled = false;
  }
}

function startStopwatch() {
  if (running.startTime) return;

  const categoryId = $('categorySelect').value;
  if (!categoryId) {
    setStatus('pick a category first', true);
    return;
  }

  running = {
    categoryId: categoryId,
    startTime: new Date(),
  };
  persistRunning();
  beginTicking();
}

async function stopStopwatch() {
  if (!running.startTime || !currentUser) return;

  const startTime = running.startTime;
  const categoryId = running.categoryId;
  const endTime = new Date();
  const durationSeconds = Math.max(0, Math.round((endTime - startTime) / 1000));

  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  $('stopBtn').disabled = true;
  setStatus('saving…');

  try {
    const { error } = await supabaseClient.from('time_entries').insert({
      user_id: currentUser.id,
      category_id: categoryId,
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
      duration_seconds: durationSeconds,
    });

    if (error) throw error;

    resetStopwatchUi();
    renderCategoryOptions(categoryId);
    setStatus('saved ' + formatElapsed(durationSeconds));
    await loadDashboard();
  } catch (error) {
    running = { categoryId: categoryId, startTime: startTime };
    persistRunning();
    beginTicking();
    setStatus(error.message || 'could not save time entry', true);
  }
}

async function initLogin() {
  if (!isSupabaseConfigured()) {
    showConfigWarning();
    $('googleSignInBtn').disabled = true;
    setStatus('supabase is not configured yet', true);
    return;
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get('error')) {
    setStatus(params.get('error_description') || params.get('error'), true);
  }

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (session) {
    window.location.replace(pageUrl('dashboard.html'));
    return;
  }

  $('googleSignInBtn').addEventListener('click', async function () {
    setStatus('opening google…');
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: pageUrl('dashboard.html'),
      },
    });
    if (error) setStatus(error.message, true);
  });
}

async function initDashboard() {
  if (!isSupabaseConfigured()) {
    showConfigWarning();
    setStatus('supabase is not configured yet', true);
    return;
  }

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (!session) {
    window.location.replace(pageUrl('tracker.html'));
    return;
  }

  currentUser = session.user;
  $('userEmail').textContent = currentUser.email || '';

  $('logoutBtn').addEventListener('click', async function () {
    await supabaseClient.auth.signOut();
    localStorage.removeItem(RUNNING_KEY);
    window.location.replace(pageUrl('tracker.html'));
  });

  $('categorySelect').addEventListener('change', function (event) {
    localStorage.setItem(SELECTED_CATEGORY_KEY, event.target.value);
    updateCategorySwatch();
  });
  $('startBtn').addEventListener('click', startStopwatch);
  $('stopBtn').addEventListener('click', stopStopwatch);
  $('newCategoryForm').addEventListener('submit', createCategory);

  document.querySelectorAll('.tracker-range-btn').forEach(function (button) {
    button.addEventListener('click', async function () {
      rangeMode = button.dataset.range;
      document.querySelectorAll('.tracker-range-btn').forEach(function (item) {
        item.classList.toggle('is-active', item === button);
      });
      try {
        await loadDashboard();
      } catch (error) {
        setStatus(error.message || 'could not load dashboard', true);
      }
    });
  });

  supabaseClient.auth.onAuthStateChange(function (event, nextSession) {
    if (event === 'SIGNED_OUT' || !nextSession) {
      window.location.replace(pageUrl('tracker.html'));
    }
  });

  try {
    await loadCategories();
    restoreRunning();
    await loadDashboard();
  } catch (error) {
    setStatus(error.message || 'could not load tracker data', true);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const page = document.body.dataset.page;
  if (page === 'login') initLogin();
  if (page === 'dashboard') initDashboard();
});
