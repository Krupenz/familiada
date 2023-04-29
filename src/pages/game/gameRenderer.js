console.log("game renderer process");
const API = window.API;

const answersBox = document.getElementsByClassName('answers-box');

window.API.getQuestion((event, data) => {
    console.log('get Question is handled in main window')
    console.log(data);
});

window.API.revealAnswer((event, answer) => {
    console.log(answer);
});