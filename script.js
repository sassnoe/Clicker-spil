"use strict";
window.addEventListener("load", start);

function start() {
  console.log("start");

  //TODO: call en start animations
  startAnimations();
  //TODO: call en positions
  addPositions();
  //TODO: call en click items
  clickItems();
}

function startAnimations() {
  document.querySelector("#milk1_container").classList.add("falling");
}

function addPositions() {
  document.querySelector("#milk1_container").classList.add("position1");
  document.querySelector("#milk2_container").classList.add("position1");
  document.querySelector("#milk3_container").classList.add("position1");
  document.querySelector("#milk4_container").classList.add("position1");
  document.querySelector("#milk5_container").classList.add("position1");

  document.querySelector("#rat1_container").classList.add("position1");
  document.querySelector("#rat2_container").classList.add("position1");
}

function clickItems() {
  // registrer click på Milk containers
  document.querySelector("milk1_container").addEventListener("click", clickMilk);
  document.querySelector("milk2_container").addEventListener("click", clickMilk);
  document.querySelector("milk3_container").addEventListener("click", clickMilk);
  document.querySelector("milk4_container").addEventListener("click", clickMilk);
  document.querySelector("milk5_container").addEventListener("click", clickMilk);
  // Rat containers
  document.querySelector("rat1_container").addEventListener("click", clickRat);
  document.querySelector("rat2_container").addEventListener("click", clickRat);

  // Animationen genstarter seamlessly med animationiteration
  document.querySelector("milk1_container").addEventListener("animationiteration", clickMilk);
  document.querySelector("milk2_container").addEventListener("animationiteration", clickMilk);
  document.querySelector("milk3_container").addEventListener("animationiteration", clickMilk);
  document.querySelector("milk4_container").addEventListener("animationiteration", clickMilk);
  document.querySelector("milk5_container").addEventListener("animationiteration", clickMilk);
  // Rat containers
  document.querySelector("rat1_container").addEventListener("animationiteration", clickRat);
  document.querySelector("rat2_container").addEventListener("animationiteration", clickRat);
}

function clickMilk() {
  console.log("clickMilk");
  let milk = this;

  // Forhindrer gentagne clicks
  milk.removeEventListener("click", clickMilk);

  // Pauser milk container
  milk.classList.add("paused");

  //milk.querySelector("img").classList.add() INDSÆT FORSVIND ANIMATION

  // Når animationen slutter: milkGone
  milk.addEventListener("animationend", milkGone);
}

function milkGone() {
  console.log("milkGone");
  let milk = this;

  // Fjern EventListener der bringer os ind i denne funktion
  milk.removeEventListener("animationend", milkGone);

  //milk.querySelector("img").classList.remove() INDSÆT FORSVIND ANIMATION

  // Fjern pause fra milk container
  milk.classList.remove("paused");

  // Genstarter falling animation på milk container
  milkRestart.call(this);

  // Gør det muligt at klikke
  milk.addEventListener("click", clickMilk);
}

function milkRestart() {
  let milk = this;

  // Laver falling animationen mere flydende
  milk.classList.remove("falling");
  milk.offsetwidth;
  milk.classList.add("falling");

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
  rat.removeEventListener("click", clickRat);

  // Pauser rat container
  rat.classList.add("paused");

  //rat.querySelector("img").classList.add("zoom_in");

  // når forsvind-animation er færdig: coinGone
  document.querySelector("#bomb_container").addEventListener("animationend", bombGone);
}

function ratGone() {}

function ratRestart() {}
