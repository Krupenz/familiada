console.log("controller renderer process");

window.API.getQuestion((event, data) => {
    const questionContainer = document.getElementsByClassName('question');
    const listGroupContainer = document.getElementById('answer-list');
    questionContainer[0].textContent = data['question'];
    for (let answerId = 0; answerId < data['answers'].length; answerId++) {
        const answerButton = createAnswerButton(data, answerId)
        listGroupContainer.appendChild(answerButton)
        answerButton.addEventListener('click', (event) => {
            const clickedButton = event.currentTarget;
            window.API.sendAnswer(clickedButton.id);
            clickedButton.classList.add("disabled");
        });
    }
});

const firstFailTeamOneButton = document.getElementById("team1-cross-1");
const secondFailTeamOneButton = document.getElementById("team1-cross-2");
const thirdFailTeamOneButton = document.getElementById("team1-cross-3");
const firstFailTeamTwoButton = document.getElementById("team2-cross-1");
const secondFailTeamTwoButton = document.getElementById("team2-cross-2");
const thirdFailTeamTwoButton = document.getElementById("team2-cross-3");

firstFailTeamOneButton.addEventListener('click', handleClick(firstFailTeamOneButton.id))
secondFailTeamOneButton.addEventListener('click', handleClick(secondFailTeamOneButton.id))
thirdFailTeamOneButton.addEventListener('click', handleClick(thirdFailTeamOneButton.id))
firstFailTeamTwoButton.addEventListener('click', handleClick(firstFailTeamTwoButton.id))
secondFailTeamTwoButton.addEventListener('click', handleClick(secondFailTeamTwoButton.id))
thirdFailTeamTwoButton.addEventListener('click', handleClick(thirdFailTeamTwoButton.id))


const handleClick = (buttonId) => {
    window.API.sendFail(buttonId);
}

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