// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  locale: 'id-ID',
  basePath: '/',
  host: {
    openapi: {
      protocol: 'http',
      host: 'localhost',
      port: 8085,
    },
    auth: {
      protocol: 'http',
      host: 'localhost',
      port: 8085,
    },
    security: {
      protocol: 'http',
      host: 'localhost',
      port: 8085,
    },
    profile: {
      protocol: 'http',
      host: 'localhost',
      port: 8085,
    },
    master: {
      protocol: 'http',
      host: 'localhost',
      port: 8085,
    },
    panic: {
      protocol: 'http',
      host: 'localhost',
      port: 8085,
    },
    activity: {
      protocol: 'http',
      host: 'localhost',
      port: 8085,
    },
    notification: {
      protocol: 'http',
      host: 'localhost',
      port: 8085,
    },
    file: {
      protocol: 'http',
      host: 'localhost',
      port: 8085,
    },
  },
};
