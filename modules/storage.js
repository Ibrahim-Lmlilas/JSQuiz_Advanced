export class StorageController {
  setTheme(themeKey) {
    try {
      localStorage.setItem("themes", themeKey);
    } catch (e) {
      console.error("Failed to save theme to localStorage", e);
    }
  }

  getTheme() {
    try {
      return localStorage.getItem("themes");
    } catch (e) {
      console.error("Failed to read theme from localStorage", e);
      return null;
    }
  }

  saveQuizResult(nickname, quizData) {
    try {
      const key = String(nickname || "").trim();
      if (!key) return;
      const prev = JSON.parse(localStorage.getItem(key)) || [];
      prev.push(quizData);
      localStorage.setItem(key, JSON.stringify(prev));
    } catch (e) {
      console.error("Failed to save quiz result", e);
    }
  }

  getUserResults(nickname) {
    try {
      const key = String(nickname || "").trim();
      if (!key) return [];
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch (e) {
      console.error("Failed to read user results", e);
      return [];
    }
  }

  saveProgress(nickname, theme, state) {
    try {
      const n = String(nickname || "").trim();
      const t = String(theme || "").trim();
      if (!n || !t) return;
      const key = "progress:" + n + ":" + t;
      localStorage.setItem(key, JSON.stringify(state || {}));
    } catch (e) {
      console.error("Failed to save progress", e);
    }
  }

  getProgress(nickname, theme) {
    try {
      const n = String(nickname || "").trim();
      const t = String(theme || "").trim();
      if (!n || !t) return null;
      const key = "progress:" + n + ":" + t;
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error("Failed to read progress", e);
      return null;
    }
  }

  clearProgress(nickname, theme) {
    try {
      const n = String(nickname || "").trim();
      const t = String(theme || "").trim();
      if (!n || !t) return;
      const key = "progress:" + n + ":" + t;
      localStorage.removeItem(key);
    } catch (e) {
      console.error("Failed to clear progress", e);
    }
  }

  /**
   * Export a single quiz result as JSON or CSV and trigger download
   * @param {object} quiz - The quiz result object
   * @param {string} nickname - The user's nickname
   * @param {number} idx - The index of the quiz result
   * @param {string} format - 'json' or 'csv'
   */
  exportQuizResult(quiz, nickname, idx, format = 'json') {
    if (!quiz || !nickname) return;
    let blob, filename;
    if (format === 'json') {
      blob = new Blob([JSON.stringify(quiz, null, 2)], { type: 'application/json' });
      filename = 'quiz-stats-' + nickname + '-' + (idx+1) + '.json';
    } else if (format === 'csv') {
      const headers = Object.keys(quiz);
      const values = headers.map(function(k) {
        var v = quiz[k];
        if (typeof v === 'string') v = v.replace(/"/g, '""');
        return '"' + v + '"';
      });
      const csv = headers.join(",") + "\n" + values.join(",");
      blob = new Blob([csv], { type: 'text/csv' });
      filename = 'quiz-stats-' + nickname + '-' + (idx+1) + '.csv';
    } else {
      return;
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
  }
}
