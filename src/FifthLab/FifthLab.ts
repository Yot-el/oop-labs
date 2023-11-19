import { initUserPage, userPage } from './pages/User';
import { initSignInPage, signInPage } from './pages/SignIn';

import { userManager, setCurrentUser, repository } from './Store/userStore';
import { setPage } from './pages/utils';

console.log(repository)

const init = () => {
  if (userManager.isSignedIn()) {
    // @ts-ignore
    const user = userManager.signIn(localStorage.getItem('lab5-login'), localStorage.getItem('lab5-password'));
  
    setCurrentUser(user);
    setPage(userPage);
    initUserPage();
    return;
  }

  setPage(signInPage);
  initSignInPage();
}

init();



