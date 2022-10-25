import { DBSchema } from 'idb';

export interface ProfileIDB extends DBSchema {
  '#do-profile': {
    key: string;
    value: any;
  };
}
