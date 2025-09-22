  const themes = {
    "js_basics": [
      {
        id: 1,
        q: "Quels mots-clés peuvent déclarer une variable en JS ?",
        options: ["const", "let", "var", "function"],
        correct: [0,1,2],
        multi: true
      },
      {
        id: 2,
        q: "Quelle est la sortie de : console.log(2 + '2');",
        options: ["4", "'22'", "NaN"],
        correct: [1],
        multi: false
      },
      {
        id: 3,
        q: "Quelle méthode permet d'ajouter un élément à la fin d’un tableau ?",
        options: ["push()", "pop()", "shift()"],
        correct: [0],
        multi: false
      },
      {
        id: 4,
        q: "Quelle(s) valeur(s) est/sont considérée(s) comme falsy en JS ?",
        options: ["0", "''", "null", "undefined", "NaN", "'false'"],
        correct: [0,1,2,3,4],
        multi: true
      },
      {
        id: 5,
        q: "Quel symbole est utilisé pour un commentaire sur une ligne ?",
        options: ["//", "/* */", "#"],
        correct: [0],
        multi: false
      },
      {
        id: 6,
        q: "Quelle(s) boucle(s) peut-on utiliser pour parcourir un tableau ?",
        options: ["for", "for...of", "for...in", "while"],
        correct: [0,1,3],
        multi: true
      },
      {
        id: 7,
        q: "Quelle méthode transforme une chaîne en nombre entier ?",
        options: ["parseInt()", "Number()", "String()"],
        correct: [0,1],
        multi: true
      },
      {
        id: 8,
        q: "Comment accéder au premier élément d’un tableau arr ?",
        options: ["arr[0]", "arr(0)", "arr.first"],
        correct: [0],
        multi: false
      },
      {
        id: 9,
        q: "typeof null retourne quoi ?",
        options: ["'null'", "'object'", "'undefined'"],
        correct: [1],
        multi: false
      },
      {
        id: 10,
        q: "Comment déclarer une fonction ?",
        options: ["function maFonction() {}", "def maFonction() {}", "func maFonction() {}"],
        correct: [0],
        multi: false
      }
    ],

    "html_basics": [
      {
        id: 1,
        q: "Quel tag définit un lien hypertexte ?",
        options: ["<link>", "<a>", "<href>"],
        correct: [1],
        multi: false
      },
      {
        id: 2,
        q: "Quel(s) attribut(s) sont utilisés pour les images ?",
        options: ["src", "alt", "href", "title"],
        correct: [0,1],
        multi: true
      },
      {
        id: 3,
        q: "Quel tag représente un paragraphe ?",
        options: ["<p>", "<div>", "<span>"],
        correct: [0],
        multi: false
      },
      {
        id: 4,
        q: "Quel tag représente un titre principal ?",
        options: ["<h1>", "<h6>", "<header>"],
        correct: [0],
        multi: false
      },
      {
        id: 5,
        q: "Quel(s) tag(s) servent pour les listes ?",
        options: ["<ul>", "<ol>", "<li>", "<dl>"],
        correct: [0,1,2,3],
        multi: true
      },
      {
        id: 6,
        q: "Quel attribut fait ouvrir un lien dans un nouvel onglet ?",
        options: ["target='_blank'", "href='_new'", "rel='noopener'"],
        correct: [0],
        multi: false
      },
      {
        id: 7,
        q: "Comment définir un champ obligatoire dans un formulaire ?",
        options: ["required", "mandatory", "validate"],
        correct: [0],
        multi: false
      },
      {
        id: 8,
        q: "Quel tag HTML définit un bouton ?",
        options: ["<button>", "<input>", "<submit>"],
        correct: [0],
        multi: false
      },
      {
        id: 9,
        q: "Quel tag HTML définit le corps du document ?",
        options: ["<body>", "<html>", "<main>"],
        correct: [0],
        multi: false
      },
      {
        id: 10,
        q: "Quel tag HTML est sémantique pour un pied de page ?",
        options: ["<footer>", "<section>", "<div>"],
        correct: [0],
        multi: false
      }
    ],

    "css_basics": [
      {
        id: 1,
        q: "Quelle propriété change la couleur du texte ?",
        options: ["color", "background-color", "font-size"],
        correct: [0],
        multi: false
      },
      {
        id: 2,
        q: "Quelle propriété change la couleur de fond ?",
        options: ["background-color", "color", "border-color"],
        correct: [0],
        multi: false
      },
      {
        id: 3,
        q: "Quelle(s) propriété(s) gèrent les marges et paddings ?",
        options: ["margin", "padding", "border", "spacing"],
        correct: [0,1],
        multi: true
      },
      {
        id: 4,
        q: "Quelle propriété change la taille de la police ?",
        options: ["font-size", "text-size", "size"],
        correct: [0],
        multi: false
      },
      {
        id: 5,
        q: "Quelle propriété CSS change l’affichage d’un élément ?",
        options: ["display", "position", "float"],
        correct: [0],
        multi: false
      },
      {
        id: 6,
        q: "Quelle propriété CSS fait flotter un élément à gauche ou droite ?",
        options: ["float", "position", "align"],
        correct: [0],
        multi: false
      },
      {
        id: 7,
        q: "Quelle(s) valeur(s) de display permettent de créer un flex container ?",
        options: ["block", "inline-block", "flex", "grid"],
        correct: [2,3],
        multi: true
      },
      {
        id: 8,
        q: "Quelle propriété CSS change la couleur du contour ?",
        options: ["border-color", "color", "outline-color"],
        correct: [0],
        multi: false
      },
      {
        id: 9,
        q: "Quelle propriété CSS change la visibilité d’un élément ?",
        options: ["visibility", "display", "opacity"],
        correct: [0],
        multi: false
      },
      {
        id: 10,
        q: "Quelle propriété CSS permet de centrer un texte ?",
        options: ["text-align", "align-items", "justify-content"],
        correct: [0],
        multi: false
      }
    ]
  };

