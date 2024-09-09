import dashboardPreviewImg from "@/assets/dashboard-preview.webp";

export const AppPreview = () => {
  return (
    <div className="relative m-auto w-full max-w-6xl">
      <div className="absolute size-full bg-gradient-to-b from-transparent to-muted/70" />

      <div className="rounded-t-md border-2 border-accent">
        <img src={dashboardPreviewImg} alt="" className="rounded-t-md object-cover" />
      </div>
    </div>
  );
};
