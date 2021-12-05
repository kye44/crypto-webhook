"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebHookListener = void 0;
const express_1 = __importStar(require("express"));
const guid_typescript_1 = require("guid-typescript");
class WebHookListener {
    constructor(callbacks, path) {
        this.router = (0, express_1.Router)();
        this.callbacks = callbacks;
        this.path = path !== null && path !== void 0 ? path : this.GeneratePath();
        this.InitialiseRoute();
        console.log(this.path);
    }
    get Router() {
        return this.router;
    }
    GeneratePath() {
        return guid_typescript_1.Guid.create().toString();
    }
    InitialiseRoute() {
        this.router.post(this.path, (request, response) => {
            const event = request.body;
            this.callbacks.forEach(callback => callback(event));
            response.send();
        });
    }
}
exports.WebHookListener = WebHookListener;
class WebHookManager {
    constructor(port) {
        this.port = port;
        this.app = (0, express_1.default)();
        this.webHookListeners = [];
        this.InitialiseManager();
    }
    Start() {
        this.webHookListeners.forEach(listener => this.app.use('/', listener.Router));
        this.app.listen(this.port);
        console.log('Started.');
    }
    AddWebHookListener(webHookListener) {
        this.webHookListeners.push(webHookListener);
    }
    InitialiseManager() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
}
exports.default = WebHookManager;
