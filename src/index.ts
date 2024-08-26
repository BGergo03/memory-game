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
  };
  menu.appendChild(button);
}

const menu: HTMLElement = document.createElement('div');
menu.className = 'menu';
createMenuButton('Easy', 2, 4, menu);
createMenuButton('Medium', 3, 4, menu);
createMenuButton('Hard', 4, 5, menu);
document.body.appendChild(menu);
