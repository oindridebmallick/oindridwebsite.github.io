const questions = [
    { question: "Do you enjoy problem-solving?", options: ["Yes", "No"] },
    { question: "Do you prefer working alone or in a team?", options: ["Alone", "Team"] },
    { question: "Are you more creative or analytical?", options: ["Creative", "Analytical"] },
    { question: "Do you enjoy working with technology?", options: ["Yes", "No"] },
    { question: "Do you like helping people?", options: ["Yes", "No"] },
    { question: "Do you enjoy writing?", options: ["Yes", "No"] },
    { question: "Do you like working with numbers?", options: ["Yes", "No"] },
    { question: "Are you interested in designing visuals?", options: ["Yes", "No"] },
    { question: "Do you like researching new things?", options: ["Yes", "No"] },
    { question: "Are you comfortable speaking in front of an audience?", options: ["Yes", "No"] },
    { question: "Do you enjoy analyzing data?", options: ["Yes", "No"] },
    { question: "Do you like working in healthcare?", options: ["Yes", "No"] },
    { question: "Are you interested in business management?", options: ["Yes", "No"] },
    { question: "Do you enjoy coding and software development?", options: ["Yes", "No"] },
    { question: "Would you like a career in teaching or training others?", options: ["Yes", "No"] }
];

const quizContainer = document.getElementById("questions");
const resultContainer = document.getElementById("result");
const nextButton = document.getElementById("nextButton");
const prevButton = document.getElementById("prevButton");
let currentQuestionIndex = 0;
let answers = [];

function loadQuiz() {
    quizContainer.innerHTML = "";
    let q = questions[currentQuestionIndex];
    let div = document.createElement("div");
    div.classList.add("question-block");
    div.innerHTML = `<p><strong>${currentQuestionIndex + 1}. ${q.question}</strong></p>`;

    q.options.forEach(option => {
        div.innerHTML += `
            <label style="display: block; padding: 10px; background-color: #C5DFA0; border-radius: 5px; margin: 5px 0; cursor: pointer;">
                <input type='radio' name='q${currentQuestionIndex}' value='${option}' style='accent-color: #FFBA49;'> ${option}
            </label>`;
    });
    quizContainer.appendChild(div);
    prevButton.style.display = currentQuestionIndex === 0 ? "none" : "inline-block";
    nextButton.innerText = currentQuestionIndex === questions.length - 1 ? "Submit" : "Next";
}

function nextQuestion() {
    let selected = document.querySelector(`input[name='q${currentQuestionIndex}']:checked`);

    if (!selected) {
        resultContainer.innerHTML = "Please select an answer!";
        return;
    }
    answers[currentQuestionIndex] = selected.value;
    resultContainer.innerHTML = "";
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuiz();
    } else {
        submitQuiz();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuiz();
    }
}

function submitQuiz() {
    let career = determineCareer(answers);
    sessionStorage.setItem("careerResult", career);
    window.location.href = "result.html";
}

function determineCareer(answers) {
    let scores = { tech: 0, creative: 0, social: 0, business: 0 };

    if (answers.includes("Yes") && answers.includes("Analytical")) scores.tech++;
    if (answers.includes("Creative")) scores.creative++;
    if (answers.includes("Helping people")) scores.social++;
    if (answers.includes("Business management")) scores.business++;
    
    let highest = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

    let careerSuggestions = {
        tech: "Software Developer or Data Scientist",
        creative: "Graphic Designer or Content Creator",
        social: "Psychologist or Social Worker",
        business: "Entrepreneur or Financial Analyst"
    };

    return careerSuggestions[highest];
}

document.addEventListener("DOMContentLoaded", loadQuiz);
nextButton.addEventListener("click", nextQuestion);
prevButton.addEventListener("click", prevQuestion);