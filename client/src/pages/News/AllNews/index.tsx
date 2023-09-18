import { getAllNewsFn } from "@/api/authApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";

export default function AllNews() {
  const { isLoading, data } = useQuery({
    queryKey: ["allNews"],
    queryFn: getAllNewsFn,
  });

  console.log(data);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        data.news.articles.map((item) => {
          return <div key={item.id}>{item.title}</div>;
        })
      )}
    </div>
  );
}
