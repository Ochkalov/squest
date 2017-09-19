import {initialGame, nextLevel, Result, setLives} from "../data/quest";
import LevelView from './level-view';
import {changeView} from '../util';
import GameOverView from '../gameover/gameover-view';
import QuestAdapter from '../data/quest-adapter';

export default class Game {
    constructor(model, quest) {
        this.model = model;
        this.quest = quest;
    }

    init() {
        this.changeLevel(initialGame);
    }

    get view() {
        return this._view;
    }

    set view(view) {
        this._view = view;
        changeView(view);
    }

    changeLevel(state) {
        this.state = state;
        this.view = new LevelView(this.state, this.quest);
        this.tickTimer();

        this.view.onAnswer = (answer) => {
            this.stopTimer();

            switch (answer.result) {
                case Result.DIE:
                    this.die();
                    break;

                case Result.WIN:
                    this.win();
                    break;

                case Result.NEXT:
                    this.changeLevel(nextLevel(this.state, this.quest));
                    break;

                default:
                    throw new Error(`Unknown result ${answer.result}`);
            }
        }
    }

    tickTimer() {
        this.state = Object.assign({}, this.state, {
            time: this.state.time + 1
        });
        this.view.updateTimer(this.state.time);

        this.timeout = setTimeout(() => this.tickTimer(), 1000);
    }

    stopTimer() {
        clearTimeout(this.timeout);
    }

    die() {
        this.view = new GameOverView(false);
        this.view.onRepeat = () => {
            this.changeLevel(setLives(this.state, this.state.lives - 1));
        }
    }

    win() {
        this.model.send(this.state, QuestAdapter).then(() => {
            this.view = new GameOverView(true);
            this.view.onRepeat = () => {
                this.changeLevel(initialGame);
            };
        });
    }
}