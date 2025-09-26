export class StatsController {
  static percentage(score, total) {
    if (!total) return 0;
    return Math.round((score / total) * 100);
  }

  static feedbackByPercentage(p) {
    if (p >= 80) return "Excellent!";
    if (p >= 60) return "Bien!";
    if (p >= 40) return "Peut mieux faire";
    return "Il faut reviser!";
  }

  static timeFeedbackByMinutes(min) {
    return min >= 5 ? "You can be faster!" : "Good job on time!";
  }

  static formatChrono(min, sec) {
    return min + " min:" + sec + " sec";
  }

  static scoreMultiple(selected, correct) {
    const totalCorrect = correct.length;
    const setSel = new Set(selected);
    const setCor = new Set(correct);
    let correctCount = 0;
    let wrongCount = 0;
    setSel.forEach((i) => {
      if (setCor.has(i)) correctCount++;
      else wrongCount++;
    });
    const fullCorrect = correctCount === totalCorrect && wrongCount === 0;
    let increment = 0;
    let partial = false;
    if (fullCorrect) {
      increment = 1;
    } else if (correctCount > 0 && wrongCount === 0) {
      increment = Math.max(0, correctCount - wrongCount) / totalCorrect;
      partial = true;
    }
    return {
      increment,
      fullCorrect,
      partial,
      correctCount,
      wrongCount,
      totalCorrect,
    };
  }

  static showDashboard(stats) {
    let dashboard = document.getElementById("dashboard");
    dashboard.style.display = "block";
    dashboard.style.position = "fixed";
    dashboard.style.top = "50%";
    dashboard.style.left = "50%";
    dashboard.style.transform = "translate(-50%, -50%)";
    dashboard.style.background = "#222";
    dashboard.style.color = "#fff";
    dashboard.style.padding = "32px 24px 24px 24px";
    dashboard.style.borderRadius = "12px";
    dashboard.style.boxShadow = "0 4px 32px #000a";
    dashboard.style.zIndex = 1000;
    dashboard.style.minWidth = "320px";

    const closeBtnHtml = '<span id="close-dashboard" style="position:absolute;top:8px;right:16px;cursor:pointer;font-size:24px;font-weight:bold;">&times;</span>';
    const titleHtml = '<h2 style="margin-top:0;">Top 3 Utilisateurs par Score Total</h2>';
    let listHtml = '<ul style="list-style:none;padding:0;">';
    if (stats && stats.scoresByUser) {
      const sorted = Object.entries(stats.scoresByUser)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);
      for (let i = 0; i < sorted.length; i++) {
        const [nickname, total] = sorted[i];
        listHtml += '<li style="margin:8px 0;font-size:18px;">' + (i+1) + '. <b>' + nickname + '</b> : <span style="color:#ffd700">' + total + '</span></li>';
      }
    } else {
      listHtml += '<li>Aucune donnée</li>';
    }
    listHtml += '</ul>';
    dashboard.innerHTML = closeBtnHtml + titleHtml + listHtml;
    const closeBtn = document.getElementById("close-dashboard");
    if (closeBtn) {
      closeBtn.onclick = () => {
        dashboard.style.display = "none";
      };
    }
  }
}
