import db from '../../utils/db';
import User from '../../models/User';
import Product from '../../models/Product';
import data from '../../utils/data';

const handler = async (req, res) => {
  await db.connect();

  // reset user collection
  await User.deleteMany();
  await User.insertMany(data.users);

  // reset product collection
  await Product.deleteMany();
  await Product.insertMany(data.products);

  await db.disconnect();
  res.send({ message: 'Users and Products data seeded successfully' });
};

export default handler;
