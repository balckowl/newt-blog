export type Article = {
  _id: string
  title: string
  slug: string
  body: string
  coverImage: {
    _id: string
    src: string
  },
  createdAt: string,
  updatedAt: string,
  _sys: {
    createdAt: string
    updatedAt: string
  }
  author: Author,
  topic: Topic,
  category: Omit<Category, 'topic'> & { topic: string };
  description: string;
}

export type Author = {
  _id: string,
  fullName: string,
  slug: string,
  profileImage: {
    _id: string,
    src: string
  },
  admin: boolean,
  description: string
}

export type Category = {
  _id: string,
  name: string,
  slug: string,
  description: string,
  topic: Topic
}

export type Topic = {
  _id: string,
  name: string,
  slug: string,
  description: string,
}

