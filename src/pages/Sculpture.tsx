import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GallerySection from "@/components/GallerySection";
import { sculptureArtworks } from "@/data/artworks";

const getFeaturedTitle = () => {
  if (typeof window === "undefined") return "Selected Works";
  try {
    const raw = window.localStorage.getItem("portfolio-config-v1");
    if (!raw) return "Selected Works";
    const parsed = JSON.parse(raw) as {
      coreSubsectionTitles?: { sculpture?: string };
    };
    return parsed.coreSubsectionTitles?.sculpture ?? "Selected Works";
  } catch {
    return "Selected Works";
  }
};

const SculpturePage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Simple header / breadcrumb */}
      <header className="pt-24 pb-12 px-6 md:px-12 lg:px-20 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
              Portfolio
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Sculpture
            </h1>
          </div>
          <Link
            to="/"
            className="font-body text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to Overview
          </Link>
        </div>
      </header>

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <GallerySection
          id="sculpture-gallery"
          title={getFeaturedTitle()}
          subtitle="Standalone forms that focus on structure, weight, and material presence."
          items={sculptureArtworks}
        />
      </motion.main>
    </div>
  );
};

export default SculpturePage;
