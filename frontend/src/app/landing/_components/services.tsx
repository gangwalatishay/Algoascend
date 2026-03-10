import CardComponents from "@/components/card-components";
import { GraduationCap } from "lucide-react";

export default function Services() {
  return (
    <div className="mt-20 px-4 md:px-8">
      <div className="flex flex-col items-center justify-center text-center max-w-6xl mx-auto">
        <div className="flex flex-col">
          <h3 className="text-3xl md:text-4xl">
            Why Choose AlgoAscend?
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-10 md:mt-20 gap-6 md:gap-8 w-full">
          <CardComponents
          icon={<GraduationCap size={70} />}
          title="Industry-Relevant Curriculum"
          description="Designed by industry experts to match what companies actually need"
        />
          <CardComponents
          icon={<GraduationCap size={70} />}
          title="Industry-Relevant Curriculum"
          description="Designed by industry experts to match what companies actually need"
        />
          <CardComponents
          icon={<GraduationCap size={70} />}
          title="Industry-Relevant Curriculum"
          description="Designed by industry experts to match what companies actually need"
        />
          <CardComponents
          icon={<GraduationCap size={70} />}
          title="Industry-Relevant Curriculum"
          description="Designed by industry experts to match what companies actually need"
        />
        </div>
      </div>
    </div>
  )
}
