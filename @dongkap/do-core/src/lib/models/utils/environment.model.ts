export class Environment {
    production: boolean = true;
    locale: string = 'en-US';
    basePath: string = '/';
    host: {
        [name: string]: Server,
    };
}

export class Server {
    protocol?: string = 'http';
    host: string;
    port?: string;
}
