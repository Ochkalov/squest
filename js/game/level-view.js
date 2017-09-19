import {getLevel} from "../data/quest";
import AbstractView from '../view';

const   ENTER_KEYCODE = 13;

const drawHeart = (full) => {
    return `<span class="Heart__${(full ? `full` : `empty`)}">${full ? `&#9829;` : `&#9825;`}</span>`;
};

const drawHeader = (data) => {
    return `
    <header class="header">
    <div>Мир: ${data.level}</div>
    <div>
    Жизни: ${drawHeart(data.lives > 2)}
          ${drawHeart(data.lives > 1)}
          ${drawHeart(data.lives > 0)}
    </div>
    <div>Время: ${data.time}</div>
</header>`
};

export default class LevelView extends  AbstractView {
    constructor(state, model) {
        super();
        this.state = state;
        this.model = model;
    }
    
    get template() {
        const level = getLevel(this.state.level, this.model);
        
        const answerNames = Object.keys(level.answers);
        const answers = answerNames.map((key) => ({key, value: level.answers[key]}));
        
        return `
        ${drawHeader(this.state)}
        <div class="quest">
            <p class="text">${level.text}</p>
            <input type="text">
            <ul class="answers">
            ${answers.map(({key, value}) => `<li class="answer">${key}. ${value.description}</li>`).join(``)}
            </ul>
        </div>
        <small>Для справки введите <i>help</i></small>`.trim();
    }
    
    bind() {
        const input = this.element.querySelector(`input`);
        input.onkeydown = (evt) => {
            if (evt.keyCode === ENTER_KEYCODE) {
                const level = getLevel(this.state.level, this.model);
                const answer = level.answers[input.value.toUpperCase()];
                
                if (answer) {
                    this.onAnswer(answer);
                }
            }
        };
    }
    
    onAnswer(answer) {
        return answer;
    }
    
    updateTimer(time) {
        const timerContainer = this.element.querySelector(`header div:last-child`);
        timerContainer.textContent = `Время: ${time}`;
    }
}