import { els, clearNode, renderTimer, updateTimer, renderSingleOption, renderMultiOption, disableAll, styleCorrectOption, styleWrongOption, showTimeUp, showResults as uiShowResults } from './ui.js';
import { setTheme, getTheme, saveQuizResult } from './storage.js';
import { percentage, feedbackByPercentage, timeFeedbackByMinutes, formatChrono, scoreMultiple } from './stats.js';
import { generatePDF } from './charts.js';

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

let currentQuestion = 0;
let result = 0; // can be fractional when partial credit
let min = 0;
let sec = 0;
let questionTimer = null;
let questionTimeLeft = 30;
let detailedResults = [];
let quizInterval = null;
let optioncart = false;

export function bindCartSelection() {
  const carts = els.carts();
  for (let i = 0; i < carts.length; i++) {
    const cart = carts[i];
    cart.addEventListener('click', function() {
      optioncart = true;
      const themeKey = cart.dataset.cart + '_basics';
      setTheme(themeKey);
    });
  }
}

export function init() {
  els.quiz().style.display = 'none';
  const start = els.startBtn();
  const nameModal = els.nameModal();
  const timeEl = els.time();

  bindCartSelection();

  start.addEventListener('click', function(){
    const nickname = els.nicknameInput().value;

    if(nickname === ''){
      alert('Please enter your name');
      return;
    }
    if(nickname.length < 4){
      alert('Name must be at least 4 characters long');
      return;
    }
    if(!optioncart){
      alert('Please select your cart');
      return;
    }

    els.quiz().style.display = '';
    start.style.display = 'none';

    start.hidden = true;
    nameModal.hidden = true;

    currentQuestion = 0;
    result = 0;
    detailedResults = [];

    timeEl.textContent = `${sec}`;

    quizInterval = setInterval(function(){
      sec++;
      if(sec === 60){
        sec = 0; min++;
      }
      timeEl.textContent = formatChrono(min, sec);
    }, 1000);

    showQuestion(currentQuestion);
  });
}

function getCurrentThemeQuestions() {
  const key = getTheme();
  return themes[key] || [];
}

