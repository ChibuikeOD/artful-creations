import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getArtwork, ArtworkCategory } from "@/data/artworks";

const ArtworkDetail = () => {
  const { category, id } = useParams<{ category: ArtworkCategory; id: string }>();

  const artwork =
    category && id ? getArtwork(category as ArtworkCategory, id) : undefined;

  if (!artwork) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <div className="text-center space-y-4">
          <p className="font-body text-xs tracking-[0.35em] uppercase text-muted-foreground">
            Artwork Not Found
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            This piece is unavailable.
          </h1>
          <p className="font-body text-muted-foreground max-w-md mx-auto">
            The artwork you were looking for may have been moved or renamed. Try
            browsing the collection from the main gallery.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link
              to="/"
              className="inline-block font-body text-xs tracking-[0.25em] uppercase border border-primary text-primary px-6 py-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Back to Overview
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isSculpture = artwork.category === "sculpture";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="pt-24 pb-8 px-6 md:px-12 lg:px-20 border-b border-border/50">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
              {artwork.category === "sculpture" ? "Costume & Sculpture" : "Digital Art"}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              {artwork.title}
            </h1>
            <p className="font-body text-sm md:text-base text-muted-foreground mt-2">
              {artwork.medium}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Link
              to={isSculpture ? "/sculpture" : "/digital"}
              className="font-body text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              ← Back to{" "}
              {isSculpture ? "Sculpture Collection" : "Digital Collection"}
            </Link>
            <Link
              to="/"
              className="font-body text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-primary transition-colors"
            >
              ∘ Back to Overview
            </Link>
          </div>
        </div>
      </header>

      <main className="px-6 md:px-12 lg:px-20 pb-24 pt-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full overflow-hidden rounded-sm border border-border/60 bg-muted/10"
          >
            <img
              src={artwork.src}
              alt={artwork.title}
              className="w-full h-full max-h-[70vh] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6"
          >
            <section>
              <h2 className="font-display text-xl font-semibold mb-3">
                Artist Statement
              </h2>
              <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                {artwork.description}
              </p>
            </section>

            {artwork.details.length > 0 && (
              <section className="space-y-3">
                <h3 className="font-display text-lg font-semibold">
                  Process &amp; Notes
                </h3>
                <ul className="font-body text-sm md:text-base text-muted-foreground space-y-2 list-disc list-inside">
                  {artwork.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </section>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ArtworkDetail;

