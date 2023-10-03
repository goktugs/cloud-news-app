import { getAllHeadlinesFn } from "@/api/newsApi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import { useToast } from "@/components/ui/use-toast";
import { IArticle } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

export default function Headlines({
  page,
  setPage,
  debouncedFilterQuery,
  debouncedSources,
  debouncedCategory,
}: {
  page?: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  debouncedFilterQuery?: string;
  debouncedSources?: string;
  debouncedCategory?: string;
}) {
  const fifteenMinInMs = 1000 * 60 * 15;
  const { toast } = useToast();

  const { isLoading, data, isPreviousData } = useQuery(
    [
      "allHeadlines",
      debouncedFilterQuery,
      debouncedSources,
      debouncedCategory,
      page,
    ],
    () =>
      getAllHeadlinesFn({
        q: debouncedFilterQuery,
        sources: debouncedSources,
        category: debouncedCategory,
        page,
      }),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: fifteenMinInMs,
      onError: (error) => {
        toast({
          title: "Error",
          //@ts-ignore
          description: error.response.data.message,
          variant: "destructive",
        });
      },
    }
  );

  return isLoading ? (
    <div className="w-full h-full">
      <LoadingSpinner />
    </div>
  ) : data?.status === 500 ? (
    <div className="w-full h-full text-white">
      <p className="text-center">{data?.message?.error.message}</p>
      <p className="text-red-900 text-4xl">
        Please Clear Categories and Search by Sources
      </p>
    </div>
  ) : (
    <>
      <h1>headlienes</h1>
      {data?.headlines?.articles?.map((item: IArticle, index: number) => (
        <Card key={index} className="bg-transparent text-white flex flex-col">
          <CardHeader>
            <CardTitle className="text-center">{item.title}</CardTitle>
            <CardDescription className="flex justify-between flex-col">
              {" "}
              <span className="flex justify-between">
                <span>{item.author}</span>
                <span>{format(new Date(item.publishedAt), "PPP")}</span>
              </span>
              <span className="text-center mt-2">{item.source.name}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            <img
              src={
                item.urlToImage
                  ? item.urlToImage
                  : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
              }
              onError={(e) => {
                e.currentTarget.src =
                  "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg";
              }}
              className="w-full h-48 object-cover rounded-md"
              alt={item.author}
            />
            <p>{item.description}</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => window.open(item.url, "_blank")}>
              {" "}
              Read More
            </Button>
          </CardFooter>
        </Card>
      ))}
      <span className="mt-6">Current Page: {page}</span>
      <Button
        className="bg-purple-600 text-white hover:bg-purple-800 my-4"
        onClick={() => setPage && setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 1}
      >
        Previous Page
      </Button>{" "}
      <Button
        className="bg-purple-600 text-white hover:bg-purple-800 my-4"
        onClick={() => {
          if (!isPreviousData /*&& data.hasMore*/) {
            setPage && setPage((old) => old + 1);
          }
        }}
        disabled={isPreviousData /*|| !data?.hasMore*/}
      >
        Next Page
      </Button>
    </>
  );
}
