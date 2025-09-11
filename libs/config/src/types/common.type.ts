import { Schema } from 'joi';

export type ConfigProps<V> = {
  joi: Schema;
  value?: V;
};

export type JoiConfig<T extends object, V> = Record<keyof T, ConfigProps<V>>;
