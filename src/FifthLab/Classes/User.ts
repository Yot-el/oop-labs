export class User {
  private id: number | null;
  public name: string;
  private login: string;
  private password: string;

  constructor (name: string, login: string, password: string) {
    this.id = null;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  public setId(newId: number): void {
    this.id = newId;
  }

  public getId(): number | null {
    return this.id;
  }

  public setName(newName: string): void {
    this.name = newName;
  }

  public getName(): string {
    return this.name;
  }

  public setLogin(newLogin: string): void {
    this.login = newLogin;
  }

  public getLogin(): string {
    return this.login;
  }

  public setPassword(newPassword: string): void {
    this.password = newPassword;
  }

  public checkPassword(password: string): boolean {
    if (this.password !== password) return false;
    return true;
  }
}