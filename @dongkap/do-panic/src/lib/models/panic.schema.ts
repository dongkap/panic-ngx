import { DBSchema } from 'idb';

export interface PanicIDB extends DBSchema {
  '#do-panic': {
    key: string;
    value: any;
  };
}