//console.log(themes.js_basics[0].q)
 
const Start_btn = document.getElementById('Start_btn');
const time = document.getElementById('time');
const quiz_container = document.getElementById('quiz_container');
const nickname = document.getElementById('name');
const carts = document.getElementsByClassName('cart');
const cart_selection = document.getElementById('cart_selection');
const name_modal = document.getElementById('name_modal');

let timeqcm ; 
let optioncart = false ;


//console.log(optioncart);
for (let i = 0; i < carts.length; i++) {
    const cart  = carts[i];
    
    cart.addEventListener('click',function(){
        optioncart = true ;
        //console.log(optioncart);
        //console.log(cart.dataset.cart);
        
        let themeKey = cart.dataset.cart + '_basics';
        localStorage.setItem('themes', themeKey);
        //console.log(localStorage.getItem('themes'));



    });

    
}




let currentQuestion = 0;
let result = 0;
let min = 0;
let number = 0;
let questionTimer = null;
let questionTimeLeft = 30;
let detailedResults = [];

quiz_container.style.display='none'

Start_btn.addEventListener('click',function(){


    if(nickname.value == ''){
        alert ('Please enter your name');
    }
    else if(nickname.value.length < 4 ){
        alert ('Name must be at least 4 characters long');
    }
    else if(optioncart == false){
        alert ('Please select your cart');
    }
    


    else{

      quiz_container.style.display='';
      Start_btn.style.display='none';

    Start_btn.hidden = true;
    name_modal.hidden = true;
    
    currentQuestion = 0;
    result = 0;
    detailedResults = [];

    time.textContent = number ; 

    timeqcm = setInterval(function(){
        number++; 
        if(number == 60){
            number = 0;
            min++;
        }
        
        time.textContent = min + ' min:' + number + ' sec';
    }, 1000);



showQuestion(currentQuestion);


        /*let autoQuestionInterval = setInterval(()=>{
          currentQuestion ++
          const my_themes = localStorage.getItem('themes');
          const currentThemeQuestions = themes[my_themes];
          
          if(currentQuestion < currentThemeQuestions.length){
            showQuestion(currentQuestion);
          } else {
            clearInterval(autoQuestionInterval);
          }
            
        },3000)*/
}


});

