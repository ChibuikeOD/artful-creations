import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Artwork } from "@/data/artworks";

interface GallerySectionProps {
  id: string;
  title: string;
  subtitle: string;
  items: Artwork[];
}

const GallerySection = ({ id, title, subtitle, items }: GallerySectionProps) => {
  const navigate = useNavigate();

  return (
    <section id={id} className="py-24 px-6 md:px-12 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          {title}
        </h2>
        <div className="section-divider mb-6" />
        <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto tracking-wide">
          {subtitle}
        </p>
      </motion.div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 max-w-6xl mx-auto">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="mb-4 break-inside-avoid group cursor-pointer"
            onClick={() => navigate(`/${item.category}/${item.id}`)}
          >
            <div className="relative overflow-hidden rounded-sm">
              <img
                src={item.src}
                alt={item.title}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <div>
                  <h3 className="font-display text-xl font-bold">{item.title}</h3>
                  {item.medium && (
                    <p className="font-body text-sm text-muted-foreground mt-1">{item.medium}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;
