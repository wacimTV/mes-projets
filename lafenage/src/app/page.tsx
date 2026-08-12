import RestaurantHero from "@/components/RestaurantHero";
import SignatureSection from "@/components/SignatureSection";
import MenuSection from "@/components/MenuSection";
import GalleryMasonry from "@/components/GalleryMasonry";
import ReviewsSection from "@/components/ReviewsSection";
import ReservationFooter from "@/components/ReservationFooter";

export default function Home() {
  return (
    <main className="bg-deepblack min-h-screen">
      <RestaurantHero />
      <SignatureSection />
      <MenuSection />
      <GalleryMasonry />
      <ReviewsSection />
      <ReservationFooter />
    </main>
  );
}
