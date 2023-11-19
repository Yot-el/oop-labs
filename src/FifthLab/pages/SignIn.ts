import { User } from '../Classes/User';
import { userManager, setCurrentUser } from '../Store/userStore';
import { setPage } from './utils';
import { userPage, initUserPage } from './User';
import { signUpPage, initSignUpPage } from './SignUp';

const signInPage = `<form action="#" class="sign-in container">
  <h2>Войти</h2>
  <label for="login">Логин</label>
  <input type="text" name="login" id="login" class="login">
  <label for="password">Пароль</label>
  <input type="password" name="password" id="password" class="password">
  <span class="error"></span>
  <button type="submit" class="sign-in__button">Войти</button>
  <a href="" class="sign-in__redirect">Еще не зарегистрированы?</a>
</form>
`

const initSignInPage = () => {
  const loginInput = <HTMLInputElement>document.querySelector('.login');
  const passwordInput = <HTMLInputElement>document.querySelector('.password');
  const error = document.querySelector('.error');

  const submitButton = document.querySelector('.sign-in__button');
  submitButton?.addEventListener('click', (e) => {
    e.preventDefault();

    let user: User;

    try {
      user = userManager.signIn(loginInput.value, passwordInput.value);
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

  const redirectLink = document.querySelector('.sign-in__redirect');
  redirectLink?.addEventListener('click', (e) => {
    e.preventDefault();
    setPage(signUpPage);
    initSignUpPage();
  })
}

export { signInPage, initSignInPage };