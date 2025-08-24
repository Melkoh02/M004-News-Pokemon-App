import {makeAutoObservable} from 'mobx';

export class UIStore {
  snackbar = {
    isVisible: false,
    message: '',
    variant: 'info' as 'info' | 'success' | 'warning' | 'danger',
    duration: 3000,
  };

  constructor() {
    makeAutoObservable(this);
  }

  showSnackbar(message: string, variant: UIStore['snackbar']['variant']) {
    this.snackbar = {isVisible: true, message, variant, duration: 3000};
  }

  hideSnackbar() {
    this.snackbar.isVisible = false;
  }
}
