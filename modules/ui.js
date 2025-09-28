import { ChartsController } from "./charts.js";
import { StorageController } from "./storage.js";

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

    let nickname = null;
    const input = document.getElementById("name");
    if (input && input.value.trim()) nickname = input.value.trim();
    if (!nickname) {
      alert("Entrer votre nickname d'abord!");
      return;
    }

    const storage = new StorageController();
    const results = storage.getUserResults(nickname);

    const modal = document.createElement("div");
    modal.id = "myStatsModal";

    const innerDiv = document.createElement("div");
    innerDiv.classList.add("stats-modal-bg-overlay");

    const title = document.createElement("h2");
    title.textContent = `Statistiques de ${nickname}`;
    innerDiv.appendChild(title);

    const cardsRow = document.createElement("div");
    cardsRow.className = "stats-cards-row";

    results.forEach(function(quiz, idx) {
      var card = document.createElement("div");
      card.className = "stats-card";
      card.innerHTML =
        '<div class="stats-card-row"><b>Quiz:</b> <span>' + (quiz.theme || 'N/A') + '</span></div>' +
        '<div class="stats-card-row"><b>Score:</b> <span>' + quiz.score + '/' + quiz.totalQuestions + '</span></div>' +
        '<div class="stats-card-row"><b>Pourcentage:</b> <span>' + quiz.percentage + '%</span></div>' +
        '<div class="stats-card-row"><b>Date:</b> <span>' + (quiz.date ? new Date(quiz.date).toLocaleString() : '') + '</span></div>';
      var btnsDiv = document.createElement("div");
      btnsDiv.className = "stats-card-btns";
      var jsonBtn = document.createElement("button");
      jsonBtn.textContent = "Export JSON";
      jsonBtn.className = "export-btn export-btn-json";
      var csvBtn = document.createElement("button");
      csvBtn.textContent = "Export CSV";
      csvBtn.className = "export-btn export-btn-csv";
      jsonBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        storage.exportQuizResult(quiz, nickname, idx, 'json');
      });
      csvBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        storage.exportQuizResult(quiz, nickname, idx, 'csv');
      });
      btnsDiv.appendChild(jsonBtn);
      btnsDiv.appendChild(csvBtn);
      card.appendChild(btnsDiv);
      card.addEventListener("mouseenter", function() { btnsDiv.style.display = "flex"; card.classList.add("stats-card-hover"); });
      card.addEventListener("mouseleave", function() { btnsDiv.style.display = "none"; card.classList.remove("stats-card-hover"); });
      cardsRow.appendChild(card);
    });
    innerDiv.appendChild(cardsRow);
    const chartRows = [
      [
        { id: "userStatsChart" },
        { id: "userStatsPie" }
      ],
      [
        { id: "userStatsDoughnut" },
        { id: "userStatsLine" }
      ]
    ];
    chartRows.forEach((row, rowIdx) => {
      const chartsRow = document.createElement("div");
      chartsRow.className = "stats-charts-row";
      if (rowIdx === 0) chartsRow.style.marginBottom = "24px";
      row.forEach(({ id }) => {
        const chartBox = document.createElement("div");
        chartBox.className = "stats-chart-box";
        const canvas = document.createElement("canvas");
        canvas.id = id;
        chartBox.appendChild(canvas);
        chartsRow.appendChild(chartBox);
      });
      innerDiv.appendChild(chartsRow);
    });

    setTimeout(() => {
      this.chartsController.renderUserStatsChart("userStatsChart", results);
    }, 0);

    modal.appendChild(innerDiv);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.remove();
    });
    document.body.appendChild(modal);
  }   
}
