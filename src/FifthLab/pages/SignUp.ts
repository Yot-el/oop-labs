import { setPage } from "./utils";
import { signInPage, initSignInPage } from "./SignIn";
import { User } from "../Classes/User";
import { setCurrentUser, userManager } from "../Store/userStore";
import { initUserPage, userPage } from "./User";

const signUpPage = `<form action="#" class="sign-up container">
  <h2>Зарегистрироваться</h2>
  <label for="name">Имя</label>
  <input type="text" name="name" id="name" class="name">
  <label for="login">Логин</label>
  <input type="text" name="login" id="login" class="login">
  <label for="password">Пароль</label>
  <input type="password" name="password" id="password" class="password">
  <span class="error"></span>
  <button type="submit" class="sign-up__button">Зарегистрироваться</button>
  <a href="" class="sign-up__redirect">Уже зарегистрированы?</a>
</form>
`

const initSignUpPage = () => {
  const loginInput = <HTMLInputElement>document.querySelector('.login');
  const passwordInput = <HTMLInputElement>document.querySelector('.password');
  const nameInput = <HTMLInputElement>document.querySelector('.name');
  const error = document.querySelector('.error');

  const submitButton = document.querySelector('.sign-up__button');
  submitButton?.addEventListener('click', (e) => {
    e.preventDefault();

    let user: User;

    try {
      user = userManager.signUp(nameInput.value, loginInput.value, passwordInput.value);
    }
    catch (err: any) {
      //@ts-ignore
      error.textContent = err.message;
      return;
    }

    setCurrentUser(user);
    setPage(userPage);
    initUserPage();
  })

  const redirectLink = document.querySelector('.sign-up__redirect');
  redirectLink?.addEventListener('click', (e) => {
    e.preventDefault();
    setPage(signInPage);
    initSignInPage();
  })
}

export { signUpPage, initSignUpPage };