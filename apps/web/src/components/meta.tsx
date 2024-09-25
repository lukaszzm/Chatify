import { Helmet } from "react-helmet-async";

import { usePathname } from "@/hooks/use-pathname";
import { matchPageTitle } from "@/utils/match-page-title";

export const Meta = () => {
  const pathname = usePathname();
  const title = matchPageTitle(pathname);

  return (
    <Helmet>
      <title>{title}</title>
      <meta
        name="description"
        content="Welcome to Chatify, your ultimate destination for seamless communication."
      />
    </Helmet>
  );
};
