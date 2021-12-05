# crypto-webhook
Repository for the implementations of the crypto-webhook packages.
### Usage
```Typescript
    const webHookManager = new WebHookManager(3001);
    webHookManager.AddWebHookListener(new WebHookListener([
        (webHookEvent: IWebHookEvent) => console.log(webHookEvent.Event),
        (webHookEvent: IWebHookEvent) => console.log(webHookEvent.Content)
    ], '/test'));

    webHookManager.Start();
 ```
