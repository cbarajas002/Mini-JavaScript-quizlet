var start_btn = document.querySelector(".start_btn button");
var info_box = document.querySelector(".info_box");
var exit_btn = info_box.querySelector(".buttons .quit");
var continue_btn = info_box.querySelector(".buttons .restart");
var quiz_box = document.querySelector(".quiz_box");

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
}

let que_count = 0;
let que_numb = 1;

var next_btn = quiz_box.querySelector(".next_btn");

next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
    }else{
        console.log("Questions completed");
    }
}

function showQuestions(index){
    var que_text = document.querySelector(".que_text");
    var option_list = document.querySelector(".option_list");
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option">' + questions[index].options[0] + '<span></span></div>'
                        +'<div class="option"> '+ questions[index].options[1] + '<span></span></div>'
                        +'<div class="option"> '+ questions[index].options[2] + '<span></span></div>'
                        +'<div class="option"> '+ questions[index].options[3] + '<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
}

function queCounter(index){
    var bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions</p>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}
