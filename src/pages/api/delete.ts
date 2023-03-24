// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'


type Res = {
  ok: boolean;
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Res>
) {
  const f = "data.txt";

  fs.rmSync(f, {force: true});
  
  res.status(200).json({ ok: true });
}
