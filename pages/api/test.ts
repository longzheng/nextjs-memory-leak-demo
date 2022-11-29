import { NextApiHandler } from "next";

// 1MB of dummy data
const dummyData = Array.from({ length: 1_000_000 }, () => {
  return "1";
}).join('');

const handler: NextApiHandler = (req, res) => {
  res.status(200).end(dummyData);
};

export default handler;
