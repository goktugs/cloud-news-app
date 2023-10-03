import { changePreferencesFn } from "@/api/preferencesApi";
import { AutoComplete } from "@/components/AutoComplete";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useFilterStore } from "@/store/filterSlice";
import { useMutation } from "@tanstack/react-query";
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
  const { toast } = useToast();
  const setCategory = useFilterStore((state) => state.setCategory);
  const category = useFilterStore((state) => state.category);

  const fromDate = useFilterStore((state) => state.fromDate);
  const toDate = useFilterStore((state) => state.toDate);

  const { mutate } = useMutation(async (data: string) => {
    try {
      await changePreferencesFn({
        selectedSources: [],
        selectedCategories: [data],
        selectedAuthors: [],
      });
    } catch (error) {
      toast({
        title: "Error",
        //@ts-ignore
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  });

  const handleAddPreffered = () => {
    mutate(category);
  };

  useEffect(() => {
    if (fromDate || toDate) {
      setCategory("");
    }
  }, [fromDate, setCategory, toDate]);

  return (
    <div className="border p-4 rounded-md  text-center">
      <Label className="text-sm ">By Categories</Label>
      <div className="flex flex-col md:flex-row items-center justify-center gap-2">
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
        <Button onClick={() => handleAddPreffered()}>Add Preffered</Button>
      </div>
    </div>
  );
}
