import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import OurStory from "@/components/OurStory";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col">
      <Navbar />
      <Hero />
      <ProductSection />
      <OurStory />
      <Footer />
      <CartDrawer />
    </main>
  );
}
