import {changeView} from '../util';
import WelcomeView from './welcome-view';
import App from '../main';


export default class Welcome {
    constructor() {
        this.view = new WelcomeView();
    }

    init() {
        App.showWelcome();
        changeView(this.view);

        this.view.onStart = () => {
            App.showGame();
        };
    }
}