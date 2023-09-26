import {
  getAllNewsFn,
  getAllSourcesFn,
  postUserPreferencesFn,
} from "@/api/authApi";
import { AutoComplete } from "@/components/AutoComplete";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import useDebounce from "@/hooks/useDebounce";
import { useAuthorStore } from "@/store/authorSlice";
import { useFilterStore } from "@/store/filterSlice";
import { usePageStore } from "@/store/pageSlice";
import { Label } from "@radix-ui/react-label";
import { useMutation, useQuery } from "@tanstack/react-query";
export default function FilterDropdown() {
  const setSources = useFilterStore((state) => state.setSources);
  const { toast } = useToast();

  const { data } = useQuery(["sources"], getAllSourcesFn, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,

    staleTime: 1000 * 60 * 60 * 24,
    select: (data) =>
      data.sources.sources.reduce((acc, curr) => {
        acc.push({ label: curr.name, value: curr.id });
        return acc;
      }, [] as { label: string; value: string }[]),
  });

  const fromDate = useFilterStore((state) => state.fromDate);
  const toDate = useFilterStore((state) => state.toDate);
  const filterQuery = useFilterStore((state) => state.filterQuery);
  const sources = useFilterStore((state) => state.sources);
  const category = useFilterStore((state) => state.category);
  const page = usePageStore((state) => state.page);

  const setSelectedAuthor = useAuthorStore((state) => state.setSelectedAuthor);

  const debouncedFilterQuery = useDebounce(filterQuery, 500);
  const debouncedSources = useDebounce(sources, 500);
  const debouncedCategory = useDebounce(category, 500);
  const fifteenMinInMs = 1000 * 60 * 15;
  const { data: data2 } = useQuery(
    [
      "allNews",
      debouncedFilterQuery,
      debouncedSources,
      debouncedCategory,
      fromDate,
      toDate,
      page,
    ],
    () =>
      getAllNewsFn({
        q: debouncedFilterQuery,
        sources: debouncedSources,
        category: debouncedCategory,
        from: fromDate,
        to: toDate,
        page,
      }),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: fifteenMinInMs,
      select: (data) => {
        const uniques = Array.from(
          new Set(data.news.articles.map((article) => article.author))
        );
        return uniques.reduce((acc, curr) => {
          acc.push({ label: curr, value: curr });
          return acc;
        }, [] as { label: string; value: string }[]);
      },
    }
  );

  const { mutate } = useMutation(
    postUserPreferencesFn({
      sources: sources,
      authors: [""], 
    }),
    {
      onSuccess: (data) => {
        toast({
          title: "Success",
          description: data.message,
          variant: "default",
        });
      },
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

  return (
    <div className="flex justify-center ">
      <Popover>
        <PopoverTrigger className="border px-4 py-1 rounded-lg">
          Filter Options
        </PopoverTrigger>
        <PopoverContent className="py-4 px-8 flex flex-col space-y-4 ">
          <div className=" space-y-4 flex items-center  flex-col">
            <Label className="text-sm">By Sources</Label>
            <AutoComplete
              placeholder="Sources"
              onValueChange={(value) => setSources(value.value)}
              options={data}
              emptyMessage={"Not Found"}
            />
          </div>
          <div className=" space-y-4 flex items-center  flex-col">
            <Label className="text-sm">By Author</Label>
            <AutoComplete
              placeholder="Author"
              onValueChange={(value) => setSelectedAuthor(value.value)}
              options={data2 || []}
              emptyMessage={"Not Found"}
            />
          </div>

          <Button onClick={handleSelectedPreferred}>Set as a Preffered</Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
