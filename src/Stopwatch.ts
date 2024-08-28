let minute = 0;
let second = 0;
let stopped: boolean = false;

export function stop() {
  stopped = true;
}

export function start() {
  minute = 0;
  second = 0;
  stopped = false;
  stopWatch();
}

function stopWatch() {
  if (stopped) {
    return;
  }
  second += 0.5;

  if (second == 60) {
    minute++;
    second = 0;
  }

  if (minute == 60) {
    minute = 0;
    second = 0;
  }

  let minString: string = minute.toString();
  let secString: string = Math.floor(second).toString();

  if (minute < 10) {
    minString = '0' + minString;
  }

  if (second < 10) {
    secString = '0' + secString;
  }

  document.querySelector('.score')!.innerHTML = minString + ':' + secString;
  setTimeout(stopWatch, 500);
}
