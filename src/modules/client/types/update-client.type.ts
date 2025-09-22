import { Prisma } from '@prisma/client';

export type UpdateClient = Pick<
  Prisma.ClientUncheckedUpdateInput,
  | 'age'
  | 'havingChildren'
  | 'hobbies'
  | 'jobTitle'
  | 'maritalStatus'
  | 'name'
  | 'placeOfResidence'
  | 'placeOfWork'
  | 'sex'
  | 'sphereOfActivity'
>;
