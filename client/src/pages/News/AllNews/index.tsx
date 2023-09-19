import { IArticle } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import { useFilterStore } from "@/store/filterSlice";
import useDebounce from "@/hooks/useDebounce";
import { getAllNewsFn } from "@/api/authApi";
export default function AllNews() {
  const { toast } = useToast();
  const { filterQuery, sources, category, startDate, endDate } =
    useFilterStore();
  const debouncedFilterQuery = useDebounce(filterQuery, 500);
  const debouncedSources = useDebounce(sources, 500);
  const debouncedCategory = useDebounce(category, 500);
  const { isLoading, data } = useQuery(
    ["allNews", debouncedFilterQuery, sources, category, startDate, endDate],
    () =>
      getAllNewsFn({
        q: debouncedFilterQuery,
        sources: debouncedSources,
        category: debouncedCategory,
        from: startDate,
        to: endDate,
      }),
    {
      onError: (error) => {
        toast({
          title: "Error",
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
    </div>
  ) : (
    data?.news?.articles?.map((item: IArticle, index: number) => (
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
            src={item.urlToImage}
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
    ))
  );
}
