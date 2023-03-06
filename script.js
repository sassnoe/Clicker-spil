"use strict";
window.addEventListener("load", ready);

let points = 0;
let lives = 0;

function ready() {
  console.log("JS ready");
  document.querySelector("#start_button").addEventListener("click", start);
}

function start() {
  console.log("start");

  points = 0;
  lives = 3;

  document.querySelector("#start").classList.add("hidden");

  // starter alle animationer
  startAnimations();
  // tilføjer positions
  addPositions();
  //
  clickItems();
}

function startAnimations() {
  console.log("startAnimations");

  document.querySelector("#milk1_container").classList.add("falling" + Math.floor(Math.random() * 3));
  document.querySelector("#milk2_container").classList.add("falling" + Math.floor(Math.random() * 3));
  document.querySelector("#milk3_container").classList.add("falling" + Math.floor(Math.random() * 3));
  document.querySelector("#milk4_container").classList.add("falling" + Math.floor(Math.random() * 3));
  document.querySelector("#milk5_container").classList.add("falling" + Math.floor(Math.random() * 3));

  document.querySelector("#rat1_container").classList.add("falling" + Math.floor(Math.random() * 3));
  document.querySelector("#rat2_container").classList.add("falling" + Math.floor(Math.random() * 3));
}

function addPositions() {
  console.log("addPositions");

  document.querySelector("#milk1_container").classList.add("position" + (Math.floor(Math.random() * 5) + 1));
  document.querySelector("#milk2_container").classList.add("position" + (Math.floor(Math.random() * 5) + 1));
  document.querySelector("#milk3_container").classList.add("position" + (Math.floor(Math.random() * 5) + 1));
  document.querySelector("#milk4_container").classList.add("position" + (Math.floor(Math.random() * 5) + 1));
  document.querySelector("#milk5_container").classList.add("position" + (Math.floor(Math.random() * 5) + 1));

  document.querySelector("#rat1_container").classList.add("position" + (Math.floor(Math.random() * 5) + 1));
  document.querySelector("#rat2_container").classList.add("position" + (Math.floor(Math.random() * 5) + 1));
}

function clickItems() {
  console.log("clickItems");

  // registrer click på Milk containers
  document.querySelector("#milk1_container").addEventListener("mousedown", clickMilk);
  document.querySelector("#milk2_container").addEventListener("mousedown", clickMilk);
  document.querySelector("#milk3_container").addEventListener("mousedown", clickMilk);
  document.querySelector("#milk4_container").addEventListener("mousedown", clickMilk);
  document.querySelector("#milk5_container").addEventListener("mousedown", clickMilk);
  // Rat containers
  document.querySelector("#rat1_container").addEventListener("mousedown", clickRat);
  document.querySelector("#rat2_container").addEventListener("mousedown", clickRat);

  // Animationen genstarter seamlessly med animationiteration
  document.querySelector("#milk1_container").addEventListener("animationiteration", milkRestart);
  document.querySelector("#milk2_container").addEventListener("animationiteration", milkRestart);
  document.querySelector("#milk3_container").addEventListener("animationiteration", milkRestart);
  document.querySelector("#milk4_container").addEventListener("animationiteration", milkRestart);
  document.querySelector("#milk5_container").addEventListener("animationiteration", milkRestart);
  // Rat containers
  document.querySelector("#rat1_container").addEventListener("animationiteration", ratRestart);
  document.querySelector("#rat2_container").addEventListener("animationiteration", ratRestart);
}

function clickMilk() {
  console.log("clickMilk");
  let milk = this;

  // Forhindrer gentagne clicks
  milk.removeEventListener("mousedown", clickMilk);

  // Pauser milk container
  milk.classList.add("paused");

  milk.querySelector("img").classList.add("disappear");

  // Når animationen slutter: milkGone
  milk.addEventListener("animationend", milkGone);

  // TO DO: INCREMENT POINTS
  incrementPoints();
}

function milkGone() {
  console.log("milkGone");
  let milk = this;

  // Fjern EventListener der bringer os ind i denne funktion
  milk.removeEventListener("animationend", milkGone);

  milk.querySelector("img").classList.remove("disappear");
  //   milk.querySelector("img").classList.remove("rotate");

  // Fjern pause fra milk container
  milk.classList.remove("paused");

  // Genstarter falling animation på milk container
  milkRestart.call(this);

  // Gør det muligt at klikke
  milk.addEventListener("mousedown", clickMilk);
}

