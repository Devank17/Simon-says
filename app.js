// ! Setting up basic requirements
let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let highest = 1;

let btns = ["red", "green", "orange", "blue"];
// ! Selecting elements

let body = document.querySelector("body");
let h3 = document.querySelector("h3");
let high = document.querySelector("#inpHigh");
// ! Selecting buttons
let selectBtn = document.querySelectorAll(".box");

body.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game Started");
    started = true;

    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("gameFlash");
  setTimeout(function () {
    btn.classList.remove("gameFlash");
  }, 250);
}
function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h3.innerText = `Level ${level}`;

  let rand = Math.floor(Math.random() * 3);
  let randCol = btns[rand];
  let randBtn = document.querySelector(`.${randCol}`);
  gameSeq.push(randCol);
  console.log(gameSeq);

  gameFlash(randBtn);

  high.value = highest;
  if (highest < level) {
    highest = level;
  }
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h3.innerHTML = `Game Over ! Your Score was <b>${level}</b> <br> Press any key to start`;
    body.style.backgroundColor = "red";
    setTimeout(function () {
      body.style.backgroundColor = "white";
    }, 500);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

for (btn of selectBtn) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
