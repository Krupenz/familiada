console.log("game renderer process");
const API = window.API;

const answersBox = document.getElementsByClassName('answers-box');

window.API.getQuestion((event, data) => {
    console.log(data);
});
// window.electronAPI.handleCounter((event, value) => {
//     const oldValue = Number(counter.innerText)
//     const newValue = oldValue + value
//     counter.innerText = newValue
//     event.sender.send('counter-value', newValue)
// })