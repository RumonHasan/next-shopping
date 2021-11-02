import nc from 'next-connect';
import Product from '../../models/Product';
import db from '../../utils/db';
import { data } from '../../utils/data';
import User from '../../models/User';

const handler = nc();
handler.get(async (req, res) => {
  await db.connect();
  // seeding users
  await User.deleteMany();
  await User.insertMany(data.users)
  // inserting products
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await db.disconnect(); // disconnecting after populating data
  res.send({message: 'seeded successfully'});
});

export default handler;