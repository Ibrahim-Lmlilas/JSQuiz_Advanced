export class Stats {
  static percentage(score, total) {
    if (!total) return 0;
    return Math.round((score / total) * 100);
  }

  static feedbackByPercentage(p) {
    if (p >= 80) return "Excellent!";
    if (p >= 60) return "Bien!";
    if (p >= 40) return "Peut mieux faire";
    return "Il faut réviser!";
  }

  static timeFeedbackByMinutes(min) {
    return min >= 5 ? "You can be faster!" : "Good job on time!";
  }

  static formatChrono(min, sec) {
    return `${min} min:${sec} sec`;
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
}
