import { DBSchema } from 'idb';

export interface SettingsIDB extends DBSchema {
  '#do-settings': {
    key: string;
    value: any;
  };
}
