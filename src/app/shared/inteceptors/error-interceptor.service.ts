import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class ErrorCatchingInterceptor implements HttpInterceptor {
  constructor(private toastCtrl: ToastController) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next
      .handle(request)
      .pipe(catchError((error) => this.onCatchError(error)));
  }

  onCatchError(error: HttpErrorResponse) {
    let errorMsg: string;
    // server-side error
    if (error.error.message) errorMsg = 'ERROR.' + error.error.message;
    else errorMsg = this.onGenerateDefaultErrorMsg();
    // client-side error
    if (error.error instanceof ErrorEvent) this.showErrorToast(errorMsg);
    // throw
    else this.showErrorToast(errorMsg);
    return throwError(errorMsg);
  }

  private onGenerateDefaultErrorMsg(): string {
    return 'ERROR.ERR_01';
  }

  async showErrorToast(message: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }
}
