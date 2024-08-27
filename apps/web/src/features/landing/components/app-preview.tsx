import dashboardPreviewImg from "@/assets/dashboard-preview.png";

export const AppPreview = () => {
  return (
    <div className="relative mx-auto mt-auto">
      <div className="absolute size-full bg-gradient-to-b from-transparent to-muted" />

      <div className="mx-auto max-w-6xl px-4">
        <img
          src={dashboardPreviewImg}
          alt=""
          className="rounded-md border-2 border-accent shadow-lg shadow-accent/5"
        />
      </div>
    </div>
  );
};
