import Image from "next/image";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import("@/layout"));

const inter = Inter({ subsets: ["latin"] });

export default function Notes() {
  return (
    <>
      <LayoutComponent metatitle={"Notes"}>
        <div className="mx-auto text-center max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <h1>Notes</h1>
        </div>
      </LayoutComponent>
    </>
  );
}