function showQuestion (index){

    quiz_container.innerHTML = '';
    
    questionTimeLeft = 30;
    clearInterval(questionTimer);

    const my_themes = localStorage.getItem('themes');
    const currentThemeQuestions = themes[my_themes];
    

    
    const itemQ = currentThemeQuestions[index];

    const itemDev = document.createElement('div');
    const itemTitle = document.createElement('p');

    itemTitle.textContent = "Question " + (index + 1) + ": " + itemQ.q;
   
    itemDev.appendChild(itemTitle);
    
    const timerDisplay = document.createElement('div');
    timerDisplay.id = 'question-timer';
    timerDisplay.textContent = 'Temps restant: ' + questionTimeLeft + ' secondes';
    itemDev.appendChild(timerDisplay);
    
    questionTimer = setInterval(function() {
        questionTimeLeft--;
  
            timerDisplay.textContent = 'Temps restant: ' + questionTimeLeft + ' secondes';
       
        if(questionTimeLeft <= 0) {
            clearInterval(questionTimer);
            skipToNextQuestion(itemDev, itemQ);
        }
    }, 1000);

    let selectedAnswers = [];
    
    for (let i = 0; i < itemQ.options.length; i++) {
        const option = itemQ.options[i];
        
        if(itemQ.multi) {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option-container';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = 'option_' + i;
            checkbox.value = i;
            
            const label = document.createElement('label');
            label.htmlFor = 'option_' + i;
            label.className = 'option-label';
            label.textContent = option;
            
            // Add click event to the container for better UX
            optionDiv.addEventListener('click', function(e) {
                if (e.target !== checkbox) {
                    checkbox.checked = !checkbox.checked;
                }
                // Update visual state
                if (checkbox.checked) {
                    optionDiv.classList.add('selected');
                } else {
                    optionDiv.classList.remove('selected');
                }
            });
            
            // Also handle direct checkbox changes
            checkbox.addEventListener('change', function() {
                if (checkbox.checked) {
                    optionDiv.classList.add('selected');
                } else {
                    optionDiv.classList.remove('selected');
                }
            });
            
            optionDiv.appendChild(checkbox);
            optionDiv.appendChild(label);
            itemDev.appendChild(optionDiv);
            
        } else {
            const btnQ = document.createElement('button');
            btnQ.textContent = option;

            btnQ.addEventListener('click',function(answerBtn, optionIndex){
                return function (){
                    clearInterval(questionTimer);
                    
                    const allButtons = itemDev.querySelectorAll('button');
                    
                    for(let k = 0; k < allButtons.length; k++) {
                        allButtons[k].disabled = true;
                    }

                    if(itemQ.correct.includes(optionIndex)){
                        answerBtn.style.backgroundColor = 'green';
                        answerBtn.style.color = 'white';
                        result++;
                        
                        detailedResults.push({
                            questionId: itemQ.id,
                            question: itemQ.q,
                            userAnswer: [option],
                            correctAnswers: itemQ.correct.map(idx => itemQ.options[idx]),
                            isCorrect: true,
                            questionType: 'single'
                        });
                    } else {
                        answerBtn.style.backgroundColor = 'red';
                        answerBtn.style.color = 'white';
                        
                        detailedResults.push({
                            questionId: itemQ.id,
                            question: itemQ.q,
                            userAnswer: [option],
                            correctAnswers: itemQ.correct.map(idx => itemQ.options[idx]),
                            isCorrect: false,
                            questionType: 'single'
                        });
                        
                        for(let j = 0; j < allButtons.length; j++){
                            if(itemQ.correct.includes(j)){
                                allButtons[j].style.backgroundColor = 'green';
                                allButtons[j].style.color = 'white';
                            }
                        }
                    }            setTimeout(function(){
                currentQuestion++;
                if(currentQuestion < currentThemeQuestions.length){
                    showQuestion(currentQuestion);
                } else {
                    showResults();
                }
            }, 1500);
                }
            }(btnQ, i));
            
            itemDev.appendChild(btnQ);
        }
    }
    
    if(itemQ.multi) {
        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'Confirmer';
        
        submitBtn.addEventListener('click', function(){
            clearInterval(questionTimer);
            
            const checkboxes = itemDev.querySelectorAll('input[type="checkbox"]');
            selectedAnswers = [];
            
            for(let k = 0; k < checkboxes.length; k++) {
                if(checkboxes[k].checked) {
                    selectedAnswers.push(k);
                }
            }
            
            if(selectedAnswers.length === 0) {
                alert('Veuillez sélectionner au moins une réponse!');
                questionTimer = setInterval(function() {
                    questionTimeLeft--;
                    var timerDisplay = document.getElementById('question-timer');
                    if(timerDisplay) {
                        timerDisplay.textContent = 'Temps restant: ' + questionTimeLeft + ' secondes';
                    }
                    if(questionTimeLeft <= 0) {
                        clearInterval(questionTimer);
                        skipToNextQuestion(itemDev, itemQ);
                    }
                }, 1000);
                return;
            }
            
            for(let k = 0; k < checkboxes.length; k++) {
                checkboxes[k].disabled = true;
            }
            submitBtn.disabled = true;
            
            let correctCount = 0;
            let totalCorrect = itemQ.correct.length;
            
            for(let k = 0; k < selectedAnswers.length; k++) {
                if(itemQ.correct.includes(selectedAnswers[k])) {
                    correctCount++;
                }
            }
            
            wrongSelections = [];
            for(let k = 0; k < selectedAnswers.length; k++) {
                if(!itemQ.correct.includes(selectedAnswers[k])) {
                    wrongSelections.push(selectedAnswers[k]);
                }
            }
            
            // Calculate score: correct selections minus wrong selections, but not below 0
            let questionScore = Math.max(0, correctCount - wrongSelections.length);
            
            if(correctCount === totalCorrect && wrongSelections.length === 0) {
                result++;
                questionScore = 1;
                
                detailedResults.push({
                    questionId: itemQ.id,
                    question: itemQ.q,
                    userAnswer: selectedAnswers.map(idx => itemQ.options[idx]),
                    correctAnswers: itemQ.correct.map(idx => itemQ.options[idx]),
                    isCorrect: true,
                    questionType: 'multiple'
                });
            } else if(correctCount > 0 && wrongSelections.length === 0) {
                result += questionScore / totalCorrect;
                
                detailedResults.push({
                    questionId: itemQ.id,
                    question: itemQ.q,
                    userAnswer: selectedAnswers.map(idx => itemQ.options[idx]),
                    correctAnswers: itemQ.correct.map(idx => itemQ.options[idx]),
                    isCorrect: false,
                    questionType: 'multiple',
                    partialCredit: true
                });
            } else {
                detailedResults.push({
                    questionId: itemQ.id,
                    question: itemQ.q,
                    userAnswer: selectedAnswers.map(idx => itemQ.options[idx]),
                    correctAnswers: itemQ.correct.map(idx => itemQ.options[idx]),
                    isCorrect: false,
                    questionType: 'multiple'
                });
            }
            
            for(let k = 0; k < checkboxes.length; k++) {
                var optionContainer = checkboxes[k].parentElement;
                var label = checkboxes[k].nextElementSibling;
                if(itemQ.correct.includes(k)) {
                    label.style.color = 'green';
                    label.style.fontWeight = 'bold';
                    optionContainer.style.borderColor = 'green';
                    optionContainer.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
                } else if(selectedAnswers.includes(k)) {
                    label.style.color = 'red';
                    label.style.fontWeight = 'bold';
                    optionContainer.style.borderColor = 'red';
                    optionContainer.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
                }
            }
            
            setTimeout(function() {
                currentQuestion++;
                if(currentQuestion < currentThemeQuestions.length){
                    showQuestion(currentQuestion);
                } else {
                    showResults();
                }
            }, 2000);
        });
        
        itemDev.appendChild(submitBtn);
    }
    quiz_container.appendChild(itemDev);
}



