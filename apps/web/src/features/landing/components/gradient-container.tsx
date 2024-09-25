export const GradientContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="relative flex h-dvh w-full flex-col gap-4 overflow-y-hidden bg-gradient-to-tl from-background to-accent/5">
      {children}
    </div>
  );
};
