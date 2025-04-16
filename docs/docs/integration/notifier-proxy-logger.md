# Notifier Proxy Logger

![img.png](../../assets/integration/npl.png){style="display: block; margin: 0 auto" }

This project is used as a central Messaging management point, where messages sent to variety of end points can be stored, and previewed in history.

- Project repository: https://github.com/Volmarg/notifier-proxy-logger
- Project bridge repository: https://github.com/Volmarg/notifier-proxy-logger-bridge

## Handling

Call this command:

```shell
bin/console cron:transfer-schedules-to-notifier-proxy-logger
```

This command is for example sending the incoming schedules to **NPL**.

## Configuration

The configuration for connecting to the project (for calling API) can be found in `config/services.yaml`.

```yaml
App\NotifierProxyLoggerBridge:
    public: true
    arguments:
        $logFilePath: '%kernel.logs_dir%/notifier-proxy-logger-bridge.log' # where the log will be stored
        $loggerName: 'NotifierProxyLogger'                                 # log entries identifier
        $baseUrl: 'http://127.0.0.1:8010/'                                 # url to the project
```

::: info
No authentication is required when inserting the messages in the **NPL**.
:::
