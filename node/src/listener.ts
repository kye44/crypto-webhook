import express, { Application, Router, Request, Response } from 'express';
import { Guid } from 'guid-typescript';
import IWebHookEvent from './schema';

export class WebHookListener {
    private readonly router: Router;
    private path: string;
    private callbacks: ((webHookEvent: IWebHookEvent) => void)[];

    public constructor(callbacks: ((webHookEvent: IWebHookEvent) => void)[], path?: string) {
        this.router = Router();
        this.callbacks = callbacks;
        this.path = path ?? this.GeneratePath();
        this.InitialiseRoute();
        console.log(this.path);
    }

    public get Router(): Router {
        return this.router;
    }

    private GeneratePath(): string {
        return Guid.create().toString();
    }

    private InitialiseRoute(): void {
        this.router.post(this.path, (request: Request, response: Response) => {
            const event = request.body as IWebHookEvent;
            this.callbacks.forEach(callback => callback(event));
            response.send();
        });
    }
}

export default class WebHookManager {
    private readonly port: number;
    private readonly app: Application;
    private webHookListeners: WebHookListener[];

    public constructor(port: number) {
        this.port = port;
        this.app = express();
        this.webHookListeners = [];
        this.InitialiseManager();
    }

    public Start(): void {
        this.webHookListeners.forEach(listener => this.app.use('/', listener.Router));
        this.app.listen(this.port);
        console.log('Started.');
    }

    public AddWebHookListener(webHookListener: WebHookListener): void {
        this.webHookListeners.push(webHookListener);
    }

    private InitialiseManager(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
}
