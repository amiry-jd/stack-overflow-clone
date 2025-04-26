export type ParamsProps = {
  params: Promise<{ id: string }>;
};

export type SearchParamsProps = {
  searchParams: Promise<{
    q?: string;
    filter?: string;
    page?: number;
    pageSize?: number;
  }>;
};

export type ParamsSearchProps = ParamsProps & SearchParamsProps;

export type MetaDataProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
