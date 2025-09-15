import { Prisma } from '@prisma/client';

export type UpdateCall = Pick<
  Prisma.CallUncheckedUpdateInput,
  | 'essence'
  | 'initiatorOfTopics'
  | 'identifiedProblem'
  | 'conversationDriver'
  | 'problemResolutionStatus'
  | 'nextContactDate'
  | 'clientInterest'
  | 'managerTask'
>;
