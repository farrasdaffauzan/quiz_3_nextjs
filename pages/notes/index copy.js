import Image from "next/image";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import Link from "next/link";

const LayoutComponent = dynamic(() => import("@/layout"));

const inter = Inter({ subsets: ["latin"] });

export default function Notes({ notes }) {
  console.log("notes =>", notes);
  return (
    <>
      <LayoutComponent metatitle={"Notes"}>
        <div className="mx-auto text-center max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          {notes?.data?.map((item, idx) => (
            <Link key={idx} href={`/notes/${item?.id}`}>
              <ul style={{ border: "1px solid black" }}>
                <li>title: {item?.title}</li>
                <li>description:{item?.description} </li>
              </ul>
            </Link>
          ))}
        </div>
      </LayoutComponent>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
  const notes = await res.json();
  return { props: { notes } };
}
