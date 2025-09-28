import { UiController } from "./ui.js";
import { StorageController } from "./storage.js";
import { StatsController } from "./stats.js";

class QuizController {
  constructor() {
    this.ui = new UiController();
    this.storage = new StorageController();
    this.els = this.ui.els();

    this.currentQuestion = 0;
    this.result = 0;
    this.min = 0;
    this.sec = 0;
    this.questionTimer = null;
    this.questionTimeLeft = 30;
    this.detailedResults = [];
    this.quizInterval = null;
    this.optioncart = false;
    this.currentThemeQuestions = [];

    this.bindDashboardButton();
  }

  bindDashboardButton() {
    const dashboardBtn = this.els.dashboardBtn();
    if (dashboardBtn) {
      dashboardBtn.addEventListener("click", function() {
        var scoresByUser = {};
        for (var i = 0; i < localStorage.length; i++) {
          var key = localStorage.key(i);
          if (!key.startsWith("progress:") && key !== "themes") {
            try {
              var arr = JSON.parse(localStorage.getItem(key));
              if (Array.isArray(arr)) {
                var total = 0;
                arr.forEach(function(r) {
                  if (r.score) total += Number(r.score);
                });
                scoresByUser[key] = total;
              }
            } catch (e) {}
          }
        }
        StatsController.showDashboard({scoresByUser: scoresByUser});
      });
    }
  }

  bindCartSelection() {
    const carts = this.els.carts();
    const startBtn = this.els.startBtn();

    for (let i = 0; i < carts.length; i++) {
      const cart = carts[i];
      cart.addEventListener("click", () => {
        this.optioncart = true;
        const themeKey = cart.dataset.cart + "_basics";
        this.storage.setTheme(themeKey);

        startBtn.style.display = "block";
      });
    }
  }

  init() {
    const nameModal = this.els.nameModal();
    const cartSelection = document.getElementById("cart_selection");
    const startBtn = this.els.startBtn();
    const MyQuiz = this.els.MyQuiz();

    const nextBtn = document.getElementById("next_btn");
    const dashboardBtn = document.getElementById("Dashboard_btn");

    if (nameModal && nameModal.style.display !== "none") {
      if (nextBtn) nextBtn.style.display = "block";
      if (dashboardBtn) dashboardBtn.style.display = "block";
      if (startBtn) startBtn.style.display = "none";
    }

    nextBtn.addEventListener("click", () => {
      const nickname = this.els.nicknameInput().value;
      if (nickname === "") {
        alert("Veuillez entrer votre nom");
        return;
      }
      if (nickname.length < 4) {
        alert("Le nom doit comporter au moins 4 caractères");
        return;
      }
      if (MyQuiz) MyQuiz.style.display = "none";
      if (nameModal) nameModal.style.display = "none";
      if (cartSelection) cartSelection.style.display = "block";
      if (dashboardBtn) dashboardBtn.style.display = "block";
      if (nextBtn) nextBtn.style.display = "none";
      if (startBtn) startBtn.style.display = "block";
    });

    this.bindCartSelection();

    startBtn.addEventListener("click", async () => {

      if (!this.optioncart) {
        alert("Veuillez sélectionner un quiz");
        return;
      }

      const nickname = this.els.nicknameInput().value;
      const themeKey = this.storage.getTheme();
      
      const savedProgress = this.storage.getProgress(nickname, themeKey);
      
      if (savedProgress && savedProgress.lastAnsweredIndex < savedProgress.totalQuestions) {
        const resumeConfirm = confirm(
          "Vous avez un quiz " + themeKey.replace('_basics', '').toUpperCase() + " en cours.\n" +
          "Progression: " + savedProgress.lastAnsweredIndex + "/" + savedProgress.totalQuestions + " questions\n" +
          "Score actuel: " + savedProgress.score + "/" + savedProgress.totalQuestions + "\n\n" +
          "Voulez-vous continuer où vous vous êtes arrêté?\n" +
          "(Cliquez OK pour continuer, Annuler pour recommencer)"
        );
        
        if (resumeConfirm) {
          await this.resumeQuiz(savedProgress, themeKey);
          return;
        } else {
          this.storage.clearProgress(nickname, themeKey);
        }
      }

      await this.loadQuestionsForTheme(themeKey);
      if (!this.currentThemeQuestions || this.currentThemeQuestions.length === 0) {
        alert("Aucune question trouvée pour ce quiz. Veuillez réessayer.");
        return;
      }

      cartSelection.style.display = "none";
      startBtn.style.display = "none";
      this.els.quiz().style.display = "block";

      this.currentQuestion = 0;
      this.result = 0;
      this.detailedResults = [];

      this.quizInterval = setInterval(() => {
        this.sec++;
        if (this.sec === 60) {
          this.sec = 0;
          this.min++;
        }
        this.els.time().textContent = StatsController.formatChrono(this.min, this.sec);
      }, 1000);

      this.showQuestion(this.currentQuestion);
    });
  }

