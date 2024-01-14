export class InfoItem {
    constructor(
        public topic: string,
        public header: string,
        public content: string,
        public summary: string,
        public dbId?: string,
    ){}
}