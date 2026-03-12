import { Button } from "@/components/ui/button";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="mt-20 md:mt-10 px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="w-full lg:w-[70%] xl:w-[60%] mt-20 md:mt-32 lg:mt-40">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
            Launchpad to tech excellence
          </h1>
        </div>
        <div className="w-full md:w-[60%] lg:w-[45%] xl:w-[35%] mt-6 md:mt-8 lg:mt-10">
          <p className="text-lg sm:text-xl md:text-2xl text-[#A1A1AA]">
            Not just another ed-tech--we're a SaaS-powered talent accelerator where you learn by building, ship real AI/ML products, and grow continuously
          </p>
        </div>
        <div className="mt-8 md:mt-10">
          <Link to="/courses">
            <Button
              variant="ghost"
              size="lg"
              className="text-white font-medium text-lg md:text-xl bg-[#3B82F6] hover:bg-[#2563EB] hover:text-white">
              Explore Track
              <MdOutlineKeyboardArrowRight className="w-6 h-6 md:w-8 md:h-8 ml-3 md:ml-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}