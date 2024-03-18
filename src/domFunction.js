const { getImageList } = require("./memoryGame");

const rowValue = document.getElementById("rowValue");
const columnValue = document.getElementById("columnValue");
const gridButton = document.getElementById("gridButton");
const resetGameButton = document.getElementById("resetGameButton");

const images = getImageList();
const name = "name";

let flipsCounter = document.getElementById("flippedCardsNum");
flipsCounter.textContent = 0;

const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");
let totalSeconds = 0;

function setTime() {
  setTime = function () {};
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  let valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  }
  return valString;
}

function createGrid() {
  gridButton.addEventListener("click", function () {
    resultAlert();
  });
}
createGrid();

function removeGrid() {
  resetGameButton.addEventListener("click", function () {
    resetGrid();
  });
}
removeGrid();

function resultAlert() {
  const product = rowValue.value * columnValue.value;

  if (product === 0) {
    return window.alert("Give inputs for both row and column.");
  } else if (product % 2 !== 0) {
    resetGrid();
    return window.alert("Product of row and column must be even.");
  } else if (product > 12) {
    resetGrid();
    return window.alert("Product of row and column must be less/equal to 12.");
  } else {
    configurableGridSize();
    attachImages();
    disableGridButton();
  }
}

function resetGrid() {
  return location.reload();
}

function disableGridButton() {
  gridButton.disabled = true;
}

function configurableGridSize() {
  const section = document.querySelector("section");
  section.style.gridTemplateRows = `repeat(${rowValue.value}, 7rem)`;
  section.style.gridTemplateColumns = `repeat(${columnValue.value}, 7rem)`;
}

function randomizedImageLength() {
  const product = rowValue.value * columnValue.value;
  let newImages = images.slice(0, product);
  return newImages.sort(() => Math.random() - 0.5);
}

function attachImages() {
  const randomizedImages = randomizedImageLength();
  randomizedImages.forEach((image) => {
    const section = document.querySelector("section");
    const card = document.createElement("div");
    const front = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    front.classList = "front";
    back.classList = "back";

    front.src = image.imgSource;
    card.setAttribute(name, image.name);

    section.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      card.classList.toggle("flipCard");
      matchCards(e);
    });
  });
}

function matchCards(e) {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCard = document.querySelectorAll(".flipped");
  const flipCard = document.querySelectorAll(".flipCard");
  flipsCounter.textContent = Number(flipsCounter.textContent) + 1;

  if (flippedCard.length === 1) {
    setInterval(setTime, 1000);
  }

  if (flippedCard.length === 2) {
    if (
      flippedCard[0].getAttribute(name) === flippedCard[1].getAttribute(name)
    ) {
      flippedCard.forEach((card) => {
        card.classList.remove("flipped");
        card.style.border = "4px solid rgb(34, 117, 11)";
        card.style.pointerEvents = "none";
      });
    } else {
      flippedCard.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("flipCard"), 1000);
      });
    }
  }

  if (flipCard.length == randomizedImageLength().length) {
    return setTimeout(
      () =>
        totalFlips(`
        Total flips = ${flipsCounter.innerHTML} \n
        Time taken = ${minutesLabel.innerHTML}:${secondsLabel.innerHTML} \n
        Rows = ${rowValue.value} : Columns = ${columnValue.value}
        `),
      1000
    );
  }
}

function totalFlips(text) {
  window.alert(text);
  location.reload();
}

module.exports = {
  images,
  rowValue,
  columnValue,
  attachImages,
  configurableGridSize,
};
