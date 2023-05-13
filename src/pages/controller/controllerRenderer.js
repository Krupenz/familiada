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