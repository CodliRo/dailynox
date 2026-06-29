// Dailynox MIL-First Learning Platform
// Main Application Controller

class DailynoxApp {
  constructor() {
    this.currentModule = 'dashboard';
    this.modules = [
      'dashboard', 'source', 'notes', 'journal',
      'flashcards', 'focus', 'planner', 'library',
      'ai', 'analytics', 'community', 'files',
      'settings', 'help'
    ];
    this.milScore = 75;
    this.focusTimeRemaining = 1500; // 25 minutes in seconds
    this.isFocusRunning = false;
    this.focusInterval = null;
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadModule('dashboard');
    this.setupCalendar();
    this.updateTime();
  }

  setupEventListeners() {
    // Navigation
    document.querySelectorAll('[data-module]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const module = e.target.closest('[data-module]').dataset.module;
        this.loadModule(module);
      });
    });

    // Menu toggle for mobile
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('open');
      });
    }

    // Source Hub
    const addSourceBtn = document.getElementById('addSourceBtn');
    if (addSourceBtn) {
      addSourceBtn.addEventListener('click', () => {
        document.getElementById('sourceForm').style.display = 'block';
      });
    }

    const cancelSourceBtn = document.getElementById('cancelSourceBtn');
    if (cancelSourceBtn) {
      cancelSourceBtn.addEventListener('click', () => {
        document.getElementById('sourceForm').style.display = 'none';
      });
    }

    // Focus Mode
    const startFocusBtn = document.getElementById('startFocusBtn');
    const pauseFocusBtn = document.getElementById('pauseFocusBtn');
    const resetFocusBtn = document.getElementById('resetFocusBtn');

    if (startFocusBtn) {
      startFocusBtn.addEventListener('click', () => this.startFocusSession());
    }
    if (pauseFocusBtn) {
      pauseFocusBtn.addEventListener('click', () => this.pauseFocusSession());
    }
    if (resetFocusBtn) {
      resetFocusBtn.addEventListener('click', () => this.resetFocusSession());
    }

    // Method buttons
    document.querySelectorAll('.method-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.setFocusMethod(e.target.dataset.method);
      });
    });

    // Tab buttons in tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
      });
    });

    // Library tabs
    document.querySelectorAll('.lib-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        document.querySelectorAll('.lib-tab').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
      });
    });
  }

  loadModule(moduleName) {
    // Hide all modules
    document.querySelectorAll('.module').forEach(m => m.classList.remove('active'));
    
    // Remove active class from nav links
    document.querySelectorAll('[data-module]').forEach(link => {
      link.classList.remove('active');
    });

    // Show selected module
    const moduleId = `${moduleName}-module`;
    const moduleElement = document.getElementById(moduleId);
    if (moduleElement) {
      moduleElement.classList.add('active');
    }

    // Update nav
    const activeLink = document.querySelector(`[data-module="${moduleName}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }

    // Update page title
    const titleMap = {
      'dashboard': 'Dashboard',
      'source': 'Source Hub',
      'notes': 'Notes Workspace',
      'journal': 'Journal',
      'flashcards': 'Flashcards',
      'focus': 'Focus Mode',
      'planner': 'Planner',
      'library': 'Library',
      'ai': 'AI Assistant',
      'analytics': 'Analytics',
      'community': 'Community',
      'files': 'Files',
      'settings': 'Settings',
      'help': 'Help & Onboarding'
    };

    document.getElementById('pageTitle').textContent = titleMap[moduleName] || moduleName;
    this.currentModule = moduleName;

    // Close mobile menu if open
    document.querySelector('.sidebar')?.classList.remove('open');
  }

  startFocusSession() {
    const startBtn = document.getElementById('startFocusBtn');
    const pauseBtn = document.getElementById('pauseFocusBtn');
    
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    this.isFocusRunning = true;

    this.focusInterval = setInterval(() => {
      this.focusTimeRemaining--;
      this.updateFocusTimer();

      if (this.focusTimeRemaining <= 0) {
        this.completeFocusSession();
      }
    }, 1000);
  }

  pauseFocusSession() {
    const startBtn = document.getElementById('startFocusBtn');
    const pauseBtn = document.getElementById('pauseFocusBtn');
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    this.isFocusRunning = false;
    clearInterval(this.focusInterval);
  }

  resetFocusSession() {
    clearInterval(this.focusInterval);
    this.focusTimeRemaining = 1500;
    this.isFocusRunning = false;
    
    const startBtn = document.getElementById('startFocusBtn');
    const pauseBtn = document.getElementById('pauseFocusBtn');
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    
    this.updateFocusTimer();
  }

  updateFocusTimer() {
    const minutes = Math.floor(this.focusTimeRemaining / 60);
    const seconds = this.focusTimeRemaining % 60;
    const timerDisplay = document.getElementById('focusTimer');
    if (timerDisplay) {
      timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  }

  completeFocusSession() {
    clearInterval(this.focusInterval);
    alert('Focus session completed! Great work on your learning.');
    this.resetFocusSession();
    this.updateMILScore(2); // Increment MIL score
  }

  setFocusMethod(method) {
    const methodDurations = {
      'pomodoro': 1500,    // 25 minutes
      'flowtime': 2700,    // 45 minutes
      'deep': 5400,        // 90 minutes
      'custom': 1800       // 30 minutes
    };
    this.focusTimeRemaining = methodDurations[method] || 1500;
    this.updateFocusTimer();
  }

  setupCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    if (!calendarGrid) return;

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    // Days of week header
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
      const dayHeader = document.createElement('div');
      dayHeader.className = 'calendar-day-header';
      dayHeader.textContent = day;
      dayHeader.style.fontWeight = 'bold';
      dayHeader.style.textAlign = 'center';
      dayHeader.style.marginBottom = '0.5rem';
      calendarGrid.appendChild(dayHeader);
    });

    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      const emptyDay = document.createElement('div');
      calendarGrid.appendChild(emptyDay);
    }

    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement('div');
      dayElement.className = 'calendar-day';
      dayElement.textContent = day;

      if (day === today.getDate()) {
        dayElement.classList.add('today');
      }

      dayElement.addEventListener('click', () => {
        console.log(`Selected: ${day}/${month + 1}/${year}`);
      });

      calendarGrid.appendChild(dayElement);
    }
  }

  updateTime() {
    const journalDateEl = document.getElementById('journalDate');
    if (journalDateEl) {
      const today = new Date();
      const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
      journalDateEl.textContent = `Today, ${today.toLocaleDateString('en-US', options)}`;
    }
  }

  updateMILScore(increment = 0) {
    this.milScore = Math.min(100, this.milScore + increment);
    const scoreDisplay = document.getElementById('milScore');
    if (scoreDisplay) {
      scoreDisplay.textContent = `${this.milScore}%`;
    }
  }

  // Analytics tracking
  trackActivity(activity, category) {
    console.log(`📊 Activity tracked: ${activity} (${category})`);
    // In a real app, this would send to a backend
  }

  // AI Transparency
  disclosureAIUsage() {
    return `This AI response is generated by Dailynox AI Assistant to support your learning in alignment with UNESCO's Media Information Literacy framework. Always verify information independently.`;
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new DailynoxApp();
});