  getCurrentThemeQuestions() {
    return this.currentThemeQuestions || [];
  }

  async loadQuestionsForTheme(themeKey) {
    let path;
    switch (themeKey) {
      case "js_basics":
        path = "data/javascript.json";
        break;
      case "html_basics":
        path = "data/html.json";
        break;
      case "css_basics":
        path = "data/css.json";
        break;
      default:
        this.currentThemeQuestions = [];
        return;
    }
    try {
      const res = await fetch(path, { cache: "no-store" });
      if (!res.ok) {
        this.currentThemeQuestions = [];
        return;
      }
      const data = await res.json();
      this.currentThemeQuestions = Array.isArray(data) ? data : [];
    } catch (e) {
      this.currentThemeQuestions = [];
    }
  }

  saveCurrentProgress(itemQ) {
    try {
      const nickname = (this.els.nicknameInput().value || "").trim();
      const theme = this.storage.getTheme();
      if (!nickname || !theme) return;
      
      const state = {
        lastAnsweredQuestionId: itemQ && itemQ.id != null ? itemQ.id : null,
        lastAnsweredIndex: this.currentQuestion,
        score: this.result,
        min: this.min,
        sec: this.sec,
        totalQuestions: this.getCurrentThemeQuestions().length,
        detailedResults: [...this.detailedResults],  
        updatedAt: new Date().toISOString(),
      };
      this.storage.saveProgress(nickname, theme, state);
    } catch (_) {}
  }

  async resumeQuiz(savedProgress, themeKey) {
    const cartSelection = document.getElementById("cart_selection");
    const startBtn = this.els.startBtn();

    await this.loadQuestionsForTheme(themeKey);
    if (!this.currentThemeQuestions || this.currentThemeQuestions.length === 0) {
      alert("Aucune question trouvée pour ce quiz. Veuillez réessayer.");
      return;
    }

    cartSelection.style.display = "none";
    startBtn.style.display = "none";
    this.els.quiz().style.display = "block";

    this.currentQuestion = savedProgress.lastAnsweredIndex + 1;
    this.result = savedProgress.score || 0;
    this.min = savedProgress.min || 0;
    this.sec = savedProgress.sec || 0;
    this.detailedResults = savedProgress.detailedResults || [];

    this.quizInterval = setInterval(() => {
      this.sec++;
      if (this.sec === 60) {
        this.sec = 0;
        this.min++;
      }
      this.els.time().textContent = StatsController.formatChrono(this.min, this.sec);
    }, 1000);

    if (this.currentQuestion < this.currentThemeQuestions.length) {
      this.showQuestion(this.currentQuestion);
    } else {
      this.showResults();
    }
  }

