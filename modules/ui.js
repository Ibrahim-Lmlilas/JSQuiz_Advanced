import { ChartsController } from "./charts.js";

export class UiController {
  constructor(chartsController = new ChartsController()) {
    this.chartsController = chartsController;
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
      dashboardBtn: () => document.getElementById("Dashboard_btn"),
    };
  }

  clearNode(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  renderTimer(container, seconds) {
    const el = document.createElement("div");
    el.id = "question-timer";
    el.textContent = "Temps restant: " + seconds + " secondes";
    container.appendChild(el);
    return el;
  }

  updateTimer(el, seconds) {
    if (el) el.textContent = "Temps restant: " + seconds + " secondes";
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
        if (this.chartsController && typeof this.chartsController.generatePDF === "function") {
          this.chartsController.generatePDF(quizData);
        } else {
          alert("PDF export not available.");
        }
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

  showMyStatsBtnOnlyWithCart() {
    const myStatsBtnRow = document.getElementById('myStatsBtnRow');
    const cartSelection = document.getElementById('cart_selection');
    function updateMyStatsBtnVisibility() {
      if (cartSelection.style.display !== 'none' && cartSelection.style.display !== '') {
        myStatsBtnRow.style.display = 'flex';
      } else {
        myStatsBtnRow.style.display = 'none';
      }
    }
    const observer = new MutationObserver(updateMyStatsBtnVisibility);
    observer.observe(cartSelection, { attributes: true, attributeFilter: ['style'] });
    updateMyStatsBtnVisibility();
  }

  showMyStatsModal() {
    const existing = document.getElementById("myStatsModal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "myStatsModal";
    modal.style.position = "fixed";
    modal.style.width = "100vw";
    modal.style.height = "100vh";
    modal.style.background = "rgba(0,0,0,0.4)";
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "9999";

    const innerDiv = document.createElement("div");
    innerDiv.style.background = "#fff";
    innerDiv.style.width = "90%";
    innerDiv.style.height = "90%";
    innerDiv.style.borderRadius = "16px";
    innerDiv.style.boxShadow = "0 4px 32px rgba(0,0,0,0.15)";
    innerDiv.style.display = "flex";
    innerDiv.style.flexDirection = "column";
    innerDiv.style.justifyContent = "center";
    innerDiv.style.alignItems = "center";

    modal.appendChild(innerDiv);
    
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.remove();
    });

    document.body.appendChild(modal);
  }   
}
