import { motion } from "framer-motion";
import GallerySection from "@/components/GallerySection";
import heroBg from "@/assets/hero-bg.jpg";
import costume1 from "@/assets/costume-1.jpg";
import costume2 from "@/assets/costume-2.jpg";
import costume3 from "@/assets/costume-3.jpg";
import digital1 from "@/assets/digital-1.jpg";
import digital2 from "@/assets/digital-2.jpg";
import digital3 from "@/assets/digital-3.jpg";

const costumeItems = [
  { src: costume1, title: "Ethereal Crown", medium: "Mixed media & textile" },
  { src: costume2, title: "Organic Growth", medium: "Clay & wire sculpture" },
  { src: costume3, title: "Iron Legacy", medium: "Metalwork & leather" },
];

const digitalItems = [
  { src: digital1, title: "Celestial Bloom", medium: "Digital painting" },
  { src: digital2, title: "Neon Dusk", medium: "Digital illustration" },
  { src: digital3, title: "Sacred Geometry", medium: "Generative art" },
];

const Index = () => {
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
          <a href="#costume" className="font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors">
            Sculpture
          </a>
          <a href="#digital" className="font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors">
            Digital
          </a>
          <a href="#contact" className="font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors">
            Contact
          </a>
        </div>
      </motion.nav>

      {/* Hero */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Art studio with dramatic lighting"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-900 tracking-tight leading-none mb-6">
            <span className="text-gradient-gold">Art</span> &{" "}
            <span className="italic font-normal text-foreground">Craft</span>
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
        title="Costume & Sculpture"
        subtitle="Handcrafted pieces exploring form, texture, and narrative through physical media."
        items={costumeItems}
      />

      <GallerySection
        id="digital"
        title="Digital Art"
        subtitle="Exploring limitless worlds through pixels, light, and imagination."
        items={digitalItems}
      />

      {/* Contact */}
      <footer id="contact" className="py-24 px-6 text-center border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Get in Touch</h2>
          <div className="section-divider mb-6" />
          <p className="font-body text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            Interested in commissioning a piece or collaborating?
          </p>
          <a
            href="mailto:hello@example.com"
            className="inline-block font-body text-sm tracking-widest uppercase border border-primary text-primary px-8 py-3 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Say Hello
          </a>
        </motion.div>
        <p className="mt-16 font-body text-xs text-muted-foreground tracking-widest uppercase">
          © 2026 · All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default Index;
