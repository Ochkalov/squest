import {changeView} from './util';
import Game from './game/game';
import Model from './model';
import questAdapter from './data/quest-adapter';
import SplashScreen from './splash-screen/splash-screen';
import Welcome from './welcome/welcome';


const ControllerID = {
    WELCOME: ``,
    GAME: `game`,
    WIN: `die`,
    DIE: `win`,
};


const getControllerIDFromHash = (hash) => hash.replace(`#`, ``);


class App {
    constructor() {
        const preloaderRemove = this.showPreloader();

        this.model = new class extends Model {
            get urlRead() {
                return `https://intensive-ecmascript-server-srmhvdwcks.now.sh/text-quest/quest`;
            }

            get urlWrite() {
                return `true`;
            }
        }();

        this.model.load(questAdapter)
            .then((data) => this.setup(data))
            .then(preloaderRemove)
            .then(() => this.changeController(getControllerIDFromHash(location.hash)))
            .catch(window.console.error);
    }

    setup(data) {
        this.routes = {
            [ControllerID.WELCOME]: new Welcome(),
            [ControllerID.GAME]: new Game(this.model, data)
        };

        window.onhashchange = () => {
            this.changeController(getControllerIDFromHash(location.hash));
        };
    }

    changeController(route = ``) {
        this.routes[route].init();
    }

    showPreloader() {
        const splashScreen = new SplashScreen();
        changeView(splashScreen);
        splashScreen.start();

        return () => splashScreen.hide();
    }

    showWelcome() {
        location.hash = ControllerID.WELCOME;
    }

    showGame() {
        location.hash = ControllerID.GAME;
    }
}

export default new App();
