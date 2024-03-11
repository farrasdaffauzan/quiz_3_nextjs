import Image from "next/image";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import Link from "next/link";

const LayoutComponent = dynamic(() => import("@/layout"));

const inter = Inter({ subsets: ["latin"] });

export default function Notes({ notes }) {
  console.log("notes detail =>", notes);
  return (
    <>
      <LayoutComponent metatitle={"Notes"}>
        <div className="mx-auto text-center max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <ul style={{ border: "1px solid black" }}>
            <li>title: {notes?.data?.title}</li>
            <li>description:{notes?.data?.description} </li>
          </ul>
        </div>
      </LayoutComponent>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
  const notes = await res.json();
  const paths = notes?.data?.map((item) => ({
    params: {
      id: item.id,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/notes/${id}`);
  const notes = await res.json();
  return { props: { notes }, revalidate: 10 };
}
