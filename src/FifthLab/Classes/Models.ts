import { User } from './User';

interface IUserManager {
  repository: IUserRepository;
  signUp(name: string, login: string, password: string): User;
  signIn(login: string, password: string): User;
  singOut(): void;
  isSignedIn(): boolean;
}

interface IProperty {
  key: string;
  value: any;
}

interface IUserProperty extends IProperty {
  key: 'login' | 'name' | 'password';
}

interface IDataRepository<T> {
  dataStore: Array<T>;

  add(newData: T): void;
  delete(id: number): void;
  update(id: number, args: Array<IProperty>): void;
  get(key: string, keyValue: number | string): T;
}

interface IUserRepository extends IDataRepository<User>{
  get(key: 'id', keyValue: number): User;
  get(key: 'login', keyValue: string): User;
  update(id: number, args: Array<IUserProperty>): void;
}

export type {IUserProperty, IUserRepository, IUserManager};