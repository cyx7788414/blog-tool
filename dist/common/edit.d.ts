import Index from '../class/index';
import Answer from '../class/answer';
import CleanAnswer from '../class/cleananswer';
import Article from "../class/article";
declare const editOperation: {
    initForm: (indexObj: Index, target?: Article) => Promise<Answer>;
    checkAnswer: (indexObj: Index, answer: Answer) => CleanAnswer;
    makeSure: (argv: any, answer: CleanAnswer, target?: Article) => Promise<{
        makesure: boolean;
    }>;
};
export default editOperation;
