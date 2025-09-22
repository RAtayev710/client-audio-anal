import { Prisma } from '@prisma/client';

export type CreateClient = Pick<
  Prisma.ClientUncheckedCreateInput,
  | 'age'
  | 'havingChildren'
  | 'hobbies'
  | 'jobTitle'
  | 'maritalStatus'
  | 'name'
  | 'orgId'
  | 'phoneNumber'
  | 'placeOfResidence'
  | 'placeOfWork'
  | 'sex'
  | 'sphereOfActivity'
>;
