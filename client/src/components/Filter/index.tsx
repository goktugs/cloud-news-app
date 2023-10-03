import React from "react";
import { Input } from "@/components/ui/input";
import { useFilterStore } from "@/store/filterSlice";
import { useTranslation } from "react-i18next";
import FilterTime from "./FilterByTime";
import FilterSource from "./FilterBySource";
import FilterCategory from "./FilterByCategory";
import { useSelectedTabStore } from "@/store/selectedTabSlice";

export default function Filter() {
  const filterQuery = useFilterStore((state) => state.filterQuery);
  const setFilterQuery = useFilterStore((state) => state.setFilterQuery);
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterQuery(e.target.value);
  };

  const selectedTab = useSelectedTabStore((state) => state.selectedTab);

  return (
    <div className=" flex flex-col w-1/2 space-y-4 items-center justify-center mb-8">
      <Input
        type="search"
        placeholder={`${t("searchBy")} ${t("keywords")}`}
        className="w-full placeholder:text-center text-center  "
        value={filterQuery}
        onChange={handleChange}
      />
      {selectedTab === "all" || selectedTab === "" ? (
        <>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <FilterSource />
            <FilterCategory />
          </div>
          <FilterTime />
        </>
      ) : null}
    </div>
  );
}