function showQuestion(index){
  const container = els.quiz();
  clearNode(container);

  questionTimeLeft = 30;
  clearInterval(questionTimer);

  const currentThemeQuestions = getCurrentThemeQuestions();
  const itemQ = currentThemeQuestions[index];

  const itemDev = document.createElement('div');
  const itemTitle = document.createElement('p');
  itemTitle.textContent = `Question ${index + 1}: ${itemQ.q}`;
  itemDev.appendChild(itemTitle);

  const timerDisplay = renderTimer(itemDev, questionTimeLeft);

  questionTimer = setInterval(function(){
    questionTimeLeft--;
    updateTimer(timerDisplay, questionTimeLeft);
    if(questionTimeLeft <= 0){
      clearInterval(questionTimer);
      skipToNextQuestion(itemDev, itemQ);
    }
  }, 1000);

  if (itemQ.multi) {
    for (let i = 0; i < itemQ.options.length; i++) {
      renderMultiOption(itemDev, itemQ.options[i], i);
    }
    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Confirmer';
    submitBtn.addEventListener('click', function(){
      clearInterval(questionTimer);
      const checkboxes = itemDev.querySelectorAll('input[type="checkbox"]');
      const selected = [];
      for (let k = 0; k < checkboxes.length; k++) {
        if (checkboxes[k].checked) selected.push(k);
        checkboxes[k].disabled = true;
      }
      if (selected.length === 0) {
        alert('Veuillez sélectionner au moins une réponse!');
        questionTimer = setInterval(function(){
          questionTimeLeft--;
          updateTimer(timerDisplay, questionTimeLeft);
          if(questionTimeLeft <= 0){
            clearInterval(questionTimer);
            skipToNextQuestion(itemDev, itemQ);
          }
        }, 1000);
        return;
      }
      submitBtn.disabled = true;

      const { increment, fullCorrect, partial } = scoreMultiple(selected, itemQ.correct);
      result += increment;

      for (let k = 0; k < checkboxes.length; k++) {
        const label = checkboxes[k].nextElementSibling;
        if (itemQ.correct.includes(k)) {
          styleCorrectOption(label);
        } else if (selected.includes(k)) {
          styleWrongOption(label);
        }
      }

      detailedResults.push({
        questionId: itemQ.id,
        question: itemQ.q,
        userAnswer: selected.map(idx => itemQ.options[idx]),
        correctAnswers: itemQ.correct.map(idx => itemQ.options[idx]),
        isCorrect: fullCorrect,
        questionType: 'multiple',
        partialCredit: partial || undefined
      });

      setTimeout(function(){
        currentQuestion++;
        if(currentQuestion < currentThemeQuestions.length){
          showQuestion(currentQuestion);
        } else {
          showResults();
        }
      }, 2000);
    });
    itemDev.appendChild(submitBtn);
  } else {
    for (let i = 0; i < itemQ.options.length; i++) {
      const option = itemQ.options[i];
      renderSingleOption(itemDev, option, (btn) => {
        clearInterval(questionTimer);
        itemDev.querySelectorAll('button').forEach(b => b.disabled = true);

        if(itemQ.correct.includes(i)){
          btn.style.backgroundColor = 'green';
          btn.style.color = 'white';
          result++;

          detailedResults.push({
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

          detailedResults.push({
            questionId: itemQ.id,
            question: itemQ.q,
            userAnswer: [option],
            correctAnswers: itemQ.correct.map(idx => itemQ.options[idx]),
            isCorrect: false,
            questionType: 'single'
          });

          const allButtons = itemDev.querySelectorAll('button');
          for(let j = 0; j < allButtons.length; j++){
            if(itemQ.correct.includes(j)){
              allButtons[j].style.backgroundColor = 'green';
              allButtons[j].style.color = 'white';
            }
          }
        }

        setTimeout(function(){
          currentQuestion++;
          if(currentQuestion < currentThemeQuestions.length){
            showQuestion(currentQuestion);
          } else {
            showResults();
          }
        }, 1500);
      });
    }
  }

  container.appendChild(itemDev);
}

function showResults(){
  const currentThemeQuestions = getCurrentThemeQuestions();
  const nickname = els.nicknameInput().value;

  const p = percentage(result, currentThemeQuestions.length);
  const feedback = feedbackByPercentage(p);
  const timeFb = timeFeedbackByMinutes(min);

  const timeEl = els.time();
  const quizData = {
    nickname,
    score: result.toFixed(1),
    totalQuestions: currentThemeQuestions.length,
    percentage: p,
    time: timeEl.textContent,
    theme: getTheme(),
    feedback,
    timeFeedback: timeFb,
    date: new Date().toISOString(),
    detailedResults
  };

  saveQuizResult(nickname, quizData);

  uiShowResults(quizData, function onRestart(){
    currentQuestion = 0;
    result = 0;
    min = 0;
    sec = 0;
    detailedResults = [];
    optioncart = false;

    clearInterval(quizInterval);
    clearInterval(questionTimer);

    els.quiz().style.display = 'none';
    const start = els.startBtn();
    start.style.display = '';
    start.hidden = false;
    els.nameModal().hidden = false;
    timeEl.hidden = false;
    timeEl.textContent = '';

    const radios = document.querySelectorAll('input[type="radio"]');
    for (let i = 0; i < radios.length; i++) radios[i].checked = false;

    const allCarts = els.carts();
    for (let i = 0; i < allCarts.length; i++) {
      allCarts[i].style.borderColor = '';
      allCarts[i].style.boxShadow = '';
      const h3 = allCarts[i].querySelector('h3');
      if (h3) h3.style.color = '';
    }
  });

  clearInterval(quizInterval);
  clearInterval(questionTimer);
}

function skipToNextQuestion(itemDev, itemQ){
  detailedResults.push({
    questionId: itemQ.id,
    question: itemQ.q,
    userAnswer: ['Pas de réponse (temps écoulé)'],
    correctAnswers: itemQ.correct.map(idx => itemQ.options[idx]),
    isCorrect: false,
    questionType: itemQ.multi ? 'multiple' : 'single',
    timedOut: true
  });

  showTimeUp(itemDev);

  disableAll(itemDev);

  if(itemQ.multi){
    const checkboxes = itemDev.querySelectorAll('input[type="checkbox"]');
    for(let i = 0; i < checkboxes.length; i++){
      const label = checkboxes[i].nextElementSibling;
      if(itemQ.correct.includes(i)){
        styleCorrectOption(label);
      }
    }
  } else {
    const buttons = itemDev.querySelectorAll('button');
    for(let i = 0; i < buttons.length; i++){
      if(itemQ.correct.includes(i)){
        buttons[i].style.backgroundColor = 'green';
        buttons[i].style.color = 'white';
      }
    }
  }

  setTimeout(function(){
    const qs = getCurrentThemeQuestions();
    currentQuestion++;
    if(currentQuestion < qs.length){
      showQuestion(currentQuestion);
    } else {
      showResults();
    }
  }, 2000);
}

export default { init, themes };
