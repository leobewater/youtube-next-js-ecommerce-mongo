import { getSession } from 'next-auth/react';
import Order from '../../../models/Order';
import db from '../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  // throw 401 errors when no request has no session
  if (!session) {
    return res.status(401).send('signin is required');
  }

  const { user } = session;

  await db.connect();
  
  // create new order
  const newOrder = new Order({
    ...req.body,
    user: user._id,
  });

  // save order
  const order = await newOrder.save();

  await db.disconnect();

  res.status(201).send(order);
};

export default handler;
