import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Filter from "@/components/Filter";
import AllNews from "./AllNews";
import PrefferedNews from "./PrefferedNews";
import { useSelectedTabStore } from "@/store/selectedTabSlice";

export default function News() {
  const setSelectedTab = useSelectedTabStore((state) => state.setSelectedTab);

  return (
    <div className="w-full flex flex-col items-center mt-20 ">
      <Filter />
      <Tabs
        defaultValue="all"
        className="md:w-[768px] lg:w-[1024px] xl:w-[1280px]"
        onValueChange={(value) => setSelectedTab(value)}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">All News</TabsTrigger>
          <TabsTrigger value="preffered">Preffered News </TabsTrigger>
        </TabsList>
        <TabsContent
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3  "
          value="all"
        >
          <AllNews />
        </TabsContent>
        <TabsContent value="preffered">
          <PrefferedNews />
        </TabsContent>
      </Tabs>
    </div>
  );
}
