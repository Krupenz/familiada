console.log("game renderer process");
const API = window.API;

window.API.getQuestion((event, data) => {
    console.log(data);
    const centerColumn = document.getElementById(`center-column`);
    for (let answerId = 0; answerId < data['answers'].length; answerId++) {
        const newRow = createAnswerRow(answerId)
        console.log(newRow)
        console.log(centerColumn)
        centerColumn.appendChild(newRow)
    }
    centerColumn.appendChild(createPointsBank())
});

window.API.revealAnswer((event, answerId, answer) => {
    const answerContainer = document.getElementById(`${answerId}`)
    const answerTextContainer = answerContainer.getElementsByClassName('answer')
    const answerScoreContainer = answerContainer.getElementsByClassName('answer-score')
    answerTextContainer[0].textContent = answer.text
    answerScoreContainer[0].textContent = answer.points
});

window.API.revealFail((event, buttonId) => {
    const crossContainer = document.getElementById(buttonId);
    crossContainer.textContent = 'X';
})

window.API.updatePointsSum((event, pointsSum) => {
    console.log(pointsSum)
    const pointsSumContainer = document.getElementById('pointsSumValue');
    pointsSumContainer.textContent = pointsSum;
})


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
    scoreDiv.innerText = "- -";
    rowDiv.appendChild(scoreDiv);

    return rowDiv;
}

const createPointsBank = () => {
    const bankContainer = document.createElement("div");
    bankContainer.id = `bank`;

    const textSum = document.createElement("span");
    textSum.innerText = `SUMA`;
    bankContainer.appendChild(textSum);

    const points = document.createElement("span");
    points.id = 'pointsSumValue'
    points.innerText = ``;
    bankContainer.appendChild(points);

    return bankContainer;
}