//console.log(questions[0].o[1])
function showResults() {
    const my_themes = localStorage.getItem('themes');
    const currentThemeQuestions = themes[my_themes];
    
    let feedback = '';
    let feedbacktime = '';
    
    let percentage = Math.round((result / currentThemeQuestions.length) * 100);

    if(percentage >= 80) {
        feedback = 'Excellent!';
    } else if(percentage >= 60) {
        feedback = 'Bien!';
    } else if(percentage >= 40) {
        feedback = 'Peut mieux faire';
    } else {
        feedback = 'Il faut réviser!';
    }

    if(min >= 5){
        feedbacktime = 'You can be faster!';
    } else {
        feedbacktime = 'Good job on time!';
    }

    const quizData = {
        nickname : nickname.value,  
        score: result.toFixed(1),
        totalQuestions: currentThemeQuestions.length,
        percentage: percentage,
        time: time.textContent,
        theme: my_themes,
        feedback: feedback,
        timeFeedback: feedbacktime,
        date: new Date().toISOString(),
        detailedResults: detailedResults
    };
    
    // Get existing results for this nickname or create empty array
    let userResults = JSON.parse(localStorage.getItem(nickname.value)) || [];
    
    userResults.push(quizData);
    
    // Store back in localStorage
    localStorage.setItem(nickname.value, JSON.stringify(userResults));
    
    //console.log('Quiz results saved for:', nickname.value);
    
    quiz_container.innerHTML = '<div class="results-container">' +
            '<h2>Résultats du Quiz</h2>' +
            '<p class="score">Score: ' + result.toFixed(1) + '/' + currentThemeQuestions.length + '</p>' +
            '<p class="percentage">Pourcentage: ' + percentage + '%</p>' +
            '<p class="time">Temps: ' + time.textContent + '</p>' +
            '<p class="feedback">' + feedback + '</p>' +
            '<p class="time-feedback">' + feedbacktime + '</p>' +
            '<p class="congratulations">Félicitations ' + nickname.value + '!</p>' +
            '<button id="download-pdf" style="margin-top: 20px; padding: 10px 20px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">Télécharger PDF</button>' +
            '<button id="restart-btn" style="margin-top: 10px; padding: 10px 20px; background-color: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">Recommencer</button>' +
        '</div>';
    
    const downloadBtn = document.getElementById('download-pdf');
    downloadBtn.addEventListener('click', function() {
        generatePDF(quizData);
    });
    
    const restartBtn = document.getElementById('restart-btn');
    restartBtn.addEventListener('click', function() {
        // Reset all variables
        currentQuestion = 0;
        result = 0;
        min = 0;
        number = 0;
        detailedResults = [];
        optioncart = false;
        
        // Clear timers
        clearInterval(timeqcm);
        clearInterval(questionTimer);
        
        // Reset display
        quiz_container.style.display = 'none';
        Start_btn.style.display = '';
        Start_btn.hidden = false;
        name_modal.hidden = false;
        time.hidden = false;
        time.textContent = '';
        
        // Clear cart selections
        const radios = document.querySelectorAll('input[type="radio"]');
        for(let i = 0; i < radios.length; i++) {
            radios[i].checked = false;
        }
        
        // Reset cart styles
        const allCarts = document.getElementsByClassName('cart');
        for(let i = 0; i < allCarts.length; i++) {
            allCarts[i].style.borderColor = '';
            allCarts[i].style.boxShadow = '';
            const h3 = allCarts[i].querySelector('h3');
            if(h3) h3.style.color = '';
        }
    });
    
    time.hidden = true;
    clearInterval(timeqcm);
    clearInterval(questionTimer); // Clear question timer too
}

