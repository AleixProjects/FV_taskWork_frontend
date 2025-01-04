import type { MetaFunction } from "@remix-run/node";
import { BaseNavigation } from "app/components/navigation/BaseNavigation";
import 'app/styles/global.css'; // Import the CSS file

import * as dotenv from "dotenv";
dotenv.config();
const brandName = process.env.BRAND_NAME || "NotTitle";


export const meta: MetaFunction = () => {
  return [
    { title: {brandName} },
    
  ];
};

export default function Index() {
  return (
    <>
      <BaseNavigation />
    </>
  );
}

