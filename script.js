import QuizController from "./modules/quiz.js";

window.addEventListener("DOMContentLoaded", () => {
  const quiz = new QuizController();
  quiz.init();
});
