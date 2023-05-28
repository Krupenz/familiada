console.log("controller renderer process");

let pointsSum = 0;

const firstFailTeamOneButton = document.getElementById("team1-cross-1");
const secondFailTeamOneButton = document.getElementById("team1-cross-2");
const thirdFailTeamOneButton = document.getElementById("team1-cross-3");
const firstFailTeamTwoButton = document.getElementById("team2-cross-1");
const secondFailTeamTwoButton = document.getElementById("team2-cross-2");
const thirdFailTeamTwoButton = document.getElementById("team2-cross-3");

const handleClick = (buttonId) => {
    window.API.sendFail(buttonId);
}

firstFailTeamOneButton.addEventListener('click', (event) => {handleClick(event.currentTarget.id)});
secondFailTeamOneButton.addEventListener('click', (event) => {handleClick(event.currentTarget.id)});
thirdFailTeamOneButton.addEventListener('click', (event) => {handleClick(event.currentTarget.id)});
firstFailTeamTwoButton.addEventListener('click', (event) => {handleClick(event.currentTarget.id)});
secondFailTeamTwoButton.addEventListener('click', (event) => {handleClick(event.currentTarget.id)});
thirdFailTeamTwoButton.addEventListener('click', (event) => {handleClick(event.currentTarget.id)});

const createAnswerButton = (data, answerId) => {
    const listItem = document.createElement("button");
    listItem.classList.add("btn");
    listItem.classList.add("btn-primary");
    listItem.id = `${answerId}`;

    const spanText = document.createElement("span");
    spanText.classList.add(`${answerId}-text`);
    spanText.textContent = data['answers'][answerId].text;
    listItem.appendChild(spanText);

    const spanPoints = document.createElement("span");
    spanPoints.classList.add(`${answerId}-points`);
    spanPoints.classList.add("badge");
    spanPoints.classList.add("badge-primary");
    spanPoints.classList.add("badge-pill");
    spanPoints.textContent = data['answers'][answerId].points;
    listItem.appendChild(spanPoints);

    return listItem;
}

window.API.getQuestion((event, data) => {
    const questionContainer = document.getElementsByClassName('question');
    const listGroupContainer = document.getElementById('answer-list');
    questionContainer[0].textContent = data['question'];
    for (let answerId = 0; answerId < data['answers'].length; answerId++) {
        const answerButton = createAnswerButton(data, answerId)
        listGroupContainer.appendChild(answerButton)
        answerButton.addEventListener('click', (event) => {
            const clickedButton = event.currentTarget;
            console.log(data['answers'][answerId].points);
            pointsSum += data['answers'][answerId].points;
            console.log(pointsSum);
            window.API.sendAnswer(clickedButton.id, pointsSum);
            clickedButton.classList.add("disabled");
        });
    }
});
const teamsList = document.getElementById("list-tab-teams")
const endRoundButton = document.getElementById("end-round-button");

var items = document.getElementsByClassName("list-group-item active");

endRoundButton.addEventListener('click', () => {
    const teamsList = document.querySelector('.active');
    if (teamsList) {
        const errorMessageContainer = document.querySelector('.error-message');
        errorMessageContainer.textContent = ''
    }
    else {
        const errorMessageContainer = document.querySelector('.error-message');
        errorMessageContainer.textContent = 'Wybierz wygraną drużynę!'
    }
});
