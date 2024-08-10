const qwerty = document.querySelector("#qwerty");
const phrase = document.querySelector("#phrase");
const tries = document.querySelectorAll(".tries img");
const overlay = document.querySelector("#overlay");
let missed;

const phrases = [
  "A picture is worth a thousand words",
  "Between a rock and a hard place",
  "Birds of a feather flock together",
  "It takes two to tango",
  "Laughter is the best medicine",
  "What you see is what you get",
];

document.querySelector(".btn__reset").addEventListener("click", () => {
  startGame();
});

function startGame() {
  overlay.style.display = "none";
  addPhraseToDisplay(getRandomPhraseAsArray(phrases));

  // reset overlay
  overlay.classList.remove("win", "lose");

  // enable buttons and remove 'chosen'
  qwerty.querySelectorAll("button").forEach((button) => {
    button.disabled = false;
    button.classList.remove("chosen");
  });

  // reset the remaining guesses
  missed = 0;
  tries.forEach((img) => {
    img.src = "images/liveHeart.png";
  });
}

function getRandomPhraseAsArray(arr) {
  const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
  return randomPhrase.split("");
}

function addPhraseToDisplay(arr) {
  phrase.innerHTML = arr
    .map((char) => {
      return `<li class="${char === " " ? "space" : "letter"}">${char}</li>`;
    })
    .join("");
}

function checkLetter(button) {
  let match = null;
  document.querySelectorAll("li.letter").forEach((li) => {
    if (li.textContent.toLowerCase() === button.textContent.toLowerCase()) {
      li.classList.add("show");
      match = button.textContent;
    }
  });
  return match;
}

qwerty.addEventListener("click", (e) => {
  const button = e.target;
  if (button.tagName !== "BUTTON") return;

  button.disabled = true;
  button.classList.add("chosen");

  const letterFound = checkLetter(button);
  if (!letterFound) {
    missed++;
    tries[tries.length - missed].src = "images/lostHeart.png";
  }
  checkWin();
});

function checkWin() {
  const lettersCount = document.querySelectorAll(".letter").length;
  const showCount = document.querySelectorAll(".show").length;
  if (lettersCount === showCount) {
    overlay.style.display = "block";
    overlay.classList.add("win");
    overlay.querySelector(".title").textContent = "You win!";
  } else if (missed >= 5) {
    overlay.style.display = "block";
    overlay.classList.add("lose");
    overlay.querySelector(".title").textContent = "You lose!";
  }
}
