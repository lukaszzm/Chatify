import { Search } from "lucide-react";
import * as React from "react";

import { Input, type InputProps } from "@ui/components/ui/input";
import { cn } from "@ui/lib/utils";

interface SearchInputProps extends Omit<InputProps, "type"> {}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative">
        <Input className={cn("pl-10", className)} ref={ref} type="search" {...props} />
        <Search className="absolute left-2 top-2 text-muted-foreground/80" />
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";
