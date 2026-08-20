import { YojiLabsLoader } from "@/components/brand/YojiLabsLoader";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <YojiLabsLoader variant="full" size="lg" loop className="text-foreground" />
    </div>
  );
}
