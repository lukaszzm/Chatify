import { Search } from "lucide-react";

import { Input, type InputProps } from "@ui/components/ui/input";
import { cn } from "@ui/lib/utils";

type SearchInputProps = Omit<InputProps, "type">;

const SearchInput = ({ className, ref, ...props }: SearchInputProps) => (
  <div className="relative">
    <Input className={cn("pl-10", className)} ref={ref} type="search" {...props} />
    <Search className="absolute left-2 top-2 text-muted-foreground" />
  </div>
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
