import { SearchIcon } from "lucide-react";

import { Input, type InputProps } from "@ui/components/input";
import { cn } from "@ui/lib/utils";

type SearchInputProps = Omit<InputProps, "type">;

function SearchInput({ className, ref, ...props }: SearchInputProps) {
  return (
    <div className="relative">
      <Input className={cn("pl-10", className)} ref={ref} type="search" {...props} />
      <SearchIcon className="absolute left-2 top-2 text-muted-foreground" />
    </div>
  );
}

export { SearchInput };
