import { UIService } from './ui.js';
import { StorageService } from './storage.js';
import { Stats } from './stats.js';

export const themes = {
  "js_basics": [
    {
      id: 1,
      q: "Quels mots-clés peuvent déclarer une variable en JS ?",
      options: ["const", "let", "var", "function"],
      correct: [0,1,2],
      multi: true
    },
    {
      id: 2,
      q: "Quelle est la sortie de : console.log(2 + '2');",
      options: ["4", "'22'", "NaN"],
      correct: [1],
      multi: false
    },
    {
      id: 3,
      q: "Quelle méthode permet d'ajouter un élément à la fin d’un tableau ?",
      options: ["push()", "pop()", "shift()"],
      correct: [0],
      multi: false
    },
    {
      id: 4,
      q: "Quelle(s) valeur(s) est/sont considérée(s) comme falsy en JS ?",
      options: ["0", "''", "null", "undefined", "NaN", "'false'"],
      correct: [0,1,2,3,4],
      multi: true
    },
    {
      id: 5,
      q: "Quel symbole est utilisé pour un commentaire sur une ligne ?",
      options: ["//", "/* */", "#"],
      correct: [0],
      multi: false
    },
    {
      id: 6,
      q: "Quelle(s) boucle(s) peut-on utiliser pour parcourir un tableau ?",
      options: ["for", "for...of", "for...in", "while"],
      correct: [0,1,3],
      multi: true
    },
    {
      id: 7,
      q: "Quelle méthode transforme une chaîne en nombre entier ?",
      options: ["parseInt()", "Number()", "String()"],
      correct: [0,1],
      multi: true
    },
    {
      id: 8,
      q: "Comment accéder au premier élément d’un tableau arr ?",
      options: ["arr[0]", "arr(0)", "arr.first"],
      correct: [0],
      multi: false
    },
    {
      id: 9,
      q: "typeof null retourne quoi ?",
      options: ["'null'", "'object'", "'undefined'"],
      correct: [1],
      multi: false
    },
    {
      id: 10,
      q: "Comment déclarer une fonction ?",
      options: ["function maFonction() {}", "def maFonction() {}", "func maFonction() {}"],
      correct: [0],
      multi: false
    }
  ],

  "html_basics": [
    {
      id: 1,
      q: "Quel tag définit un lien hypertexte ?",
      options: ["<link>", "<a>", "<href>"],
      correct: [1],
      multi: false
    },
    {
      id: 2,
      q: "Quel(s) attribut(s) sont utilisés pour les images ?",
      options: ["src", "alt", "href", "title"],
      correct: [0,1],
      multi: true
    },
    {
      id: 3,
      q: "Quel tag représente un paragraphe ?",
      options: ["<p>", "<div>", "<span>"],
      correct: [0],
      multi: false
    },
    {
      id: 4,
      q: "Quel tag représente un titre principal ?",
      options: ["<h1>", "<h6>", "<header>"],
      correct: [0],
      multi: false
    },
    {
      id: 5,
      q: "Quel(s) tag(s) servent pour les listes ?",
      options: ["<ul>", "<ol>", "<li>", "<dl>"],
      correct: [0,1,2,3],
      multi: true
    },
    {
      id: 6,
      q: "Quel attribut fait ouvrir un lien dans un nouvel onglet ?",
      options: ["target='_blank'", "href='_new'", "rel='noopener'"],
      correct: [0],
      multi: false
    },
    {
      id: 7,
      q: "Comment définir un champ obligatoire dans un formulaire ?",
      options: ["required", "mandatory", "validate"],
      correct: [0],
      multi: false
    },
    {
      id: 8,
      q: "Quel tag HTML définit un bouton ?",
      options: ["<button>", "<input>", "<submit>"],
      correct: [0],
      multi: false
    },
    {
      id: 9,
      q: "Quel tag HTML définit le corps du document ?",
      options: ["<body>", "<html>", "<main>"],
      correct: [0],
      multi: false
    },
    {
      id: 10,
      q: "Quel tag HTML est sémantique pour un pied de page ?",
      options: ["<footer>", "<section>", "<div>"],
      correct: [0],
      multi: false
    }
  ],

  "css_basics": [
    {
      id: 1,
      q: "Quelle propriété change la couleur du texte ?",
      options: ["color", "background-color", "font-size"],
      correct: [0],
      multi: false
    },
    {
      id: 2,
      q: "Quelle propriété change la couleur de fond ?",
      options: ["background-color", "color", "border-color"],
      correct: [0],
      multi: false
    },
    {
      id: 3,
      q: "Quelle(s) propriété(s) gèrent les marges et paddings ?",
      options: ["margin", "padding", "border", "spacing"],
      correct: [0,1],
      multi: true
    },
    {
      id: 4,
      q: "Quelle propriété change la taille de la police ?",
      options: ["font-size", "text-size", "size"],
      correct: [0],
      multi: false
    },
    {
      id: 5,
      q: "Quelle propriété CSS change l’affichage d’un élément ?",
      options: ["display", "position", "float"],
      correct: [0],
      multi: false
    },
    {
      id: 6,
      q: "Quelle propriété CSS fait flotter un élément à gauche ou droite ?",
      options: ["float", "position", "align"],
      correct: [0],
      multi: false
    },
    {
      id: 7,
      q: "Quelle(s) valeur(s) de display permettent de créer un flex container ?",
      options: ["block", "inline-block", "flex", "grid"],
      correct: [2,3],
      multi: true
    },
    {
      id: 8,
      q: "Quelle propriété CSS change la couleur du contour ?",
      options: ["border-color", "color", "outline-color"],
      correct: [0],
      multi: false
    },
    {
      id: 9,
      q: "Quelle propriété CSS change la visibilité d’un élément ?",
      options: ["visibility", "display", "opacity"],
      correct: [0],
      multi: false
    },
    {
      id: 10,
      q: "Quelle propriété CSS permet de centrer un texte ?",
      options: ["text-align", "align-items", "justify-content"],
      correct: [0],
      multi: false
    }
  ]
};

