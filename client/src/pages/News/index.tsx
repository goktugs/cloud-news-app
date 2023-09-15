import Articles from "@/components/Articles";
import React from "react";

interface IArticle {
  author: string;
  title: string;
  description: string;
  url: string;
  source: string;
  image: string;
  category: string;
  language: string;
  country: string;
  published_at: string;
}

const ARTICLES: IArticle[] = [
  {
    author: "TMZ Staff",
    title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
    description:
      'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
    url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
    source: "TMZ.com",
    image:
      "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
    category: "general",
    language: "en",
    country: "us",
    published_at: "2020-08-05T05:47:24+00:00",
  },
  {
    author: "TMZ Staff",
    title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
    description:
      'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
    url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
    source: "TMZ.com",
    image:
      "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
    category: "general",
    language: "en",
    country: "us",
    published_at: "2020-08-05T05:47:24+00:00",
  },
  {
    author: "TMZ Staff",
    title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
    description:
      'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
    url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
    source: "TMZ.com",
    image:
      "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
    category: "general",
    language: "en",
    country: "us",
    published_at: "2020-08-05T05:47:24+00:00",
  },
  {
    author: "TMZ Staff",
    title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
    description:
      'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
    url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
    source: "TMZ.com",
    image:
      "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
    category: "general",
    language: "en",
    country: "us",
    published_at: "2020-08-05T05:47:24+00:00",
  },
  {
    author: "TMZ Staff",
    title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
    description:
      'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
    url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
    source: "TMZ.com",
    image:
      "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
    category: "general",
    language: "en",
    country: "us",
    published_at: "2020-08-05T05:47:24+00:00",
  },
  {
    author: "TMZ Staff",
    title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
    description:
      'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
    url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
    source: "TMZ.com",
    image:
      "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
    category: "general",
    language: "en",
    country: "us",
    published_at: "2020-08-05T05:47:24+00:00",
  },
  {
    author: "TMZ Staff",
    title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
    description:
      'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
    url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
    source: "TMZ.com",
    image:
      "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
    category: "general",
    language: "en",
    country: "us",
    published_at: "2020-08-05T05:47:24+00:00",
  },
];

export default function News() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">News</h1>
      <div
        className="grid 
        grid-cols-1 md:grid-cols-2 lg:grid-cols-3
        p-10 gap-10"
      >
        {ARTICLES.map((article) => (
          <Articles key={article.title} {...article} />
        ))}
      </div>
    </div>
  );
}
