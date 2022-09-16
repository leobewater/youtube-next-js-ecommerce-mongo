import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const session = await getSession({ req });

  // throw 401 errors when request has no session
  if (!session) {
    return res.status(401).send('signin is required');
  }

  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
};

export default handler;
