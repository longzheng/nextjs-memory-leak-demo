import { GetServerSideProps } from "next";
import React from "react";
import { delay, MemoryGraph } from "../shared";

export default function Page({ memoryUsages }: PageProps) {
  return (
    <div>
      <h1>Force consumption of response body</h1>
      <MemoryGraph memoryUsages={memoryUsages} />
    </div>
  );
}

type PageProps = { memoryUsages: NodeJS.MemoryUsage[] };

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const memoryUsages: NodeJS.MemoryUsage[] = [];

  for (let index = 0; index < 100; index++) {
    fetch("http://127.0.0.1:3000/api/test")
      .then(async (res) => {
        for await (const chunk of res.body as any) {
          // force consumption of body
        }

        return res.headers;
      })
      .then(() => {
        memoryUsages.push(process.memoryUsage());
      })
      .catch((err) => {
        console.log("fetch error: " + err);
      });

    await delay(5);
  }

  return {
    props: {
      memoryUsages,
    },
  };
};