  showQuestion(index) {
    const dashboardBtn = document.getElementById("Dashboard_btn");
    if (dashboardBtn) dashboardBtn.style.display = "none";

    const container = this.els.quiz();
    this.ui.clearNode(container);

    this.questionTimeLeft = 30;
    clearInterval(this.questionTimer);

    const currentThemeQuestions = this.getCurrentThemeQuestions();
    const itemQ = currentThemeQuestions[index];

    const itemDev = document.createElement("div");
    const itemTitle = document.createElement("p");
    itemTitle.textContent = "Question " + (index + 1) + ": " + itemQ.q;
    itemDev.appendChild(itemTitle);

    const timerDisplay = this.ui.renderTimer(itemDev, this.questionTimeLeft);

    this.questionTimer = setInterval(() => {
      this.questionTimeLeft--;
      this.ui.updateTimer(timerDisplay, this.questionTimeLeft);
      if (this.questionTimeLeft <= 0) {
        clearInterval(this.questionTimer);
        this.skipToNextQuestion(itemDev, itemQ);
      }
    }, 1000);

    if (itemQ.multi) {
      for (let i = 0; i < itemQ.options.length; i++) {
        this.ui.renderMultiOption(itemDev, itemQ.options[i], i);
      }
      const submitBtn = document.createElement("button");
      submitBtn.textContent = "Confirmer";
      submitBtn.addEventListener("click", () => {
        clearInterval(this.questionTimer);
        const checkboxes = itemDev.querySelectorAll('input[type="checkbox"]');
        const selected = [];
        for (let k = 0; k < checkboxes.length; k++) {
          if (checkboxes[k].checked) selected.push(k);
          checkboxes[k].disabled = true;
        }
        if (selected.length === 0) {
          alert("Veuillez sélectionner au moins une réponse!");
          this.questionTimer = setInterval(() => {
            this.questionTimeLeft--;
            this.ui.updateTimer(timerDisplay, this.questionTimeLeft);
            if (this.questionTimeLeft <= 0) {
              clearInterval(this.questionTimer);
              this.skipToNextQuestion(itemDev, itemQ);
            }
          }, 1000);
          return;
        }
        submitBtn.disabled = true;

        const { increment, fullCorrect, partial } = StatsController.scoreMultiple(
          selected,
          itemQ.correct
        );
        this.result += increment;

        for (let k = 0; k < checkboxes.length; k++) {
          const label = checkboxes[k].nextElementSibling;
          if (itemQ.correct.includes(k)) {
            this.ui.styleCorrectOption(label);
          } else if (selected.includes(k)) {
            this.ui.styleWrongOption(label);
          }
        }

        this.detailedResults.push({
          questionId: itemQ.id,
          question: itemQ.q,
          userAnswer: selected.map((idx) => itemQ.options[idx]),
          correctAnswers: itemQ.correct.map((idx) => itemQ.options[idx]),
          isCorrect: fullCorrect,
          questionType: "multiple",
          partialCredit: partial || undefined,
        });

        this.saveCurrentProgress(itemQ);

        setTimeout(() => {
          this.currentQuestion++;
          if (this.currentQuestion < currentThemeQuestions.length) {
            this.showQuestion(this.currentQuestion);
          } else {
            this.showResults();
          }
        }, 2000);
      });
      itemDev.appendChild(submitBtn);
    } else {
      for (let i = 0; i < itemQ.options.length; i++) {
        const option = itemQ.options[i];
        this.ui.renderSingleOption(itemDev, option, (btn) => {
          clearInterval(this.questionTimer);
          itemDev
            .querySelectorAll("button")
            .forEach((b) => (b.disabled = true));

          if (itemQ.correct.includes(i)) {
            btn.style.backgroundColor = "green";
            btn.style.color = "white";
            this.result++;

            this.detailedResults.push({
              questionId: itemQ.id,
              question: itemQ.q,
              userAnswer: [option],
              correctAnswers: itemQ.correct.map((idx) => itemQ.options[idx]),
              isCorrect: true,
              questionType: "single",
            });
          } else {
            btn.style.backgroundColor = "red";
            btn.style.color = "white";

            this.detailedResults.push({
              questionId: itemQ.id,
              question: itemQ.q,
              userAnswer: [option],
              correctAnswers: itemQ.correct.map((idx) => itemQ.options[idx]),
              isCorrect: false,
              questionType: "single",
            });

            const allButtons = itemDev.querySelectorAll("button");
            for (let j = 0; j < allButtons.length; j++) {
              if (itemQ.correct.includes(j)) {
                allButtons[j].style.backgroundColor = "green";
                allButtons[j].style.color = "white";
              }
            }
          }

          this.saveCurrentProgress(itemQ);

          setTimeout(() => {
            this.currentQuestion++;
            if (this.currentQuestion < currentThemeQuestions.length) {
              this.showQuestion(this.currentQuestion);
            } else {
              this.showResults();
            }
          }, 1500);
        });
      }
    }

    container.appendChild(itemDev);
  }

