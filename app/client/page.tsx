import Hero from "../components/home/Hero";
import FeaturedUniversities from "../components/home/FeaturedUniversities";
import Choose from "../components/home/Choose";
import CTA from "../components/home/CTA";
import FeaturedScholarships from "../components/home/FeaturedScholarships";
import Footer from "../components/common/Footer";
export default function ClientHomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Hero />
      <FeaturedScholarships />
      <FeaturedUniversities />
      <Choose />
      <CTA />
      <Footer />
     
    </div>
  );
}
