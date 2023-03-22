import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for secret to confirm this is a valid request
  // if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
  //   return res.status(401).json({ message: 'Invalid token' });
  // }

  const slugToRevalidate = req.query.slug as unknown as string;

  try {
    // This should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate(slugToRevalidate);
    return res.json({ revalidated: true });
  } catch (err: unknown) {
      console.log(err);
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send(err);
  }
}