function skipToNextQuestion(itemDev, itemQ) {
    
    detailedResults.push({
        questionId: itemQ.id,
        question: itemQ.q,
        userAnswer: ['Pas de réponse (temps écoulé)'],
        correctAnswers: itemQ.correct.map(idx => itemQ.options[idx]),
        isCorrect: false,
        questionType: itemQ.multi ? 'multiple' : 'single',
        timedOut: true
    });
    
    
    const timeUpMsg = document.createElement('div');
    timeUpMsg.className = 'time-up-message';
    timeUpMsg.textContent = 'Temps écoulé! Passage à la question suivante...';
    
    itemDev.appendChild(timeUpMsg);
    
    // Disable all interactive elements
    buttons = itemDev.querySelectorAll('button');
    checkboxes = itemDev.querySelectorAll('input[type="checkbox"]');
    
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }
    for(let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].disabled = true;
    }
    
    
    if(itemQ.multi) {
        for(let i = 0; i < checkboxes.length; i++) {
            var optionContainer = checkboxes[i].parentElement;
            var label = checkboxes[i].nextElementSibling;
            if(itemQ.correct.includes(i)) {
                label.style.color = 'green';
                label.style.fontWeight = 'bold';
                optionContainer.style.borderColor = 'green';
                optionContainer.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
            }
        }
    } else {
        for(let i = 0; i < buttons.length; i++) {
            if(itemQ.correct.includes(i)) {
                buttons[i].style.backgroundColor = 'green';
                buttons[i].style.color = 'white';
            }
        }
    }
    
    // Move to next question after showing correct answers
    setTimeout(function() {
        var my_themes = localStorage.getItem('themes');
        var currentThemeQuestions = themes[my_themes];
        
        currentQuestion++;
        if(currentQuestion < currentThemeQuestions.length){
            showQuestion(currentQuestion);
        } else {
            showResults();
        }
    }, 2000);
}

