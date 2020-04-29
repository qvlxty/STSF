export class HttpException {
    constructor(
        private readonly msg: string = 'Backend Error',
        private readonly status: number = 500
    ) { }
    get getErr() {
        return {
            msg: this.msg,
            status: this.status
        }
    }
}

export class NotFoundHttpException extends HttpException {
    constructor() {
        super('Not Found Error', 404);
    }
}