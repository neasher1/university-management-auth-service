import config from '../../../config'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generatedId } from './users.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  //incremental id
  const id = await generatedId()
  user.id = id

  //default password
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUser = await User.create(user)

  if (!createUser) {
    throw new Error('Failed to create a user')
  }
  return createdUser
}

export default {
  createUser,
}