class QuizController {
  constructor() {
    this.ui = new UIService();
    this.storage = new StorageService();
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
  }

  bindCartSelection() {
    const carts = this.els.carts();
    for (let i = 0; i < carts.length; i++) {
      const cart = carts[i];
      cart.addEventListener('click', () => {
        this.optioncart = true;
        const themeKey = cart.dataset.cart + '_basics';
        this.storage.setTheme(themeKey);
      });
    }
  }

  init() {
    this.els.quiz().style.display = 'none';
    const start = this.els.startBtn();
    const nameModal = this.els.nameModal();
    const timeEl = this.els.time();

    this.bindCartSelection();

    start.addEventListener('click', () => {
      const nickname = this.els.nicknameInput().value;

      if (nickname === '') {
        alert('Please enter your name');
        return;
      }
      if (nickname.length < 4) {
        alert('Name must be at least 4 characters long');
        return;
      }
      if (!this.optioncart) {
        alert('Please select your cart');
        return;
      }

      this.els.quiz().style.display = '';
      start.style.display = 'none';

      start.hidden = true;
      nameModal.hidden = true;

      this.currentQuestion = 0;
      this.result = 0;
      this.detailedResults = [];

      timeEl.textContent = `${this.sec}`;

      this.quizInterval = setInterval(() => {
        this.sec++;
        if (this.sec === 60) {
          this.sec = 0; this.min++;
        }
        timeEl.textContent = Stats.formatChrono(this.min, this.sec);
      }, 1000);

      this.showQuestion(this.currentQuestion);
    });
  }

  getCurrentThemeQuestions() {
    const key = this.storage.getTheme();
    return themes[key] || [];
  }

