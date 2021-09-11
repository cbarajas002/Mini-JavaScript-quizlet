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
}
