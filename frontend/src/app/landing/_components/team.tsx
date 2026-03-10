import dhirendra from "@/assets/teams/dhirendra.jpg"
import chandan from "@/assets/teams/chandan.jpg"
import sarmishtha from "@/assets/teams/sarmishtha.jpg"
import kshitij from "@/assets/teams/kshitij.jpg"
import yugank from "@/assets/teams/yugank.jpg"
import mayukhroy from "@/assets/teams/mayukh-roy.jpg"
import atishaygangwal from "@/assets/teams/atishay-gangwal.jpg"

import google from "@/assets/teams/data/google.jpg"
import iit from "@/assets/teams/data/iit-guwahati.jpg"
import oracle from "@/assets/teams/data/oracle.jpg"
import yahoo from "@/assets/teams/data/yahoo_logo.jpg"
import medadock from "@/assets/teams/data/medadock.jpg"
import syven from "@/assets/teams/data/syven.jpg"
import calcuttauniversity from "@/assets/teams/data/calcutta-university.jpg"
import iimshillong from "@/assets/teams/data/iim-shillong.jpg"
import thomasassessments from "@/assets/teams/data/thomas-assessments.jpg"
import codalien from "@/assets/teams/data/codalien.jpg"
import sarlok from "@/assets/teams/data/sarlok.jpg"

const teamMembers = [
  {
    name: "Dhirendra Sinha",
    role: "System Design Expert",
    image: dhirendra,
    description:
      "Senior engineer from Google teaching advanced system design concepts",
    companies: [google, iit, oracle, yahoo],
  },
  {
    name: "Chandan Jha",
    role: "Instructor",
    image: chandan,
    description: "Experienced Data Engineer and Mentor specializing in Python, SQL, Snowflake, Web Development, and Applied Statistics for students and aspiring IT professionals.",
    companies: [medadock, syven],
    detailsClass: "translate-y-[40px]",
  },
  {
    name: "Sarmishtha M",
    role: "Founder",
    image: sarmishtha,
    description: "Visionary leader focused on building impactful learning experiences",
    companies: [calcuttauniversity],
    detailsClass: "-translate-y-[20px]",
  },
  {
    name: "Kshitij P",
    role: "Instructor",
    image: kshitij,
    description: "Expert developer focused on creating industry-relevant curriculum",
    companies: [iimshillong, thomasassessments],
    detailsClass: "-translate-y-[20px]",
  },
  {
    name: "Yugank Singh",
    role: "Instructor",
    image: yugank,
    description: "Tech enthusiast with a passion for teaching programming the right wa",
    companies: [codalien, sarlok],
    detailsClass: "-translate-y-[20px]",
  },
  {
    name: "Mayukh Roy",
    role: "Instructor",
    image: mayukhroy,
    description: "Impact-driven CS undergraduate from BITS; Smart India Hackathon regional finalist and top-rated DSA instructor. Solved 1000+ problems across platforms; experience building efficient solutions and driving measurable improvements at high-growth startups.",
    companies: [],
    detailsClass: "translate-y-[55px]",
  },
  {
    name: "Atishay Gangwal",
    role: "AI/ML Mentor",
    image: atishaygangwal,
    description: "Impact-driven CS professional and seasoned AI/ML mentor building scalable data and ML systems. Skilled in Python, Spark, SQL, cloud, ETL, and DevOps automation—delivering 50% faster pipelines and ~1.5 FTE efficiency via end-to-end solutions.",
    companies: [],
    detailsClass: "translate-y-[55px]",
  },
]


export default function Team() {
  return (

    

    <div className="mt-50 h-350 teamcard">
      <div className="flex flex-col items-center justify-center text-center">

        <div className="flex flex-col">
          <h2 className="text-3xl md:text-4xl font-bold">
            Meet Our Team
          </h2>
          <p className="text-base md:text-xl mt-4">
            Learn from industry professionals with years of experience
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full mt-10 md:mt-20">
          {teamMembers.map((member, index) => (
            <div key={index} className="card">
              <div className="imgBx">
                <img src={member.image} alt={member.name} />
              </div>

              <div className="content">
                <div className={`details ${member.detailsClass || ""}`}>
                  <h2>
                    {member.name}
                    <br />
                    <span>{member.role}</span>
                  </h2>

                  <div className="data flex gap-3 mt-4 justify-center">
                    {member.companies.map((logo, i) => (
                      <img key={i} src={logo} alt="company" className="h-6" />
                    ))}
                  </div>

                  <div className="actionTxt mt-4">
                    <h3 className="text-sm text-gray-500">
                      {member.description}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
