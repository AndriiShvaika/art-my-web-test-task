export type ResponseType = {
  data: {
    email: string;
    gender: "male" | "female";
    id: number;
    name: string;
    status: "active" | "inactive";
  };
};
