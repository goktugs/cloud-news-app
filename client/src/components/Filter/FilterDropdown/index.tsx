import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
export default function FilterDropdown() {
  return (
    <div className="flex justify-center ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {t("searchBy")}{" "}
            {searchType === "name"
              ? t("position")
              : searchType === "companyName"
              ? t("company")
              : t("location")}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup
            value={searchType}
            onValueChange={setSearchType}
          >
            <DropdownMenuRadioItem
              className="hover:cursor-pointer"
              value={"name"}
            >
              {t("position")}
            </DropdownMenuRadioItem>
            <DropdownMenuSeparator />
            <DropdownMenuRadioItem
              className="hover:cursor-pointer"
              value={"companyName"}
            >
              {t("company")}
            </DropdownMenuRadioItem>
            <DropdownMenuSeparator />
            <DropdownMenuRadioItem
              className="hover:cursor-pointer"
              value={"location"}
            >
              {t("location")}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
