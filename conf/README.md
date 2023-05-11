<h1 align='center'>Application Configuration Design</h1>

## What is the source of the application's configuration?

- **Runtime Source** : Node Environment Variable
- **File Source** :
  - Toml Configuration File, mutable after build
  - Typescript Constants File, immutable after build

## Runtime Source

| Variable Name   | Description                               | Value Type                                                    |
| --------------- | ----------------------------------------- | ------------------------------------------------------------- |
| NODE_CONFIG_DIR | the directory which contains config files | string                                                        |
| NODE_ROOT_DIR   | the project root path                     | string                                                        |
| NODE_ENV        | the environment of app                    | [AppEnvironment](./server/infra/setting/setting.constants.ts) |

## File Source
 
Configuration form file source only support [toml](https://toml.io/en/) extension at now.

### Toml Configuration File

**Valid Naming Format :**

1. `default.toml`
2. `${AppEnvironment}.toml`

**Usage Priority**

1. `${AppEnvironment}.toml`
2. `default.toml`

**examples :**

```
 - conf
    - default.conf # will be always used
    - development.conf  # will be used when NODE_ENV === 'development', and override the default configuration if default.toml existed.
    - production.conf # will be used when NODE_ENV === 'production', other same as above.
    - test.conf # will be used when NODE_ENV === 'test',other same as above
```

### Typescript Constants File

The typescript constants file is used as the default value for the file source configuration, ensuring that the application will run normally even if no toml configuration file is found.

### Code

Detail please see [SettingModule](./server/infra/setting)
