# Personal management system IO

![img.png](../../assets/integration/pms-io.png){style="display: block; margin: 0 auto" }

This project is used as proxy for receiving, and displaying the data transferred from **Personal Management System**. 

- Project repository: https://github.com/Volmarg/personal-management-system-io
- Project bridge repository: https://github.com/Volmarg/personal-management-system-io-bridge

## Handling

Call this command:

```shell
bin/console cron:transfer-data-to-pms-io
```

## Configuration

The configuration for connecting to the project (for calling API) can be found in `config/services.yaml`.

```yaml
App\PmsIo\PmsIoBridge:
  public: true
  arguments:
    $logFilePath: '%kernel.logs_dir%/pms-io-bridge.log'
    $loggerName: 'PmsIoLogger'
    $baseUrl: 'http://127.0.0.1:8001/'
    $login: 'login'                   # login for IO API access
    $password: 'password'             # password for IO API access
    $secret: 'Jwt-secret'             # jwt secret used to generate the token
```

::: info
**PMS-IO** has a command to generate API access
:::
