import {DefaultAdapter} from '../model';


const preprocessAnswers = (answers) => {
    const answersObj = {};

    answers.forEach((answer) => {
        const splitAction = answer.action.split(`.`);
        answersObj[splitAction[0]] = {
            'description': splitAction[1],
            'result': answer.result
        };
    });
    return answersObj;
};

export default new class extends DefaultAdapter {
    preprocess(data) {
        const preprocessed = {};
        Object.keys(data).forEach((it, i) => {
            preprocessed[`level-${i}`] = {
                text: data[it].text,
                answers: preprocessAnswers(data[it].answers)
            };
        });

        return preprocessed;
    }

    toServer(data) {
        return JSON.stringify(data);
    }
}();
