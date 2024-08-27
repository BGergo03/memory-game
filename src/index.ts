import { Game } from './Game';

function createMenuButton(
  buttonText: string,
  rows: number,
  columns: number,
  menu: HTMLElement
): void {
  const button = document.createElement('button');
  button.className = 'menu-button';
  button.innerText = buttonText;
  button.onclick = () => {
    new Game(rows, columns);
    document.body.removeChild(menu);
    const backButton = document.querySelector('.back-button');
    backButton?.removeAttribute('style');
  };
  menu.appendChild(button);
}

const menu: HTMLElement = document.createElement('div');
menu.className = 'menu';
createMenuButton('Easy', 4, 2, menu);
createMenuButton('Medium', 4, 3, menu);
createMenuButton('Hard', 5, 4, menu);
document.body.appendChild(menu);
const backButton = document.querySelector('.back-button');
backButton?.setAttribute('style', 'display: none;');
backButton?.addEventListener('click', () => {
  document.body.removeChild(document.querySelector('.table')!);
  document.body.appendChild(menu);
  backButton.setAttribute('style', 'display: none;');
});
