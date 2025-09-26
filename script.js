import QuizController from "./modules/quiz.js";
import { UiController } from "./modules/ui.js";

window.addEventListener("DOMContentLoaded", () => {
  const quiz = new QuizController();
  quiz.init();

  const ui = new UiController();
  ui.showMyStatsBtnOnlyWithCart();

  const myStatsBtn = document.getElementById('MyStats_btn');
  if (myStatsBtn) {
    myStatsBtn.onclick = () => ui.showMyStatsModal();
  }
});
