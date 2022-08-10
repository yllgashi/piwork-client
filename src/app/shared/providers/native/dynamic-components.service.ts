import { Injectable } from '@angular/core';
import {
  ActionSheetButton,
  ActionSheetController,
  AlertController,
  AlertOptions,
  LoadingController,
  ModalController,
  ModalOptions,
  NavController,
  PopoverController,
  PopoverOptions,
  ToastController,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class DynamicComponentsService {
  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private navCtrl: NavController
  ) {}
  loader: HTMLIonLoadingElement;

  async navigateRoot(url: string): Promise<void> {
    await this.navCtrl.navigateRoot(url);
  }

  async showToast(text: string, duration: number = 3000) {
    let toast = await this.toastCtrl.create({
      message: text,
      duration: duration,
    });
    await toast.present();
  }

  async showError(text: string, title?: string) {
    let alert = await this.alertCtrl.create({
      header: title ? title : 'Fail',
      subHeader: text,
    });
    await alert.present();
  }

  async showAlert(options: AlertOptions) {
    let alert = await this.alertCtrl.create(options);
    await alert.present();
  }

  async showActionSheet(title: string, buttons: ActionSheetButton[]) {
    let actionSheet = await this.actionSheetCtrl.create({
      header: title,
      buttons: buttons,
    });
    await actionSheet.present();
  }

  async showLoader() {
    this.loader = await this.loadingCtrl.create({
      message: '',
    });
    await this.loader.present();
  }

  async dissmisLoader() {
    this.loader.dismiss();
  }

  async showModal(props: ModalOptions) {
    let modal = await this.modalCtrl.create(props);
    await modal.present();
  }

  async closeModal() {
    this.modalCtrl.dismiss();
  }

  async showErrorToast(errorMsg?: string): Promise<void> {
    let message = errorMsg ? errorMsg : 'Something went wrong';
    this.showToast(message);
  }

  async showSuccessToast(successMsg?: string): Promise<void> {
    let message = successMsg ? successMsg : 'Save';
    this.showToast(message);
  }

  async showPopover(options: PopoverOptions): Promise<void> {
    let popover = await this.popoverCtrl.create(options);
    await popover.present();
  }

  async dismissPopover(): Promise<void> {
    await this.popoverCtrl.dismiss();
  }
}
