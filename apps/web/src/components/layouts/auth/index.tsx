import { Link, Outlet } from "@tanstack/react-router";

export const AuthLayout = () => {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center gap-6 px-4 py-12 pt-20">
      <Link
        className="absolute top-0 my-4 text-2xl font-bold"
        aria-label="Home page"
        to="/"
      >
        Chatify
      </Link>

      <Outlet />
    </div>
  );
};
