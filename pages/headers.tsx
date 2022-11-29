import { GetServerSideProps } from "next";
import React from "react";
import { delay, MemoryGraph } from "../shared";

export default function Page({ memoryUsages }: PageProps) {
  return (
    <div>
      <h1>Return response headers only</h1>
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
        return res.headers;
      })
      .then(() => {
        memoryUsages.push(process.memoryUsage());
      })
      .catch(() => {
        console.log("fetch error");
      });

    await delay(5);
  }

  return {
    props: {
      memoryUsages,
    },
  };
};
