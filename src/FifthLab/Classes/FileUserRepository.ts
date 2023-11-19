import { IUserRepository, IUserProperty } from './Models';
import { User } from './User';

class FileUserRepository implements IUserRepository {
  dataStore: Array<User> = [];

  constructor() {
    if (localStorage.getItem('lab5-db')) {
      const dataFromDb = JSON.parse(localStorage.getItem('lab5-db') ?? "[]");

      this.dataStore = dataFromDb.map((user: any) => {
        const u = new User(user.name, user.login, user.password);
        u.setId(user.id);
        return u;
      });
    }
  }
  
  public add(newUser: User): void {
    newUser.setId(this.dataStore.length);
    this.dataStore.push(newUser);

    localStorage.setItem('lab5-db', JSON.stringify(this.dataStore));
  }

  get(key: 'id', keyValue: number): User;
  get(key: 'login', keyValue: string): User;
  get(key: 'id' | 'login', keyValue: number | string): User {
    let user;

    if (key === 'id') {
      user = this.dataStore.find((user) => user.getId() === keyValue);
    }

    if (key === 'login') {
      user = this.dataStore.find((user) => user.getLogin() === keyValue);
    }

    if (!user) throw new Error("User not found");
    return user;
  }

  delete(id: number): void {
    if (id >= this.dataStore.length || id < 0) throw new Error("Invalid id");
    this.dataStore.filter((user) => user.getId() !== id);

    localStorage.setItem('lab5-db', JSON.stringify(this.dataStore));
  }

  update(id: number, args: Array<IUserProperty>): void {
    if (id >= this.dataStore.length || id < 0) throw new Error("Invalid id");

    const user = this.get('id', id);
    args.forEach((property) => {
      switch(property.key) {
        case 'login': 
          user.setLogin(property.value);
          localStorage.setItem('lab5-login', property.value);
          break;
        case 'password':
          user.setPassword(property.value);
          localStorage.setItem('lab5-password', property.value);
          break;
        case 'name': 
          user.setName(property.value);
          break;
        default:
          throw new Error("Invalid property");
      }
    })

    localStorage.setItem('lab5-db', JSON.stringify(this.dataStore));
  }
}

export { FileUserRepository };