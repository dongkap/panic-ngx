import { APIModel, HttpMethod } from '@dongkap/do-core';
import { environment } from '../environments/environment';

export const apiPath: APIModel = {
    sample: {
        select: {
            server: environment.host.sample,
            method: HttpMethod.GET,
            path: '/assets/data/select.json',
        },
        datatable: {
            server: environment.host.sample,
            method: HttpMethod.GET,
            path: '/assets/data/datatable.json',
        },
        'sample-datatable': {
            server: environment.host.sample,
            method: HttpMethod.GET,
            path: '/assets/data/sample-datatable.json',
        },
    },
};
