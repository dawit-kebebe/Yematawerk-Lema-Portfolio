import config from "@/payload.config";
import { getPayload } from "payload";
import RenderBlocks from "./components/RenderBlocks";

export default async function Home() {
  const payload = await getPayload({ config });
  const landingGlobal = await payload.findGlobal({ slug: 'landing' } as any)


  return (
    <div className="w-full py-8">
      {
        landingGlobal && <RenderBlocks data={(landingGlobal as any)?.sections} />
      }
      {/* <DataChart data={null} className="bg-transparent dark:bg-transparent" /> */}
    </div>
  );
}