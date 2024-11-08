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
  if (req.method !== 'POST') {
    res.status(405).json({ok: false});
    return;
  }

  const {img, ans} = req.body as Data;

  if (!img || !ans) {
    return res.status(400).json({ok: false});
  }
  try {
    const base64Data = img.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const filePath = `imgs/${ans}.jpeg`;
    
    fs.writeFileSync(filePath, new Uint8Array(buffer));
  } catch(e) {
    console.error("[UPLOAD]", e);
    return res.status(500).json({ok: false});
  }

  res.status(200).json({ ok: true })
}
