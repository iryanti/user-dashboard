export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;

  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };

  company: {
    name: string;
    catchPhrase: string;
  };
};

export type UserWithStats = User & {
  totalPosts: number;
  completedCount: number;
  pendingTodos: number;
};