import { PDFService } from "./charts.js";

export class UIService {
  constructor(pdfService = new PDFService()) {
    this.pdfService = pdfService;
  }

  els() {
    return {
        MyQuiz : ()=> document.getElementById("MyQuiz"),
      startBtn: () => document.getElementById("Start_btn"),
      time: () => document.getElementById("time"),
      quiz: () => document.getElementById("quiz_container"),
      nicknameInput: () => document.getElementById("name"),
      carts: () => document.getElementsByClassName("cart"),
      cartSelection: () => document.getElementById("cart_selection"),
      nameModal: () => document.getElementById("name_modal"),
    };
  }

  clearNode(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  renderTimer(container, seconds) {
    const el = document.createElement("div");
    el.id = "question-timer";
    el.textContent = `Temps restant: ${seconds} secondes`;
    container.appendChild(el);
    return el;
  }

  updateTimer(el, seconds) {
    if (el) el.textContent = `Temps restant: ${seconds} secondes`;
  }

  disableAll(node) {
    node
      .querySelectorAll("button, input")
      .forEach((el) => (el.disabled = true));
  }

  renderSingleOption(container, label, onClick) {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.addEventListener("click", () => onClick(btn));
    container.appendChild(btn);
  }

  renderMultiOption(container, label, index) {
    const optionDiv = document.createElement("div");
    optionDiv.className = "option-container";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `option_${index}`;
    checkbox.value = index;

    const l = document.createElement("label");
    l.htmlFor = `option_${index}`;
    l.className = "option-label";
    l.textContent = label;

    optionDiv.addEventListener("click", (e) => {
      if (e.target !== checkbox) checkbox.checked = !checkbox.checked;
      optionDiv.classList.toggle("selected", checkbox.checked);
    });

    checkbox.addEventListener("change", () => {
      optionDiv.classList.toggle("selected", checkbox.checked);
    });

    optionDiv.appendChild(checkbox);
    optionDiv.appendChild(l);
    container.appendChild(optionDiv);
  }

  styleCorrectOption(el) {
    el.style.color = "green";
    el.style.fontWeight = "bold";
    const box = el.parentElement;
    if (box) {
      box.style.borderColor = "green";
      box.style.backgroundColor = "rgba(0, 255, 0, 0.2)";
    }
  }

  styleWrongOption(el) {
    el.style.color = "red";
    el.style.fontWeight = "bold";
    const box = el.parentElement;
    if (box) {
      box.style.borderColor = "red";
      box.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
    }
  }

  showTimeUp(container) {
    const msg = document.createElement("div");
    msg.className = "time-up-message";
    msg.textContent = "Temps écoulé! Passage à la question suivante...";
    container.appendChild(msg);
  }

  showResults(quizData, onRestart) {
    const { quiz, time } = this.els();
    const container = quiz();

    container.innerHTML =
      '<div class="results-container">' +
      "<h2>Résultats du Quiz</h2>" +
      '<p class="score">Score: ' +
      quizData.score +
      "/" +
      quizData.totalQuestions +
      "</p>" +
      '<p class="percentage">Pourcentage: ' +
      quizData.percentage +
      "%</p>" +
      '<p class="time">Temps: ' +
      quizData.time +
      "</p>" +
      '<p class="feedback">' +
      quizData.feedback +
      "</p>" +
      '<p class="time-feedback">' +
      quizData.timeFeedback +
      "</p>" +
      '<p class="congratulations">Félicitations ' +
      quizData.nickname +
      "!</p>" +
      '<button id="download-pdf" style="margin-top: 20px; padding: 10px 20px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">Télécharger PDF</button>' +
      '<button id="restart-btn" style="margin-top: 10px; padding: 10px 20px; background-color: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">Recommencer</button>' +
      "</div>";

    const downloadBtn = document.getElementById("download-pdf");
    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => {
        this.pdfService.generatePDF(quizData);
      });
    }

    const restartBtn = document.getElementById("restart-btn");
    if (restartBtn) {
      restartBtn.addEventListener("click", () => {
        if (typeof onRestart === "function") onRestart();
      });
    }

    const timeEl = time();
    if (timeEl) timeEl.hidden = true;
  }
}
