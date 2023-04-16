console.log("controller renderer process");

var items = document.getElementsByClassName("list-group-item active");

const confirmButton= document.getElementById('confirmButton');
confirmButton.addEventListener('click', () => {
    const choosenAnswer = document.getElementsByClassName('list-group-item active');
    if (choosenAnswer) {
        console.log(choosenAnswer.innerText)
    }
    else {
        console.log('no item was selected')
    }
});