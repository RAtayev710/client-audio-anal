type Id = string;
type IdObject = { id: Id };

type DateCtx = Date | string | number;

type DateInfo = {
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date | null;
};

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

type PaginationCtx = {
  page: number;
  skip?: number;
  take?: number;
};
