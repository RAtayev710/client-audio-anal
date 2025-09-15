// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FastifyRequest } from 'fastify';

type AuthPayload = {
  orgId: number;
  orgs: number[];
};

declare module 'fastify' {
  export interface FastifyRequest {
    auth?: AuthPayload;
  }
}
