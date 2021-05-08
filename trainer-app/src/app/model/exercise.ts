export class Exercise {
    constructor(
        public name:string,
        public title:string,
        public description:string,
        public image:string,
        public nameSound?:string,
        public procedure?:string,
        public videos?:Array<string>){}
}
