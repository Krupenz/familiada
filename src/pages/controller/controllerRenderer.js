console.log("controller renderer process");
//initial values
let globalState = 'firstAnswer';

const gameHelper = document.getElementById('game-helper')

const confirmButton = document.getElementById('confirmButton');
confirmButton.addEventListener('click', () => {
    const selectedAnswer = document.getElementById('list-tab-answers').querySelector('.active');
    const selectedTeam = document.getElementById('list-tab-teams').querySelector('.active');
    const secondaryTeam = getOppositeTeam(selectedTeam.id)
    if (selectedAnswer && selectedTeam) {
        window.API.sendAnswer(selectedAnswer.id, selectedTeam.id);
        switch (globalState) {
            case 'firstAnswer':
                firstAnswerHandler()
                break;
            case 'answerChallenge':
                break;
            case 'oppositeTeamChance':
                break;
            case 'teamAnswers':
                break;
        }
        if ( isFirstAnswer ) {
            //check if first answer was the best one - if yes - don't allow other team to answer

            isFirstAnswer = false;
        } else if (isAnswerChallenge) {
            console.log(selectedAnswer.id)
            console.log(firstAnswerInAnswerChallenge.id)
            if( selectedAnswer.id !== '-1' && selectedAnswer.id < firstAnswerInAnswerChallenge.id) {
                gameHelper.textContent = `Drużyna ${selectedTeam.id} udzieliła lepszej odpowiedzi niż drużyna ${secondaryTeam.id}. To ona kontynuuje odpowiedzi na to pytanie`
            }
            isAnswerChallenge = false;
        }
        isFirstAnswer = false;

        //reset answer buttons
        selectedAnswer.classList.remove('active');
        //disable already revealed answer
        if ( selectedAnswer.id !== '-1' ){
            selectedAnswer.classList.add('disabled');
        }
        const errorMessageContainer = document.querySelector('.error-message');
        errorMessageContainer.textContent = ''
    }
    else {
        const errorMessageContainer = document.querySelector('.error-message');
        errorMessageContainer.textContent = 'Wybierz odpowiedź oraz drużyne!'
    }
});

window.API.getQuestion((event, data) => {
    const questionContainer = document.getElementsByClassName('question');
    questionContainer[0].textContent = data['question'];
    for (let answerId = 0; answerId < data['answers'].length; answerId++) {
        const answerContainer = document.getElementById(`${answerId}`);
        answerContainer.textContent = data['answers'][answerId].text;
    }
    isFirstAnswer = true;
});

const firstAnswerHandler = (selectedAnswer, selectedTeam) => {
    const oppositeTeam = getOppositeTeam(selectedTeam.id)
    if ( selectedAnswer.id = '-1' ) {
        gameHelper.textContent = `Drużyna ${selectedTeam.id} udzieliła błędnej odpowiedzi. Szansa dla drużyny ${oppositeTeam.id}`
        globalState = 'oppositeTeamChance'
        lockAnswerForTeam(secondaryTeam)
    } else if ( selectedAnswer.id === '0' ) {
        // secondaryTeam is not allowed to answer
        gameHelper.textContent = `Drużyna ${selectedTeam.id} udzieliła najlepszej odpowiedzi. Pytanie jest przekazywane do drużyny ${selectedTeam.id}`
        lockAnswerForTeam(selectedTeam)
    } else {
        //first answer was not the best one, allow other team to answer
        firstAnswerInAnswerChallenge = selectedAnswer
        gameHelper.textContent = `Drużyna ${selectedTeam.id} nie udzieliła najlepszej odpowiedzi. Drużyna ${secondaryTeam.id} ma szansę na lepszą odpowiedź`
        lockAnswerForTeam(secondaryTeam)
        globalState = 'answerChallenge'
    }
}

const getOppositeTeam = (selectedTeamId) => {
    if ( selectedTeamId === 'team1' ) {
        return document.getElementById('team2');
    } else {
        return document.getElementById('team1');
    }
}

const lockAnswerForTeam = (team) => {
    const oppositeTeam = getOppositeTeam(team)
    oppositeTeam.classList.remove('active');
    oppositeTeam.classList.add('disabled');
    team.classList.add('active');
}