import { FileUserManager } from '../Classes/FileUserManager';
import { FileUserRepository } from '../Classes/FileUserRepository';
import { User } from '../Classes/User';

const repository = new FileUserRepository();
const userManager = new FileUserManager(repository);
let currentUser: User = new User('', '', '');

const setCurrentUser = (newUser: User) => {
  currentUser = newUser;
}

const getCurrentUser = (): User => {
  return currentUser;
}

export { userManager, setCurrentUser, getCurrentUser, repository }
