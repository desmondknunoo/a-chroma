import { PaletteGenerator } from "@/components/palette-generator";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-background">
      <SiteHeader />
      <main className="flex-1">
        <PaletteGenerator />
      </main>
    </div>
  );
}
