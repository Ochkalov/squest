export const initialGame = {
  level: 0,
  lives: 3,
  time:0  
};

export const setLives = (game, lives) => {
    if ( lives < 0 ) {
        throw new RangeError(`Can't set negative lives`);
    } 
    game = Object.assign({}, game);
    game.lives = lives;
    return game;
};

export const getLevel = (num, quest) => quest[`level-${num}`];

export const nextLevel = (state, quest) => {
    const next = state.level + 1;
    if (!getLevel(next, quest)) {
        throw new RangeError(`Can't find level ${next}`);
    }
    state = Object.assign({}, state);
    state.level = next;
    return state;
};

const LEFT = `LEFT`;
const RIGHT = `RIGHT`;
const JUMP = `JUMP`;
const ONE = `1`;
const TWO = `2`;
const THREE = `3`;
const FOUR = `4`;

export const Action = {
    LEFT, RIGHT, JUMP, ONE, TWO, THREE, FOUR
};

export const Result = {
    DIE: `die`,
    NOOP: `noop`,
    NEXT: `next`,
    WIN: `win`
};