//*************************** HACK THE MAINFRAME *************************** //

console.log(`close call`);

// ***** THINGS TO CONSIDER ***** //
// typewriter effect?

// ***** THINGS TO DO ***** //

// questions and answers object
const triviaQA = [

    {
        question: "What is the name of Tom Cruise’s character in the Mission Impossible film series?",
        answersArray: [
            "Ethan Hawke",
            "James Hunt",
            "Ethan Hunt",
            "Ethan Allen"
        ],
        attemptedAnswer: false,
        correctAnswer: "Ethan Hunt",
    },

    {
        question: "What opera was featured in the 2015 Mission Impossible film?",
        answersArray: [
            "Madame Butterfly",
            "Turandot",
            "Porgy & Bess",
            "Carmen"
        ],
        attemptedAnswer: false,
        correctAnswer: "Turandot",
    },

    {
        question: "Does Ethan’s wife, Julia, die in the series?",
        answersArray: [
            "True",
            "False"
        ],
        attemptedAnswer: false,
        correctAnswer: "False"
    },

    {
        question: "The character William, played by Jeremy Renner, also stars in all of the films below except for:",
        answersArray: [
            `Kill Bill`,
            "S.W.A.T.",
            "The Bourne Legacy",
            "The Hurt Locker",
        ],
        attemptedAnswer: false,
        correctAnswer: `Kill Bill`,
    },

    {
        question: `Fill in the blank. 
        Mission Impossible: Ghost __________.`,

        answersArray: 
        [
            "Recon",
            "Nation",
            "Renegade",
            "Protocol"
        ],
        attemptedAnswer: false,
        correctAnswer: "Protocol"
    },

    // userAnswers = [] rendered useless by function clickAnswer below

    userScore = 0,

    maxWrong = 0,

    //gameInstructions = "Answer the questions to download more files. If you get three wrong, download stops and the mission fails. Get 4 or more correct and you move on to the password page. Input the correct password to get all the files and complete your mission. Good luck."
];

// password QA
const password = {

    passwordInstructions: [`Answer the following question, using ONLY 5 letters from the words in the hint below.`],

    passwordQuestion: [
        `At end of the famous scene shown in the clip at the beginning of the game, Ethan and his crew leave something behind on the computer desk. 
        What did they leave?`
    ],

    passwordClues: [`hint: eTHAN HUNT, TURAnDOT, fALSE, kILL BiLL, PROTOCOL. Use the letters: f-e-n-i-k`],

    passwordAnswer: "knife"

};
// addEventListener to start button and removes video
document.getElementById("start-button").addEventListener("click", video);

function video() {
    let removeVideo = document.getElementById('video-div');
        removeVideo.remove();
    
    let gameInstructions = document.createElement("p");
        gameInstructions.innerHTML = "Answer the questions to download more files."
        + "<br />" + "Get 3 WRONG, the download stops and the mission has failed." 
        + "<br />" + "Get 4 OR MORE correct and use letters from the answers to break the password." 
        + "<br />" + "Get all the files and complete your mission." 
        + "<br />" + "Click on F1 to get started. Good luck.";
        document.getElementById("start").appendChild(gameInstructions);
}

// on F1 - F5 CLICK, corresponding question displayed
let displayedQuestion = 0; // used displayedQuestion in clickAnswer function

function question(event) {
    if (event.target.innerHTML === "F1") {
        displayedQuestion = 0;
    } else if (event.target.innerHTML === "F2") {
        displayedQuestion = 1;
    } else if (event.target.innerHTML === "F3") {
        displayedQuestion = 2;
    } else if (event.target.innerHTML === "F4") {
        displayedQuestion = 3;
    } else if (event.target.innerHTML === "F5") {
        displayedQuestion = 4;
    }

    let question;
        let check = document.querySelector("h1");

        if (check == null) {
            question = document.createElement("h1");
            question.innerHTML = triviaQA[displayedQuestion].question;
            document.getElementById("qa").appendChild(question);
        } else {
            check.remove();
            question = document.createElement("h1");
            question.innerHTML = triviaQA[displayedQuestion].question;
            document.getElementById("qa").appendChild(question);
        }

        let answers;
            answers = document.createElement("ol");
    
            for (let i = 0; i < triviaQA[displayedQuestion].answersArray.length; i++) {
            let answersList = document.createElement("li");
                answersList.innerHTML = triviaQA[displayedQuestion].answersArray[i];
                answersList.setAttribute("class", "answer");
                answers.appendChild(answersList);   
            }
        
        question.appendChild(answers);
        document.querySelector('ol').addEventListener('click', clickAnswer);

        let downloadBar = document.createElement("div");
            downloadBar.innerHTML = "Downloading...";
            downloadBar.setAttribute("id", "download");
            downloadBar.setAttribute("class", "blinking");
            answers.appendChild(downloadBar);

        // grays out f1 - f5 buttons
        event.target.style.background = "#575C5C";
        event.target.style.cursor = 'help';
};

