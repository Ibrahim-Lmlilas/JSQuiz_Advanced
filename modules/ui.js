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

    // Get nickname
    let nickname = null;
    const input = document.getElementById("name");
    if (input && input.value.trim()) nickname = input.value.trim();
    if (!nickname) {
      alert("Entrer votre nickname d'abord!");
      return;
    }

    // Get user results from storage
    const storage = new StorageController();
    const results = storage.getUserResults(nickname);

    // Modal setup
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
    innerDiv.style.background = "#14213d url('assets/img/stati.gif') center/cover no-repeat";
    innerDiv.style.position = "relative";
    // Add a black overlay using a psedo-elemnt
    innerDiv.classList.add("stats-modal-bg-overlay");
    innerDiv.style.color = "#fff"; // white text for contrast
    innerDiv.style.width = "80%";
    innerDiv.style.height = "80%";
    innerDiv.style.borderRadius = "16px";
    innerDiv.style.boxShadow = "0 4px 32px rgba(0,0,0,0.15)";
    innerDiv.style.display = "flex";
    innerDiv.style.flexDirection = "column";
    innerDiv.style.justifyContent = "flex-start";
    innerDiv.style.alignItems = "center";
    innerDiv.style.overflowY = "auto";
    innerDiv.style.padding = "32px";

    // Title
    const title = document.createElement("h2");
    title.textContent = `Statistiques de ${nickname}`;
    innerDiv.appendChild(title);

    // Stats cards container
    const cardsRow = document.createElement("div");
    cardsRow.style.display = "flex";
    cardsRow.style.flexDirection = "row";
    cardsRow.style.gap = "16px";
    cardsRow.style.width = "100%";
    cardsRow.style.overflowX = "auto";
    cardsRow.style.marginBottom = "26px";
    cardsRow.style.maxWidth = "75vw";
    cardsRow.style.paddingBottom = "8px";
    cardsRow.style.alignItems = "flex-start";
    cardsRow.style.height = "140px";
    cardsRow.style.minHeight = "140px";
    cardsRow.style.maxHeight = "140px";
    cardsRow.style.alignItems = "center";

    results.forEach((quiz, idx) => {
      const card = document.createElement("div");
      card.style.border = "1px solid #eee";
      card.style.borderRadius = "8px";
      card.style.padding = "10px 8px";
      card.style.fontSize = "9px";
      card.style.lineHeight = "1.7";
      card.style.padding = "8px 6px";
      card.style.minWidth = "220px";
      card.style.maxWidth = "260px";
      card.style.height = "90px";
      card.style.display = "flex";
      card.style.flexDirection = "column";
      card.style.justifyContent = "center";
      card.style.alignItems = "flex-start";
      card.style.fontFamily = "'Press Start 2P', cursive";
      card.style.position = "relative";
      card.style.transition = "box-shadow 0.2s";
      card.innerHTML = `
        <div style='margin-bottom:0.5em;'><b>Quiz:</b> <span style='font-weight:normal;'>${quiz.theme || 'N/A'}</span></div>
        <div style='margin-bottom:0.5em;'><b>Score:</b> <span style='font-weight:normal;'>${quiz.score}/${quiz.totalQuestions}</span></div>
        <div style='margin-bottom:0.5em;'><b>Pourcentage:</b> <span style='font-weight:normal;'>${quiz.percentage}%</span></div>
        <div><b>Date:</b> <span style='font-weight:normal;'>${quiz.date ? new Date(quiz.date).toLocaleString() : ''}</span></div>
      `;
      // Export buttons (centered, blue, margin/padding, show on hover)
      const btnsDiv = document.createElement("div");
      btnsDiv.style.position = "absolute";
      btnsDiv.style.left = "50%";
      btnsDiv.style.top = "50%";
      btnsDiv.style.transform = "translate(-50%, -50%)";
      btnsDiv.style.display = "none";
      btnsDiv.style.flexDirection = "column";
      btnsDiv.style.gap = "10px";
      btnsDiv.style.zIndex = "2";
      // JSON button
      const jsonBtn = document.createElement("button");
      jsonBtn.textContent = "Export JSON";
      jsonBtn.className = "export-btn export-btn-json";
      jsonBtn.style.fontSize = "9px";
      jsonBtn.style.padding = "8px 8px";
      jsonBtn.style.margin = "0 0 4px 0";
      jsonBtn.style.borderRadius = "8px";
      jsonBtn.style.border = "none";
      jsonBtn.style.background = "#2563eb";
      jsonBtn.style.color = "#fff";
      jsonBtn.style.fontFamily = "'Press Start 2P', cursive";
      jsonBtn.style.fontWeight = "bold";
      jsonBtn.style.letterSpacing = "0.5px";
      jsonBtn.style.boxShadow = "0 2px 6px #0002";
      jsonBtn.style.cursor = "url('assets/img/download.png'), auto";
      // CSV button
      const csvBtn = document.createElement("button");
      csvBtn.textContent = "Export CSV";
      csvBtn.className = "export-btn export-btn-csv";
      csvBtn.style.fontSize = "9px";
      csvBtn.style.padding = "8px 8px";
      csvBtn.style.margin = "0";
      csvBtn.style.borderRadius = "8px";
      csvBtn.style.border = "none";
      csvBtn.style.background = "#2563eb";
      csvBtn.style.color = "#fff";
      csvBtn.style.fontFamily = "'Press Start 2P', cursive";
      csvBtn.style.fontWeight = "bold";
      csvBtn.style.letterSpacing = "0.5px";
      csvBtn.style.boxShadow = "0 2px 6px #0002";
      csvBtn.style.cursor = "url('assets/img/download.png'), auto";
      jsonBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        storage.exportQuizResult(quiz, nickname, idx, 'json');
      });
      csvBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        storage.exportQuizResult(quiz, nickname, idx, 'csv');
      });
      btnsDiv.appendChild(jsonBtn);
      btnsDiv.appendChild(csvBtn);
      card.appendChild(btnsDiv);
      card.addEventListener("mouseenter", () => { btnsDiv.style.display = "flex"; card.style.boxShadow = "0 0 0 2px #2563eb, 0 2px 8px #0002"; });
      card.addEventListener("mouseleave", () => { btnsDiv.style.display = "none"; card.style.boxShadow = "none"; });
      cardsRow.appendChild(card);
    });
    innerDiv.appendChild(cardsRow);
    // Chart.js charts: two rows, two charts per row, each chart 50% width
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
      chartsRow.style.display = "flex";
      chartsRow.style.flexDirection = "row";
      chartsRow.style.gap = "24px";
      chartsRow.style.justifyContent = "center";
      chartsRow.style.alignItems = "center";
      chartsRow.style.width = "100%";
      chartsRow.style.marginBottom = rowIdx === 0 ? "24px" : "0";
      row.forEach(({ id }) => {
        const chartBox = document.createElement("div");
        chartBox.style.background = "#fff";
        chartBox.style.borderRadius = "12px";
        chartBox.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
        chartBox.style.padding = "18px";
        chartBox.style.display = "flex";
        chartBox.style.justifyContent = "center";
        chartBox.style.alignItems = "center";
        chartBox.style.width = "calc(50% - 12px)";
        chartBox.style.height = "240px";
        chartBox.style.boxSizing = "border-box";
        chartBox.style.maxWidth = "100%";
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
