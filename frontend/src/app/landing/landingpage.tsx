import Contact from "./_components/contact";
import Explore from "./_components/explore";
import FAQ from "./_components/faq";
import Hero from "./_components/hero";
import Services from "./_components/services";
import SmallCard from "./_components/small-card";
import Team from "./_components/team";
import Testimonial from "./_components/testimonial";

export default function LandingPage() {
  return (
    <div className="px-4 md:px-8">
      <Hero />
      <SmallCard />
      <div id="gallery">
        <Explore />
      </div>
      <div id="schools">
        <Services />
      </div>
      <div id="about">
        <Team />
      </div>
      <div id="students">
        <Testimonial />
      </div>
      <FAQ />
      <Contact />
    </div>
  );
};
