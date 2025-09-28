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
    dashboard.className = "dashboard-modal";
    dashboard.style.display = "block";
    
    const closeBtnHtml = '<span id="close-dashboard" class="close-dashboard">&times;</span>';
    const contentWrapperStart = '<div class="dashboard-content-wrapper">';
    const contentWrapperEnd = '</div>';
    const trophyTitleHtml = '<div class="dashboard-trophy-title"><div class="dashboard-trophy-img"><img src="assets/img/trophy.gif" alt="Trophy"></div></div>';
    let listHtml = '<ul class="dashboard-list">';
    if (stats && stats.scoresByUser) {
      const sorted = Object.entries(stats.scoresByUser)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);
      for (let i = 0; i < sorted.length; i++) {
        const [nickname, total] = sorted[i];
        listHtml += '<li class="dashboard-list-item">'
          + '<span class="dashboard-list-rank">' + (i+1) + '.</span>'
          + '<span class="dashboard-list-nickname">' + nickname + '</span>'
          + '<span class="dashboard-list-score">' + total + '</span>'
          + '</li>';
      }
    } else {
      listHtml += '<li class="dashboard-list-item dashboard-list-empty">Aucune donnée</li>';
    }
    listHtml += '</ul>';
    dashboard.innerHTML = '<div class="modal-overlay-bg"></div>' + closeBtnHtml + contentWrapperStart + trophyTitleHtml + listHtml + contentWrapperEnd;
    dashboard.style.overflow = "hidden";
    const contentWrapper = dashboard.querySelector('.dashboard-content-wrapper');
    if (contentWrapper) {
      contentWrapper.style.position = "relative";
      contentWrapper.style.zIndex = "1";
    }
    const closeBtn = document.getElementById("close-dashboard");
    if (closeBtn) {
      closeBtn.style.zIndex = "2";
      closeBtn.onclick = () => {
        dashboard.style.display = "none";
        const blocker = document.getElementById("dashboard-blocker");
        if (blocker && blocker.parentNode) blocker.parentNode.removeChild(blocker);
      };
    }
    let blocker = document.getElementById("dashboard-blocker");
    if (!blocker) {
      blocker = document.createElement("div");
      blocker.id = "dashboard-blocker";
      blocker.className = "dashboard-blocker";
      document.body.appendChild(blocker);
    } else {
      blocker.style.display = "block";
    }
  }
}
