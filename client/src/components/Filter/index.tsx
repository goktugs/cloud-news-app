import React from "react";
import { Input } from "@/components/ui/input";
import FilterDropdown from "./FilterDropdown";
import { useFilterStore } from "@/store/filterSlice";
import { useTranslation } from "react-i18next";

export default function Filter() {
  const { filterQuery, setFilterQuery } = useFilterStore();
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterQuery(e.target.value);
  };

  return (
    <div className=" flex flex-col w-1/2 space-y-4 items-center justify-center mb-8">
      <Input
        type="search"
        placeholder={`${t("searchBy")} ${t("keywords")}`}
        className="w-full placeholder:text-center text-center  "
        value={filterQuery}
        onChange={handleChange}
      />
      <FilterDropdown />
    </div>
  );
}
