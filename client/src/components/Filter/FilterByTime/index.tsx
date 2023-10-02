import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useFilterStore } from "@/store/filterSlice";

export default function FilterTime() {
  const fromDate = useFilterStore((state) => state.fromDate);
  const toDate = useFilterStore((state) => state.toDate);
  const setFromDate = useFilterStore((state) => state.setFromDate);
  const setToDate = useFilterStore((state) => state.setToDate);

  return (
    <div className="space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !fromDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {fromDate ? (
              format(new Date(fromDate), "PPP")
            ) : (
              <span>Pick a From</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={fromDate ? new Date(fromDate) : undefined}
            onSelect={(day) => setFromDate(format(day as Date, "yyyy-MM-dd"))}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !toDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {toDate ? format(new Date(toDate), "PPP") : <span>Pick a To</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={toDate ? new Date(toDate) : undefined}
            onSelect={(day) => setToDate(format(day as Date, "yyyy-MM-dd"))}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
