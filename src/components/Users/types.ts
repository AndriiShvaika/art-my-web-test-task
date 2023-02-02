export type UserType = {
  email: string;
  gender: string;
  id: number;
  name: string;
  status: string;
};

export type ResponseType = {
  data: UserType[];
  meta: {
    pagination: {
      total: number;
    };
  };
};
