import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GallerySection from "@/components/GallerySection";
import {
  costumeArtworks,
  sculptureArtworks,
  digitalArtworks,
} from "@/data/artworks";

type SectionKey = "costume" | "sculpture" | "digital";

const defaultSectionTitles: Record<SectionKey, string> = {
  costume: "Costume",
  sculpture: "Sculpture",
  digital: "Digital Art",
};

const sectionLabelNames: Record<SectionKey, string> = {
  costume: "Section 1 Name",
  sculpture: "Section 2 Name",
  digital: "Section 3 Name",
};

type MediaSourceType = "url" | "upload";

type MediaEntry = {
  id: string;
  title: string;
  url: string;
  description: string;
  sourceType: MediaSourceType;
  mimeType?: string;
};

type CustomSubsection = {
  id: string;
  section: SectionKey;
  name: string;
  media: MediaEntry[];
};

interface PortfolioConfig {
  subsections: CustomSubsection[];
  coreSubsectionTitles?: Record<SectionKey, string>;
}

const defaultConfig: PortfolioConfig = {
  subsections: [],
  coreSubsectionTitles: {
    costume: "Selected Works",
    sculpture: "Selected Works",
    digital: "Selected Works",
  },
};

const createId = (prefix: string) =>
  `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;

const Index = () => {
  const [isDevMode, setIsDevMode] = useState(false);
  const [sectionTitles, setSectionTitles] = useState<Record<SectionKey, string>>(
    () => {
      if (typeof window === "undefined") return defaultSectionTitles;
      try {
        const stored = window.localStorage.getItem("portfolio-section-titles");
        if (!stored) return defaultSectionTitles;
        const parsed = JSON.parse(stored) as Partial<Record<SectionKey, string>>;
        return { ...defaultSectionTitles, ...parsed };
      } catch {
        return defaultSectionTitles;
      }
    }
  );

  const [config, setConfig] = useState<PortfolioConfig>(() => {
    if (typeof window === "undefined") return defaultConfig;
    try {
      const stored = window.localStorage.getItem("portfolio-config-v1");
      if (!stored) return defaultConfig;
      const parsed = JSON.parse(stored) as PortfolioConfig;
      if (!parsed.subsections) return defaultConfig;
      return {
        ...defaultConfig,
        ...parsed,
        coreSubsectionTitles: {
          ...defaultConfig.coreSubsectionTitles,
          ...(parsed.coreSubsectionTitles ?? {}),
        },
      };
    } catch {
      return defaultConfig;
    }
  });

  const [subSectionTarget, setSubSectionTarget] =
    useState<SectionKey>("costume");
  const [newSubsectionName, setNewSubsectionName] = useState("");
  const [mediaSectionTarget, setMediaSectionTarget] =
    useState<SectionKey>("costume");
  const [mediaSubsectionId, setMediaSubsectionId] = useState<string>("");
  const [mediaTitle, setMediaTitle] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaDescription, setMediaDescription] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      "portfolio-section-titles",
      JSON.stringify(sectionTitles)
    );
  }, [sectionTitles]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      "portfolio-config-v1",
      JSON.stringify(config)
    );
  }, [config]);

  useEffect(() => {
    const subsForSection = config.subsections.filter(
      (s) => s.section === mediaSectionTarget
    );
    if (!subsForSection.length) {
      setMediaSubsectionId("");
    } else if (!subsForSection.find((s) => s.id === mediaSubsectionId)) {
      setMediaSubsectionId(subsForSection[0].id);
    }
  }, [config.subsections, mediaSectionTarget, mediaSubsectionId]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("portfolio-dev-mode");
    if (stored === "true") {
      setIsDevMode(true);
    }
  }, []);

  const toggleDevMode = () => {
    if (isDevMode) {
      setIsDevMode(false);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("portfolio-dev-mode", "false");
      }
      return;
    }
    const password = window.prompt("Enter developer password");
    if (password === "Tyler-Joseph21") {
      setIsDevMode(true);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("portfolio-dev-mode", "true");
      }
    } else if (password !== null) {
      window.alert("Incorrect password.");
    }
  };

  const updateSectionTitle = (key: SectionKey, value: string) => {
    setSectionTitles((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddSubsection = () => {
    const name = newSubsectionName.trim();
    if (!name) return;
    setConfig((prev) => ({
      ...prev,
      subsections: [
        ...prev.subsections,
        { id: createId("sub"), section: subSectionTarget, name, media: [] },
      ],
    }));
    setNewSubsectionName("");
  };

  const handleAddMedia = () => {
    if (!mediaSubsectionId) return;

    const title = mediaTitle.trim();
    const description = mediaDescription.trim();

    // If a file is selected, prefer that over the URL
    if (mediaFile) {
      if (mediaFile.size > 5 * 1024 * 1024) {
        window.alert("Please choose a file smaller than 5MB for this portfolio.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const entry: MediaEntry = {
          id: createId("media"),
          title: title || mediaFile.name,
          url: dataUrl,
          description,
          sourceType: "upload",
          mimeType: mediaFile.type,
        };
        setConfig((prev) => ({
          ...prev,
          subsections: prev.subsections.map((sub) =>
            sub.id === mediaSubsectionId
              ? { ...sub, media: [...sub.media, entry] }
              : sub
          ),
        }));
      };
      reader.readAsDataURL(mediaFile);
    } else {
      const url = mediaUrl.trim();
      if (!url) return;
      const entry: MediaEntry = {
        id: createId("media"),
        title,
        url,
        description,
        sourceType: "url",
      };
      setConfig((prev) => ({
        ...prev,
        subsections: prev.subsections.map((sub) =>
          sub.id === mediaSubsectionId
            ? { ...sub, media: [...sub.media, entry] }
            : sub
        ),
      }));
    }

    // Reset inputs
    setMediaTitle("");
    setMediaUrl("");
    setMediaDescription("");
    setMediaFile(null);
  };

  const renderCustomSubsections = (section: SectionKey) =>
    config.subsections
      .filter((sub) => sub.section === section && sub.media.length > 0)
      .map((sub) => (
        <section
          key={sub.id}
          className="py-12 px-6 md:px-12 lg:px-20 border-t border-border/40"
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-4 text-left">
            {sub.name}
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sub.media.map((item) => {
              const isVideo =
                item.mimeType?.startsWith("video/") ||
                /\.(mp4|webm|ogg)$/i.test(item.url);
              return (
                <article
                  key={item.id}
                  className="border border-border bg-background rounded-sm overflow-hidden"
                >
                  <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                    {isVideo ? (
                      <video
                        src={item.url}
                        controls
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={item.url}
                        alt={item.title || sub.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  {(item.title || item.description) && (
                    <div className="p-4 text-left">
                      {item.title && (
                        <h4 className="font-display text-lg mb-2">
                          {item.title}
                        </h4>
                      )}
                      {item.description && (
                        <p className="font-body text-sm text-muted-foreground whitespace-pre-line">
                          {item.description}
                        </p>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      ));

  const updateCoreSubsectionTitle = (section: SectionKey, value: string) => {
    setConfig((prev) => ({
      ...prev,
      coreSubsectionTitles: {
        ...(prev.coreSubsectionTitles ?? defaultConfig.coreSubsectionTitles!),
        [section]: value,
      },
    }));
  };

  const getCoreSubsectionTitle = (section: SectionKey) =>
    config.coreSubsectionTitles?.[section] ??
    defaultConfig.coreSubsectionTitles?.[section] ??
    "Selected Works";

const getBaseMediaCount = (section: SectionKey) => {
  switch (section) {
    case "costume":
      return costumeArtworks.length;
    case "sculpture":
      return sculptureArtworks.length;
    case "digital":
      return digitalArtworks.length;
    default:
      return 0;
  }
};

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-6 bg-background/80 backdrop-blur-md border-b border-border/50"
      >
        <span className="font-display text-xl font-bold tracking-wider text-gradient-gold">
          PORTFOLIO
        </span>
        <div className="flex gap-8">
          <a
            href="#costume"
            className="font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
          >
            {sectionTitles.costume}
          </a>
          <a
            href="#sculpture"
            className="font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
          >
            {sectionTitles.sculpture}
          </a>
          <a
            href="#digital"
            className="font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
          >
            {sectionTitles.digital}
          </a>
          <a
            href="#contact"
            className="font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
          >
            Contact
          </a>
        </div>
      </motion.nav>

      {/* Hero */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-900 tracking-tight leading-none mb-6">
            <span className="text-gradient-gold">Zuri</span>{" "}
            <span className="italic font-normal text-foreground">Walters</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground tracking-[0.3em] uppercase">
            Costume · Sculpture · Digital
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-8 section-divider"
          />
        </motion.div>
      </header>

      {/* Gallery Sections */}
      <GallerySection
        id="costume"
        title={getCoreSubsectionTitle("costume")}
        subtitle="Wearable pieces that merge sculpture and fashion to build character and story."
        items={costumeArtworks}
      />
      <div className="flex justify-center mt-8 mb-8">
        <Link
          to="/costume"
          className="inline-block font-body text-sm tracking-widest uppercase border border-primary text-primary px-8 py-3 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          View More Costume
        </Link>
      </div>
      {renderCustomSubsections("costume")}

      <GallerySection
        id="sculpture"
        title={getCoreSubsectionTitle("sculpture")}
        subtitle="Standalone physical works that explore structure, weight, and material presence."
        items={sculptureArtworks}
      />
      <div className="flex justify-center mt-8 mb-8">
        <Link
          to="/sculpture"
          className="inline-block font-body text-sm tracking-widest uppercase border border-primary text-primary px-8 py-3 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          View More Sculpture
        </Link>
      </div>
      {renderCustomSubsections("sculpture")}

      <GallerySection
        id="digital"
        title={getCoreSubsectionTitle("digital")}
        subtitle="Exploring limitless worlds through pixels, light, and imagination."
        items={digitalArtworks}
      />
      <div className="flex justify-center mt-8 mb-8">
        <Link
          to="/digital"
          className="inline-block font-body text-sm tracking-widest uppercase border border-primary text-primary px-8 py-3 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          View More Digital Art
        </Link>
      </div>
      {renderCustomSubsections("digital")}

      {/* Contact */}
      <footer id="contact" className="py-24 px-6 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Contacts
          </h2>
          <div className="section-divider mb-8" />

          <div className="space-y-4 font-body text-base md:text-lg">
            <p className="tracking-wide">
              <span className="font-semibold">Zuri N Walters</span>
              <span className="mx-2 text-muted-foreground">·</span>
              <span className="font-semibold">Chibuike Odibeli</span>
            </p>

            <p>
              <a
                href="https://www.artstation.com/zwizard_art"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-primary/50 hover:decoration-primary text-primary"
              >
                ArtStation · zwizard_art
              </a>
            </p>

            <p className="text-muted-foreground">
              Email:{" "}
              <a
                href="mailto:Zwizardart@gmail.com"
                className="underline hover:text-primary"
              >
                Zwizardart@gmail.com
              </a>
            </p>

            <p className="text-muted-foreground">
              Instagram:{" "}
              <a
                href="https://www.instagram.com/zwizard_art"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-primary"
              >
                @zwizard_art
              </a>
            </p>

            <p className="text-muted-foreground">
              LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/in/zuri-walters-/"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-primary"
              >
                Zuri Walters
              </a>
            </p>
          </div>
        </motion.div>
        <p className="mt-16 text-center font-body text-xs text-muted-foreground tracking-widest uppercase">
          © 2026 · All Rights Reserved
        </p>
      </footer>

      {/* Developer mode controls */}
      {isDevMode ? (
        <div className="fixed bottom-4 right-4 z-50 w-80 rounded-sm border border-border bg-background/95 shadow-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-sm font-semibold tracking-wide">
              Developer Mode
            </h3>
            <button
              type="button"
              onClick={toggleDevMode}
              className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
            >
              Exit
            </button>
          </div>
          <p className="font-body text-xs text-muted-foreground mb-3">
            Rename your three main sections and manage custom subsections. Changes
            are saved in this browser.
          </p>
          {(["costume", "sculpture", "digital"] as SectionKey[]).map((key) => (
            <div key={key} className="mb-2 text-left">
              <label className="block font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                {sectionLabelNames[key]}
              </label>
              <input
                type="text"
                value={sectionTitles[key]}
                onChange={(e) => updateSectionTitle(key, e.target.value)}
                className="w-full bg-background border border-border px-2 py-1 text-xs font-body focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <label className="block font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground mt-2 mb-1">
                {sectionLabelNames[key]} – Featured Subsection
              </label>
              <input
                type="text"
                value={getCoreSubsectionTitle(key)}
                onChange={(e) => updateCoreSubsectionTitle(key, e.target.value)}
                className="w-full bg-background border border-border px-2 py-1 text-xs font-body focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <p className="mt-1 font-body text-[10px] text-muted-foreground">
                Built-in media in this subsection: {getBaseMediaCount(key)}
              </p>
            </div>
          ))}

          <div className="mt-4 border-top border-border/50 pt-3 text-left">
            <p className="font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Add Subsection
            </p>
            <div className="flex gap-2 mb-2">
              <select
                value={subSectionTarget}
                onChange={(e) =>
                  setSubSectionTarget(e.target.value as SectionKey)
                }
                className="flex-1 bg-background border border-border px-2 py-1 text-xs font-body"
              >
                <option value="costume">Section 1</option>
                <option value="sculpture">Section 2</option>
                <option value="digital">Section 3</option>
              </select>
              <button
                type="button"
                onClick={handleAddSubsection}
                className="px-2 py-1 text-[10px] font-body uppercase tracking-[0.2em] border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Add
              </button>
            </div>
            <input
              type="text"
              placeholder="Subsection name"
              value={newSubsectionName}
              onChange={(e) => setNewSubsectionName(e.target.value)}
              className="w-full bg-background border border-border px-2 py-1 text-xs font-body mb-3 focus:outline-none focus:ring-1 focus:ring-primary"
            />

            <p className="font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Add Media
            </p>
            <div className="flex gap-2 mb-2">
              <select
                value={mediaSectionTarget}
                onChange={(e) =>
                  setMediaSectionTarget(e.target.value as SectionKey)
                }
                className="flex-1 bg-background border border-border px-2 py-1 text-xs font-body"
              >
                <option value="costume">Section 1</option>
                <option value="sculpture">Section 2</option>
                <option value="digital">Section 3</option>
              </select>
              <select
                value={mediaSubsectionId}
                onChange={(e) => setMediaSubsectionId(e.target.value)}
                className="flex-1 bg-background border border-border px-2 py-1 text-xs font-body"
              >
                <option value="">Choose subsection</option>
                {config.subsections
                  .filter((s) => s.section === mediaSectionTarget)
                  .map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
              </select>
            </div>
            <input
              type="text"
              placeholder="Media title (optional)"
              value={mediaTitle}
              onChange={(e) => setMediaTitle(e.target.value)}
              className="w-full bg-background border border-border px-2 py-1 text-xs font-body mb-2 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setMediaFile(file);
              }}
              className="w-full text-[11px] mb-2 file:mr-2 file:py-1 file:px-2 file:border file:border-border file:bg-background file:text-[11px] file:uppercase file:tracking-[0.15em] file:font-body"
            />
            <input
              type="text"
              placeholder="Media URL (image, gif, or mp4)"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              className="w-full bg-background border border-border px-2 py-1 text-xs font-body mb-2 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <textarea
              placeholder="Write-up / description"
              value={mediaDescription}
              onChange={(e) => setMediaDescription(e.target.value)}
              className="w-full bg-background border border-border px-2 py-1 text-xs font-body mb-2 focus:outline-none focus:ring-1 focus:ring-primary min-h-[60px]"
            />
            <button
              type="button"
              onClick={handleAddMedia}
              className="w-full px-2 py-1 text-[10px] font-body uppercase tracking-[0.2em] border border-primary text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
              disabled={(!mediaUrl.trim() && !mediaFile) || !mediaSubsectionId}
            >
              Save Media
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={toggleDevMode}
          className="fixed bottom-4 right-4 z-40 bg-background/95 border border-border px-4 py-2 font-body text-[10px] uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition-colors shadow-md"
        >
          Developer Mode
        </button>
      )}
    </div>
  );
};

export default Index;
