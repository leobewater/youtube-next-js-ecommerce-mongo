import { getSession } from 'next-auth/react';
import User from '../../../models/User';
import db from '../../../utils/db';
import bcryptjs from 'bcryptjs';

const handler = async (req, res) => {
  if (req.method !== 'PUT') {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const session = await getSession({ req });
  // throw 401 errors when request has no session
  if (!session) {
    return res.status(401).send({message: 'signin is required'});
  }

  const { user } = session;
  const { name, email, password } = req.body;

  if (
    !name ||
    !email ||
    !email.includes('@') ||
    (password && password.trim().length < 6)
  ) {
    res.status(422).json({
      message: 'Validation error',
    });
    return;
  }

  await db.connect();

  // find user
  const toUpdateUser = await User.findById(user._id);
  toUpdateUser.name = name;
  toUpdateUser.email = email;
  if (password) {
    toUpdateUser.password = bcryptjs.hashSync(password);
  }

  await toUpdateUser.save();
  await db.disconnect();

  res.send({
    message: 'User updated successfully',
  });
};

export default handler;
