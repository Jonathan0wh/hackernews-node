import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { APP_SECRET, getUserId } from '../utils';

const Mutation = {
  post: (parent: any, args: any, context: any) => {
    const userId = getUserId(context);
    return context.prisma.createLink({
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } }
    });
  },

  signup: async (parent: any, args: any, context: any) => {
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.prisma.createUser({ ...args, password });
    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
      token,
      user
    };
  },

  login: async (parent: any, args: any, context: any) => {
    const user = await context.prisma.user({ email: args.email });

    if (!user) {
      throw new Error('No such user found');
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
      token,
      user
    };
  }
};

export default Mutation;
