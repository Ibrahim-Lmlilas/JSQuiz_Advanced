export const els = {
  startBtn: () => document.getElementById('Start_btn'),
  time: () => document.getElementById('time'),
  quiz: () => document.getElementById('quiz_container'),
  nicknameInput: () => document.getElementById('name'),
  carts: () => document.getElementsByClassName('cart'),
  cartSelection: () => document.getElementById('cart_selection'),
  nameModal: () => document.getElementById('name_modal'),
};

export function clearNode(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

export function renderTimer(container, seconds) {
  const el = document.createElement('div');
  el.id = 'question-timer';
  el.textContent = `Temps restant: ${seconds} secondes`;
  container.appendChild(el);
  return el;
}

export function updateTimer(el, seconds) {
  if (el) el.textContent = `Temps restant: ${seconds} secondes`;
}

export function disableAll(node) {
  node.querySelectorAll('button, input').forEach(el => el.disabled = true);
}

export function renderSingleOption(container, label, onClick) {
  const btn = document.createElement('button');
  btn.textContent = label;
  btn.addEventListener('click', () => onClick(btn));
  container.appendChild(btn);
}

export function renderMultiOption(container, label, index) {
  const optionDiv = document.createElement('div');
  optionDiv.className = 'option-container';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = `option_${index}`;
  checkbox.value = index;

  const l = document.createElement('label');
  l.htmlFor = `option_${index}`;
  l.className = 'option-label';
  l.textContent = label;

  optionDiv.addEventListener('click', (e) => {
    if (e.target !== checkbox) checkbox.checked = !checkbox.checked;
    optionDiv.classList.toggle('selected', checkbox.checked);
  });

  checkbox.addEventListener('change', () => {
    optionDiv.classList.toggle('selected', checkbox.checked);
  });

  optionDiv.appendChild(checkbox);
  optionDiv.appendChild(l);
  container.appendChild(optionDiv);
}

export function styleCorrectOption(el) {
  el.style.color = 'green';
  el.style.fontWeight = 'bold';
  const box = el.parentElement;
  if (box) {
    box.style.borderColor = 'green';
    box.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
  }
}

export function styleWrongOption(el) {
  el.style.color = 'red';
  el.style.fontWeight = 'bold';
  const box = el.parentElement;
  if (box) {
    box.style.borderColor = 'red';
    box.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
  }
}

export function showTimeUp(container) {
  const msg = document.createElement('div');
  msg.className = 'time-up-message';
  msg.textContent = 'Temps écoulé! Passage à la question suivante...';
  container.appendChild(msg);
}

import { generatePDF } from './charts.js';

export function showResults(quizData, onRestart) {
  const container = els.quiz();
  container.innerHTML = '<div class="results-container">'
    + '<h2>Résultats du Quiz</h2>'
    + '<p class="score">Score: ' + quizData.score + '/' + quizData.totalQuestions + '</p>'
    + '<p class="percentage">Pourcentage: ' + quizData.percentage + '%</p>'
    + '<p class="time">Temps: ' + quizData.time + '</p>'
    + '<p class="feedback">' + quizData.feedback + '</p>'
    + '<p class="time-feedback">' + quizData.timeFeedback + '</p>'
    + '<p class="congratulations">Félicitations ' + quizData.nickname + '!</p>'
    + '<button id="download-pdf" style="margin-top: 20px; padding: 10px 20px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">Télécharger PDF</button>'
    + '<button id="restart-btn" style="margin-top: 10px; padding: 10px 20px; background-color: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">Recommencer</button>'
    + '</div>';

  const downloadBtn = document.getElementById('download-pdf');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function(){
      generatePDF(quizData);
    });
  }

  const restartBtn = document.getElementById('restart-btn');
  if (restartBtn) {
    restartBtn.addEventListener('click', function(){
      if (typeof onRestart === 'function') onRestart();
    });
  }

  const timeEl = els.time();
  if (timeEl) timeEl.hidden = true;
}
