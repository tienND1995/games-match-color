import {
  getColorElementList,
  getInActiveColorList,
  getPlayAgainButton,
  showPlayButton,
  hidePlayButton,
  setTimerText,
  getColorBackground,
} from './selectors.js';

// ! -------------------
// variables use when handle
const GAME_STATUS = {
  PLAYING: 'Playing',
  BLOCKING: 'Blocking',
  FINISHED: 'Game over',
  Win: 'You win',
};
let selections = [];
let gameStatus = GAME_STATUS.PLAYING;
// ! -------------------

// ? ----------------------------------------------------------------------------------
// todo random color List for Games
function shuffle(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return arr;

  for (let i = arr.length - 1; i > 1; i--) {
    const j = Math.trunc(Math.random() * i);
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

const getRandomColorPairs = (count) => {
  // receive count --> return count * 2 random colors
  // using lib: https://github.com/davidmerfield/randomColor

  const coloList = [];
  const hueList = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple',
    'pink',
    'monochrome',
  ];
  for (let i = 0; i < count; i++) {
    const color = window.randomColor({
      luminosity: 'dark',
      hue: hueList[i % hueList.length],
    });

    coloList.push(color);
  }
  const fullColorList = [...coloList, ...coloList];
  shuffle(fullColorList);
  return fullColorList;
};

// todo set time for games
let interval = null;
const timer = 30;

function clear() {
  clearInterval(interval);
}
function startGames(seconds) {
  clear();
  let currentSecond = seconds;
  interval = setInterval(() => {
    const fullSecond = `0${currentSecond}`.slice(-2);
    setTimerText(fullSecond);
    currentSecond--;

    if (currentSecond < 0) {
      clear();
      setTimerText(GAME_STATUS.FINISHED);
      showPlayButton();
      gameStatus = GAME_STATUS.FINISHED;
    }
  }, 1000);
}

// ? ----------------------------------------------------------------------------------

// todo handle when click
function handleColorList(liElement) {
  if (liElement.className !== '' || gameStatus !== GAME_STATUS.PLAYING) return;
  liElement.classList.add('active');

  selections.push(liElement);
  if (selections.length < 2) return;

  const first = selections[0].dataset.color;
  const second = selections[1].dataset.color;
  const isMatch = first === second;

  if (isMatch) {
    const isWin = getInActiveColorList().length === 0;
    if (isWin) {
      showPlayButton();
      setTimerText(GAME_STATUS.Win);
      gameStatus = GAME_STATUS.Win;
      clear();
    }
    const colorBackground = getColorBackground();
    colorBackground.style.backgroundColor = selections[0].dataset.color;
    selections = [];
    return;
  }
  

  gameStatus = GAME_STATUS.BLOCKING;

  setTimeout(() => {
    gameStatus = GAME_STATUS.PLAYING;
    selections[0].classList.remove('active');
    selections[1].classList.remove('active');
    selections = [];
  }, 500);
}

// * bind color to li element list
function initColor() {
  const coloList = getRandomColorPairs(8);

  const liList = getColorElementList();
  liList.forEach((li, index) => {
    li.dataset.color = coloList[index];
    const overlayElemnt = li.querySelector('.overlay');
    overlayElemnt.style.backgroundColor = coloList[index];
    li.addEventListener('click', () => {
      handleColorList(li);
    });
  });
}

// *  button play games again
function addEventPlayAgainButton() {
  const playAgainButton = getPlayAgainButton();
  if (!playAgainButton) return;

  playAgainButton.addEventListener('click', () => {
    gameStatus = GAME_STATUS.PLAYING;
    selections = [];

    const liList = getColorElementList();
    for (const li of liList) {
      li.className = '';
      delete li.dataset.color;
    }
    const colorBackground = getColorBackground();
    if (!colorBackground) return;
    colorBackground.style.backgroundColor = 'goldenrod';

    hidePlayButton();
    setTimerText('');
    initColor();
    startGames(timer);
  });
}

(() => {
  initColor();
  addEventPlayAgainButton();
  startGames(timer);
})();
