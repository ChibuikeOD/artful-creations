import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GallerySection from "@/components/GallerySection";
import {
  digitalArtworks,
  digitalModels,
  digitalCharacters,
  digitalIllustrations,
} from "@/data/artworks";

const DigitalPage = () => {
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
              Digital Art
            </h1>
            <p className="font-body text-xs md:text-sm text-muted-foreground mt-2 tracking-[0.25em] uppercase">
              3D Models · Character Design · Illustration
            </p>
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
          id="digital-3d"
          title="3D Models"
          subtitle="Digital sculpts and rendered forms in progress. More work coming soon."
          items={digitalModels}
        />

        <GallerySection
          id="digital-characters"
          title="Character Design"
          subtitle="Bold silhouettes and expressive personalities explored through costume and shape language."
          items={digitalCharacters}
        />

        <GallerySection
          id="digital-illustration"
          title="Illustration"
          subtitle="Atmospheric scenes and graphic studies in light, pattern, and color."
          items={digitalIllustrations}
        />

        {/* Fallback combined view if needed elsewhere */}
        <section className="sr-only">
          <GallerySection
            id="digital-all"
            title="All Digital Works"
            subtitle="Hidden combined view used for accessibility only."
            items={digitalArtworks}
          />
        </section>
      </motion.main>
    </div>
  );
};

export default DigitalPage;
