import "./global.css";
import HeaderSite from "@/components/site/header";
import Title from "@/components/site/title";
import Services from "@/components/site/services";
import FAQ from "@/components/site/faq";
import Subscription from "@/components/profile/plan";
import Contact from "@/components/site/contact";
import Footer from "@/components/site/footer";
import ScrollToTopButton from "@/components/site/scrollTotop";

export default function Home() {
  return (
    <div className="bg-white">
      <ScrollToTopButton />
      <HeaderSite />
      <Title />
      <Services />
      <Subscription onDash={false} />
      <FAQ />

      <Contact />
      <Footer />
    </div>
  );
}
