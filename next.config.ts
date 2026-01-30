import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default withFlowbiteReact(withPayload(nextConfig));