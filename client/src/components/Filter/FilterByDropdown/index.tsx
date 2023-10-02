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
  const { toast } = useToast();

  const fromDate = useFilterStore((state) => state.fromDate);
  const toDate = useFilterStore((state) => state.toDate);
  const filterQuery = useFilterStore((state) => state.filterQuery);
  const sources = useFilterStore((state) => state.sources);
  const category = useFilterStore((state) => state.category);
  const page = usePageStore((state) => state.page);

  // const setSelectedAuthor = useAuthorStore((state) => state.setSelectedAuthor);

  // const debouncedFilterQuery = useDebounce(filterQuery, 500);
  // const debouncedSources = useDebounce(sources, 500);
  // const debouncedCategory = useDebounce(category, 500);
  // const fifteenMinInMs = 1000 * 60 * 15;
  // const { data: data2 } = useQuery(
  //   [
  //     "allNews",
  //     debouncedFilterQuery,
  //     debouncedSources,
  //     debouncedCategory,
  //     fromDate,
  //     toDate,
  //     page,
  //   ],
  //   () =>
  //     getAllNewsFn({
  //       q: debouncedFilterQuery,
  //       sources: debouncedSources,
  //       category: debouncedCategory,
  //       from: fromDate,
  //       to: toDate,
  //       page,
  //     }),
  //   {
  //     refetchOnWindowFocus: false,
  //     refetchOnMount: false,
  //     refetchOnReconnect: false,
  //     retry: false,
  //     staleTime: fifteenMinInMs,
  //     select: (data) => {
  //       const uniques = Array.from(
  //         new Set(data.news.articles.map((article) => article.author))
  //       );
  //       return uniques.reduce((acc, curr) => {
  //         acc.push({ label: curr, value: curr });
  //         return acc;
  //       }, [] as { label: string; value: string }[]);
  //     },
  //   }
  // );

  return (
    <div className="flex justify-center ">
      {/* <Popover>
        <PopoverTrigger className="border px-4 py-1 rounded-lg">
          Filter Options
        </PopoverTrigger>
        <PopoverContent className="py-4 px-8 flex flex-col space-y-4 ">
          <div className=" space-y-4 flex items-center  flex-col">
            <Label className="text-sm">By Author</Label>
            <AutoComplete
              placeholder="Author"
              onValueChange={(value) => setSelectedAuthor(value.value)}
              options={data2 || []}
              emptyMessage={"Not Found"}
            />
          </div>

          <Button>Set as a Preffered</Button>
        </PopoverContent>
      </Popover> */}
    </div>
  );
}
