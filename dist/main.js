/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/domFunction.js":
/*!****************************!*\
  !*** ./src/domFunction.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { getImageList } = __webpack_require__(/*! ./memoryGame */ \"./src/memoryGame.js\");\r\n\r\nconst rowValue = document.getElementById(\"rowValue\");\r\nconst columnValue = document.getElementById(\"columnValue\");\r\nconst gridButton = document.getElementById(\"gridButton\");\r\nconst resetGameButton = document.getElementById(\"resetGameButton\");\r\n\r\nconst images = getImageList();\r\nconst name = \"name\";\r\n\r\nlet flipsCounter = document.getElementById(\"flippedCardsNum\");\r\nflipsCounter.textContent = 0;\r\n\r\nconst minutesLabel = document.getElementById(\"minutes\");\r\nconst secondsLabel = document.getElementById(\"seconds\");\r\nlet totalSeconds = 0;\r\n\r\nfunction setTime() {\r\n  setTime = function () {};\r\n  ++totalSeconds;\r\n  secondsLabel.innerHTML = pad(totalSeconds % 60);\r\n  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));\r\n}\r\n\r\nfunction pad(val) {\r\n  let valString = val + \"\";\r\n  if (valString.length < 2) {\r\n    return \"0\" + valString;\r\n  }\r\n  return valString;\r\n}\r\n\r\nfunction createGrid() {\r\n  gridButton.addEventListener(\"click\", function () {\r\n    resultAlert();\r\n  });\r\n}\r\ncreateGrid();\r\n\r\nfunction removeGrid() {\r\n  resetGameButton.addEventListener(\"click\", function () {\r\n    resetGrid();\r\n  });\r\n}\r\nremoveGrid();\r\n\r\nfunction resultAlert() {\r\n  const product = rowValue.value * columnValue.value;\r\n\r\n  if (product === 0) {\r\n    return window.alert(\"Give inputs for both row and column.\");\r\n  } else if (product % 2 !== 0) {\r\n    resetGrid();\r\n    return window.alert(\"Product of row and column must be even.\");\r\n  } else if (product > 12) {\r\n    resetGrid();\r\n    return window.alert(\"Product of row and column must be less/equal to 12.\");\r\n  } else {\r\n    configurableGridSize();\r\n    attachImages();\r\n    disableGridButton();\r\n  }\r\n}\r\n\r\nfunction resetGrid() {\r\n  return location.reload();\r\n}\r\n\r\nfunction disableGridButton() {\r\n  gridButton.disabled = true;\r\n}\r\n\r\nfunction configurableGridSize() {\r\n  const section = document.querySelector(\"section\");\r\n  section.style.gridTemplateRows = `repeat(${rowValue.value}, 7rem)`;\r\n  section.style.gridTemplateColumns = `repeat(${columnValue.value}, 7rem)`;\r\n}\r\n\r\nfunction randomizedImageLength() {\r\n  const product = rowValue.value * columnValue.value;\r\n  let newImages = images.slice(0, product);\r\n  return newImages.sort(() => Math.random() - 0.5);\r\n}\r\n\r\nfunction attachImages() {\r\n  const randomizedImages = randomizedImageLength();\r\n  randomizedImages.forEach((image) => {\r\n    const section = document.querySelector(\"section\");\r\n    const card = document.createElement(\"div\");\r\n    const front = document.createElement(\"img\");\r\n    const back = document.createElement(\"div\");\r\n    card.classList = \"card\";\r\n    front.classList = \"front\";\r\n    back.classList = \"back\";\r\n\r\n    front.src = image.imgSource;\r\n    card.setAttribute(name, image.name);\r\n\r\n    section.appendChild(card);\r\n    card.appendChild(front);\r\n    card.appendChild(back);\r\n\r\n    card.addEventListener(\"click\", (e) => {\r\n      card.classList.toggle(\"flipCard\");\r\n      matchCards(e);\r\n    });\r\n  });\r\n}\r\n\r\nfunction matchCards(e) {\r\n  const clickedCard = e.target;\r\n  clickedCard.classList.add(\"flipped\");\r\n  const flippedCard = document.querySelectorAll(\".flipped\");\r\n  const flipCard = document.querySelectorAll(\".flipCard\");\r\n  flipsCounter.textContent = Number(flipsCounter.textContent) + 1;\r\n\r\n  if (flippedCard.length === 1) {\r\n    setInterval(setTime, 1000);\r\n  }\r\n\r\n  if (flippedCard.length === 2) {\r\n    if (\r\n      flippedCard[0].getAttribute(name) === flippedCard[1].getAttribute(name)\r\n    ) {\r\n      flippedCard.forEach((card) => {\r\n        card.classList.remove(\"flipped\");\r\n        card.style.border = \"4px solid rgb(34, 117, 11)\";\r\n        card.style.pointerEvents = \"none\";\r\n      });\r\n    } else {\r\n      flippedCard.forEach((card) => {\r\n        card.classList.remove(\"flipped\");\r\n        setTimeout(() => card.classList.remove(\"flipCard\"), 1000);\r\n      });\r\n    }\r\n  }\r\n\r\n  if (flipCard.length == randomizedImageLength().length) {\r\n    return setTimeout(\r\n      () =>\r\n        totalFlips(`\r\n        Total flips = ${flipsCounter.innerHTML} \\n\r\n        Time taken = ${minutesLabel.innerHTML}:${secondsLabel.innerHTML} \\n\r\n        Rows = ${rowValue.value} : Columns = ${columnValue.value}\r\n        `),\r\n      1000\r\n    );\r\n  }\r\n}\r\n\r\nfunction totalFlips(text) {\r\n  window.alert(text);\r\n  location.reload();\r\n}\r\n\r\nmodule.exports = {\r\n  images,\r\n  rowValue,\r\n  columnValue,\r\n  attachImages,\r\n  configurableGridSize,\r\n};\r\n\n\n//# sourceURL=webpack://tshediso-boshiana-222-memory-game-in-vanilla-js-javascript/./src/domFunction.js?");

/***/ }),

/***/ "./src/memoryGame.js":
/*!***************************!*\
  !*** ./src/memoryGame.js ***!
  \***************************/
/***/ ((module) => {

eval("function getImageList() {\r\n  let images = [\r\n    { imgSource: \"./images/1.PNG\", name: \"1\" },\r\n    { imgSource: \"./images/2.PNG\", name: \"2\" },\r\n    { imgSource: \"./images/3.PNG\", name: \"3\" },\r\n    { imgSource: \"./images/4.PNG\", name: \"4\" },\r\n    { imgSource: \"./images/5.PNG\", name: \"5\" },\r\n    { imgSource: \"./images/6.PNG\", name: \"6\" },\r\n  ];\r\n\r\n  images = images.concat(images.map((image) => ({ ...image })));\r\n  images.sort((a, b) => a.name.localeCompare(b.name));\r\n  return images;\r\n}\r\nmodule.exports = { getImageList };\r\n\n\n//# sourceURL=webpack://tshediso-boshiana-222-memory-game-in-vanilla-js-javascript/./src/memoryGame.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/domFunction.js");
/******/ 	
/******/ })()
;