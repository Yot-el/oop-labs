import { userManager, getCurrentUser, repository } from "../Store/userStore";
import { signInPage, initSignInPage } from "./SignIn";
import { setPage } from "./utils";

const userPage = `<div class="user-wrapper container">
<div class="user">
  <h2>Пользователь</h2>
  <div>
    Имя: <span class="user__name"></span>
  </div>
  <div>
    Логин: <span class="user__login"></span>
  </div>
  <button type="button" class="user__logout">Выйти</button>
</div>
<form action="#" class="user-sidebar">
<h3>Изменить данные:</h3>
<input type="text" name="name" id="name" class="name" placeholder="Имя">
<input type="text" name="login" id="login" class="login" placeholder="Логин">
<input type="text" name="password" id="password" class="password" placeholder="Пароль">
<a href="" class="change-data-button">Изменить</a>
</form>
</div>
`

const initUserPage = () => {
  const logout_button = document.querySelector('.user__logout');
  logout_button?.addEventListener('click', (e) => {
    e.preventDefault();
    userManager.singOut();

    setPage(signInPage);
    initSignInPage();
  });

  const userName = document.querySelector('.user__name');
  //@ts-ignore
  userName.textContent = getCurrentUser().getName();

  const userLogin = document.querySelector('.user__login');
  //@ts-ignore
  userLogin.textContent = getCurrentUser().getLogin();

  const changeDataButton = document.querySelector('.change-data-button');
  changeDataButton?.addEventListener('click', (e) => {
    e.preventDefault();
    const data = new FormData(<HTMLFormElement>document.querySelector('.user-sidebar'));
    const args = [];
    
    for(let [key, value] of data) {
      if (value) {
        args.push({
          key,
          value
        })
      }
    }
    //@ts-ignore
    repository.update(getCurrentUser().getId(), args);
    setPage(userPage);
    initUserPage();
  })
}

export {userPage, initUserPage}