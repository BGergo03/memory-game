export class Stopwatch {
  #minute: number;
  #second: number;
  #stopped: boolean;

  constructor() {
    this.#minute = 0;
    this.#second = 0;
    this.#stopped = false;
  }

  public start() {
    this.#minute = 0;
    this.#second = 0;
    this.#stopped = false;
    this.stopWatch();
  }

  public stop() {
    this.#stopped = true;
  }

  private stopWatch() {
    if (this.#stopped) {
      return;
    }
    this.#second += 0.5;

    if (this.#second == 60) {
      this.#minute++;
      this.#second = 0;
    }

    if (this.#minute == 60) {
      this.#minute = 0;
      this.#second = 0;
    }

    let minString: string = this.#minute.toString();
    let secString: string = Math.floor(this.#second).toString();

    if (this.#minute < 10) {
      minString = '0' + minString;
    }

    if (this.#second < 10) {
      secString = '0' + secString;
    }

    setTimeout(() => this.stopWatch(), 500);
  }
}
