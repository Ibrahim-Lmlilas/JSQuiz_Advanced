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
    dashboard.style.backgroundImage = "url('assets/img/modal-animated.gif')";
    dashboard.style.backgroundSize = "cover";
    dashboard.style.backgroundPosition = "center";
    dashboard.style.backgroundRepeat = "no-repeat";
    dashboard.style.backgroundColor = "#222";
    dashboard.style.color = "#fff";
    dashboard.style.width = "340px";
    dashboard.style.height = "340px";
    dashboard.style.padding = "28px";
    dashboard.style.borderRadius = "8px";
    dashboard.style.boxShadow = "0 4px 32px #000a";
    dashboard.style.zIndex = 1000;
    dashboard.style.minWidth = "220px";
    dashboard.style.fontFamily = "'Press Start 2P', cursive";
    dashboard.style.maxWidth = "90vw";
    dashboard.style.display = "flex";
    dashboard.style.flexDirection = "column";
    dashboard.style.justifyContent = "center";
    dashboard.style.alignItems = "center";
    dashboard.style.position = "fixed";
    dashboard.style.top = "50%";
    dashboard.style.left = "50%";
    dashboard.style.transform = "translate(-50%, -50%)";
    dashboard.style.backgroundImage = "url('assets/img/modal-animated.gif')";
    dashboard.style.backgroundSize = "cover";
    dashboard.style.backgroundPosition = "center";
    dashboard.style.backgroundRepeat = "no-repeat";
    dashboard.style.backgroundColor = "#222";
    dashboard.style.color = "#fff";

    const closeBtnHtml = '<span id="close-dashboard" style="position:absolute;top:12px;right:18px;cursor:url(\'assets/img/download.png\'),auto;font-size:18px;font-weight:bold;font-family:\'Press Start 2P\',cursive;z-index:10;">&times;</span>';
    const contentWrapperStart = '<div style="width:100%;max-width:260px;margin:-16px auto 0 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;">';
    const contentWrapperEnd = '</div>';
    const trophyTitleHtml = '<div style="display:flex;justify-content:center;align-items:center;margin-bottom:18px;margin-top:-12px;"><div style="background:#A3E635;border-radius:50%;padding:10px;box-shadow:0 0 0 3px #222;display:flex;align-items:center;justify-content:center;"><img src="assets/img/trophy.gif" alt="Trophy" style="width:50px;height:50px;display:block;"></div></div>';
    let listHtml = '<ul style="list-style:none;padding:0 8px 0 8px;margin:0 0 8px 0;font-family:\'Press Start 2P\',cursive;width:100%;text-align:center;">';
    if (stats && stats.scoresByUser) {
      const sorted = Object.entries(stats.scoresByUser)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);
      for (let i = 0; i < sorted.length; i++) {
        const [nickname, total] = sorted[i];
        listHtml += '<li style="margin:28px 0;font-size:13px;font-family:\'Press Start 2P\',cursive;display:flex;align-items:center;justify-content:center;gap:10px;">'
          + '<span style="min-width:22px;text-align:right;display:inline-block;">' + (i+1) + '.</span>'
          + '<span style="min-width:80px;text-align:left;display:inline-block;font-weight:bold;">' + nickname + '</span>'
          + '<span style="min-width:32px;text-align:right;display:inline-block;color:#ffd700;">' + total + '</span>'
          + '</li>';
      }
    } else {
      listHtml += '<li style="font-family:\'Press Start 2P\',cursive;font-size:13px;">Aucune donnée</li>';
    }
    listHtml += '</ul>';
    // Add overlay div for dark background
    dashboard.innerHTML = '<div class="modal-overlay-bg" style="position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);border-radius:8px;z-index:0;"></div>' + closeBtnHtml + contentWrapperStart + trophyTitleHtml + listHtml + contentWrapperEnd;
    dashboard.style.position = "fixed";
    dashboard.style.overflow = "hidden";
    // Set content wrapper to relative and z-index 1
    const contentWrapper = dashboard.querySelector('div[style*="max-width:260px"]');
    if (contentWrapper) {
      contentWrapper.style.position = "relative";
      contentWrapper.style.zIndex = "1";
    }
    // Set close button z-index
    const closeBtn = document.getElementById("close-dashboard");
    if (closeBtn) {
      closeBtn.style.zIndex = "2";
      closeBtn.onclick = () => {
        dashboard.style.display = "none";
        // Remove the fullscreen overlay if it exists
        const blocker = document.getElementById("dashboard-blocker");
        if (blocker && blocker.parentNode) blocker.parentNode.removeChild(blocker);
      };
    }
    // Add fullscreen overlay div to block interaction with background (outside modal)
    let blocker = document.getElementById("dashboard-blocker");
    if (!blocker) {
      blocker = document.createElement("div");
      blocker.id = "dashboard-blocker";
      blocker.style.position = "fixed";
      blocker.style.top = "0";
      blocker.style.left = "0";
      blocker.style.width = "100vw";
      blocker.style.height = "100vh";
      blocker.style.background = "rgba(0,0,0,0.7)";
      blocker.style.zIndex = "999";
      blocker.style.pointerEvents = "auto";
      blocker.style.transition = "opacity 0.2s";
      document.body.appendChild(blocker);
    } else {
      blocker.style.display = "block";
    }
  }
}
