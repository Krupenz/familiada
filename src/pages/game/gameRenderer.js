console.log("game renderer process");
const API = window.API;

window.API.getQuestion((event, data) => {
    console.log('get Question is handled in main window')
    console.log(data);
});

window.API.revealAnswer((event, answerId, answer) => {
    const answerText = answer.text.padEnd(25, '.');
    const answerContainer = document.getElementById(`${answerId}`)
    console.log(answerContainer)
    const answerTextContainer = answerContainer.getElementsByClassName('answer')
    console.log(answerTextContainer)
    const answerScoreContainer = answerContainer.getElementsByClassName('answer-score')
    answerTextContainer[0].textContent = answerText
    answerScoreContainer[0].textContent = answer.points
});