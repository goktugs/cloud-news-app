import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Filter from "@/components/Filter";
import AllNews from "./AllNews";

export default function News() {
  return (
    <div className="w-full flex flex-col items-center mt-20 ">
      <Filter />
      <Tabs defaultValue="all" className="w-[1280px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">All News</TabsTrigger>
          <TabsTrigger value="preffered">Preffered News </TabsTrigger>
        </TabsList>
        <TabsContent className="bg-green-600 h-full" value="all">
          <AllNews />
        </TabsContent>
        <TabsContent value="preffered">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
