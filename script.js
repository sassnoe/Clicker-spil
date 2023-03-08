"use strict";
window.addEventListener("load", ready);

// Globale liv og point variabler
let points = 0;
let lives = 0;
// gameRunning boolean
let gameRunning = false;

function ready() {
  console.log("JS ready");
  document.querySelector("#start_button").addEventListener("click", start);
  document.querySelector("#btn_restart").addEventListener("click", startScreen);
  document.querySelector("#btn_go_to_start").addEventListener("click", startScreen);
}

function startScreen() {
  document.querySelector("#start").classList.remove("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
}

function gameScreen() {
  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
}

function resetPoints() {
  // Nulstiller point i variablen
  points = 0;
  // Nulstiller visningen af point
  displayPoints();
}

function resetLives() {
  // Nulstiller til originalt antal liv
  lives = 3;
  // Fjerner mistede liv og viser aktive liv
  document.querySelector("#life1").classList.remove("life_lost");
  document.querySelector("#life2").classList.remove("life_lost");
  document.querySelector("#life3").classList.remove("life_lost");
  document.querySelector("#life1").classList.add("life_available");
  document.querySelector("#life2").classList.add("life_available");
  document.querySelector("#life3").classList.add("life_available");
}

function start() {
  console.log("start");
  gameRunning = true;

  // Genstarter point, liv og tilføjer hidden til start, level_complete og game_over
  resetPoints();
  resetLives();
  gameScreen();

  // Starter alle animationer
  startAnimations();
  // Tilføjer positions
  addPositions();
  // Gør det muligt at klikke på containers
  clickItems();
  // Starter spillets timer
  startTimer();
}

function startAnimations() {
  console.log("startAnimations");

  // Giver en random start animation på vores Milk / Rat containers
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

  // giver en random start position på vores Milk / Rat containers
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

  // Registrer click på Milk containers
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

  // Tilføjer orsvind animation på milk
  milk.querySelector("img").classList.add("disappear");

  // Når animationen slutter: milkGone
  milk.addEventListener("animationend", milkGone);

  // TO DO: lyd

  // Giv point
  incrementPoints();
}

function milkGone() {
  console.log("milkGone");
  let milk = this;

  // Fjerner EventListener der bringer os ind i denne funktion
  milk.removeEventListener("animationend", milkGone);

  // Fjerner forsvind animation fra milk
  milk.querySelector("img").classList.remove("disappear");

  // Fjerner pause fra milk container
  milk.classList.remove("paused");

  // Hvis spillet kører:
  if (gameRunning) {
    // Genstarter falling animation på milk container
    milkRestart.call(this);
    // Gør det muligt at klikke på milk
    milk.addEventListener("mousedown", clickMilk);
  }
}

function milkRestart() {
  let milk = this;
  let falling = Math.floor(Math.random() * 3);

  // Genstarter falling animationen og gør den mere flydende med offsetWidth
  milk.classList.remove("falling0", "falling1", "falling2");
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

  // TO DO: lyd

  // Fjern liv
  decrementLives();
}

function ratGone() {
  console.log("milkGone");
  let rat = this;

  // Fjern EventListener der bringer os ind i denne funktion
  rat.removeEventListener("animationend", ratGone);

  // Fjerner forsvind animation fra rat
  rat.querySelector("img").classList.remove("disappear");

  // Fjern pause fra milk container
  rat.classList.remove("paused");

  if (gameRunning) {
    // Genstarter falling animation på rat container
    ratRestart.call(this);
    // Gør det muligt at klikke på rat
    rat.addEventListener("mousedown", clickRat);
  }
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
  displayPoints();
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

  stopGame();

  // TO DO: AUDIO

  // vis antal Milk supply skudt ned
  document.querySelector("#milk_points").textContent = points;
}

function startTimer() {
  // Starter timer animation
  document.querySelector("#time_sprite").classList.add("timer");
  // Når animationen er færdig, kaldes funktionen timeUp
  document.querySelector("#time_sprite").addEventListener("animationend", timeUp);
}

function timeUp() {
  console.log("timeUp");

  if (points >= 15) {
    levelComplete();
  } else {
    gameOver();
  }
}

function stopGame() {
  gameRunning = false;
  // fjerner animationer fra milk og rat container
  document.querySelector("#milk1_container").classList.remove("falling0", "falling1", "falling2");
  document.querySelector("#milk2_container").classList.remove("falling0", "falling1", "falling2");
  document.querySelector("#milk3_container").classList.remove("falling0", "falling1", "falling2");
  document.querySelector("#milk4_container").classList.remove("falling0", "falling1", "falling2");
  document.querySelector("#milk5_container").classList.remove("falling0", "falling1", "falling2");

  document.querySelector("#rat1_container").classList.remove("falling0", "falling1", "falling2");
  document.querySelector("#rat2_container").classList.remove("falling0", "falling1", "falling2");

  // fjerner eventlisteneren som gør det muligt at klikke på vores containers
  document.querySelector("#milk1_container").removeEventListener("mousedown", clickMilk);
  document.querySelector("#milk2_container").removeEventListener("mousedown", clickMilk);
  document.querySelector("#milk3_container").removeEventListener("mousedown", clickMilk);
  document.querySelector("#milk4_container").removeEventListener("mousedown", clickMilk);
  document.querySelector("#milk5_container").removeEventListener("mousedown", clickMilk);

  document.querySelector("#rat1_container").removeEventListener("mousedown", clickMilk);
  document.querySelector("#rat2_container").removeEventListener("mousedown", clickMilk);

  // TO DO: FJERN LYDE

  // nultiller timeren ved at fjerne animationen
  document.querySelector("#time_sprite").classList.remove("timer");
}