  showResults() {
    const currentThemeQuestions = this.getCurrentThemeQuestions();
    const nickname = this.els.nicknameInput().value;

    const p = StatsController.percentage(this.result, currentThemeQuestions.length);
    const feedback = StatsController.feedbackByPercentage(p);
    const timeFb = StatsController.timeFeedbackByMinutes(this.min);

    const timeEl = this.els.time();

    try {
      const themeKey = this.storage.getTheme();
      this.storage.clearProgress(nickname, themeKey);
    } catch (_) {}

    const quizData = {
      nickname,
      score: this.result.toFixed(1),
      totalQuestions: currentThemeQuestions.length,
      percentage: p,
      time: timeEl.textContent,
      theme: this.storage.getTheme(),
      feedback,
      timeFeedback: timeFb,
      date: new Date().toISOString(),
      detailedResults: this.detailedResults,
    };

    this.storage.saveQuizResult(nickname, quizData);

    this.ui.showResults(quizData, () => {
      this.currentQuestion = 0;
      this.result = 0;
      this.min = 0;
      this.sec = 0;
      this.detailedResults = [];
      this.optioncart = false;

      clearInterval(this.quizInterval);
      clearInterval(this.questionTimer);

      this.els.quiz().style.display = "none";
      const start = this.els.startBtn();
      const cartSelection = document.getElementById("cart_selection");
      const dashboardBtn = document.getElementById("Dashboard_btn");
      const nextBtn = document.getElementById("next_btn");
      if (cartSelection) cartSelection.style.display = "block";
      if (start) start.style.display = "block";
      if (dashboardBtn) dashboardBtn.style.display = "block";
      if (nextBtn) nextBtn.style.display = "none";
      start.hidden = false;
      this.els.nameModal().hidden = false;
      timeEl.hidden = false;
      timeEl.textContent = "";

      const radios = document.querySelectorAll('input[type="radio"]');
      for (let i = 0; i < radios.length; i++) radios[i].checked = false;

      const allCarts = this.els.carts();
      for (let i = 0; i < allCarts.length; i++) {
        allCarts[i].style.borderColor = "";
        allCarts[i].style.boxShadow = "";
        const h3 = allCarts[i].querySelector("h3");
        if (h3) h3.style.color = "";
      }
    });

    clearInterval(this.quizInterval);
    clearInterval(this.questionTimer);
  }

  skipToNextQuestion(itemDev, itemQ) {
    this.detailedResults.push({
      questionId: itemQ.id,
      question: itemQ.q,
      userAnswer: ["Pas de réponse (temps écoulé)"],
      correctAnswers: itemQ.correct.map((idx) => itemQ.options[idx]),
      isCorrect: false,
      questionType: itemQ.multi ? "multiple" : "single",
      timedOut: true,
    });

    this.saveCurrentProgress(itemQ);

    this.ui.showTimeUp(itemDev);

    this.ui.disableAll(itemDev);

    if (itemQ.multi) {
      const checkboxes = itemDev.querySelectorAll('input[type="checkbox"]');
      for (let i = 0; i < checkboxes.length; i++) {
        const label = checkboxes[i].nextElementSibling;
        if (itemQ.correct.includes(i)) {
          this.ui.styleCorrectOption(label);
        }
      }
    } else {
      const buttons = itemDev.querySelectorAll("button");
      for (let i = 0; i < buttons.length; i++) {
        if (itemQ.correct.includes(i)) {
          buttons[i].style.backgroundColor = "green";
          buttons[i].style.color = "white";
        }
      }
    }

    setTimeout(() => {
      const qs = this.getCurrentThemeQuestions();
      this.currentQuestion++;
      if (this.currentQuestion < qs.length) {
        this.showQuestion(this.currentQuestion);
      } else {
        this.showResults();
      }
    }, 2000);
  }
}

export default QuizController;
