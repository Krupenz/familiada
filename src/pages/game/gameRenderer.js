console.log("game renderer process");
const API = window.API;

window.API.getQuestion((event, data) => {
    console.log(data);
    const centerColumn = document.getElementById(`center-column`);
    for (let answerId = 0; answerId < data['answers'].length; answerId++) {
        const newRow = createAnswerRow(answerId)
        console.log(newRow)
        console.log(centerColumn)
        centerColumn[0].appendChild(newRow)
    }
});

window.API.revealAnswer((event, answerId, answer) => {
    const answerContainer = document.getElementById(`${answerId}`)
    const answerTextContainer = answerContainer.getElementsByClassName('answer')
    const answerScoreContainer = answerContainer.getElementsByClassName('answer-score')
    answerTextContainer[0].textContent = answer.text
    answerScoreContainer[0].textContent = answer.points
});


const createAnswerRow = (answerId) => {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    rowDiv.id = `${answerId}`;

    const numberDiv = document.createElement("div");
    numberDiv.classList.add("answer-number");
    numberDiv.innerText = `${answerId+1}`;
    rowDiv.appendChild(numberDiv);

    const answerDiv = document.createElement("div");
    answerDiv.classList.add("answer");
    answerDiv.innerText = "...........................";
    rowDiv.appendChild(answerDiv);

    const scoreDiv = document.createElement("div");
    scoreDiv.classList.add("answer-score");
    scoreDiv.innerText = "--";
    rowDiv.appendChild(scoreDiv);

    return rowDiv;
}