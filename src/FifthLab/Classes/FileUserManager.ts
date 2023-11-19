import { IUserManager } from './Models';
import { FileUserRepository } from './FileUserRepository';
import { User } from './User';

class FileUserManager implements IUserManager {
  repository: FileUserRepository;

  constructor(repository: FileUserRepository) {
    this.repository = repository;
  }

  public signUp(name: string, login: string, password: string): User {
    try {
      this.repository.get("login", login);
    }
    catch (e) {
      const user = new User(name, login, password);
      localStorage.setItem('lab5-login', login);
      localStorage.setItem('lab5-password', password);
      this.repository.add(user);
      return user;
    }

    throw new Error("User with this login already exists");
  }

  public signIn(login: string, password: string): User {
    let user;

    try {
      user = this.repository.get('login', login);
    }
    catch (error) {
      throw error;
    }

    if (!user.checkPassword(password)) {
      throw new Error("Invalid password");
    }

    localStorage.setItem('lab5-login', login);
    localStorage.setItem('lab5-password', password);
    return user;
  }

  public singOut(): void {
    localStorage.removeItem('lab5-login');
    localStorage.removeItem('lab5-password');
  }

  public isSignedIn(): boolean {
    if (localStorage.getItem('lab5-login')) return true;

    return false;
  }
}

export { FileUserManager };