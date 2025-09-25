export class PDFService {
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
}
