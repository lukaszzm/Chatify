export const GradientContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="bg-accent">
      <div className="relative flex h-dvh w-full flex-col gap-4 overflow-y-hidden bg-gradient-to-tl from-background/40 to-foreground/10">
        {children}
      </div>
    </div>
  );
};
