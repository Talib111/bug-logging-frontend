import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

type Props = {
  search: string;
  setPage?: any;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  refetch: () => void;
  isFetching?: boolean;
};

export default function SearchBox({
  search,
  setSearch,
  refetch,
  isFetching,
  setPage
}: Readonly<Props>) {
  return (
    <div className="flex items-center gap-4">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="rounded-lg bg-background"
        prefix="search"
      />
      <Button variant={'outline'} disabled={isFetching} className="rounded-lg"
        onClick={() => {
          refetch()
          if (setPage) {
            setPage(1)
          }
        }}
      >
        {isFetching && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        {isFetching ? "Loading..." : "Search"}
      </Button>
    </div>
  );
}