// adds event listener for F1 - F5 buttons
document.querySelectorAll(".question").forEach(function(button) {
    button.addEventListener("click", question);
});

// click event targets li and checks innerText against triviaQA array's correctAnswer at displayedQuestion
// can console log score, mission complete and mission failed.
function clickAnswer (event) {
    if (event.target.innerText === triviaQA[displayedQuestion].correctAnswer) {
        console.log(userScore += 1);
        event.target.style.background = "#f9f90b80";
    } else {
        event.target.style.background = "#ea5757";
        console.log(maxWrong += 1);
            if (maxWrong === 3) {
        console.log(`user exceeded max wrong`);

        // removes other elements from 'screen'
        document.getElementById('download').remove();
        document.getElementById('qa').remove();
        document.getElementById('fButtons').remove();

        // adds try again gif and text
        let threeWrong = document.createElement("img");
            threeWrong.setAttribute("src", "https://media0.giphy.com/media/MrCYIN3x0SgdG/giphy.gif");
            threeWrong.setAttribute("id", "img");
            document.getElementById("three-wrong-div").appendChild(threeWrong);

        let threeWrongMessage = document.createElement("h1");
            threeWrongMessage.innerHTML = "DOWNLOAD FAILED";
            threeWrongMessage.setAttribute("class", "blinking");
            document.getElementById("three-wrong-div").appendChild(threeWrongMessage);
        
        // lets user redirect 
        let threeWrongAnchor = document.createElement("a");
            threeWrongAnchor.innerHTML = "try again?";
            document.getElementById("three-wrong-div").appendChild(threeWrongAnchor);

            threeWrongAnchor.addEventListener("click", function(){
                    location.reload();
            });
    }
}
questionsComplete();
};

// function reload() {
//     location.reload();
// }

// ANSWERS TEST
// 4 right, 1 wrong = below function works!
// 3 right, 2 wrong = below function works!
// 2 right, 1 wrong, 2 right = below function works!

// 1 wrong, 4 right = below function works!
// 1 wrong, 2 right, 2 wrong = mission failed! above function works!
// 2 wrong, 3 right = below function works!
// 3 wrong, 2 right = mission failed! above function works!

function questionsComplete() {
        if (((userScore >= 4) && (maxWrong >= 1)) || ((userScore >=3) && (maxWrong >= 2)) || (userScore === 5)) {
            console.log(`'files ready to download' buttons populates. user moves to password state`);

        let passwordButton = document.createElement("button");
            passwordButton.setAttribute("id", "password");
            passwordButton.innerHTML = "FILES READY TO DOWNLOAD";
            document.getElementById("files-ready").appendChild(passwordButton);
        
            document.getElementById("password").addEventListener('click', clickPassword);
}
// }
};

