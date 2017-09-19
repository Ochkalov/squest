import AbstractView from '../view';


export default class SplashScreen extends AbstractView {
    constructor() {
        super();
        this.cursor = 0;
        this.symbolsSeq = `/—\\|`;
    }

    get template() {
        return `<div></div>`;
    }

    start() {
        this.cursor = ++this.cursor >= this.symbolsSeq.length ? 0 : this.cursor;
        this.element.textContent = this.symbolsSeq[this.cursor];
        this.timeout = setTimeout(() => this.start(), 50);
    }

    hide() {
        clearTimeout(this.timeout);
    }
}
