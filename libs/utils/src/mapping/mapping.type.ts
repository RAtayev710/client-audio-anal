import { ClassConstructor, ClassTransformOptions } from 'class-transformer';

export type MappingCtx<C> = {
  cls: ClassConstructor<C>;
  options?: ClassTransformOptions;
};
