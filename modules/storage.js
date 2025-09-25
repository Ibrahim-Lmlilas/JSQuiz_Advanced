export class StorageService {
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
      const key = `progress:${n}:${t}`;
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
      const key = `progress:${n}:${t}`;
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
      const key = `progress:${n}:${t}`;
      localStorage.removeItem(key);
    } catch (e) {
      console.error("Failed to clear progress", e);
    }
  }
}