// opens up password state
function clickPassword(event) {
    if (event.target.innerHTML === "FILES READY TO DOWNLOAD") {

        //remove download
        let removeDownload = document.getElementById('download');
            removeDownload.remove();

        //remove button (may not need if can disable f1-f5 buttons)
        let removeFilesDownloadButton = document.getElementById('password');
            removeFilesDownloadButton.remove();
        
        let passwordh1;
        let passwordQuestion;
        let passwordClue;
        let check = document.querySelector("h1");

        if (check == null) {
            passwordh1 = document.createElement("h1");
            passwordh1.setAttribute("id", "password");
            passwordh1.innerHTML = `${password.passwordInstructions}`
            document.getElementById("password-state").appendChild(passwordh1);

            passwordQuestion = document.createElement("h1");
            passwordQuestion.setAttribute("id", "password");
            passwordQuestion.innerHTML = `${password.passwordQuestion}`;
            document.getElementById("password-state").appendChild(passwordQuestion);

            passwordClue = document.createElement("h3");
            passwordClue.setAttribute("id", "password");
            passwordClue.innerHTML =`${password.passwordClues}`
            document.getElementById("password-state").appendChild(passwordClue);

        } else {
            check.remove();

            passwordh1 = document.createElement("h1");
            passwordh1.setAttribute("id", "password");
            passwordh1.innerHTML = `${password.passwordInstructions}`
            document.getElementById("password-state").appendChild(passwordh1);

            passwordQuestion = document.createElement("h1");
            passwordQuestion.setAttribute("id", "password");
            passwordQuestion.innerHTML = `${password.passwordQuestion}`;
            document.getElementById("password-state").appendChild(passwordQuestion);

            passwordClue = document.createElement("h3");
            passwordClue.setAttribute("id", "password");
            passwordClue.innerHTML =`${password.passwordClues}`
            document.getElementById("password-state").appendChild(passwordClue);
        }

        // password input box
        let passwordInput = document.createElement("input");
            passwordInput.setAttribute("type", "text");
            passwordInput.setAttribute("minlength", "5");
            passwordInput.setAttribute("maxlength", "5");
            passwordInput.setAttribute("id", "password-input");
            passwordInput.setAttribute("style", "font-size: 25px");
            //passwordInput.innerHTML = "5 LETTER WORD"; doesn't work
            //need? passwordInput.setAttribute("spellcheck", "true") 
            document.getElementById('password-state').appendChild(passwordInput);

        // password ENTER button
        let passwordInputButton = document.createElement("button");
            passwordInputButton.setAttribute("id", "pass-input-button");
            passwordInputButton.innerHTML = "Enter"
            document.getElementById('password-state').appendChild(passwordInputButton);
    }
            document.getElementById("pass-input-button").addEventListener('click', checkPasswordInput);
};

// checks users input for password prompt
function checkPasswordInput() { 
    let passwordAnswerCheck = document.getElementById('password-input').value;

    let missionStatusDiv = document.createElement("div");
        missionStatusDiv.setAttribute("id", "mission-state");
        document.getElementById("blank-computer-screen").appendChild(missionStatusDiv);
    
        if (password.passwordAnswer === passwordAnswerCheck.toLowerCase()) {

                document.getElementById("password-state").remove();

            console.log(`---MISSION COMPLETE!---`);

            let missionComplete = document.createElement("img");
                missionComplete.setAttribute("src", "https://filmschoolrejects.com/wp-content/uploads/2018/08/Mission-Impossible-Bombs.gif");
                missionComplete.setAttribute("id", "img");
                document.getElementById("mission-state").appendChild(missionComplete);

            let missionCompleteMessage = document.createElement("h1");
                missionCompleteMessage.innerHTML = "WELL DONE";
                missionCompleteMessage.setAttribute("class", "blinking");
                missionCompleteMessage.setAttribute("style", "font-size: 50px");
                document.getElementById("mission-state").appendChild(missionCompleteMessage);
                
        } else {

                document.getElementById("password-state").remove();

            console.log(`---mission failed---`);

            let missionFailedMessage = document.createElement("h1");
                missionFailedMessage.innerHTML = "MISSION FAILED";
                missionFailedMessage.setAttribute("class", "blinking");
                missionFailedMessage.setAttribute("style", "font-size: 50px");
                document.getElementById("mission-state").appendChild(missionFailedMessage);


            let missionFailed = document.createElement("img");
                missionFailed.setAttribute("src", "https://media1.giphy.com/media/26BRx71hqRexBe7Wo/source.gif");
                missionFailed.setAttribute("id", "img2");
                document.getElementById("mission-state").appendChild(missionFailed);

        }

                document.getElementById("fButtons").remove();
                document.getElementById("password").remove();
};



// **************  WHERE TO PLACE THESE FUNCTIONS? ************** //

//disable button on click - where to place it
function disableButtonsOnceClicked() {
    document.getElementById("f1").disabled = true;
    document.getElementById("f1").disabled = true;
    document.getElementById("f2").disabled = true;
    document.getElementById("f3").disabled = true;
    document.getElementById("f4").disabled = true;
    document.getElementById("f5").disabled = true;
}

// wrote function but don't know where to put it
function removePasswordInput() {
    let removeInputField = document.getElementById('password-input');
        removeInputField.remove();
    let removeInputButton = document.getElementById('pass-input-button');
        removeInputButton.remove();
}


