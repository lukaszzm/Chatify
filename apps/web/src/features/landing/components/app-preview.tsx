import dashboardPreviewImg from "@/assets/dashboard-preview.webp";

export const AppPreview = () => {
  return (
    <div className="relative m-auto w-full max-w-6xl">
      <div className="absolute size-full bg-gradient-to-b from-transparent to-muted/70" />

      <div className="hidden aspect-video h-auto w-full rounded-md border-2 border-accent bg-accent/5 md:block">
        <img
          src={dashboardPreviewImg}
          alt=""
          width="1920"
          height="1080"
          className="rounded-t-md object-cover"
        />
      </div>
    </div>
  );
};
