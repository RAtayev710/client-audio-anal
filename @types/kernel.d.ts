type Id = string;
type IdObject = { id: Id };

type DateCtx = Date | string | number;

type DateInfo = {
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date | null;
};

type QueryPayload<T = any, S = any> = Partial<{ filter: T; sort: S }>;

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

type PaginationCtx = {
  limit: number;
  offset: number;
  page: number;
};
