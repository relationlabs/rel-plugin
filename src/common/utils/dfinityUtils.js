import { AuthClient } from '@dfinity/auth-client';

let DfinityUtils = {

  // 点击导入IC账户
  loginButtonClick: async() => {
    const authClient = await AuthClient.create();
    await authClient.login({
      onSuccess: async () => {
        const identity = await authClient.getIdentity();
        console.log(identity);
        console.log(identity.getPrincipal())
        console.log(identity.getPrincipal().toString())
        console.log(identity.getPrincipal().isAnonymous())
        console.log(authClient.isAuthenticated());
      },
      identityProvider:"https://identity.ic0.app/#authorize",
    });
  },

  // 退出IC账号
  logoutButtonClick: async() => {
    const authClient = await AuthClient.create();
    await authClient.logout();
  }

}

export default DfinityUtils;