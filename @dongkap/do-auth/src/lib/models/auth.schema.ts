import { DBSchema } from 'idb';

export interface AuthIDB extends DBSchema {
  '#do-auth': {
    key: string;
    value: string;
  };
}
