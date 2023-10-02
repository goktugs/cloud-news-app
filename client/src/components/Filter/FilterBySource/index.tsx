import { getAllSourcesFn } from "@/api/newsApi";
import { AutoComplete } from "@/components/AutoComplete";
import { Button } from "@/components/ui/button";
import { useFilterStore } from "@/store/filterSlice";
import { Label } from "@radix-ui/react-label";
import { useQuery } from "@tanstack/react-query";

export default function FilterSource() {
  const sources = useFilterStore((state) => state.sources);
  const setSources = useFilterStore((state) => state.setSources);

  const { data } = useQuery(["sources"], getAllSourcesFn, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,

    staleTime: 1000 * 60 * 60 * 24,
    select: (data) =>
      data.sources.sources.reduce(
        (
          acc: { label: string; value: string }[],
          curr: { name: string; id: string }
        ) => {
          acc.push({ label: curr.name, value: curr.id });
          return acc;
        },
        []
      ),
  });

  return (
    <div className="border p-4 rounded-md  text-center">
      <Label className="text-sm ">By Sources</Label>
      <div className="flex items-center justify-center gap-2">
        <AutoComplete
          placeholder="Sources"
          onValueChange={(value) => setSources(value.value)}
          value={{
            label: sources,
            value: sources,
          }}
          options={data}
          emptyMessage={"Not Found"}
        />
        <Button onClick={() => setSources("")}>Clear</Button>
      </div>
    </div>
  );
}