  showQuestion(index) {
    const container = this.els.quiz();
    this.ui.clearNode(container);

    this.questionTimeLeft = 30;
    clearInterval(this.questionTimer);

    const currentThemeQuestions = this.getCurrentThemeQuestions();
    const itemQ = currentThemeQuestions[index];

    const itemDev = document.createElement('div');
    const itemTitle = document.createElement('p');
    itemTitle.textContent = `Question ${index + 1}: ${itemQ.q}`;
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
      const submitBtn = document.createElement('button');
      submitBtn.textContent = 'Confirmer';
      submitBtn.addEventListener('click', () => {
        clearInterval(this.questionTimer);
        const checkboxes = itemDev.querySelectorAll('input[type="checkbox"]');
        const selected = [];
        for (let k = 0; k < checkboxes.length; k++) {
          if (checkboxes[k].checked) selected.push(k);
          checkboxes[k].disabled = true;
        }
        if (selected.length === 0) {
          alert('Veuillez sélectionner au moins une réponse!');
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

        const { increment, fullCorrect, partial } = Stats.scoreMultiple(selected, itemQ.correct);
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
          userAnswer: selected.map(idx => itemQ.options[idx]),
          correctAnswers: itemQ.correct.map(idx => itemQ.options[idx]),
          isCorrect: fullCorrect,
          questionType: 'multiple',
          partialCredit: partial || undefined
        });

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
          itemDev.querySelectorAll('button').forEach(b => b.disabled = true);

          if (itemQ.correct.includes(i)) {
            btn.style.backgroundColor = 'green';
            btn.style.color = 'white';
            this.result++;

            this.detailedResults.push({
              questionId: itemQ.id,
              question: itemQ.q,
              userAnswer: [option],
              correctAnswers: itemQ.correct.map(idx => itemQ.options[idx]),
              isCorrect: true,
              questionType: 'single'
            });
          } else {
            btn.style.backgroundColor = 'red';
            btn.style.color = 'white';

            this.detailedResults.push({
              questionId: itemQ.id,
              question: itemQ.q,
              userAnswer: [option],
              correctAnswers: itemQ.correct.map(idx => itemQ.options[idx]),
              isCorrect: false,
              questionType: 'single'
            });

            const allButtons = itemDev.querySelectorAll('button');
            for (let j = 0; j < allButtons.length; j++) {
              if (itemQ.correct.includes(j)) {
                allButtons[j].style.backgroundColor = 'green';
                allButtons[j].style.color = 'white';
              }
            }
          }

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

    const p = Stats.percentage(this.result, currentThemeQuestions.length);
    const feedback = Stats.feedbackByPercentage(p);
    const timeFb = Stats.timeFeedbackByMinutes(this.min);

    const timeEl = this.els.time();
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
      detailedResults: this.detailedResults
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

      this.els.quiz().style.display = 'none';
      const start = this.els.startBtn();
      start.style.display = '';
      start.hidden = false;
      this.els.nameModal().hidden = false;
      timeEl.hidden = false;
      timeEl.textContent = '';

      const radios = document.querySelectorAll('input[type="radio"]');
      for (let i = 0; i < radios.length; i++) radios[i].checked = false;

      const allCarts = this.els.carts();
      for (let i = 0; i < allCarts.length; i++) {
        allCarts[i].style.borderColor = '';
        allCarts[i].style.boxShadow = '';
        const h3 = allCarts[i].querySelector('h3');
        if (h3) h3.style.color = '';
      }
    });

    clearInterval(this.quizInterval);
    clearInterval(this.questionTimer);
  }

  skipToNextQuestion(itemDev, itemQ) {
    this.detailedResults.push({
      questionId: itemQ.id,
      question: itemQ.q,
      userAnswer: ['Pas de réponse (temps écoulé)'],
      correctAnswers: itemQ.correct.map(idx => itemQ.options[idx]),
      isCorrect: false,
      questionType: itemQ.multi ? 'multiple' : 'single',
      timedOut: true
    });

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
      const buttons = itemDev.querySelectorAll('button');
      for (let i = 0; i < buttons.length; i++) {
        if (itemQ.correct.includes(i)) {
          buttons[i].style.backgroundColor = 'green';
          buttons[i].style.color = 'white';
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

export default new QuizController();
