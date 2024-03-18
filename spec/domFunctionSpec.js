const jsdom = require("jsdom");
const fs = require("fs");
const index = fs.readFileSync("./index.html", "utf-8");
const { JSDOM } = jsdom;
const { document } = new JSDOM(index).window;
global.document = document;

const {
  images,
  rowValue,
  columnValue,
  attachImages,
  configurableGridSize,
} = require("../src/domFunction");

describe("images():", function () {
  it("should return the length of the images to be 12", function () {
    expect(images.length).toBe(12);
  });
});

describe("attachImages():", function () {
  beforeEach(function () {
    rowValue.value = 2;
    columnValue.value = 3;
    attachImages();
  });

  it("should remove class name 'flipped' from a div", function () {
    const card = document.querySelectorAll(".card");
    expect(card[0].classList.contains("flipped")).toBe(false);
    expect(card.length).toBe(6);
    card[0].click();
    expect(card[0].classList.contains("flipped")).toBe(true);
  });

  it("should not allow matched cards to be clickable", function () {
    const card = document.querySelectorAll(".card");
    card[0].click();
    card[1].click();
    expect(card[0].style.pointerEvents).toBe("");
    expect(card[1].style.pointerEvents).toBe("");
  });
});

describe("configurableGridSize():", function () {
  const section = document.querySelector("section");

  beforeEach(function () {
    rowValue.value === 2;
    columnValue.value === 2;
    configurableGridSize();
  });

  it("should customize the grid sizes for rows and columns", function () {
    expect(section.style.gridTemplateRows).toBe(
      `repeat(${rowValue.value}, 7rem)`
    );
    expect(section.style.gridTemplateColumns).toBe(
      `repeat(${columnValue.value}, 7rem)`
    );
  });
});
