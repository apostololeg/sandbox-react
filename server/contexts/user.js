import jwt from 'jsonwebtoken'
import {
  JWT_SECRET,
  COOKIE_TOKEN_NAME
} from '../../config/const';

export default async function({ req, db }) {
  const authToken = req.cookies[COOKIE_TOKEN_NAME];

  if (!authToken) {
    return null;
  }

  try {
    const { id } = jwt.verify(authToken, JWT_SECRET);
    const user = await db.user({ id });

    return { user };
  } catch (e) {
    return null;
  }
}
