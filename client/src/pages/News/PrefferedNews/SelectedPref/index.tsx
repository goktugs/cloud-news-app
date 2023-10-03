import { getPreferencesFn } from "@/api/preferencesApi";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { usePreferredStore } from "@/store/prefferedSlice";
import { useQuery } from "@tanstack/react-query";

export const SelectedPreferences = () => {
  const { toast } = useToast();
  const { data, isLoading } = useQuery(["preferences"], getPreferencesFn, {
    onError: (error) => {
      toast({
        title: "Error",
        //@ts-ignore
        description: error.response.data.message,
        variant: "destructive",
      });
    },
  });

  const setPrefferedCategory = usePreferredStore(
    (state) => state.setPrefferedCategory
  );

  const preferredCategory = usePreferredStore(
    (state) => state.preferredCategory
  );

  const setPrefferedSources = usePreferredStore(
    (state) => state.setPrefferedSources
  );

  const currentSources = usePreferredStore((state) => state.prefferedSources);

  const handleSourceClick = (source: string) => {
    if (!currentSources.includes(source)) {
      const newSources = [...currentSources, source];

      setPrefferedSources(newSources);
    } else {
      const newSources = currentSources.filter((s) => s !== source);

      setPrefferedSources(newSources);
    }
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="grid grid-cols-2 py-4">
      <div className="flex space-x-4 items-center">
        <div>Selected Categories:</div>
        <Select
          value={preferredCategory}
          onValueChange={(value) => setPrefferedCategory(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {data?.data.selectedCategories.map((category: string) => {
              return (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <Button
          onClick={() => {
            setPrefferedCategory("");
          }}
        >
          Unfilter
        </Button>
      </div>
      <div className="grid grid-cols-3 ">
        <div className="flex space-x-4 items-center">
          <div className="whitespace-nowrap">Selected Sources:</div>
          {data?.data.selectedSources.map((source: string) => {
            return (
              <div
                className={cn(
                  "relative inline-flex opacity-30 group w-full whitespace-nowrap ",
                  currentSources.includes(source) ? "opacity-100" : "opacity-30"
                )}
                key={source}
              >
                <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                <span
                  className="relative inline-flex items-center justify-center px-4 py-2  text-sm text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  role="button"
                  onClick={() => handleSourceClick(source)}
                >
                  {source}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
