export type Note = {
  id: string;
  content: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type FetchedNote = {
  _id: string;
  content: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};
