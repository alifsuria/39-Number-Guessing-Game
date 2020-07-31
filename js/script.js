const input_box = document.getElementById("input");
const submit = document.getElementById("form");
const feedback = document.getElementById("feedback");
const guess_remain = document.querySelector(".guess-remaining");
const prev_guess_box = document.querySelector(".prev-guess");
const start_btn = document.querySelector(".start-game");
const top_feedback = document.querySelector(".top-feedback");

document.addEventListener("DOMContentLoaded", function () {
  game();
  start_btn.style.display = "none";
});

let retry = 10;
let number = Math.floor(Math.random() * 101);
let prev_guess = [];
function game() {
  guess_remain.innerHTML = retry;
  submit.addEventListener("submit", (event) => {
    event.preventDefault();

    let input_value = parseInt(input_box.value);
    if (
      input_box.value === "" ||
      input_box.value.match(/\D/g) ||
      input_value > 200
    ) {
      top_feedback.style.display = "block";
      setTimeout(function () {
        top_feedback.style.display = "none";
      }, 2000);
    } else if (input_value === number && input_value < 200) {
      feedback_msg(3);
      prev_guess_array(prev_guess, input_value);
      start_btn.style.display = "block";
    } else if (input_value > number && retry !== 0) {
      feedback_msg(1);
      prev_guess_array(prev_guess, input_value);
      retry--;
    } else if (input_value < number && retry !== 0) {
      feedback_msg(2);
      prev_guess_array(prev_guess, input_value);
      retry--;
    } else if (retry === 0) {
      feedback.innerHTML = `Game Over! Number was ${number}`;
      start_btn.style.display = "block";
    }

    guess_remain.innerHTML = retry;
    input_box.value = "";
    console.log(input_value, number, retry, prev_guess);
  });

  function prev_guess_array(array, input_value) {
    prev_guess.push(input_value);
    prev_guess_box.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
      let span = document.createElement("span");
      span.classList.add("mx-1");
      span.innerHTML = array[i];
      prev_guess_box.appendChild(span);
    }
  }

  start_btn.addEventListener("click", (event) => {
    event.preventDefault();
    feedback.innerHTML = "";
    prev_guess_box.innerHTML = "";
    prev_guess = [];
    retry = 10;
    game();
    start_btn.style.display = "none";
  });

  function feedback_msg(number) {
    if (number === 1) {
      feedback.innerHTML = "Too High! Try again!";
    } else if (number === 2) {
      feedback.innerHTML = "Too Low! Try again!";
    } else if (number === 3) {
      feedback.innerHTML = `You guessed correctly!`;
    }
  }
}