function milkRestart() {
  let milk = this;
  let falling = Math.floor(Math.random() * 3);

  // Laver falling animationen mere flydende
  milk.classList.remove("falling0");
  milk.classList.remove("falling1");
  milk.classList.remove("falling2");
  milk.offsetWidth;
  milk.classList.add("falling" + falling);

  // Fjerner alle position classes
  milk.classList.remove("position1", "position2", "position3", "position4", "position5");

  // Giver milk containeren en ny random position
  let position = Math.floor(Math.random() * 5) + 1;
  milk.classList.add("position" + position);
}

function clickRat() {
  console.log("clickRat");
  let rat = this;

  // Forhindrer gentagne clicks
  rat.removeEventListener("mousedown", clickRat);

  // Pauser rat container
  rat.classList.add("paused");

  rat.querySelector("img").classList.add("disappear");

  // når forsvind-animation er færdig: coinGone
  rat.addEventListener("animationend", ratGone);

  // TO DO: DECREMENT LIVES
  decrementLives();
}

function ratGone() {
  console.log("milkGone");
  let rat = this;

  // Fjern EventListener der bringer os ind i denne funktion
  rat.removeEventListener("animationend", ratGone);

  rat.querySelector("img").classList.remove("disappear");

  // Fjern pause fra milk container
  rat.classList.remove("paused");

  // Genstarter falling animation på milk container
  ratRestart.call(this);

  // Gør det muligt at klikke
  rat.addEventListener("mousedown", clickRat);
}

function ratRestart() {
  let rat = this;

  let falling = Math.floor(Math.random() * 3);

  // Laver falling animationen mere flydende
  rat.classList.remove("falling0");
  rat.classList.remove("falling1");
  rat.classList.remove("falling2");
  rat.offsetWidth;
  rat.classList.add("falling" + falling);

  // Fjerner alle position classes
  rat.classList.remove("position1", "position2", "position3", "position4", "position5");

  // Giver milk containeren en ny random position
  let position = Math.floor(Math.random() * 5) + 1;
  rat.classList.add("position" + position);
}

function incrementPoints() {
  console.log("incrementPoints");
  points++;
  console.log(points + " point");
}

function displayPoints() {
  document.querySelector("#point_count").textContent = points;
}

function decrementLives() {
  if (lives <= 1) {
    gameOver();
  }

  displayLives();
  lives--;
}

function displayLives() {
  document.querySelector("#life" + lives).classList.remove("life_available");
  document.querySelector("#life" + lives).classList.add("life_lost");
}

function gameOver() {
  console.log("Game over");

  document.querySelector("#game_over").classList.remove("hidden");

  // TO DO: AUDIO

  stopGame();
}

function levelComplete() {
  console.log("level complete");

  document.querySelector("#level_complete").classList.remove("hidden");

  // TO DO: AUDIO

  stopGame();
}

function stopGame() {
  document.querySelector("#milk1_container").classList.remove("falling0", "falling1", "falling2");
  document.querySelector("#milk2_container").classList.remove("falling0", "falling1", "falling2");
  document.querySelector("#milk3_container").classList.remove("falling0", "falling1", "falling2");
  document.querySelector("#milk4_container").classList.remove("falling0", "falling1", "falling2");
  document.querySelector("#milk5_container").classList.remove("falling0", "falling1", "falling2");

  document.querySelector("#rat1_container").classList.remove("falling0", "falling1", "falling2");
  document.querySelector("#rat2_container").classList.remove("falling0", "falling1", "falling2");

  document.querySelector("#milk1_container").removeEventListener("click", clickMilk);
  document.querySelector("#milk2_container").removeEventListener("click", clickMilk);
  document.querySelector("#milk3_container").removeEventListener("click", clickMilk);
  document.querySelector("#milk4_container").removeEventListener("click", clickMilk);
  document.querySelector("#milk5_container").removeEventListener("click", clickMilk);

  document.querySelector("#rat1_container").removeEventListener("click", clickMilk);
  document.querySelector("#rat2_container").removeEventListener("click", clickMilk);
}
