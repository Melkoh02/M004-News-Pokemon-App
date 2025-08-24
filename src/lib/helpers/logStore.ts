import rootStore from '../stores/rootStore.ts';

export function logStore() {
  console.log('Current user:', rootStore.userStore.user);
  // console.log('Access token:', rootStore.userStore.accessToken);
}
