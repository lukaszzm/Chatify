import { Search } from "lucide-react";
import * as React from "react";

import { Input, type InputProps } from "@ui/components/ui/input";
import { cn } from "@ui/lib/utils";

export const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative">
        <Input className={cn("pl-10", className)} ref={ref} {...props} />
        <Search className="text-muted-foreground/80 absolute left-2 top-2" />
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";
