console.log("controller renderer process");

var items = document.getElementsByClassName("list-group-item active");

const confirmButton= document.getElementById('confirmButton');
confirmButton.addEventListener('click', () => {
    //const choosenAnswer = document.getElementsByClassName('list-group-item active');
    const element = document.querySelector('.active');
    if (element) {
        console.log(element)
        console.log(element.innerHTML)
        const errorMessageContainer = document.querySelector('.error-message');
        errorMessageContainer.innerHTML=''
    }
    else {
        const errorMessageContainer = document.querySelector('.error-message');
        errorMessageContainer.innerHTML='Wybierz odpowiedź!'
    }
});

window.API.getQuestion((event, data) => {
    const questionContainer = document.querySelector('.question');
    questionContainer.textContent= data['question'];
    for (let answerId = 1; answerId<6; answerId++) {
        const answerContainer = document.querySelector(`#answer${answerId}`);
        const answerKey = `answer${answerId}`;
        answerContainer.textContent = data[answerKey].text;
    }
});