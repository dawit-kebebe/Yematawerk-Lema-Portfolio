import config from "@/payload.config";
import { getPayload } from "payload";
import DataChart from "./blocks/DataChart";
import RenderBlocks from "./components/RenderBlocks";

export default async function Home() {
  const payload = await getPayload({ config });

  // const pages = await payload.find({
  //   collection: 'pages',
  //   where: {
  //     slug: { equals: 'landing-page' }
  //   }
  // } as any);
  // [LandingType, CompaniesType, TestimonialsType, ImagePortfolioType, YamiTourType, AboutType]

  const landingGlobal = await payload.findGlobal({ slug: 'landing' } as any)


  return (
    <div className="w-full py-8">
      {
        landingGlobal && <RenderBlocks data={(landingGlobal as any)?.sections} />
      }
      <DataChart data={null} className="bg-transparent dark:bg-transparent" />
      {/* <YamiTour /> */}
    </div>
  );
}
