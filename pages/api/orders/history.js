import { getSession } from 'next-auth/react';
import Order from '../../../models/Order';
import db from '../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  // throw 401 errors when request has no session
  if (!session) {
    return res.status(401).send('signin is required');
  }

  const { user } = session;

  await db.connect();
  const orders = await Order.find({ user: user._id });
  await db.disconnect();

  res.send(orders);
};

export default handler;
