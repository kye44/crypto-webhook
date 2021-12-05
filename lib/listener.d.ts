import { Router } from 'express';
import IWebHookEvent from './schema';
export declare class WebHookListener {
    private readonly router;
    private path;
    private callbacks;
    constructor(callbacks: ((webHookEvent: IWebHookEvent) => void)[], path?: string);
    get Router(): Router;
    private GeneratePath;
    private InitialiseRoute;
}
export default class WebHookManager {
    private readonly port;
    private readonly app;
    private webHookListeners;
    constructor(port: number);
    Start(): void;
    AddWebHookListener(webHookListener: WebHookListener): void;
    private InitialiseManager;
}
