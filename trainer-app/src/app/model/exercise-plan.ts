import {Exercise} from '../model/exercise';

export class ExercisePlan {
    constructor(
        public exercise:Exercise,
        public duration:number
    ){ }
}
