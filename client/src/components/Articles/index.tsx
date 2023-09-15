export default function Articles(articles: {
  image: string;
  title: string;
  description: string;
  source: string;
  published_at: string;
}) {
  return (
    <article
      className="bg-slate-100
 dark:bg-slate-800 flex flex-col 
 rounded-lg shadow-lg hover:scale-105 
 hover:shadow-xl hover:bg-slate-200 
 transition-all duration-200 ease-out"
    >
      {articles.image && (
        <img
          src={articles.image}
          alt={articles.title}
          className="h-56 
w-full object-cover rounded-t-lg shadow-md"
        />
      )}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col p-5">
          <h2 className="font-bold font-serif">{articles.title}</h2>
          <section className="mt-2 flex-1">
            <p className="text-xs line-clamp-6">{articles.description}</p>
          </section>
          <footer
            className="text-xs text-right 
      ml-auto flex space-x-1 pt-5 italic text-gray-400"
          >
            <p>{articles.source} -</p>
            <p>{articles.published_at}</p>
          </footer>
        </div>
      </div>
    </article>
  );
}

//   {
//     author: "TMZ Staff",
//     title: "Rafael Nadal Pulls Out Of U.S. Open Over COVID-19 Concerns",
//     description:
//       'Rafael Nadal is officially OUT of the U.S. Open ... the tennis legend said Tuesday it\'s just too damn unsafe for him to travel to America during the COVID-19 pandemic. "The situation is very complicated worldwide," Nadal wrote in a statement. "The…',
//     url: "https://www.tmz.com/2020/08/04/rafael-nadal-us-open-tennis-covid-19-concerns/",
//     source: "TMZ.com",
//     image:
//       "https://imagez.tmz.com/image/fa/4by3/2020/08/04/fad55ee236fc4033ba324e941bb8c8b7_md.jpg",
//     category: "general",
//     language: "en",
//     country: "us",
//     published_at: "2020-08-05T05:47:24+00:00",
//   },

// what is the type of whis object?
