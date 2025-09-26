export class ChartsController {
  generatePDF(quizData) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("RESULTATS DU QUIZ", 20, 30);

    doc.setFontSize(12);
    let yPosition = 50;

    doc.text("Nom: " + quizData.nickname, 20, yPosition);
    yPosition += 10;
    doc.text("Theme: " + quizData.theme, 20, yPosition);
    yPosition += 10;
    doc.text(
      "Date: " + new Date(quizData.date).toLocaleDateString("fr-FR"),
      20,
      yPosition
    );
    yPosition += 10;
    doc.text(
      "Score: " + quizData.score + "/" + quizData.totalQuestions,
      20,
      yPosition
    );
    yPosition += 10;
    doc.text("Pourcentage: " + quizData.percentage + "%", 20, yPosition);
    yPosition += 10;
    doc.text("Temps: " + quizData.time, 20, yPosition);
    yPosition += 10;
    doc.text("Evaluation: " + quizData.feedback, 20, yPosition);
    yPosition += 10;
    doc.text("Temps: " + quizData.timeFeedback, 20, yPosition);
    yPosition += 20;

    doc.setFontSize(14);
    doc.text("DETAILS DES QUESTIONS:", 20, yPosition);
    yPosition += 15;

    doc.setFontSize(10);
    for (let i = 0; i < quizData.detailedResults.length; i++) {
      const detail = quizData.detailedResults[i];

      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFont(undefined, "bold");
      doc.text("Question " + (i + 1) + ":", 20, yPosition);
      yPosition += 8;

      doc.setFont(undefined, "normal");
      const questionLines = doc.splitTextToSize(detail.question, 170);
      doc.text(questionLines, 20, yPosition);
      yPosition += questionLines.length * 6 + 5;

      doc.text("Votre reponse: " + detail.userAnswer.join(", "), 20, yPosition);
      yPosition += 8;
      doc.text(
        "Reponse correcte: " + detail.correctAnswers.join(", "),
        20,
        yPosition
      );
      yPosition += 8;

      if (detail.isCorrect) {
        doc.setTextColor(0, 128, 0);
        doc.text("Resultat: CORRECT", 20, yPosition);
      } else {
        doc.setTextColor(255, 0, 0);
        doc.text("Resultat: INCORRECT", 20, yPosition);
      }
      doc.setTextColor(0, 0, 0);
      yPosition += 8;

      if (detail.partialCredit) {
        doc.text("(Credit partiel accorde)", 20, yPosition);
        yPosition += 8;
      }
      if (detail.timedOut) {
        doc.text("(Temps ecoule)", 20, yPosition);
        yPosition += 8;
      }

      yPosition += 10;
    }

    const fileName =
      "Quiz_Results_" +
      quizData.nickname +
      "_" +
      new Date().toISOString().split("T")[0] +
      ".pdf";
    doc.save(fileName);
  }

  renderUserStatsChart(canvasId, results) {
    // 1. Bar chart: Pourcentage by quiz
    const labels = results.map(
      (r) => r.theme + " - " + (r.date ? new Date(r.date).toLocaleDateString() : "")
    );
    const scores = results.map((r) => r.percentage);

    // 2. Pie chart: Number of quizzes played by theme
    const themeCounts = {};
    results.forEach(r => { themeCounts[r.theme] = (themeCounts[r.theme] || 0) + 1; });
    const pieLabels = Object.keys(themeCounts);
    const pieData = Object.values(themeCounts);

    // 3. Doughnut chart: Total correct vs wrong answers
    let totalCorrect = 0, totalWrong = 0;
    results.forEach(r => {
      if (typeof r.score === 'number' && typeof r.totalQuestions === 'number') {
        totalCorrect += r.score;
        totalWrong += (r.totalQuestions - r.score);
      } else if (!isNaN(Number(r.score)) && !isNaN(Number(r.totalQuestions))) {
        totalCorrect += Number(r.score);
        totalWrong += (Number(r.totalQuestions) - Number(r.score));
      }
    });

    // 4. Line chart: Score progression over time
    const lineLabels = results.map(r => r.date ? new Date(r.date).toLocaleDateString() : '');
    const lineData = results.map(r => r.percentage);

    // Remove previous chart instances if exist
    if (window.userStatsChartInstance) window.userStatsChartInstance.destroy();
    if (window.userStatsPieInstance) window.userStatsPieInstance.destroy();
    if (window.userStatsDoughnutInstance) window.userStatsDoughnutInstance.destroy();
    if (window.userStatsLineInstance) window.userStatsLineInstance.destroy();

    let ChartCtor = window.Chart;
    if (ChartCtor && ChartCtor.Chart) ChartCtor = ChartCtor.Chart;
    if (!ChartCtor) {
      alert("Chart.js is not loaded! Please add <script src='https://cdn.jsdelivr.net/npm/chart.js'></script> to your HTML.");
      return;
    }

    // 1. Bar chart
    const ctx = document.getElementById(canvasId).getContext("2d");
    window.userStatsChartInstance = new ChartCtor(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Pourcentage",
            data: scores,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { title: { display: true, text: 'Pourcentage par Quiz' } },
        scales: { y: { beginAtZero: true, max: 100 } },
      },
    });

    // 2. Pie chart
    let pieCanvas = document.getElementById('userStatsPie');
    if (!pieCanvas) {
      pieCanvas = document.createElement('canvas');
      pieCanvas.id = 'userStatsPie';
      ctx.canvas.parentNode.appendChild(pieCanvas);
    }
    window.userStatsPieInstance = new ChartCtor(pieCanvas.getContext('2d'), {
      type: 'pie',
      data: {
        labels: pieLabels,
        datasets: [{
          data: pieData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: { title: { display: true, text: 'Nombre de Quiz par Thème' } }
      }
    });

    // 3. Doughnut chart
    let doughnutCanvas = document.getElementById('userStatsDoughnut');
    if (!doughnutCanvas) {
      doughnutCanvas = document.createElement('canvas');
      doughnutCanvas.id = 'userStatsDoughnut';
      ctx.canvas.parentNode.appendChild(doughnutCanvas);
    }
    window.userStatsDoughnutInstance = new ChartCtor(doughnutCanvas.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Correct', 'Incorrect'],
        datasets: [{
          data: [totalCorrect, totalWrong],
          backgroundColor: [
            'rgba(40, 167, 69, 0.6)',
            'rgba(220, 53, 69, 0.6)'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: { title: { display: true, text: 'Réponses Correctes vs Incorrectes' } }
      }
    });

    // 4. Line chart
    let lineCanvas = document.getElementById('userStatsLine');
    if (!lineCanvas) {
      lineCanvas = document.createElement('canvas');
      lineCanvas.id = 'userStatsLine';
      ctx.canvas.parentNode.appendChild(lineCanvas);
    }
    window.userStatsLineInstance = new ChartCtor(lineCanvas.getContext('2d'), {
      type: 'line',
      data: {
        labels: lineLabels,
        datasets: [{
          label: 'Progression du Score (%)',
          data: lineData,
          fill: false,
          borderColor: 'rgba(54, 162, 235, 1)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        plugins: { title: { display: true, text: 'Progression du Score dans le Temps' } }
      }
    });
  }
}

// Add this at the end of the file to ensure Chart.js is loaded
if (!window.Chart) {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
  script.onload = () => { console.log('Chart.js loaded!'); };
  document.head.appendChild(script);
}
