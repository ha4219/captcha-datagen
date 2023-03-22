// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

type Data = {
  img: string;
  ans: string;
}

type Res = {
  ok: boolean;
}



export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Res>
) {
  const {img, ans} = req.query as Data;
  const f = "data.txt";

  fs.appendFileSync(f, `${img}, ${ans}\n`);

  res.status(200).json({ ok: true })
}
