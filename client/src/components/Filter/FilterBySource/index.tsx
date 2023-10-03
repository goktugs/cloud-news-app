import { getAllSourcesFn } from "@/api/newsApi";
import { changePreferencesFn } from "@/api/preferencesApi";
import { AutoComplete } from "@/components/AutoComplete";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useFilterStore } from "@/store/filterSlice";
import { Label } from "@radix-ui/react-label";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function FilterSource() {
  const selectedSource = useFilterStore((state) => state.selectedSource);
  const setSelectedSource = useFilterStore((state) => state.setSelectedSource);

  const { toast } = useToast();

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

  const { mutate } = useMutation(async (data: string) => {
    try {
      await changePreferencesFn({
        selectedSources: [data],
        selectedCategories: [],
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
    mutate(selectedSource);
  };

  return (
    <div className="border p-4 rounded-md  text-center">
      <Label className="text-sm ">By Sources</Label>
      <div className="flex flex-col md:flex-row items-center justify-center gap-2">
        <AutoComplete
          placeholder="Sources"
          onValueChange={(value) => setSelectedSource(value.value)}
          value={{
            label: selectedSource,
            value: selectedSource,
          }}
          options={data}
          emptyMessage={"Not Found"}
        />
        <Button onClick={() => setSelectedSource("")}>Clear</Button>
        <Button onClick={() => handleAddPreffered()}>Add Preffered</Button>
      </div>
    </div>
  );
}
