import AbstractView from '../view';

const ENTER_KEYCODE = 13;
const START_COMMAND = `start`;

export default class WelcomeView extends AbstractView {

    get template() {
        return `
        <div class="quest">
        <p class="title">К В Е С Т</p>
        <p class="text">Это игра, где вы — главное действующее лицо. И от ваших действий зависит успех и победа в этой игре.</p>
        <p class="text">Набери в поле ввода <b>${START_COMMAND}</b>, чтобы начать игру!"</p>
        <input type="text">
</div>`.trim();
    }

    bind() {
        const input = this.element.querySelector(`input`);
        input.onkeydown = (evt) => {
            if (evt.keyCode === ENTER_KEYCODE) {
                const value = input.value || ``;
                if (value.toLocaleLowerCase() === START_COMMAND) {
                    this.onStart();
                }
            }
        }
    }

    onStart() {}
}