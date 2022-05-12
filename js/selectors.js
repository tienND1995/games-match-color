export function getColorElementList() {
  return document.querySelectorAll('#colorList > li')
}

export function getTimerElement() {
  return document.querySelector('.game .game__timer')
}

export function getPlayAgainButton() {
  return document.querySelector('.game .game__button')
}

export function getColorBackground() {
  return document.querySelector('.color-background')
}

export function getInActiveColorList() {
  return document.querySelectorAll('#colorList > li:not(.active)')
}

export function showPlayButton() {
  const playAgainButton = getPlayAgainButton();
  playAgainButton.classList.add('show');
}

export function hidePlayButton() {
  const playAgainButton = getPlayAgainButton();
  playAgainButton.classList.remove('show');
}

export function setTimerText(text) {
  const textTimer = getTimerElement();
  textTimer.textContent = text;
}