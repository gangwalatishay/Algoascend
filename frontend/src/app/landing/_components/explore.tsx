import { Link } from "react-router-dom";

const tracks = [
  { title: "Foundations Track", slug: "foundations" },
  { title: "Software Engineering Track", slug: "software-engineering" },
  { title: "Data & Analytics Track", slug: "data-analytics" },
  { title: "AI & Machine Learning Track", slug: "ai-ml" },
  { title: "Generative AI & LLM Track", slug: "generative-ai" },
  { title: "Agentic AI Track (Flagship)", slug: "agentic-ai" },
  { title: "Career Acceleration Track", slug: "career-acceleration" },
];

export default function Explore() {
  return (
    <div className="mt-20 px-4 md:px-8">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex flex-col">
          <h2 className="text-3xl md:text-4xl">
            Explore the Learning Tracks
          </h2>
          <p className="text-base md:text-xl mt-4 max-w-3xl">
            Browse curated learning paths designed to guide you from beginner to expert, one step at a time.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 md:mt-20 p-4 md:p-8 gap-4 md:gap-8 w-full max-w-5xl">
          <div className="bg-amber-300 p-6 w-full min-h-24 flex text-center justify-center items-center rounded-2xl">
            <h2 className="text-xl md:text-2xl font-semibold text-black mb-2">
              Software Enginear
            </h2>
          </div>
          <div className="bg-amber-300 p-6 w-full min-h-24 flex text-center justify-center items-center rounded-2xl">
            <h2 className="text-xl md:text-2xl font-semibold text-black mb-2">
              Data Science
            </h2>
          </div>
        </div>

      </div>
    </div>
  )
}
