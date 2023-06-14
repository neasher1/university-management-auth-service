import config from '../../../config';
import ApiError from '../../../error/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generatedId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  //incremental id
  const id = await generatedId();
  user.id = id;

  //default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  const createdUser = await User.create(user);

  if (!createUser) {
    throw new ApiError(400, 'Failed to create a user');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};
