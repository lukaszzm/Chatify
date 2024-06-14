import { Link, Outlet } from "@tanstack/react-router";

export const AuthLayout = () => {
  return (
    <div className="min-h-dvh w-full flex flex-col justify-center items-center gap-6 pt-20 px-4 py-12">
      <Link
        className="absolute font-bold text-2xl top-0 my-4"
        aria-label="Home page"
        to="/"
      >
        Chatify
      </Link>

      <Outlet />
    </div>
  );
};
