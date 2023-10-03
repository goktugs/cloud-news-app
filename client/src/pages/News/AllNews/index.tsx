import { useFilterStore } from "@/store/filterSlice";
import useDebounce from "@/hooks/useDebounce";
import { useState } from "react";
import { usePageStore } from "@/store/pageSlice";
import Everything from "./Everything";
import Headlines from "./Headlines";
export default function AllNews() {
  const [page, setPage] = useState(1);

  const setPageSlice = usePageStore((state) => state.setPageSlice);
  setPageSlice(page);
  const filterStore = useFilterStore((state) => state);
  const fromDate = filterStore.fromDate;
  const toDate = filterStore.toDate;
  const filterQuery = filterStore.filterQuery;
  const sources = filterStore.selectedSource;
  const category = filterStore.category;

  const debouncedFilterQuery = useDebounce(filterQuery, 500);
  const debouncedSources = useDebounce(sources, 500);
  const debouncedCategory = useDebounce(category, 500);

  let NewsComponent;
  if (category) {
    NewsComponent = Headlines;
  } else {
    NewsComponent = Everything;
  }

  return (
    <NewsComponent
      debouncedFilterQuery={debouncedFilterQuery}
      debouncedSources={debouncedSources}
      debouncedCategory={debouncedCategory}
      fromDate={fromDate}
      toDate={toDate}
      page={page}
      setPage={setPage}
    />
  );
}
