export const environment = {
  production: true,
  locale: 'id-ID',
  basePath: '/satpol-ngx/',
  host: {
    openapi: {
      protocol: 'https',
      host: 'satpol-api-master.herokuapp.com',
    },
    auth: {
      protocol: 'https',
      host: 'satpol-api-security.herokuapp.com',
    },
    security: {
      protocol: 'https',
      host: 'satpol-api-security.herokuapp.com',
    },
    profile: {
      protocol: 'https',
      host: 'satpol-api-security.herokuapp.com',
    },
    master: {
      protocol: 'https',
      host: 'satpol-api-master.herokuapp.com',
    },
    panic: {
      protocol: 'https',
      host: 'satpol-api-activity.herokuapp.com',
    },
    activity: {
      protocol: 'https',
      host: 'satpol-api-activity.herokuapp.com',
    },
    notification: {
      protocol: 'https',
      host: 'satpol-api-notification.herokuapp.com',
    },
  },
};
