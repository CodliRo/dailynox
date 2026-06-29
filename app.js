/* ═══════════════════════════════════════════════
   DAILYNOX OS — app.js
   Full client-side logic, localStorage persistence
═══════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ───────────────────────── I18N ───────────────────────── */
  const TR = {
    "ob-tagline": ["tập trung từng ngày", "focus, one day at a time"],
    "ob-q1": ["Bạn tên là gì?", "What's your name?"],
    "ob-hint1": ["Tên này sẽ xuất hiện trên dashboard của bạn", "This name will appear on your dashboard"],
    "ob-q2": ["Bạn muốn tập trung vào điều gì?", "What do you want to focus on?"],
    "g1": ["Học tập & kỹ năng", "Study & skills"],
    "g2": ["Sức khoẻ & tinh thần", "Health & wellness"],
    "g3": ["Sự nghiệp & việc làm", "Career & work"],
    "g4": ["Thói quen cá nhân", "Personal habits"],
    "g5": ["Đọc sách & nghiên cứu", "Reading & research"],
    "g6": ["Sáng tạo & nghệ thuật", "Creativity & art"],
    "ob-q3": ["Tuỳ chỉnh giao diện", "Customize your experience"],
    "pref-lang-lbl": ["Ngôn ngữ", "Language"],
    "pref-theme-lbl": ["Giao diện", "Theme"],
    "pref-focus-lbl": ["Thời gian Pomodoro", "Pomodoro duration"],
    "ob-q4": ["Đồng bộ tài khoản", "Sync your account"],
    "ob-hint4": ["Tuỳ chọn — bạn có thể bỏ qua và dùng offline", "Optional — skip and use offline"],
    "ob-google-txt": ["Đăng nhập với Google", "Sign in with Google"],
    "ob-skip-btn": ["Dùng offline, không đăng nhập", "Use offline, skip sign-in"],
    "ob-back": ["Quay lại", "Back"],
    "fw-phase-lbl": ["trạng thái flow", "flow state"],
    "fw-s1": ["phiên", "sessions"],
    "fw-s2": ["phút", "minutes"],
    "fw-s3": ["streak", "streak"],
    "fw-why": ["Hệ thống phát hiện bạn đang trong trạng thái Flow. Mọi thông báo đã bị khoá. Tiếp tục tập trung.", "We've detected you're in a Flow state. Notifications are locked. Keep going."],
    "fw-exit-btn": ["Thoát Flow Mode", "Exit Flow Mode"],
    "sp-title": ["Cài đặt", "Settings"],
    "sp-s1": ["Tài khoản", "Account"],
    "sp-name-lbl": ["Tên hiển thị", "Display name"],
    "sp-save-name": ["Lưu", "Save"],
    "sp-gg-lbl": ["Google Account", "Google Account"],
    "sp-s2": ["Giao diện", "Appearance"],
    "sp-theme-lbl": ["Chủ đề", "Theme"],
    "stheme-light": ["Sáng", "Light"],
    "stheme-dark": ["Tối", "Dark"],
    "sp-lang-lbl": ["Ngôn ngữ", "Language"],
    "sp-font-lbl": ["Cỡ chữ", "Font size"],
    "fsize-sm": ["Nhỏ", "Small"],
    "fsize-md": ["Vừa", "Medium"],
    "fsize-lg": ["Lớn", "Large"],
    "sp-s3": ["Tập trung", "Focus"],
    "sp-pomo-lbl": ["Thời gian Pomodoro", "Pomodoro duration"],
    "sp-break-lbl": ["Thời gian nghỉ ngắn", "Short break duration"],
    "sp-notif-lbl": ["Thông báo cuối ngày", "End-of-day reminder"],
    "sp-notif-sub": ["Nhắc viết nhật ký 21:00", "Reminds you to journal at 9:00 PM"],
    "sp-s4": ["Dữ liệu", "Data"],
    "sp-export-lbl": ["Xuất dữ liệu", "Export data"],
    "sp-export-btn": ["Xuất", "Export"],
    "sp-reset-lbl": ["Đặt lại toàn bộ", "Reset everything"],
    "sp-reset-btn": ["Đặt lại", "Reset"],
    "qa-title": ["Thêm nhanh", "Quick add"],
    "qa-p1": ["Ưu tiên cao", "High priority"],
    "qa-p2": ["Trung bình", "Medium"],
    "qa-p3": ["Thấp", "Low"],
    "qa-cancel": ["Hủy", "Cancel"],
    "qa-save": ["Thêm", "Add"],
    "nl-main": ["chính", "main"],
    "nav-dashboard": ["Tổng quan", "Overview"],
    "nav-week": ["Tuần này", "This week"],
    "nav-focus": ["Tập trung", "Focus"],
    "nl-dev": ["phát triển", "growth"],
    "nav-journal": ["Nhật ký", "Journal"],
    "nav-study": ["Ghi chép học tập", "Study notes"],
    "nav-library": ["Thư viện", "Library"],
    "nav-flashcards": ["Flashcard", "Flashcards"],
    "nav-goals": ["Mục tiêu", "Goals"],
    "nav-selfdev": ["Hoàn thiện bản thân", "Self-improvement"],
    "nl-insights": ["phân tích", "insights"],
    "nav-analytics": ["Phân tích", "Analytics"],
    "btn-qa": ["Thêm nhanh", "Quick add"],
    "btn-start-focus": ["Bắt đầu tập trung", "Start focusing"],
    "flow-b-title": ["Flow State phát hiện", "Flow State detected"],
    "flow-b-sub": ["Bạn đang tập trung sâu. Khoá màn hình?", "You're deep in focus. Lock the screen?"],
    "fw-lock-btn": ["Khoá ngay", "Lock now"],
    "ds-l1": ["Tập trung hôm nay", "Focus today"],
    "ds-l2": ["Chuỗi thói quen", "Habit streak"],
    "ds-l3": ["Mục tiêu chính", "Main goal"],
    "ds-l4": ["Flashcard hôm nay", "Flashcards today"],
    "ds-today-title": ["Hôm nay", "Today"],
    "ds-journal-title": ["Nhật ký hôm qua", "Yesterday's journal"],
    "week-title": ["Tuần này", "This week"],
    "week-sub": ["Kéo thả nhiệm vụ giữa các ngày", "Drag and drop tasks between days"],
    "wk-add-btn": ["Việc mới", "New task"],
    "focus-title": ["Phiên tập trung", "Focus session"],
    "focus-sub": ["Pomodoro — tập trung sâu, nghỉ đúng lúc", "Pomodoro — deep focus, timely rest"],
    "focus-task-lbl": ["Đang tập trung vào", "Currently focusing on"],
    "amb-silence": ["im lặng", "silence"],
    "amb-rain": ["mưa nhẹ", "light rain"],
    "amb-lofi": ["lo-fi", "lo-fi"],
    "amb-cafe": ["quán café", "café"],
    "amb-ocean": ["sóng biển", "ocean waves"],
    "amb-forest": ["rừng xanh", "forest"],
    "fs-today-lbl": ["phiên hôm nay", "sessions today"],
    "fs-total-lbl": ["tổng tuần này", "total this week"],
    "fs-streak-lbl": ["ngày streak", "day streak"],
    "tasks-title": ["Nhiệm vụ", "Tasks"],
    "add-task-btn": ["Thêm nhiệm vụ", "Add task"],
    "st-l1": ["Hoàn thành hôm nay", "Completed today"],
    "st-l2": ["Tỉ lệ hoàn thành tuần", "Weekly completion rate"],
    "st-l3": ["Theo nhãn", "By label"],
    "search-icon-txt": ["tìm", "search"],
    "sort-def": ["Mặc định", "Default"],
    "sort-pri": ["Ưu tiên cao", "High priority"],
    "sort-due": ["Hạn gần nhất", "Due soon"],
    "sort-az": ["Tên A–Z", "Name A–Z"],
    "manage-lbl-btn": ["Nhãn", "Labels"],
    "lm-title": ["Nhãn của bạn", "Your labels"],
    "add-lbl-btn": ["Thêm", "Add"],
    "tf-l1": ["Tên nhiệm vụ", "Task name"],
    "tf-l2": ["Ghi chú", "Note"],
    "tf-l3": ["Nhãn", "Labels"],
    "tf-l4": ["Ưu tiên", "Priority"],
    "p-high": ["Ưu tiên cao", "High priority"],
    "p-med": ["Trung bình", "Medium"],
    "p-low": ["Thấp", "Low"],
    "tf-l5": ["Giờ / Hạn", "Time / Due"],
    "tf-l6": ["Lặp lại", "Repeat"],
    "r-none": ["Không lặp", "No repeat"],
    "r-daily": ["Hàng ngày", "Daily"],
    "r-weekly": ["Hàng tuần", "Weekly"],
    "tf-l7": ["Hạn ngày", "Due date"],
    "tf-l8": ["Việc con", "Subtasks"],
    "cancel-task-btn": ["Hủy", "Cancel"],
    "save-task-btn": ["Lưu nhiệm vụ", "Save task"],
    "add-sub-btn": ["+", "+"],
    "journal-title": ["Nhật ký", "Journal"],
    "journal-sub": ["Plus / Minus / Next — ghi lại hành trình mỗi ngày", "Plus / Minus / Next — track your journey daily"],
    "save-jnl-btn": ["Lưu hôm nay", "Save today"],
    "mood-label": ["Cảm xúc hôm nay", "Today's mood"],
    "energy-label": ["Năng lượng", "Energy"],
    "jtb-pmn": ["Plus / Minus / Next", "Plus / Minus / Next"],
    "jtb-fw": ["Viết tự do", "Free write"],
    "jtb-ref": ["Phản tư có hướng", "Guided reflection"],
    "jtb-hist": ["Lịch sử", "History"],
    "pmn-pl-h": ["Plus — điều tích cực", "Plus — what went well"],
    "pmn-mi-h": ["Minus — điều chưa tốt", "Minus — what didn't go well"],
    "pmn-nx-h": ["Next — hành động tiếp theo", "Next — next actions"],
    "pmna-pl": ["+ thêm", "+ add"],
    "pmna-mi": ["+ thêm", "+ add"],
    "pmna-nx": ["+ thêm", "+ add"],
    "fw-title": ["Viết tự do", "Free write"],
    "study-title": ["Ghi chép học tập", "Study notes"],
    "study-sub": ["Lưu lại những gì bạn học mỗi ngày", "Record what you learn every day"],
    "add-study-btn": ["Ghi chép mới", "New note"],
    "sf-l1": ["Chủ đề / Bài học", "Topic / Lesson"],
    "sf-l2": ["Nội dung", "Content"],
    "sf-l3": ["Môn học", "Subject"],
    "sf-l4": ["Thời gian (phút)", "Time (minutes)"],
    "sf-l5": ["Mức hiểu", "Understanding"],
    "sl-3": ["Hiểu rõ", "Clear"],
    "sl-2": ["Tạm hiểu", "Partial"],
    "sl-1": ["Cần ôn lại", "Needs review"],
    "sf-l6": ["Tags", "Tags"],
    "cancel-study-btn": ["Hủy", "Cancel"],
    "save-study-btn": ["Lưu", "Save"],
    "st-s1": ["Tổng ghi chép", "Total notes"],
    "st-s1-sub": ["ghi chép đã lưu", "notes saved"],
    "st-s2": ["Hôm nay", "Today"],
    "st-s2-sub": ["thời gian học", "study time"],
    "st-s3": ["Môn nhiều nhất", "Top subject"],
    "st-s3-sub": ["tuần này", "this week"],
    "st-empty": ["Chưa có ghi chép nào. Thêm ngay!", "No notes yet. Add one now!"],
    "lib-title": ["Thư viện", "Library"],
    "lib-sub": ["Môn học, sách và khóa học đang theo dõi", "Subjects, books, and courses you're tracking"],
    "add-lib-btn": ["Thêm tài nguyên", "Add resource"],
    "lib-tab-s": ["Môn học", "Subjects"],
    "lib-tab-b": ["Sách đang đọc", "Reading"],
    "lib-tab-c": ["Khóa học", "Courses"],
    "fc-title": ["Flashcard", "Flashcards"],
    "fc-sub": ["Spaced Repetition — ôn tập để nhớ lâu hơn", "Spaced repetition — review to remember longer"],
    "add-fc-btn": ["Thêm thẻ", "Add card"],
    "fc-l1": ["Thẻ hôm nay", "Due today"],
    "fc-l1-sub": ["cần ôn tập", "to review"],
    "fc-l2": ["Đã ôn", "Reviewed"],
    "fc-l2-sub": ["hôm nay", "today"],
    "fc-l3": ["Tỉ lệ nhớ", "Retention rate"],
    "fc-l3-sub": ["7 ngày qua", "last 7 days"],
    "fc-l4": ["Chuỗi học", "Study streak"],
    "fc-l4-sub": ["liên tiếp", "consecutive"],
    "fc-front-lbl": ["Từ / Khái niệm", "Term / Concept"],
    "fc-back-lbl": ["Nghĩa / Giải thích", "Meaning / Explanation"],
    "fcHint": ["Nhấn vào thẻ để xem nghĩa", "Tap the card to reveal the answer"],
    "fc-again": ["Quên rồi", "Forgot"],
    "fc-good": ["Nhớ được", "Remembered"],
    "fc-easy": ["Dễ dàng", "Easy"],
    "goals-title": ["Mục tiêu", "Goals"],
    "add-goal-btn": ["Mục tiêu mới", "New goal"],
    "habit-tracker-title": ["Theo dõi thói quen tuần này", "This week's habit tracker"],
    "sd-title": ["Hoàn thiện bản thân", "Self-improvement"],
    "sd-sub": ["Kỹ năng mềm, mindset, thói quen tích cực", "Soft skills, mindset, positive habits"],
    "hm-title": ["Bản đồ nhiệt 4 tuần", "4-week heatmap"],
    "sci-title": ["Phương pháp khoa học", "Science-backed methods"],
    "an-title": ["Phân tích", "Analytics"],
    "an-sub": ["Nhìn lại hành trình 30 ngày qua", "Look back at your last 30 days"],
    "an-7": ["7 ngày", "7 days"],
    "an-30": ["30 ngày", "30 days"],
    "an-l1": ["Giờ tập trung", "Focus hours"],
    "an-l2": ["Nhiệm vụ hoàn thành", "Tasks completed"],
    "an-l3": ["Flashcard đã ôn", "Flashcards reviewed"],
    "an-l4": ["Tâm trạng TB", "Avg mood"],
    "an-c1": ["Tập trung theo ngày", "Daily focus"],
    "an-c2": ["Phân bổ theo môn", "Subject distribution"],
    "an-c3": ["Xu hướng tâm trạng", "Mood trend"],
    "an-c4": ["Hoàn thành nhiệm vụ", "Task completion"],
    "mn-1": ["Tổng quan", "Overview"],
    "mn-2": ["Tập trung", "Focus"],
    "mn-3": ["Nhiệm vụ", "Tasks"],
    "mn-4": ["Nhật ký", "Journal"],
    "mn-5": ["Mục tiêu", "Goals"]
  };
  const MBTN_TXT = { vi: ["Tệ", "Ổn", "Tốt", "Vui", "Tuyệt"], en: ["Bad", "OK", "Good", "Happy", "Great"] };
  const PLACE = {
    "ob-name": ["Nhập tên của bạn…", "Enter your name…"],
    "qa-input": ["Tên nhiệm vụ…", "Task name…"],
    "qa-due": ["Giờ (VD: 14:00)", "Time (e.g. 14:00)"],
    "tSearch": ["Tìm nhiệm vụ…", "Search tasks…"],
    "nTitle": ["Nhập tên nhiệm vụ…", "Enter task name…"],
    "nNote": ["Mô tả chi tiết…", "Add detail…"],
    "nDue": ["VD: 14:00", "e.g. 14:00"],
    "nSubIn": ["Nhập rồi Enter…", "Type then Enter…"],
    "newLblName": ["Tên nhãn mới…", "New label name…"],
    "fwArea": ["Hôm nay bạn suy nghĩ gì?…", "What's on your mind today?…"],
    "sTopic": ["VD: Thuật toán Quick Sort", "e.g. Quick Sort algorithm"],
    "sCont": ["Ghi lại công thức, ví dụ, insight…", "Write formulas, examples, insights…"],
    "sTime": ["VD: 45", "e.g. 45"],
    "sTags": ["#thuật-toán #sort", "#algorithm #sort"]
  };
  function L() { return S.user.lang; }
  function applyLang() {
    const lang = L();
    document.documentElement.lang = lang;
    for (const id in TR) {
      const el = document.getElementById(id);
      if (el) el.textContent = TR[id][lang === 'en' ? 1 : 0];
    }
    for (const id in PLACE) {
      const el = document.getElementById(id);
      if (el) el.placeholder = PLACE[id][lang === 'en' ? 1 : 0];
    }
    document.querySelectorAll('.mbtn').forEach(b => {
      const i = +b.dataset.m - 1;
      b.textContent = MBTN_TXT[lang][i];
    });
    const dje = document.getElementById('ds-j-empty');
    if (dje) dje.innerHTML = (lang === 'en' ? 'No journal yet. ' : 'Chưa có nhật ký. ') +
      `<span style="cursor:pointer;color:var(--am)" onclick="goTo('journal')">${lang === 'en' ? 'Write now' : 'Viết ngay'}</span>`;
    const fte = document.querySelector('#ftask-list .empty-state');
    // handled at render time
    renderAll();
  }

  /* ───────────────────────── STATE ───────────────────────── */
  const LS_KEY = 'dailynoxState';
  const DAY_NAMES = { vi: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'], en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] };
  const MONTH_NAMES = {
    vi: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'],
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  };
  const REFLECT_Q = {
    vi: ["Điều gì khiến bạn tự hào nhất hôm nay?", "Bạn đã học được gì mới?", "Điều gì bạn muốn làm khác đi?", "Ai/điều gì đã giúp bạn hôm nay?", "Bạn cảm thấy thế nào về tiến độ của mình?"],
    en: ["What are you most proud of today?", "What did you learn today?", "What would you do differently?", "Who or what helped you today?", "How do you feel about your progress?"]
  };
  const SCI_METHODS = [
    { vi: ["Kỹ thuật Pomodoro", "Làm việc 25 phút, nghỉ 5 phút để duy trì sự tập trung."], en: ["Pomodoro Technique", "Work in 25-minute sprints with 5-minute breaks to sustain focus."] },
    { vi: ["Kỹ thuật Feynman", "Giải thích lại kiến thức bằng ngôn ngữ đơn giản để kiểm tra mức hiểu."], en: ["Feynman Technique", "Re-explain a concept in simple terms to test real understanding."] },
    { vi: ["Spaced Repetition", "Ôn tập theo khoảng cách thời gian tăng dần để nhớ lâu hơn."], en: ["Spaced Repetition", "Review material at increasing intervals to retain it longer."] },
    { vi: ["Ma trận Eisenhower", "Phân loại việc theo mức độ quan trọng và khẩn cấp."], en: ["Eisenhower Matrix", "Prioritize tasks by urgency and importance."] },
    { vi: ["Mục tiêu SMART", "Đặt mục tiêu cụ thể, đo được, khả thi, liên quan, có hạn."], en: ["SMART Goals", "Set goals that are specific, measurable, achievable, relevant, timed."] },
    { vi: ["Atomic Habits", "Thay đổi nhỏ, lặp lại đều đặn tạo ra kết quả lớn theo thời gian."], en: ["Atomic Habits", "Small, consistent changes compound into big results over time."] }
  ];
  const SELFDEV_CARDS = [
    { vi: ["Giao tiếp", "Luyện lắng nghe chủ động và phản hồi rõ ràng."], en: ["Communication", "Practice active listening and clear feedback."] },
    { vi: ["Quản lý thời gian", "Ưu tiên việc quan trọng trước việc khẩn cấp."], en: ["Time Management", "Prioritize important work over urgent noise."] },
    { vi: ["Tư duy phản biện", "Đặt câu hỏi và kiểm tra giả định trước khi kết luận."], en: ["Critical Thinking", "Question assumptions before drawing conclusions."] },
    { vi: ["Quản lý cảm xúc", "Nhận diện cảm xúc và phản hồi thay vì phản ứng."], en: ["Emotional Regulation", "Recognize emotions and respond rather than react."] },
    { vi: ["Xây dựng thói quen", "Bắt đầu nhỏ, gắn thói quen mới vào thói quen cũ."], en: ["Habit Building", "Start small and stack new habits onto old ones."] },
    { vi: ["Lãnh đạo", "Truyền cảm hứng bằng hành động, không chỉ lời nói."], en: ["Leadership", "Inspire through action, not just words."] }
  ];
  const LABEL_COLORS = ['#B8763A', '#5C7A5A', '#3A5E8C', '#A05050', '#8A6DAE', '#3A8C84'];
  const DEFAULT_LABELS = [
    { id: 'l1', vi: 'Quan trọng', en: 'Important', color: '#B8763A' },
    { id: 'l2', vi: 'Cá nhân', en: 'Personal', color: '#5C7A5A' },
    { id: 'l3', vi: 'Công việc', en: 'Work', color: '#3A5E8C' },
    { id: 'l4', vi: 'Học tập', en: 'Study', color: '#A05050' }
  ];

  let S = null;
  function defaultState() {
    return {
      onboarded: false,
      user: { name: '', goals: [], lang: 'vi', theme: 'light', fsize: 'md', pomo: 25, breakMin: 5, notif: true, google: null },
      labels: DEFAULT_LABELS.map(l => ({ ...l })),
      tasks: [],
      journal: { pmn: {}, mood: {}, energy: {}, free: {}, ref: {} },
      study: [],
      library: { subjects: [], books: [], courses: [] },
      flashcards: { decks: [], cards: [] },
      goals: [],
      habits: [],
      focusSessions: [],
      consecutiveFocus: 0,
      flowEligible: false,
      tourDone: false,
      nextId: 1
    };
  }
  function uid() { return 'id' + (S.nextId++); }
  function save() { localStorage.setItem(LS_KEY, JSON.stringify(S)); }
  function load() {
    try { const raw = localStorage.getItem(LS_KEY); if (raw) return JSON.parse(raw); } catch (e) { }
    return null;
  }

  /* ───────────────────────── DATE HELPERS ───────────────────────── */
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function todayStr() { const d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function dateStr(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function addDays(str, n) { const d = new Date(str + 'T00:00:00'); d.setDate(d.getDate() + n); return dateStr(d); }
  function dayIndexMon0(str) { const d = new Date(str + 'T00:00:00'); return (d.getDay() + 6) % 7; } // Mon=0..Sun=6
  function startOfWeek(str) { return addDays(str, -dayIndexMon0(str)); }
  function lastNDates(n) { const out = []; const t = todayStr(); for (let i = n - 1; i >= 0; i--) out.push(addDays(t, -i)); return out; }

  /* ───────────────────────── INIT ───────────────────────── */
  document_init();
  function document_init() {
    const loaded = load();
    S = loaded || defaultState();
    if (S.onboarded) {
      boot();
    } else {
      initOnboarding();
    }
    wireGlobalUI();
  }

  function boot() {
    document.getElementById('onboarding').style.display = 'none';
    document.getElementById('app').style.display = '';
    document.documentElement.setAttribute('data-theme', S.user.theme);
    document.documentElement.setAttribute('data-fsize', S.user.fsize);
    seedIfEmpty();
    applyLang();
    initTaskUIDefaults();
    renderAll();
    startTour();
  }

  function seedIfEmpty() {
    // No demo data — start clean, let users build their own.
  }

  /* ───────────────────────── GLOBAL UI WIRING ───────────────────────── */
  function wireGlobalUI() {
    document.querySelectorAll('.ni, .mni').forEach(el => {
      el.addEventListener('click', () => goTo(el.dataset.view));
    });
    document.querySelectorAll('#langSeg .ob-seg-opt').forEach(el => {
      el.addEventListener('click', () => { setSegActive(el); obState.lang = el.dataset.lang; });
    });
    document.querySelectorAll('#themeSeg .ob-seg-opt').forEach(el => {
      el.addEventListener('click', () => { setSegActive(el); obState.theme = el.dataset.theme; document.documentElement.setAttribute('data-theme', obState.theme); });
    });
    document.querySelectorAll('#pomoSeg .ob-seg-opt').forEach(el => {
      el.addEventListener('click', () => { setSegActive(el); obState.pomo = +el.dataset.pomo; });
    });
    document.querySelectorAll('[data-stheme]').forEach(el => {
      el.addEventListener('click', () => { setSegActive(el); S.user.theme = el.dataset.stheme; document.documentElement.setAttribute('data-theme', S.user.theme); save(); });
    });
    document.querySelectorAll('[data-slang]').forEach(el => {
      el.addEventListener('click', () => { setSegActive(el); S.user.lang = el.dataset.slang; save(); applyLang(); });
    });
    document.querySelectorAll('[data-fsize]').forEach(el => {
      el.addEventListener('click', () => { setSegActive(el); S.user.fsize = el.dataset.fsize; document.documentElement.setAttribute('data-fsize', S.user.fsize); save(); });
    });
    document.querySelectorAll('[data-spomo]').forEach(el => {
      el.addEventListener('click', () => { setSegActive(el); S.user.pomo = +el.dataset.spomo; save(); });
    });
    document.querySelectorAll('[data-sbreak]').forEach(el => {
      el.addEventListener('click', () => { setSegActive(el); S.user.breakMin = +el.dataset.sbreak; save(); });
    });
    document.querySelectorAll('.mbtn').forEach(el => {
      el.addEventListener('click', () => {
        document.querySelectorAll('.mbtn').forEach(b => b.classList.remove('sel'));
        el.classList.add('sel');
        S.journal.mood[todayStr()] = +el.dataset.m;
        save();
      });
    });
    document.querySelectorAll('.jtb').forEach(el => {
      el.addEventListener('click', () => {
        document.querySelectorAll('.jtb').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.js').forEach(b => b.classList.remove('active'));
        el.classList.add('active');
        document.getElementById('js-' + el.dataset.js).classList.add('active');
        if (el.dataset.js === 'ref') renderReflective();
        if (el.dataset.js === 'hist') renderJournalHistory();
      });
    });
    document.getElementById('energySlider').addEventListener('input', function () {
      S.journal.energy[todayStr()] = +this.value;
    });
    document.getElementById('fwArea').addEventListener('input', function () {
      const words = this.value.trim().split(/\s+/).filter(Boolean).length;
      document.getElementById('wc').textContent = words + (L() === 'en' ? ' words' : ' từ');
      S.journal.free[todayStr()] = this.value;
    });
    document.querySelectorAll('#amb-btns .amc').forEach(el => {
      el.addEventListener('click', () => setAmbience(el.dataset.amb));
    });
  }
  function setSegActive(el) {
    Array.from(el.parentElement.children).forEach(c => c.classList.remove('active'));
    el.classList.add('active');
  }

  /* ───────────────────────── ONBOARDING ───────────────────────── */
  let obState = { step: 1, name: '', goals: [], lang: 'vi', theme: 'light', pomo: 25, google: null };
  function initOnboarding() {
    document.querySelectorAll('.ob-goal').forEach(el => {
      el.addEventListener('click', () => {
        el.classList.toggle('sel');
        const g = el.dataset.g;
        if (obState.goals.includes(g)) obState.goals = obState.goals.filter(x => x !== g);
        else obState.goals.push(g);
      });
    });
  }
  window.obNext = function () {
    if (obState.step === 1) {
      obState.name = document.getElementById('ob-name').value.trim();
      if (!obState.name) { document.getElementById('ob-name').focus(); return; }
    }
    if (obState.step < 4) {
      document.getElementById('ob-step-' + obState.step).classList.remove('active');
      document.querySelector('.ob-dot[data-s="' + obState.step + '"]').classList.remove('active');
      obState.step++;
      document.getElementById('ob-step-' + obState.step).classList.add('active');
      document.querySelector('.ob-dot[data-s="' + obState.step + '"]').classList.add('active');
      document.getElementById('ob-btn-back').style.visibility = 'visible';
      if (obState.step === 4) document.getElementById('ob-next').style.display = 'none';
    } else {
      finishOnboarding();
    }
  };
  window.obPrev = function () {
    if (obState.step <= 1) return;
    document.getElementById('ob-step-' + obState.step).classList.remove('active');
    document.querySelector('.ob-dot[data-s="' + obState.step + '"]').classList.remove('active');
    obState.step--;
    document.getElementById('ob-step-' + obState.step).classList.add('active');
    document.querySelector('.ob-dot[data-s="' + obState.step + '"]').classList.add('active');
    document.getElementById('ob-next').style.display = '';
    if (obState.step === 1) document.getElementById('ob-btn-back').style.visibility = 'hidden';
  };
  window.mockGoogleLogin = function (fromSettings) {
    const name = obState.name || S.user.name || 'User';
    const email = name.toLowerCase().replace(/\s+/g, '.') + '@gmail.com';
    if (fromSettings) {
      S.user.google = email; save();
      renderSettings();
    } else {
      obState.google = email;
      document.querySelector('.ob-google-btn').style.display = 'none';
      const gn = document.getElementById('ob-google-name');
      gn.style.display = 'block';
      gn.textContent = (L() === 'en' ? 'Signed in as ' : 'Đã đăng nhập: ') + email;
      document.getElementById('ob-skip-btn').textContent = L() === 'en' ? 'Continue' : 'Tiếp tục';
      setTimeout(finishOnboarding, 600);
    }
  };
  window.skipGoogle = function () { finishOnboarding(); };
  function finishOnboarding() {
    S.user.name = obState.name || (L() === 'en' ? 'Friend' : 'Bạn');
    S.user.goals = obState.goals;
    S.user.lang = obState.lang;
    S.user.theme = obState.theme;
    S.user.pomo = obState.pomo;
    S.user.google = obState.google;
    S.onboarded = true;
    save();
    document.getElementById('onboarding').style.display = 'none';
    boot();
  }

  /* ───────────────────────── TOUR / WALKTHROUGH ───────────────────────── */
  const TOUR_STEPS = {
    vi: [
      { target:'nav-dashboard',  title:'Tổng quan',    body:'Màn hình chính tập hợp mọi thứ: nhiệm vụ hôm nay, streak, mục tiêu và nhật ký gần nhất.' },
      { target:'nav-focus',      title:'Tập trung',    body:'Pomodoro timer cho các phiên làm việc sâu. Hệ thống phát hiện khi bạn vào Flow State và khoá thông báo.' },
      { target:'nav-tasks',      title:'Nhiệm vụ',     body:'Quản lý việc làm với nhãn, ưu tiên, hạn chót. Bảng Tuần này giúp kéo thả sắp xếp theo ngày.' },
      { target:'nav-journal',    title:'Nhật ký',      body:'Ghi Plus / Minus / Next mỗi ngày — điều tích cực, chưa tốt, và hành động tiếp theo. Hoặc viết tự do.' },
      { target:'nav-flashcards', title:'Flashcard',    body:'Ôn tập bằng thuật toán Spaced Repetition — nhớ lâu hơn với ít nỗ lực hơn.' },
      { target:'nav-analytics',  title:'Phân tích',    body:'Theo dõi giờ tập trung, hoàn thành nhiệm vụ và tâm trạng qua 7 hoặc 30 ngày.' }
    ],
    en: [
      { target:'nav-dashboard',  title:'Overview',     body:"Your home screen — today's tasks, streak, main goal and recent journal at a glance." },
      { target:'nav-focus',      title:'Focus',        body:'Pomodoro timer for deep work. The app detects Flow State and locks distractions automatically.' },
      { target:'nav-tasks',      title:'Tasks',        body:'Manage tasks with labels, priorities, deadlines. Drag between days on the Week board.' },
      { target:'nav-journal',    title:'Journal',      body:"Log Plus / Minus / Next daily — what went well, what didn't, what to do next. Or free-write." },
      { target:'nav-flashcards', title:'Flashcards',   body:'Spaced Repetition review — remember more with less effort over time.' },
      { target:'nav-analytics',  title:'Analytics',    body:'Track focus hours, task completion and mood trends over 7 or 30 days.' }
    ]
  };

  let tourStep = 0;
  let tourEl = null;

  function startTour() {
    if (S.tourDone) return;
    tourStep = 0;
    // Small delay so dashboard renders first
    setTimeout(showTourStep, 500);
  }

  function showTourStep() {
    closeTourStep();
    const lang = L();
    const steps = TOUR_STEPS[lang] || TOUR_STEPS.vi;
    if (tourStep >= steps.length) { endTour(); return; }
    const step = steps[tourStep];
    const target = document.getElementById(step.target);
    if (!target) { tourStep++; showTourStep(); return; }

    target.classList.add('tour-highlight');

    const tip = document.createElement('div');
    tip.className = 'tour-tip';
    tip.innerHTML = `
      <div class="tour-tip-head">
        <span class="tour-counter">${tourStep + 1}<span class="tour-of"> / ${steps.length}</span></span>
        <button class="tour-skip" onclick="window.skipTour()">${lang === 'en' ? 'Skip tour' : 'Bỏ qua'}</button>
      </div>
      <div class="tour-title">${step.title}</div>
      <div class="tour-body">${step.body}</div>
      <div class="tour-nav">
        ${tourStep > 0
          ? `<button class="tour-btn-sec" onclick="window.tourPrev()">${lang === 'en' ? '← Back' : '← Lại'}</button>`
          : '<span></span>'}
        <button class="tour-btn-pri" onclick="window.tourNext()">
          ${tourStep < steps.length - 1
            ? (lang === 'en' ? 'Next →' : 'Tiếp →')
            : (lang === 'en' ? 'Done ✓' : 'Xong ✓')}
        </button>
      </div>
    `;
    document.body.appendChild(tip);
    tourEl = tip;

    const rect = target.getBoundingClientRect();
    const margin = 14;
    let left = rect.right + margin;
    let top  = rect.top + rect.height / 2 - 90;
    if (left + 290 > window.innerWidth - 12) left = Math.max(8, rect.left - 290 - margin);
    top = Math.max(8, Math.min(top, window.innerHeight - 230));
    tip.style.left = left + 'px';
    tip.style.top  = top  + 'px';

    // Pulse ring around target
    const pulse = document.createElement('div');
    pulse.id = '__tour_pulse';
    pulse.className = 'tour-pulse';
    const pad = 5;
    Object.assign(pulse.style, {
      left: (rect.left - pad) + 'px', top: (rect.top - pad) + 'px',
      width: (rect.width + pad * 2) + 'px', height: (rect.height + pad * 2) + 'px'
    });
    document.body.appendChild(pulse);

    requestAnimationFrame(() => { requestAnimationFrame(() => tip.classList.add('tour-in')); });
  }

  function closeTourStep() {
    if (tourEl) { tourEl.remove(); tourEl = null; }
    const p = document.getElementById('__tour_pulse');
    if (p) p.remove();
    document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
  }

  function endTour() {
    closeTourStep();
    S.tourDone = true;
    save();
    setTimeout(() => toast(L() === 'en' ? 'Tour complete — enjoy dailynox ✦' : 'Bắt đầu hành trình của bạn ✦'), 200);
  }

  window.tourNext = function() { tourStep++; showTourStep(); };
  window.tourPrev = function() { if (tourStep > 0) { tourStep--; showTourStep(); } };
  window.skipTour  = function() { endTour(); };

  /* ───────────────────────── NAVIGATION ───────────────────────── */
  window.goTo = function (view) {
    const current = document.querySelector('.view.active');
    const target = document.getElementById(view);
    if (!target || target === current) return;

    // Fade out current
    if (current) {
      current.classList.add('view-leaving');
      setTimeout(() => {
        current.classList.remove('active', 'view-leaving');
      }, 160);
    }

    // Fade in new after a tiny gap
    setTimeout(() => {
      target.classList.add('active');
      renderView(view);
    }, current ? 80 : 0);

    document.querySelectorAll('.ni, .mni').forEach(el => {
      el.classList.toggle('active', el.dataset.view === view);
    });
  };
  function renderView(view) {
    if (view === 'dashboard') renderDashboard();
    else if (view === 'week') renderWeek();
    else if (view === 'focus') renderFocusPage();
    else if (view === 'tasks') renderTasks();
    else if (view === 'journal') renderJournal();
    else if (view === 'study') renderStudy();
    else if (view === 'library') renderLibrary();
    else if (view === 'flashcards') renderFlashcards();
    else if (view === 'goals') renderGoals();
    else if (view === 'selfdev') renderSelfdev();
    else if (view === 'analytics') renderAnalytics();
  }
  function renderAll() {
    const u = S.user;
    document.getElementById('u-name').textContent = u.name || '—';
    document.getElementById('av-ring').textContent = (u.name || '?').trim().charAt(0).toUpperCase();
    document.getElementById('u-streak').textContent = (L() === 'en' ? 'Streak ' : 'Chuỗi ') + overallStreak() + (L() === 'en' ? ' days' : ' ngày');
    document.getElementById('taskBadge').textContent = S.tasks.filter(t => !t.done).length;
    const activeView = document.querySelector('.view.active');
    renderView(activeView ? activeView.id : 'dashboard');
  }

  /* ───────────────────────── METRICS HELPERS ───────────────────────── */
  function activityScore(dateStr_) {
    let score = 0;
    score += S.tasks.filter(t => t.done && t.date === dateStr_).length * 2;
    score += Math.round((S.focusSessions.filter(f => f.date === dateStr_).reduce((a, b) => a + b.minutes, 0)) / 15);
    score += (S.journal.pmn[dateStr_] || S.journal.free[dateStr_]) ? 2 : 0;
    score += Math.round((S.study.filter(s => s.date === dateStr_).reduce((a, b) => a + (+b.minutes || 0), 0)) / 30);
    return score;
  }
  function overallStreak() {
    let streak = 0; let d = todayStr();
    while (activityScore(d) > 0) { streak++; d = addDays(d, -1); }
    return streak;
  }
  function focusMinutesOn(d) { return S.focusSessions.filter(f => f.date === d).reduce((a, b) => a + b.minutes, 0); }
  function habitStreak() {
    // overall habit consistency streak based on habits days array (rolling week) - simplistic
    return overallStreak();
  }

  /* ───────────────────────── DASHBOARD ───────────────────────── */
  function greeting() {
    const h = new Date().getHours();
    const lang = L();
    if (lang === 'en') return h < 12 ? 'Good morning' : (h < 18 ? 'Good afternoon' : 'Good evening');
    return h < 12 ? 'Chào buổi sáng' : (h < 18 ? 'Chào buổi chiều' : 'Chào buổi tối');
  }
  function renderDashboard() {
    const t = todayStr();
    document.getElementById('greet-msg').textContent = greeting() + (S.user.name ? ', ' + S.user.name : '') + '!';
    const todayTasks = S.tasks.filter(x => x.date === t);
    document.getElementById('dash-sub').textContent = (L() === 'en'
      ? `You have ${todayTasks.filter(x => !x.done).length} tasks today`
      : `Hôm nay bạn có ${todayTasks.filter(x => !x.done).length} nhiệm vụ`);

    // flow banner
    document.getElementById('flowBanner').style.display = S.flowEligible ? 'flex' : 'none';

    // stats
    const focusMin = focusMinutesOn(t);
    document.getElementById('ds-focus').innerHTML = (focusMin / 60).toFixed(1) + '<span style="font-size:14px">h</span>';
    const bars = document.getElementById('focus-bars');
    bars.innerHTML = '';
    const last7 = lastNDates(7);
    const maxMin = Math.max(60, ...last7.map(focusMinutesOn));
    last7.forEach(d => {
      const h = Math.max(4, Math.round(focusMinutesOn(d) / maxMin * 44));
      bars.insertAdjacentHTML('beforeend', `<div class="mb${d === t ? ' hi' : ''}" style="height:${h}px"></div>`);
    });

    const streak = overallStreak();
    document.getElementById('ds-streak').innerHTML = streak + '<span style="font-size:14px"> ' + (L() === 'en' ? 'days' : 'ngày') + '</span>';
    document.getElementById('ds-streak-sub').textContent = L() === 'en' ? 'Keep it going!' : 'Tiếp tục duy trì!';
    const dots = document.getElementById('ds-streak-dots'); dots.innerHTML = '';
    last7.forEach(d => {
      const cls = d === t ? 'td' : (activityScore(d) > 0 ? 'on' : '');
      dots.insertAdjacentHTML('beforeend', `<div class="sd ${cls}"></div>`);
    });

    const mainGoal = S.goals[0];
    if (mainGoal) {
      document.getElementById('ds-goal-pct').innerHTML = mainGoal.progress + '<span style="font-size:14px">%</span>';
      document.getElementById('ds-goal-name').textContent = mainGoal.title;
      document.getElementById('ds-goal-bar').style.width = mainGoal.progress + '%';
    } else {
      document.getElementById('ds-goal-pct').innerHTML = '0<span style="font-size:14px">%</span>';
      document.getElementById('ds-goal-name').textContent = L() === 'en' ? 'No goal yet' : 'Chưa có mục tiêu';
      document.getElementById('ds-goal-bar').style.width = '0%';
    }

    const dueCards = S.flashcards.cards.filter(c => c.due <= t).length;
    const reviewedToday = (S.flashcards.history || []).filter(h => h.date === t).length;
    document.getElementById('ds-fc').innerHTML = dueCards + '<span style="font-size:14px"> ' + (L() === 'en' ? 'cards' : 'thẻ') + '</span>';
    document.getElementById('ds-fc-sub').textContent = L() === 'en' ? `${reviewedToday} reviewed today` : `${reviewedToday} đã ôn hôm nay`;
    document.getElementById('ds-fc-bar').style.width = Math.min(100, dueCards ? (reviewedToday / (reviewedToday + dueCards) * 100) : 0) + '%';

    const list = document.getElementById('ds-task-list');
    if (todayTasks.length === 0) {
      list.innerHTML = `<div class="empty-state" id="ds-empty">${L() === 'en' ? 'No tasks yet. Add one now!' : 'Chưa có nhiệm vụ nào. Thêm ngay!'}</div>`;
    } else {
      list.innerHTML = todayTasks.slice(0, 6).map(taskRowHTML).join('');
    }

    const yest = addDays(t, -1);
    const jp = document.getElementById('ds-journal-preview');
    const pmn = S.journal.pmn[yest];
    if (pmn && (pmn.pl.length || pmn.mi.length || pmn.nx.length)) {
      jp.innerHTML = `<div class="ssub">${(pmn.pl[0] || pmn.nx[0] || pmn.mi[0] || '')}</div>`;
    } else {
      jp.innerHTML = `<div class="empty-state" id="ds-j-empty">${L() === 'en' ? 'No journal yet. ' : 'Chưa có nhật ký. '}<span style="cursor:pointer;color:var(--am)" onclick="goTo('journal')">${L() === 'en' ? 'Write now' : 'Viết ngay'}</span></div>`;
    }
  }
  function taskRowHTML(tk) {
    const lbl = S.labels.find(l => tk.labels && tk.labels.includes(l.id));
    return `<div class="ti">
    <div class="tck${tk.done ? ' done' : ''}" onclick="toggleTaskDone('${tk.id}')"></div>
    <div class="tbody">
      <div class="ttxt${tk.done ? ' done' : ''}">${esc(tk.title)}</div>
      <div class="tmr">${lbl ? `<span class="ttag" style="background:${lbl.color}22;color:${lbl.color}">${esc(L() === 'en' ? lbl.en : lbl.vi)}</span>` : ''}${tk.due ? `<span class="ttime">${esc(tk.due)}</span>` : ''}</div>
    </div>
  </div>`;
  }
  window.toggleTaskDone = function (id) {
    const tk = S.tasks.find(x => x.id === id);
    if (!tk) return;
    tk.done = !tk.done;
    save();
    renderAll();
  };
  function esc(s) { return (s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

  /* ───────────────────────── SETTINGS PANEL ───────────────────────── */
  window.openSettings = function () {
    document.getElementById('settingsOv').classList.add('active');
    renderSettings();
  };
  window.closeSettings = function () { document.getElementById('settingsOv').classList.remove('active'); };
  function renderSettings() {
    document.getElementById('sp-name-input').value = S.user.name;
    document.getElementById('sp-gg-sub').textContent = S.user.google ? S.user.google : (L() === 'en' ? 'Not signed in' : 'Chưa đăng nhập');
    document.getElementById('sp-gg-btn').textContent = S.user.google ? (L() === 'en' ? 'Linked' : 'Đã liên kết') : (L() === 'en' ? 'Sign in' : 'Đăng nhập');
    document.getElementById('sp-notif-chk').checked = S.user.notif;
    setActiveData('stheme', S.user.theme);
    setActiveData('slang', S.user.lang);
    setActiveData('fsize', S.user.fsize);
    setActiveData('spomo', String(S.user.pomo));
    setActiveData('sbreak', String(S.user.breakMin));
  }
  function setActiveData(prefix, val) {
    document.querySelectorAll('[data-' + prefix + ']').forEach(el => {
      el.classList.toggle('active', el.dataset[prefix] === val);
    });
  }
  window.saveName = function () {
    S.user.name = document.getElementById('sp-name-input').value.trim() || S.user.name;
    save(); renderAll();
  };
  window.saveSettings = function () {
    S.user.notif = document.getElementById('sp-notif-chk').checked;
    save();
  };
  window.exportData = function () {
    const lang = L();
    const choice = window.prompt(lang === 'en' ? 'Export as: json / csv / md' : 'Xuất dạng: json / csv / md', 'json');
    if (!choice) return;
    let content, filename, mime;
    if (choice.toLowerCase() === 'csv') {
      const rows = [['title', 'done', 'date', 'due', 'priority']];
      S.tasks.forEach(t => rows.push([t.title, t.done, t.date || '', t.due || '', t.pri || '']));
      content = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
      filename = 'dailynox-export.csv'; mime = 'text/csv';
    } else if (choice.toLowerCase() === 'md') {
      let md = `# Dailynox Export\n\n## Tasks\n`;
      S.tasks.forEach(t => md += `- [${t.done ? 'x' : ' '}] ${t.title} ${t.due ? '(' + t.due + ')' : ''}\n`);
      md += `\n## Goals\n`;
      S.goals.forEach(g => md += `- ${g.title}: ${g.progress}%\n`);
      content = md; filename = 'dailynox-export.md'; mime = 'text/markdown';
    } else {
      content = JSON.stringify(S, null, 2); filename = 'dailynox-export.json'; mime = 'application/json';
    }
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  };
  window.resetApp = function () {
    const lang = L();
    if (!window.confirm(lang === 'en' ? 'This will erase all your data. Continue?' : 'Hành động này sẽ xoá toàn bộ dữ liệu. Tiếp tục?')) return;
    localStorage.removeItem(LS_KEY);
    location.reload();
  };

  /* ───────────────────────── QUICK ADD MODAL ───────────────────────── */
  window.openQuickAdd = function () {
    document.getElementById('quickAddOv').classList.add('active');
    const lblWrap = document.getElementById('qaLabels');
    lblWrap.innerHTML = S.labels.map(l => `<span class="lchip" data-lbl="${l.id}" onclick="this.classList.toggle('active')" style="border-color:${l.color}66;color:${l.color}"><span class="ld" style="background:${l.color}"></span>${esc(L() === 'en' ? l.en : l.vi)}</span>`).join('');
    document.getElementById('qa-input').value = '';
    document.getElementById('qa-due').value = '';
    setTimeout(() => document.getElementById('qa-input').focus(), 50);
  };
  window.closeQuickAdd = function () { document.getElementById('quickAddOv').classList.remove('active'); };
  window.saveQuickAdd = function () {
    const title = document.getElementById('qa-input').value.trim();
    if (!title) return;
    const pri = document.getElementById('qa-pri').value;
    const due = document.getElementById('qa-due').value.trim();
    const labels = Array.from(document.querySelectorAll('#qaLabels .lchip.active')).map(x => x.dataset.lbl);
    const t = todayStr();
    S.tasks.push({ id: uid(), title, note: '', labels, pri, due, date: t, day: dayIndexMon0(t), repeat: 'none', subtasks: [], done: false });
    save(); closeQuickAdd(); renderAll();
  };

  /* ───────────────────────── TASKS ───────────────────────── */
  let draftSubtasks = [];
  let editingTaskId = null;
  function initTaskUIDefaults() { renderLabelFiltersAndForm(); }
  window.togTF = function () {
    const f = document.getElementById('tForm');
    const showing = f.style.display !== 'none';
    if (showing) { f.style.display = 'none'; editingTaskId = null; }
    else {
      editingTaskId = null;
      document.getElementById('nTitle').value = '';
      document.getElementById('nNote').value = '';
      document.getElementById('nPri').value = 'med';
      document.getElementById('nDue').value = '';
      document.getElementById('nRep').value = 'none';
      document.getElementById('nDate').value = '';
      draftSubtasks = [];
      renderDraftSubtasks();
      renderFormLabels([]);
      f.style.display = '';
    }
  };
  function renderFormLabels(selected) {
    document.getElementById('frmLbls').innerHTML = S.labels.map(l =>
      `<span class="lchip${selected.includes(l.id) ? ' active' : ''}" data-lbl="${l.id}" onclick="this.classList.toggle('active')" style="border-color:${l.color}66;color:${l.color}"><span class="ld" style="background:${l.color}"></span>${esc(L() === 'en' ? l.en : l.vi)}</span>`).join('');
  }
  window.addDS = function () {
    const inp = document.getElementById('nSubIn');
    const v = inp.value.trim();
    if (!v) return;
    draftSubtasks.push({ text: v, done: false });
    inp.value = '';
    renderDraftSubtasks();
  };
  function renderDraftSubtasks() {
    document.getElementById('dSubs').innerHTML = draftSubtasks.map((s, i) =>
      `<div class="subr"><span>${esc(s.text)}</span><span style="cursor:pointer;color:var(--ink4)" onclick="removeDS(${i})">✕</span></div>`).join('');
  }
  window.removeDS = function (i) { draftSubtasks.splice(i, 1); renderDraftSubtasks(); };
  window.saveTask = function () {
    const title = document.getElementById('nTitle').value.trim();
    if (!title) { document.getElementById('nTitle').focus(); return; }
    const labels = Array.from(document.querySelectorAll('#frmLbls .lchip.active')).map(x => x.dataset.lbl);
    const date = document.getElementById('nDate').value || todayStr();
    const data = {
      title,
      note: document.getElementById('nNote').value.trim(),
      labels,
      pri: document.getElementById('nPri').value,
      due: document.getElementById('nDue').value.trim(),
      repeat: document.getElementById('nRep').value,
      date,
      day: dayIndexMon0(date),
      subtasks: draftSubtasks.slice()
    };
    if (editingTaskId) {
      const tk = S.tasks.find(x => x.id === editingTaskId);
      Object.assign(tk, data);
    } else {
      S.tasks.push({ id: uid(), done: false, ...data });
    }
    save();
    document.getElementById('tForm').style.display = 'none';
    editingTaskId = null;
    renderAll();
  };
  window.editTask = function (id) {
    const tk = S.tasks.find(x => x.id === id);
    if (!tk) return;
    editingTaskId = id;
    document.getElementById('tForm').style.display = '';
    document.getElementById('nTitle').value = tk.title;
    document.getElementById('nNote').value = tk.note || '';
    document.getElementById('nPri').value = tk.pri || 'med';
    document.getElementById('nDue').value = tk.due || '';
    document.getElementById('nRep').value = tk.repeat || 'none';
    document.getElementById('nDate').value = tk.date || '';
    draftSubtasks = (tk.subtasks || []).slice();
    renderDraftSubtasks();
    renderFormLabels(tk.labels || []);
  };
  window.deleteTask = function (id) {
    S.tasks = S.tasks.filter(x => x.id !== id);
    save(); renderAll();
  };
  window.toggleSubtask = function (taskId, idx) {
    const tk = S.tasks.find(x => x.id === taskId);
    if (!tk) return;
    tk.subtasks[idx].done = !tk.subtasks[idx].done;
    save(); renderTasks();
  };
  window.toggleSubl = function (id) {
    const el = document.getElementById('subl-' + id);
    if (el) el.classList.toggle('open');
  };
  window.togLM = function () {
    const el = document.getElementById('lblMgr');
    el.style.display = el.style.display === 'none' ? '' : 'none';
    renderLabelManager();
  };
  function renderLabelManager() {
    document.getElementById('lblMgrList').innerHTML = S.labels.map(l =>
      `<span class="lchip active" style="border-color:${l.color}66;color:${l.color}"><span class="ld" style="background:${l.color}"></span>${esc(L() === 'en' ? l.en : l.vi)}<span style="cursor:pointer;margin-left:4px" onclick="deleteLabel('${l.id}')">✕</span></span>`).join('');
    const sw = document.getElementById('swRow');
    if (sw && !sw.dataset.built) {
      sw.innerHTML = LABEL_COLORS.map((c, i) => `<div class="sw2${i === 0 ? ' sel' : ''}" style="background:${c}" data-c="${c}" onclick="document.querySelectorAll('.sw2').forEach(x=>x.classList.remove('sel'));this.classList.add('sel')"></div>`).join('');
      sw.dataset.built = '1';
    }
  }
  window.deleteLabel = function (id) {
    S.labels = S.labels.filter(x => x.id !== id);
    S.tasks.forEach(t => t.labels = (t.labels || []).filter(x => x !== id));
    save(); renderLabelManager(); renderTasks();
  };
  window.addLabel = function () {
    const inp = document.getElementById('newLblName');
    const name = inp.value.trim();
    if (!name) return;
    const c = document.querySelector('.sw2.sel');
    S.labels.push({ id: uid(), vi: name, en: name, color: c ? c.dataset.c : LABEL_COLORS[0] });
    inp.value = '';
    save(); renderLabelManager(); renderLabelFiltersAndForm();
  };
  function renderLabelFiltersAndForm() {
    const wrap = document.getElementById('lblFilters');
    if (wrap) {
      wrap.innerHTML = S.labels.map(l =>
        `<span class="lchip" data-filter="${l.id}" onclick="this.classList.toggle('active');renderTasks()" style="border-color:${l.color}66;color:${l.color}"><span class="ld" style="background:${l.color}"></span>${esc(L() === 'en' ? l.en : l.vi)}</span>`).join('');
    }
  }
  window.renderTasks = function () {
    const search = (document.getElementById('tSearch').value || '').toLowerCase();
    const activeFilters = Array.from(document.querySelectorAll('#lblFilters .lchip.active')).map(x => x.dataset.filter);
    const sort = document.getElementById('sortSel').value;
    let list = S.tasks.slice();
    if (search) list = list.filter(t => t.title.toLowerCase().includes(search));
    if (activeFilters.length) list = list.filter(t => (t.labels || []).some(l => activeFilters.includes(l)));
    const priOrder = { high: 0, med: 1, low: 2 };
    if (sort === 'priority') list.sort((a, b) => priOrder[a.pri] - priOrder[b.pri]);
    else if (sort === 'due') list.sort((a, b) => (a.due || '99:99').localeCompare(b.due || '99:99'));
    else if (sort === 'az') list.sort((a, b) => a.title.localeCompare(b.title));

    const t = todayStr();
    const todayAll = S.tasks.filter(x => x.date === t);
    const todayDone = todayAll.filter(x => x.done);
    document.getElementById('stToday').textContent = `${todayDone.length}/${todayAll.length}`;
    document.getElementById('stBar').style.width = (todayAll.length ? todayDone.length / todayAll.length * 100 : 0) + '%';

    const weekDates = lastNDates(7);
    const weekAll = S.tasks.filter(x => weekDates.includes(x.date));
    const weekDone = weekAll.filter(x => x.done);
    const weekPct = weekAll.length ? Math.round(weekDone.length / weekAll.length * 100) : 0;
    document.getElementById('stWeek').textContent = weekPct + '%';
    document.getElementById('stWeekSub').textContent = L() === 'en' ? `${weekDone.length}/${weekAll.length} tasks` : `${weekDone.length}/${weekAll.length} nhiệm vụ`;

    const byLabel = document.getElementById('stLabels');
    byLabel.innerHTML = S.labels.map(l => {
      const cnt = S.tasks.filter(t => (t.labels || []).includes(l.id)).length;
      return `<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px"><span style="color:${l.color}">${esc(L() === 'en' ? l.en : l.vi)}</span><span style="color:var(--ink3)">${cnt}</span></div>`;
    }).join('');

    const out = document.getElementById('taskList');
    const empty = document.getElementById('tEmpty');
    if (list.length === 0) { out.innerHTML = ''; empty.style.display = ''; return; }
    empty.style.display = 'none';
    out.innerHTML = list.map(tk => {
      const subDone = (tk.subtasks || []).filter(s => s.done).length;
      const priColor = tk.pri === 'high' ? 'var(--rs)' : tk.pri === 'med' ? 'var(--am)' : 'var(--sg)';
      const lbls = (tk.labels || []).map(id => S.labels.find(l => l.id === id)).filter(Boolean);
      return `<div class="ti">
      <div class="pdot" style="background:${priColor}"></div>
      <div class="tck${tk.done ? ' done' : ''}" onclick="toggleTaskDone('${tk.id}')"></div>
      <div class="tbody">
        <div class="ttxt${tk.done ? ' done' : ''}" style="cursor:pointer" onclick="editTask('${tk.id}')">${esc(tk.title)}</div>
        ${tk.note ? `<div class="ssub">${esc(tk.note)}</div>` : ''}
        <div class="tmr">
          ${lbls.map(l => `<span class="ttag" style="background:${l.color}22;color:${l.color}">${esc(L() === 'en' ? l.en : l.vi)}</span>`).join('')}
          ${tk.repeat && tk.repeat !== 'none' ? `<span class="ttag" style="background:var(--bl-bg);color:var(--bl)">${tk.repeat === 'daily' ? (L() === 'en' ? 'Daily' : 'Hàng ngày') : (L() === 'en' ? 'Weekly' : 'Hàng tuần')}</span>` : ''}
          ${tk.subtasks && tk.subtasks.length ? `<span class="etog" onclick="toggleSubl('${tk.id}')">${subDone}/${tk.subtasks.length}</span>` : ''}
          ${tk.due ? `<span class="ttime">${esc(tk.due)}</span>` : ''}
          <span class="etog" onclick="deleteTask('${tk.id}')">✕</span>
        </div>
        ${tk.subtasks && tk.subtasks.length ? `<div class="subl" id="subl-${tk.id}">${tk.subtasks.map((s, i) => `<div class="subr"><div class="tck${s.done ? ' done' : ''}" style="width:12px;height:12px" onclick="toggleSubtask('${tk.id}',${i})"></div><span class="${s.done ? 'ttxt done' : ''}">${esc(s.text)}</span></div>`).join('')}</div>` : ''}
      </div>
    </div>`;
    }).join('');
  };

  /* ───────────────────────── WEEK BOARD ───────────────────────── */
  let weekOffset = 0;
  function renderWeek() {
    const t = todayStr();
    const startStr = addDays(startOfWeek(t), weekOffset * 7);
    const dn = DAY_NAMES[L()];
    const mn = MONTH_NAMES[L()];
    const startDate = new Date(startStr + 'T00:00:00');
    const endDate = addDays(startStr, 6);
    document.getElementById('week-range').textContent = `${startDate.getDate()} ${mn[startDate.getMonth()]} – ${new Date(endDate + 'T00:00:00').getDate()} ${mn[new Date(endDate + 'T00:00:00').getMonth()]}`;

    const wb = document.getElementById('wb');
    let html = `<div class="wc bl-col" data-day="backlog" ondragover="event.preventDefault();this.classList.add('dov')" ondragleave="this.classList.remove('dov')" ondrop="dropTask(event,'backlog',null)">
    <div class="dh"><div class="dn">${L() === 'en' ? 'BACKLOG' : 'CHƯA SẮP'}</div></div>
    ${S.tasks.filter(x => !x.date).map(weekTaskHTML).join('')}
  </div>`;
    for (let i = 0; i < 7; i++) {
      const dStr = addDays(startStr, i);
      const isToday = dStr === t;
      const dayTasks = S.tasks.filter(x => x.date === dStr);
      html += `<div class="wc${isToday ? ' td-col' : ''}" data-day="${dStr}" ondragover="event.preventDefault();this.classList.add('dov')" ondragleave="this.classList.remove('dov')" ondrop="dropTask(event,'${dStr}',${i})">
      <div class="dh"><div class="dn">${dn[i]}</div><div class="dnum">${new Date(dStr + 'T00:00:00').getDate()}</div></div>
      ${dayTasks.map(weekTaskHTML).join('')}
      <div class="wa-row"><input type="text" id="${isToday ? 'wkIn' : 'wkIn-' + i}" placeholder="${L() === 'en' ? '+ add task' : '+ thêm việc'}" onkeydown="if(event.key==='Enter')addWeekTask('${dStr}',${i},this)"></div>
    </div>`;
    }
    wb.innerHTML = html;
  }
  function weekTaskHTML(tk) {
    const lbl = S.labels.find(l => (tk.labels || []).includes(l.id));
    const dotCls = tk.pri === 'high' ? 'ps' : tk.pri === 'low' ? 'hl' : '';
    return `<div class="wt" draggable="true" ondragstart="dragTask(event,'${tk.id}')">
    <div class="wdot ${dotCls}"></div>
    <div class="wck${tk.done ? ' done' : ''}" onclick="toggleTaskDone('${tk.id}');renderWeek()"></div>
    <div class="wtxt${tk.done ? ' done' : ''}">${esc(tk.title)}</div>
  </div>`;
  }
  window.dragTask = function (ev, id) { ev.dataTransfer.setData('text/plain', id); };
  window.dropTask = function (ev, dateOrBacklog, dayIdx) {
    ev.preventDefault();
    ev.currentTarget.classList.remove('dov');
    const id = ev.dataTransfer.getData('text/plain');
    const tk = S.tasks.find(x => x.id === id);
    if (!tk) return;
    if (dateOrBacklog === 'backlog') { tk.date = ''; tk.day = null; }
    else { tk.date = dateOrBacklog; tk.day = dayIdx; }
    save(); renderWeek(); renderAll();
  };
  window.addWeekTask = function (dStr, dayIdx, input) {
    const v = input.value.trim();
    if (!v) return;
    S.tasks.push({ id: uid(), title: v, note: '', labels: [], pri: 'med', due: '', date: dStr, day: dayIdx, repeat: 'none', subtasks: [], done: false });
    input.value = '';
    save(); renderWeek(); renderAll();
  };

  /* ───────────────────────── FOCUS / POMODORO ───────────────────────── */
  const RING_CIRC = 653.45;
  const FLOW_RING_CIRC = 615.75;
  let timer = {
    phase: 'focus', // focus|break
    remaining: 25 * 60,
    durFocus: 25 * 60,
    durBreak: 5 * 60,
    running: false,
    intervalId: null,
    sessionsToday: 0
  };
  let ambienceCtx = null, ambienceNodes = [];
  function initTimerFromSettings() {
    timer.durFocus = S.user.pomo * 60;
    timer.durBreak = S.user.breakMin * 60;
    if (!timer.running) timer.remaining = timer.phase === 'focus' ? timer.durFocus : timer.durBreak;
  }
  function renderFocusPage() {
    initTimerFromSettings();
    document.getElementById('pomoDur').value = String(S.user.pomo);
    updateTimerDisplay();
    renderFocusTaskList();
    const t = todayStr();
    const todaySessions = S.focusSessions.filter(f => f.date === t && f.completed).length;
    document.getElementById('fs-today').textContent = todaySessions;
    const weekDates = lastNDates(7);
    const weekMin = weekDates.reduce((a, d) => a + focusMinutesOn(d), 0);
    document.getElementById('fs-total').textContent = (weekMin / 60).toFixed(1) + 'h';
    document.getElementById('fs-streak').textContent = overallStreak();
    renderPdots();
    document.getElementById('sessionInfo').textContent = timer.phase === 'focus'
      ? (L() === 'en' ? 'Focus phase' : 'Đang trong phiên tập trung')
      : (L() === 'en' ? 'Break time' : 'Đang nghỉ ngắn');
  }
  function renderFocusTaskList() {
    const wrap = document.getElementById('ftask-list');
    const t = todayStr();
    const list = S.tasks.filter(x => x.date === t && !x.done);
    if (list.length === 0) {
      wrap.innerHTML = `<div class="empty-state" style="font-size:12px">${L() === 'en' ? 'No tasks yet. ' : 'Chưa có nhiệm vụ. '}<span style="color:var(--am);cursor:pointer" onclick="goTo('tasks')">${L() === 'en' ? 'Add a task' : 'Thêm nhiệm vụ'}</span></div>`;
      return;
    }
    wrap.innerHTML = list.map(tk => `<div class="ft${timer.selectedTask === tk.id ? ' sel' : ''}" onclick="selectFocusTask('${tk.id}')"><div class="ftr"></div><span>${esc(tk.title)}</span></div>`).join('');
  }
  window.selectFocusTask = function (id) {
    timer.selectedTask = timer.selectedTask === id ? null : id;
    renderFocusTaskList();
  };
  function renderPdots() {
    const dots = document.getElementById('pdots');
    const completed = S.focusSessions.filter(f => f.date === todayStr() && f.completed).length % 4;
    let html = '';
    for (let i = 0; i < 4; i++) html += `<div class="pd${i < completed ? ' fl' : ''}"></div>`;
    dots.innerHTML = html;
  }
  function updateTimerDisplay() {
    const mm = Math.floor(timer.remaining / 60), ss = timer.remaining % 60;
    const txt = pad(mm) + ':' + pad(ss);
    const lbl = document.getElementById('timerLbl'); if (lbl) lbl.textContent = txt;
    const fwt = document.getElementById('fwTime'); if (fwt) fwt.textContent = txt;
    const total = timer.phase === 'focus' ? timer.durFocus : timer.durBreak;
    const frac = 1 - timer.remaining / total;
    const ring = document.getElementById('ringP'); if (ring) ring.style.strokeDashoffset = RING_CIRC * (1 - frac);
    const fring = document.getElementById('fwRing'); if (fring) fring.style.strokeDashoffset = FLOW_RING_CIRC * (1 - frac);
    const phaseLbl = document.getElementById('phaseLbl');
    if (phaseLbl) phaseLbl.textContent = timer.phase === 'focus' ? (L() === 'en' ? 'focus' : 'tập trung') : (L() === 'en' ? 'break' : 'nghỉ');
    const fwMf = document.getElementById('fwMf'); if (fwMf) fwMf.style.width = (frac * 100) + '%';
    const fwTask = document.getElementById('fwTask');
    if (fwTask) {
      const tk = S.tasks.find(x => x.id === timer.selectedTask);
      fwTask.textContent = tk ? tk.title : '—';
    }
    const fwPomos = document.getElementById('fwPomos'); if (fwPomos) fwPomos.textContent = S.focusSessions.filter(f => f.date === todayStr() && f.completed).length;
    const fwMins = document.getElementById('fwMins'); if (fwMins) fwMins.textContent = Math.round(focusMinutesOn(todayStr()));
    const fwStreak = document.getElementById('fwStreak'); if (fwStreak) fwStreak.textContent = overallStreak();
  }
  window.changePomo = function () {
    const v = +document.getElementById('pomoDur').value;
    S.user.pomo = v; save();
    if (!timer.running && timer.phase === 'focus') { timer.durFocus = v * 60; timer.remaining = v * 60; updateTimerDisplay(); }
  };
  window.toggleTimer = function () {
    timer.running = !timer.running;
    document.getElementById('playBtn').textContent = timer.running ? '❙❙' : '▶';
    if (timer.running) {
      timer.intervalId = setInterval(tick, 1000);
    } else {
      clearInterval(timer.intervalId);
    }
  };
  function tick() {
    timer.remaining--;
    if (timer.remaining <= 0) {
      completePhase();
    } else {
      updateTimerDisplay();
    }
  }
  function completePhase() {
    if (timer.phase === 'focus') {
      S.focusSessions.push({ date: todayStr(), minutes: Math.round(timer.durFocus / 60), completed: true });
      S.consecutiveFocus = (S.consecutiveFocus || 0) + 1;
      if (S.consecutiveFocus >= 2) S.flowEligible = true;
      save();
      timer.phase = 'break';
      timer.remaining = timer.durBreak;
    } else {
      timer.phase = 'focus';
      timer.remaining = timer.durFocus;
    }
    renderPdots();
    updateTimerDisplay();
    renderAll();
  }
  window.resetTimer = function () {
    clearInterval(timer.intervalId);
    timer.running = false;
    document.getElementById('playBtn').textContent = '▶';
    timer.phase = 'focus';
    timer.remaining = timer.durFocus;
    updateTimerDisplay();
  };
  window.skipPhase = function () {
    timer.remaining = 0;
    completePhase();
  };
  window.enterFlow = function () {
    document.getElementById('flowOv').classList.add('active');
    S.flowEligible = false; save(); renderDashboard();
    if (!timer.running) window.toggleTimer();
    updateTimerDisplay();
  };
  window.exitFlow = function () {
    document.getElementById('flowOv').classList.remove('active');
  };
  function setAmbience(name) {
    document.querySelectorAll('#amb-btns .amc').forEach(b => b.classList.toggle('on', b.dataset.amb === name));
    stopAmbience();
    if (name === 'silence') return;
    try {
      ambienceCtx = ambienceCtx || new (window.AudioContext || window.webkitAudioContext)();
      const ctx = ambienceCtx;
      const bufferSize = 2 * ctx.sampleRate;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer; noise.loop = true;
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      const freqMap = { rain: 1200, ocean: 500, forest: 900, cafe: 700, lofi: 300 };
      filter.type = 'lowpass'; filter.frequency.value = freqMap[name] || 800;
      gain.gain.value = 0.05;
      noise.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
      noise.start();
      ambienceNodes = [noise, filter, gain];
    } catch (e) { /* audio unsupported, ignore */ }
  }
  function stopAmbience() {
    ambienceNodes.forEach(n => { try { n.stop && n.stop(); n.disconnect && n.disconnect(); } catch (e) { } });
    ambienceNodes = [];
  }

  /* ───────────────────────── JOURNAL ───────────────────────── */
  function renderJournal() {
    const t = todayStr();
    const mood = S.journal.mood[t] || 3;
    document.querySelectorAll('.mbtn').forEach(b => b.classList.toggle('sel', +b.dataset.m === mood));
    document.getElementById('energySlider').value = S.journal.energy[t] || 7;
    document.getElementById('enVal').textContent = S.journal.energy[t] || 7;
    document.getElementById('fwArea').value = S.journal.free[t] || '';
    const words = (S.journal.free[t] || '').trim().split(/\s+/).filter(Boolean).length;
    document.getElementById('wc').textContent = words + (L() === 'en' ? ' words' : ' từ');
    renderPmn();
  }
  function ensurePmn() {
    const t = todayStr();
    if (!S.journal.pmn[t]) S.journal.pmn[t] = { pl: [], mi: [], nx: [] };
    return S.journal.pmn[t];
  }
  function renderPmn() {
    const p = ensurePmn();
    ['pl', 'mi', 'nx'].forEach(k => {
      document.getElementById(k + 'List').innerHTML = p[k].map((txt, i) =>
        `<div class="pmne"><span>${esc(txt)}</span><span class="pmne-del" onclick="delPmn('${k}',${i})">✕</span></div>`).join('');
    });
  }
  window.addPmn = function (type) {
    const inp = document.getElementById(type + 'In');
    const v = inp.value.trim();
    if (!v) return;
    const p = ensurePmn();
    p[type].push(v);
    inp.value = '';
    save(); renderPmn();
  };
  window.delPmn = function (type, idx) {
    const p = ensurePmn();
    p[type].splice(idx, 1);
    save(); renderPmn();
  };
  function renderReflective() {
    const qs = REFLECT_Q[L()];
    const t = todayStr();
    if (!S.journal.ref[t]) S.journal.ref[t] = {};
    document.getElementById('refQs').innerHTML = qs.map((q, i) =>
      `<div class="ff"><label class="fl">${esc(q)}</label><textarea class="rta" oninput="saveRef(${i},this.value)">${esc(S.journal.ref[t][i] || '')}</textarea></div>`).join('');
  }
  window.saveRef = function (i, val) {
    const t = todayStr();
    if (!S.journal.ref[t]) S.journal.ref[t] = {};
    S.journal.ref[t][i] = val;
    save();
  };
  function renderJournalHistory() {
    const dates = Object.keys(S.journal.pmn).sort().reverse();
    const wrap = document.getElementById('jHist');
    if (dates.length === 0) { wrap.innerHTML = `<div class="empty-state">${L() === 'en' ? 'No history yet' : 'Chưa có lịch sử'}</div>`; return; }
    wrap.innerHTML = dates.map(d => {
      const p = S.journal.pmn[d];
      const mood = S.journal.mood[d];
      return `<div class="se">
      <div class="sm"><div class="sday">${d.slice(8, 10)}</div><div class="smon">${MONTH_NAMES[L()][+d.slice(5, 7) - 1]}</div></div>
      <div style="flex:1">
        ${mood ? `<div class="stl">${MBTN_TXT[L()][mood - 1]}</div>` : ''}
        ${p.pl.length ? `<div class="sno">+ ${esc(p.pl.join('; '))}</div>` : ''}
        ${p.mi.length ? `<div class="sno">– ${esc(p.mi.join('; '))}</div>` : ''}
        ${p.nx.length ? `<div class="sno">→ ${esc(p.nx.join('; '))}</div>` : ''}
      </div>
    </div>`;
    }).join('');
  }
  window.saveJnl = function () {
    save();
    const msg = L() === 'en' ? 'Journal saved for today.' : 'Đã lưu nhật ký hôm nay.';
    toast(msg);
  };

  /* ───────────────────────── STUDY NOTES ───────────────────────── */
  window.togSF = function () {
    const f = document.getElementById('sForm');
    const showing = f.style.display !== 'none';
    if (showing) f.style.display = 'none';
    else {
      document.getElementById('sTopic').value = '';
      document.getElementById('sCont').value = '';
      document.getElementById('sTime').value = '';
      document.getElementById('sTags').value = '';
      f.style.display = '';
    }
  };
  window.saveSt = function () {
    const topic = document.getElementById('sTopic').value.trim();
    if (!topic) return;
    S.study.push({
      id: uid(), topic,
      content: document.getElementById('sCont').value.trim(),
      subject: document.getElementById('sSubj').value,
      minutes: +document.getElementById('sTime').value || 0,
      level: document.getElementById('sLvl').value,
      tags: document.getElementById('sTags').value.trim(),
      date: todayStr()
    });
    save();
    document.getElementById('sForm').style.display = 'none';
    renderStudy(); renderAll();
  };
  function renderStudy() {
    const t = todayStr();
    document.getElementById('stCnt').textContent = S.study.length;
    const todayMin = S.study.filter(s => s.date === t).reduce((a, b) => a + (+b.minutes || 0), 0);
    document.getElementById('studyToday').textContent = (todayMin / 60).toFixed(1) + 'h';
    const weekDates = lastNDates(7);
    const bySubj = {};
    S.study.filter(s => weekDates.includes(s.date)).forEach(s => { bySubj[s.subject] = (bySubj[s.subject] || 0) + (+s.minutes || 0); });
    const top = Object.entries(bySubj).sort((a, b) => b[1] - a[1])[0];
    document.getElementById('topSubject').textContent = top ? top[0] : '—';

    const lvlColor = { 3: 'var(--sg)', 2: 'var(--am)', 1: 'var(--rs)' };
    const list = S.study.slice().sort((a, b) => b.date.localeCompare(a.date));
    const wrap = document.getElementById('stList');
    if (list.length === 0) { wrap.innerHTML = `<div class="empty-state" id="st-empty">${L() === 'en' ? 'No notes yet. Add one now!' : 'Chưa có ghi chép nào. Thêm ngay!'}</div>`; return; }
    wrap.innerHTML = list.map(s => {
      const d = new Date(s.date + 'T00:00:00');
      return `<div class="se">
      <div class="sm"><div class="sday">${pad(d.getDate())}</div><div class="smon">${MONTH_NAMES[L()][d.getMonth()]}</div></div>
      <div style="flex:1">
        <div class="stl">${esc(s.topic)} <span class="pdot" style="display:inline-block;background:${lvlColor[s.level] || 'var(--ink4)'}"></span></div>
        ${s.content ? `<div class="sno">${esc(s.content)}</div>` : ''}
        <div class="stags">${s.subject ? `<span class="stg">${esc(s.subject)}</span>` : ''}${(s.tags || '').split(/\s+/).filter(Boolean).map(tg => `<span class="stg">${esc(tg)}</span>`).join('')}</div>
        <div class="sstr" style="margin-top:6px"><span>${s.minutes || 0} ${L() === 'en' ? 'min' : 'phút'}</span><span style="cursor:pointer" onclick="deleteStudy('${s.id}')">✕</span></div>
      </div>
    </div>`;
    }).join('');
  }
  window.deleteStudy = function (id) { S.study = S.study.filter(x => x.id !== id); save(); renderStudy(); renderAll(); };

  /* ───────────────────────── LIBRARY ───────────────────────── */
  window.swLib = function (tab, el) {
    document.querySelectorAll('.titem').forEach(x => x.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('lb-subjects').style.display = tab === 'subjects' ? '' : 'none';
    document.getElementById('lb-books').style.display = tab === 'books' ? '' : 'none';
    document.getElementById('lb-courses').style.display = tab === 'courses' ? '' : 'none';
  };
  function renderLibrary() {
    document.getElementById('lib-subjects-grid').innerHTML = S.library.subjects.map(s =>
      `<div class="lc" onclick="bumpLibProgress('subjects','${s.id}')"><h4>${esc(s.name)}</h4><p>${s.progress}%</p><div class="lpb"><div class="lpf" style="width:${s.progress}%;background:${s.color}"></div></div></div>`).join('') ||
      `<div class="empty-state">${L() === 'en' ? 'No subjects yet' : 'Chưa có môn học nào'}</div>`;
    document.getElementById('lib-books-list').innerHTML = S.library.books.map(b =>
      `<div class="ri"><div class="bsp" style="background:var(--bl)"></div><div style="flex:1"><h4>${esc(b.title)}</h4><p>${esc(b.author || '')}</p><div class="rpr"><div class="rpt"><div class="rpf" style="width:${b.progress}%"></div></div><span class="rpct">${b.progress}%</span></div></div></div>`).join('') ||
      `<div class="empty-state">${L() === 'en' ? 'No books yet' : 'Chưa có sách nào'}</div>`;
    document.getElementById('lib-courses-grid').innerHTML = S.library.courses.map(c =>
      `<div class="lc" onclick="bumpLibProgress('courses','${c.id}')"><h4>${esc(c.title)}</h4><p>${c.progress}%</p><div class="lpb"><div class="lpf" style="width:${c.progress}%;background:${c.color || 'var(--am)'}"></div></div></div>`).join('') ||
      `<div class="empty-state">${L() === 'en' ? 'No courses yet' : 'Chưa có khóa học nào'}</div>`;
  }
  window.bumpLibProgress = function (kind, id) {
    const item = S.library[kind].find(x => x.id === id);
    if (!item) return;
    item.progress = Math.min(100, item.progress + 5);
    save(); renderLibrary();
  };
  window.openAddLib = function () {
    const lang = L();
    const kind = (document.getElementById('lib-tab-s').classList.contains('active') ? 'subjects' :
      document.getElementById('lib-tab-b').classList.contains('active') ? 'books' : 'courses');
    openModal({
      title: lang === 'en' ? 'Add resource' : 'Thêm tài nguyên',
      fields: [
        { key: 'name', label: kind === 'books' ? (lang === 'en' ? 'Title' : 'Tên sách') : (lang === 'en' ? 'Name' : 'Tên'), type: 'text' },
        ...(kind === 'books' ? [{ key: 'author', label: lang === 'en' ? 'Author' : 'Tác giả', type: 'text' }] : [])
      ],
      onSave: (data) => {
        if (!data.name) return;
        if (kind === 'books') S.library.books.push({ id: uid(), title: data.name, author: data.author || '', progress: 0 });
        else S.library[kind].push({ id: uid(), name: data.name, title: data.name, progress: 0, color: LABEL_COLORS[Math.floor(Math.random() * LABEL_COLORS.length)] });
        save(); renderLibrary();
      }
    });
  };

  /* ───────────────────────── FLASHCARDS ───────────────────────── */
  let fcState = { deckFilter: 'all', queue: [], idx: 0, flipped: false };
  function buildFcQueue() {
    const t = todayStr();
    let cards = S.flashcards.cards.filter(c => c.due <= t);
    if (fcState.deckFilter !== 'all') cards = cards.filter(c => c.deck === fcState.deckFilter);
    fcState.queue = cards;
    fcState.idx = 0; fcState.flipped = false;
  }
  function renderFlashcards() {
    const t = todayStr();
    const due = S.flashcards.cards.filter(c => c.due <= t).length;
    document.getElementById('fc-due').textContent = due;
    const history = S.flashcards.history || [];
    const reviewedToday = history.filter(h => h.date === t).length;
    document.getElementById('fcDn').textContent = reviewedToday;
    const last7 = lastNDates(7);
    const recent = history.filter(h => last7.includes(h.date));
    const goodCount = recent.filter(h => h.rating !== 'ag').length;
    document.getElementById('fc-rate').innerHTML = (recent.length ? Math.round(goodCount / recent.length * 100) : 0) + '<span style="font-size:14px">%</span>';
    document.getElementById('fc-streak').innerHTML = overallStreak() + '<span style="font-size:14px"> ' + (L() === 'en' ? 'days' : 'ngày') + '</span>';

    const tabs = document.getElementById('fc-deck-tabs');
    tabs.innerHTML = `<div class="titem${fcState.deckFilter === 'all' ? ' active' : ''}" onclick="setFcDeck('all',this)">${L() === 'en' ? 'All' : 'Tất cả'}</div>` +
      S.flashcards.decks.map(d => `<div class="titem${fcState.deckFilter === d.id ? ' active' : ''}" onclick="setFcDeck('${d.id}',this)">${esc(d.name)}</div>`).join('');

    buildFcQueue();
    renderFcCard();
  }
  window.setFcDeck = function (id, el) {
    fcState.deckFilter = id;
    document.querySelectorAll('#fc-deck-tabs .titem').forEach(x => x.classList.remove('active'));
    el.classList.add('active');
    buildFcQueue(); renderFcCard();
  };
  function renderFcCard() {
    const card = fcState.queue[fcState.idx];
    const cc = document.getElementById('fcCard');
    cc.classList.remove('fl'); fcState.flipped = false;
    document.getElementById('fcBtns').style.display = 'none';
    document.getElementById('fcHint').style.display = '';
    if (!card) {
      document.getElementById('fcFr').textContent = '—';
      document.getElementById('fcBk').textContent = '—';
      document.getElementById('fcPron').textContent = '';
      document.getElementById('fcEx').textContent = '';
      document.getElementById('fcCnt').textContent = `${L() === 'en' ? 'Card' : 'Thẻ'} 0 / 0`;
      document.getElementById('fcPB').style.width = '0%';
      return;
    }
    document.getElementById('fcFr').textContent = card.front;
    document.getElementById('fcBk').textContent = card.back;
    document.getElementById('fcPron').textContent = card.pron || '';
    document.getElementById('fcEx').textContent = card.example || '';
    document.getElementById('fcCnt').textContent = `${L() === 'en' ? 'Card' : 'Thẻ'} ${fcState.idx + 1} / ${fcState.queue.length}`;
    document.getElementById('fcPB').style.width = ((fcState.idx) / fcState.queue.length * 100) + '%';
  }
  window.flipFC = function () {
    if (!fcState.queue[fcState.idx]) return;
    fcState.flipped = !fcState.flipped;
    document.getElementById('fcCard').classList.toggle('fl', fcState.flipped);
    document.getElementById('fcBtns').style.display = fcState.flipped ? 'flex' : 'none';
    document.getElementById('fcHint').style.display = fcState.flipped ? 'none' : '';
  };
  window.nextFC = function (rating) {
    const card = fcState.queue[fcState.idx];
    if (!card) return;
    applySrs(card, rating);
    S.flashcards.history = S.flashcards.history || [];
    S.flashcards.history.push({ date: todayStr(), cardId: card.id, rating });
    save();
    fcState.idx++;
    if (fcState.idx >= fcState.queue.length) {
      buildFcQueue();
    }
    renderFcCard();
    renderAll();
  };
  function applySrs(card, rating) {
    const t = todayStr();
    if (rating === 'ag') {
      card.reps = 0; card.ef = Math.max(1.3, card.ef - 0.2); card.interval = 0; card.due = addDays(t, 1);
    } else if (rating === 'gd') {
      card.reps++;
      card.interval = card.reps === 1 ? 1 : (card.reps === 2 ? 3 : Math.round(card.interval * card.ef));
      card.due = addDays(t, card.interval);
    } else {
      card.reps++;
      card.interval = card.reps === 1 ? 3 : Math.round((card.interval || 1) * card.ef * 1.3);
      card.ef = Math.min(3, card.ef + 0.15);
      card.due = addDays(t, card.interval);
    }
  }
  window.openAddFC = function () {
    const lang = L();
    openModal({
      title: lang === 'en' ? 'Add card' : 'Thêm thẻ',
      fields: [
        { key: 'deck', label: lang === 'en' ? 'Deck' : 'Bộ thẻ', type: 'text', placeholder: lang === 'en' ? 'e.g. English' : 'VD: Tiếng Anh' },
        { key: 'front', label: lang === 'en' ? 'Term' : 'Từ / Khái niệm', type: 'text' },
        { key: 'back', label: lang === 'en' ? 'Meaning' : 'Nghĩa', type: 'text' },
        { key: 'example', label: lang === 'en' ? 'Example (optional)' : 'Ví dụ (tùy chọn)', type: 'text' }
      ],
      onSave: (data) => {
        if (!data.front || !data.back) return;
        let deck = S.flashcards.decks.find(d => d.name.toLowerCase() === (data.deck || '').toLowerCase());
        if (!deck && data.deck) { deck = { id: uid(), name: data.deck }; S.flashcards.decks.push(deck); }
        if (!deck) deck = S.flashcards.decks[0] || (() => { const d = { id: uid(), name: lang === 'en' ? 'General' : 'Chung' }; S.flashcards.decks.push(d); return d; })();
        S.flashcards.cards.push({ id: uid(), deck: deck.id, front: data.front, back: data.back, pron: '', example: data.example || '', interval: 0, reps: 0, ef: 2.5, due: todayStr() });
        save(); renderFlashcards();
      }
    });
  };

  /* ───────────────────────── GOALS ───────────────────────── */
  function renderGoals() {
    document.getElementById('goals-sub').textContent = L() === 'en'
      ? `Tracking ${S.goals.length} active goals` : `Đang theo dõi ${S.goals.length} mục tiêu`;
    const grid = document.getElementById('goals-grid');
    if (S.goals.length === 0) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">${L() === 'en' ? 'No goals yet. Add one now!' : 'Chưa có mục tiêu nào. Thêm ngay!'}</div>`;
    } else {
      grid.innerHTML = S.goals.map(g => `<div class="card">
      <div class="gh"><div class="ctitle" style="text-transform:none;font-size:14px;color:var(--ink)">${esc(g.title)}</div><div class="gpct">${g.progress}%</div></div>
      <div class="pt"><div class="pf" style="width:${g.progress}%"></div></div>
      <div class="ms-row">${(g.milestones || []).map((m, i) => `<div class="ms${m.done ? ' done' : ''}" style="cursor:pointer" onclick="toggleMilestone('${g.id}',${i})">${esc(m.text)}</div>`).join('')}</div>
      <div style="margin-top:10px;text-align:right"><span class="etog" onclick="deleteGoal('${g.id}')">✕</span></div>
    </div>`).join('');
    }
    const ht = document.getElementById('habit-tracker');
    const dn = DAY_NAMES[L()];
    ht.innerHTML = S.habits.map(h => `<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--line2)">
    <div style="flex:1;font-size:13px">${esc(h.name)}</div>
    <div style="display:flex;gap:5px">${h.days.map((on, i) => `<div class="sd${on ? ' on' : ''}" style="width:22px;height:22px;flex:none;cursor:pointer" title="${dn[i]}" onclick="toggleHabitDay('${h.id}',${i})"></div>`).join('')}</div>
  </div>`).join('') || `<div class="empty-state">${L() === 'en' ? 'No habits yet' : 'Chưa có thói quen'}</div>`;
  }
  window.toggleMilestone = function (goalId, idx) {
    const g = S.goals.find(x => x.id === goalId);
    if (!g) return;
    g.milestones[idx].done = !g.milestones[idx].done;
    const total = g.milestones.length, done = g.milestones.filter(m => m.done).length;
    if (total) g.progress = Math.round(done / total * 100);
    save(); renderGoals(); renderAll();
  };
  window.deleteGoal = function (id) { S.goals = S.goals.filter(x => x.id !== id); save(); renderGoals(); renderAll(); };
  window.toggleHabitDay = function (habitId, idx) {
    const h = S.habits.find(x => x.id === habitId);
    if (!h) return;
    h.days[idx] = !h.days[idx];
    save(); renderGoals();
  };
  window.openAddGoal = function () {
    const lang = L();
    openModal({
      title: lang === 'en' ? 'New goal' : 'Mục tiêu mới',
      fields: [
        { key: 'title', label: lang === 'en' ? 'Goal title' : 'Tên mục tiêu', type: 'text' },
        { key: 'm1', label: lang === 'en' ? 'Milestone 1 (optional)' : 'Cột mốc 1 (tùy chọn)', type: 'text' },
        { key: 'm2', label: lang === 'en' ? 'Milestone 2 (optional)' : 'Cột mốc 2 (tùy chọn)', type: 'text' }
      ],
      onSave: (data) => {
        if (!data.title) return;
        const milestones = [];
        if (data.m1) milestones.push({ text: data.m1, done: false });
        if (data.m2) milestones.push({ text: data.m2, done: false });
        S.goals.push({ id: uid(), title: data.title, desc: '', target: 100, progress: 0, category: 'general', milestones });
        save(); renderGoals(); renderAll();
      }
    });
  };

  /* ───────────────────────── SELFDEV ───────────────────────── */
  function renderSelfdev() {
    const lang = L();
    document.getElementById('sd-cards').innerHTML = SELFDEV_CARDS.map(c =>
      `<div class="sdd" onclick="toast('${esc(c[lang === 'en' ? 'en' : 'vi'][1])}')"><h4 style="font-size:14px;margin-bottom:6px">${esc(c[lang === 'en' ? 'en' : 'vi'][0])}</h4><p style="font-size:12px;color:var(--ink3)">${esc(c[lang === 'en' ? 'en' : 'vi'][1])}</p></div>`).join('');
    const days = [];
    for (let i = 27; i >= 0; i--) days.push(addDays(todayStr(), -i));
    document.getElementById('heatmap').innerHTML = days.map(d => {
      const score = activityScore(d);
      const lvl = score <= 0 ? '' : score < 2 ? 'l1' : score < 4 ? 'l2' : score < 6 ? 'l3' : 'l4';
      return `<div class="hc ${lvl}" title="${d}"></div>`;
    }).join('');
    document.getElementById('sci-methods').innerHTML = SCI_METHODS.map(m =>
      `<div style="padding:10px 0;border-bottom:1px solid var(--line2)"><div style="font-size:13.5px;font-weight:500">${esc(m[lang === 'en' ? 'en' : 'vi'][0])}</div><div style="font-size:12px;color:var(--ink3);margin-top:2px">${esc(m[lang === 'en' ? 'en' : 'vi'][1])}</div></div>`).join('');
  }

  /* ───────────────────────── ANALYTICS ───────────────────────── */
  let anPeriod = 30;
  window.setPeriod = function (days, el) {
    anPeriod = days;
    document.querySelectorAll('#analytics .vh button').forEach(b => b.classList.remove('btn-dk'));
    document.querySelectorAll('#analytics .vh button').forEach(b => b.classList.add('btn-gh'));
    el.classList.remove('btn-gh'); el.classList.add('btn-dk');
    renderAnalytics();
  };
  function renderAnalytics() {
    const dates = lastNDates(anPeriod);
    const prevDates = lastNDates(anPeriod * 2).slice(0, anPeriod);
    const focusMin = dates.reduce((a, d) => a + focusMinutesOn(d), 0);
    document.getElementById('an-focus').innerHTML = (focusMin / 60).toFixed(1) + '<span style="font-size:14px">h</span>';

    const tasksInPeriod = S.tasks.filter(t => dates.includes(t.date));
    const tasksDone = tasksInPeriod.filter(t => t.done);
    const taskPct = tasksInPeriod.length ? Math.round(tasksDone.length / tasksInPeriod.length * 100) : 0;
    document.getElementById('an-tasks').innerHTML = taskPct + '<span style="font-size:14px">%</span>';

    const fcReviewed = (S.flashcards.history || []).filter(h => dates.includes(h.date)).length;
    document.getElementById('an-fc').textContent = fcReviewed;

    const moods = dates.map(d => S.journal.mood[d]).filter(Boolean);
    const avgMood = moods.length ? (moods.reduce((a, b) => a + b, 0) / moods.length) : 0;
    document.getElementById('an-mood').textContent = (avgMood * 2).toFixed(1);

    // focus chart
    const maxMin = Math.max(30, ...dates.map(focusMinutesOn));
    document.getElementById('focus-chart').innerHTML = dates.map(d => {
      const m = focusMinutesOn(d);
      const h = Math.max(3, Math.round(m / maxMin * 86));
      return `<div class="bcb${m === maxMin && m > 0 ? ' hi' : ''}" style="height:${h}px" title="${d}"></div>`;
    }).join('');
    const dn = DAY_NAMES[L()];
    document.getElementById('focus-chart-labels').innerHTML = dates.map(d => `<div class="bcl">${anPeriod <= 7 ? dn[dayIndexMon0(d)] : d.slice(8, 10)}</div>`).join('');

    // mood chart
    document.getElementById('mood-chart').innerHTML = dates.map(d => {
      const m = S.journal.mood[d] || 0;
      const h = Math.max(3, Math.round(m / 5 * 86));
      return `<div class="bcb${m >= 4 ? ' hi' : ''}" style="height:${h}px" title="${d}"></div>`;
    }).join('');
    document.getElementById('an-mood-avg').textContent = (L() === 'en' ? 'Average: ' : 'Trung bình: ') + (avgMood).toFixed(1) + '/5';

    // subject donut
    const bySubj = {};
    S.study.filter(s => dates.includes(s.date)).forEach(s => { bySubj[s.subject] = (bySubj[s.subject] || 0) + (+s.minutes || 0); });
    const entries = Object.entries(bySubj).sort((a, b) => b[1] - a[1]);
    const total = entries.reduce((a, b) => a + b[1], 0);
    let acc = 0; const colors = ['var(--am)', 'var(--sg)', 'var(--bl)', 'var(--rs)', '#8A6DAE', '#3A8C84'];
    const stops = entries.map((e, i) => { const pct = total ? e[1] / total * 100 : 0; const seg = `${colors[i % colors.length]} ${acc}% ${acc + pct}%`; acc += pct; return seg; }).join(', ');
    document.getElementById('subject-donut').innerHTML = `
    <div style="width:100px;height:100px;border-radius:50%;background:${total ? 'conic-gradient(' + stops + ')' : 'var(--line)'};flex-shrink:0"></div>
    <div style="flex:1">${entries.map((e, i) => `<div style="display:flex;align-items:center;gap:6px;font-size:12px;margin-bottom:4px"><span style="width:8px;height:8px;border-radius:50%;background:${colors[i % colors.length]}"></span>${esc(e[0])}<span style="color:var(--ink3);margin-left:auto">${Math.round(e[1] / 60 * 10) / 10}h</span></div>`).join('') || `<div class="empty-state">${L() === 'en' ? 'No data yet' : 'Chưa có dữ liệu'}</div>`}</div>`;

    document.getElementById('an-completion').innerHTML = taskPct + '<span style="font-size:16px">%</span>';
    document.getElementById('an-comp-bar').style.width = taskPct + '%';
    document.getElementById('an-comp-sub').textContent = L() === 'en' ? `${tasksDone.length}/${tasksInPeriod.length} tasks completed` : `${tasksDone.length}/${tasksInPeriod.length} nhiệm vụ hoàn thành`;
    const prevTasks = S.tasks.filter(t => prevDates.includes(t.date));
    const prevPct = prevTasks.length ? Math.round(prevTasks.filter(t => t.done).length / prevTasks.length * 100) : 0;
    const diff = taskPct - prevPct;
    document.getElementById('an-comp-trend').textContent = (diff >= 0 ? '+' : '') + diff + '% ' + (L() === 'en' ? 'vs previous period' : 'so với kỳ trước');
  }

  /* ───────────────────────── GENERIC MODAL HELPER ───────────────────────── */
  function openModal({ title, fields, onSave }) {
    const ov = document.createElement('div');
    ov.className = 'modal-overlay active';
    ov.onclick = (e) => { if (e.target === ov) ov.remove(); };
    ov.innerHTML = `<div class="quick-add-modal">
    <div class="qa-title">${esc(title)}</div>
    ${fields.map(f => `<div class="ff"><label class="fl">${esc(f.label)}</label><input class="sp-input" style="width:100%" type="text" data-key="${f.key}" placeholder="${esc(f.placeholder || '')}"></div>`).join('')}
    <div class="fa">
      <button class="btn btn-gh btn-sm" data-act="cancel">${L() === 'en' ? 'Cancel' : 'Hủy'}</button>
      <button class="btn btn-dk btn-sm" data-act="save">${L() === 'en' ? 'Save' : 'Lưu'}</button>
    </div>
  </div>`;
    document.body.appendChild(ov);
    ov.querySelector('[data-act="cancel"]').onclick = () => ov.remove();
    ov.querySelector('[data-act="save"]').onclick = () => {
      const data = {};
      fields.forEach(f => { data[f.key] = ov.querySelector(`[data-key="${f.key}"]`).value.trim(); });
      onSave(data);
      ov.remove();
    };
    const firstInput = ov.querySelector('input');
    if (firstInput) setTimeout(() => firstInput.focus(), 50);
  }

  /* ───────────────────────── TOAST ───────────────────────── */
  let toastTimer = null;
  window.toast = function (msg) {
    let el = document.getElementById('__toast');
    if (!el) {
      el = document.createElement('div');
      el.id = '__toast';
      el.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--ink);color:var(--bg);padding:10px 18px;border-radius:99px;font-size:13px;z-index:2000;opacity:0;transition:opacity .25s;max-width:80vw;text-align:center';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.style.opacity = '1';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.style.opacity = '0'; }, 2200);
  };

})();