function generatePDF(quizData) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    
    doc.setFontSize(20);
    doc.text('RESULTATS DU QUIZ', 20, 30);
    
    doc.setFontSize(12);
    let yPosition = 50;
    
    // Basic info
    doc.text('Nom: ' + quizData.nickname, 20, yPosition);
    yPosition += 10;
    doc.text('Theme: ' + quizData.theme, 20, yPosition);
    yPosition += 10;
    doc.text('Date: ' + new Date(quizData.date).toLocaleDateString('fr-FR'), 20, yPosition);
    yPosition += 10;
    doc.text('Score: ' + quizData.score + '/' + quizData.totalQuestions, 20, yPosition);
    yPosition += 10;
    doc.text('Pourcentage: ' + quizData.percentage + '%', 20, yPosition);
    yPosition += 10;
    doc.text('Temps: ' + quizData.time, 20, yPosition);
    yPosition += 10;
    doc.text('Evaluation: ' + quizData.feedback, 20, yPosition);
    yPosition += 10;
    doc.text('Temps: ' + quizData.timeFeedback, 20, yPosition);
    yPosition += 20;
    
    // Details section
    doc.setFontSize(14);
    doc.text('DETAILS DES QUESTIONS:', 20, yPosition);
    yPosition += 15;
    
    doc.setFontSize(10);
    for(let i = 0; i < quizData.detailedResults.length; i++) {
        let detail = quizData.detailedResults[i];
        
        // Check if we need a new page
        if(yPosition > 250) {
            doc.addPage();
            yPosition = 20;
        }
        
        doc.setFont(undefined, 'bold');
        doc.text('Question ' + (i + 1) + ':', 20, yPosition);
        yPosition += 8;
        
        doc.setFont(undefined, 'normal');
        // Split long questions into multiple lines
        const questionLines = doc.splitTextToSize(detail.question, 170);
        doc.text(questionLines, 20, yPosition);
        yPosition += questionLines.length * 6 + 5;
        
        doc.text('Votre reponse: ' + detail.userAnswer.join(', '), 20, yPosition);
        yPosition += 8;
        
        doc.text('Reponse correcte: ' + detail.correctAnswers.join(', '), 20, yPosition);
        yPosition += 8;
        
        if(detail.isCorrect) {
            doc.setTextColor(0, 128, 0); 
            doc.text('Resultat: CORRECT', 20, yPosition);
        } else {
            doc.setTextColor(255, 0, 0); 
            doc.text('Resultat: INCORRECT', 20, yPosition);
        }
        doc.setTextColor(0, 0, 0); 
        yPosition += 8;
        
        if(detail.partialCredit) {
            doc.text('(Credit partiel accorde)', 20, yPosition);
            yPosition += 8;
        }
        if(detail.timedOut) {
            doc.text('(Temps ecoule)', 20, yPosition);
            yPosition += 8;
        }
        
        yPosition += 10;
    }
    

    // Save the PDF
    const fileName = 'Quiz_Results_' + quizData.nickname + '_' + new Date().toISOString().split('T')[0] + '.pdf';
    doc.save(fileName);
}