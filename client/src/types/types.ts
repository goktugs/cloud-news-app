export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  id: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface INewsResponse {
  news: INews;
  status: number;
  message?: {
    error: {
      code: string;
      message: string;
    };
  };
}

export interface IHeadlinesresponse {
  headlines: IHeadlines;
  status: number;
  message?: {
    error: {
      code: string;
      message: string;
    };
  };
}

export interface IHeadlines {
  articles: IArticle[];
  status: string;
  totalResults: number;
}

export interface INews {
  articles: IArticle[];
  status: string;
  totalResults: number;
}

export interface IArticle {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
}
