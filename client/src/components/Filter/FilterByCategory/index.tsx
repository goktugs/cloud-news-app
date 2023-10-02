import { AutoComplete } from "@/components/AutoComplete";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useFilterStore } from "@/store/filterSlice";
import { useEffect } from "react";

const CATEGORIESDATA = [
  {
    label: "Business",
    value: "business",
  },
  {
    label: "Entertainment",
    value: "entertainment",
  },
  {
    label: "General",
    value: "general",
  },
  {
    label: "Health",
    value: "health",
  },
  {
    label: "Science",
    value: "science",
  },
  {
    label: "Sports",
    value: "sports",
  },
  {
    label: "Technology",
    value: "technology",
  },
];

export default function FilterCategory() {
  const setCategory = useFilterStore((state) => state.setCategory);
  const category = useFilterStore((state) => state.category);

  const fromDate = useFilterStore((state) => state.fromDate);
  const toDate = useFilterStore((state) => state.toDate);

  useEffect(() => {
    if (fromDate || toDate) {
      setCategory("");
    }
  }, [fromDate, setCategory, toDate]);

  return (
    <div className="border p-4 rounded-md  text-center">
      <Label className="text-sm ">By Categories</Label>
      <div className="flex items-center justify-center gap-2">
        <AutoComplete
          placeholder="Categories"
          onValueChange={(value) => setCategory(value.value)}
          options={CATEGORIESDATA}
          value={{
            value: category,
            label: category,
          }}
          emptyMessage={"Not Found"}
        />
        <Button onClick={() => setCategory("")}>Clear</Button>
      </div>
    </div>
  );
}
