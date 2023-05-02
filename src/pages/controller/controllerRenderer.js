console.log("controller renderer process");

var items = document.getElementsByClassName("list-group-item active");

const confirmButton = document.getElementById('confirmButton');
confirmButton.addEventListener('click', () => {
    const element = document.querySelector('.active');
    if (element) {
        window.API.sendAnswer(element.id);
        const errorMessageContainer = document.querySelector('.error-message');
        errorMessageContainer.textContent = ''
    }
    else {
        const errorMessageContainer = document.querySelector('.error-message');
        errorMessageContainer.textContent = 'Wybierz odpowiedź!'
    }
});

window.API.getQuestion((event, data) => {
    const questionContainer = document.querySelector('.question');
    questionContainer.textContent = data['question'];
    for (let answerId = 1; answerId < 6; answerId++) {
        const answerContainer = document.querySelector(`#answer${answerId}`);
        const answerKey = `answer${answerId}`;
        answerContainer.textContent = data[answerKey].text;
    }
});