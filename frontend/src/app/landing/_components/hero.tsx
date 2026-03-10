import { Button } from "@/components/ui/button";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function Hero() {
  return (
    <div className="mt-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mt-12 md:mt-24 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Launchpad to tech excellence
          </h1>
        </div>
        <div className="mt-4 md:mt-6 flex justify-center md:justify-start">
          <p className="text-base md:text-xl text-[#A1A1AA] max-w-2xl">
            Not just another ed-tech—we’re a SaaS-powered talent accelerator where you learn by building, ship real AI/ML products, and grow continuously
          </p>
        </div>
        <div className="mt-6 md:mt-10 flex justify-center md:justify-start">
          <Button
            variant="ghost"
            size="lg"
            className="text-white font-medium text-lg md:text-xl bg-[#3B82F6] hover:bg-[#2563EB] hover:text-white"
          >
            Explore Track
            <MdOutlineKeyboardArrowRight className="size-6 md:size-8 ml-3 md:ml-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
