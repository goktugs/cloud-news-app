import { getAllSourcesFn } from "@/api/authApi";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFilterStore } from "@/store/filterSlice";
import { Label } from "@radix-ui/react-label";
import { useQuery } from "@tanstack/react-query";
export default function FilterDropdown() {
  const { category, sources, setSources, setCategory } = useFilterStore();

  const { data } = useQuery(["sources"], getAllSourcesFn);

  return (
    <div className="flex justify-center ">
      <Popover>
        <PopoverTrigger className="border px-4 py-1 rounded-lg">
          Filter Options
        </PopoverTrigger>
        <PopoverContent className="py-4 px-8 flex flex-col space-y-4 ">
          <div className="space-x-8 flex items-center ">
            {" "}
            <Label htmlFor="category">Category</Label>
            <Input
              type="text"
              id="category"
              placeholder="Category"
              className=""
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="space-x-8 flex items-center ">
            {" "}
            <Label htmlFor="source">Source</Label>
            <Input
              type="text"
              id="source"
              placeholder="Source"
              className=""
              value={sources}
              onChange={(e) => setSources(e.target.value)}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
