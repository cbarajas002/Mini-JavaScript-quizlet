var start_btn = document.querySelector(".start_btn button");
var info_box = document.querySelector(".info_box");
var exit_btn = info_box.querySelector(".buttons .quit");
var continue_btn = info_box.querySelector(".button .restart");
var quiz_box = info_box.querySelector(".quiz_box");

// If Start Quiz button clicked 
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");
}

// If Exit button clicked 
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
}


// If Continue button clicked 
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz"); //Shows the quiz box
}