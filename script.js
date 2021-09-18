var start_btn = document.querySelector(".start_btn button");
var info_box = document.querySelector(".info_box");
var exit_btn = info_box.querySelector(".buttons .quit");
var continue_btn = info_box.querySelector(".buttons .restart");
var quiz_box = document.querySelector(".quiz_box");
var timeCount = quiz_box.querySelector(".timer .timer_sec");
var timeLine = quiz_box.querySelector("header .time_line");
var timeOff = quiz_box.querySelector("header .time_text");



var option_list = document.querySelector(".option_list");

// If Start Quiz button clicked 
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");
}

// If Exit button clicked 
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
}


continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo")
    quiz_box.classList.add("activeQuiz"); //Shows the quiz box
    showQuestions(0);
    queCounter(1);
    startTimer(10);
    startTimerLine(0);
}

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeOver = 00;
let timeValue = 10;
let widthValue = 0;
let userScore = 0;

var next_btn = quiz_box.querySelector(".next_btn");
var result_box = document.querySelector(".result_box");
var restart_quiz = result_box.querySelector(".buttons .restart");
var quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
     que_count = 0;
     que_numb = 1;
     timeValue = 10;
     widthValue = 0;
     userScore = 0;
    showQuestions(que_count);
    queCounter(que_numb); 
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
    timeOff.textContent = "Time left";
}



//once you click on the quit button it will reload you back to the start quiz button
quit_quiz.onclick = ()=>{
    window.location.reload();
}

next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb); 
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        timeOff.textContent = "Time left";
    }else{
        clearInterval(counter);
        console.log("Questions completed");
        showResultBox();
    }
}

function showQuestions(index){
    var que_text = document.querySelector(".que_text");
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option">' + questions[index].options[0] +'<span></span></div>'
                     +'<div class="option">'+ questions[index].options[1] +'<span></span></div>'
                     +'<div class="option">'+ questions[index].options[2] +'<span></span></div>'
                     +'<div class="option">'+ questions[index].options[3] +'<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    var option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}




function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    console.log(correctAns)
    if(userAns == correctAns){
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is Correct");
    }else{
        answer.classList.add("incorrect");
        console.log("Answer is Wrong");
        timeValue = timeValue - 2; 
        console.log(timeValue);

        //if the answer is incorrect then automtically select the correct answer
        for (let i = 0; i < allOptions; i++) {
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class", "option correct");
            }
        }

    }

    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled")
    }
    next_btn.style.display = "block";
}

function showResultBox() {
    info_box.classList.remove("activeInfo") //hide the info box
    quiz_box.classList.remove("activeQuiz"); //hide the quiz box
    result_box.classList.add("activeResult"); //show the result box
    var scoreText = result_box.querySelector(".score_text");
    if(userScore > 4){
        let scoreTag = '<span>and congrats! You got only <p>'+ userScore + '</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = '<span>and nice, You got only <p>'+ userScore + '</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>and sorry, You got only <p>'+ userScore + '</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }


    var userName = document.getElementById("user");
    var userPoints= document.getElementById("points");
    var btnInsert = document.getElementById("btnInsert");
    var scoreResults = document.getElementById("scoreResults");



    function highScore() {
        // Save related form data as an object
        var user = {
          userName: userName.value,
          userPoints: userPoints.value,
        };
        // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
        localStorage.setItem("user", JSON.stringify(user));
      }
      
      function renderLastUser() {
        // Use JSON.parse() to convert text to JavaScript object
        var total = JSON.parse(localStorage.getItem("user"));
        // Check if data is returned, if not exit out of the function
        if (total !== null) {
        document.getElementById("saved-userName").innerHTML = total.userName;
        document.getElementById("saved-userPoints").innerHTML = total.userPoints;
        } else {
          return;
        }
      }
      
      btnInsert.addEventListener("click", function(event) {
      event.preventDefault();
      highScore();
      renderLastUser();
      });
      
      // The init() function fires when the page is loaded 
      function init() {
        // When the init function is executed, the code inside renderLastGrade function will also execute
        renderLastUser();
      }
      init();
    
}



function startTimer(time){
    counter = setInterval(timer,600);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);      
            timeCount.textContent = "00";
            timeOff.textContent = "Time off"; 

          

            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;

            for (let i = 0; i < allOptions; i++) {
                if(option_list.children[i].textContent == correctAns){
                    option_list.children[i].setAttribute("class", "option correct");
                }
            }
            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled")
            }
            next_btn.style.display = "block";
      
        }
        if(time <= 0){
            clearInterval(counter)
            timeCount.textContent = "00"
            showResultBox();

        }
    }

}

function startTimerLine(time){
    counterLine = setInterval(timer, 12);
    function timer(){
        time += 1;
        timeLine.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine);
        }
    }
}





function queCounter(index){
    var bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions</p>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}
