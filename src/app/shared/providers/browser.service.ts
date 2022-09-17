import { Injectable } from '@angular/core';
import { Browser, OpenOptions } from '@capacitor/browser';
import { defer, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BrowserService {
  private toolbarColor: string = '#1B4450';

  constructor() {}

  open(url: string): Observable<void> {
    const options: OpenOptions = {
      url,
      toolbarColor: this.toolbarColor,
    };
    const observable = defer(() => Browser.open(options)).pipe(take(1));
    return observable;
  }

  close(): Observable<void> {
    const observable = defer(Browser.close).pipe(take(1));
    return observable;
  }

  onBrowserPageLoaded(callbackFunc: any): Observable<any> {
    const observable = defer(() =>
      Browser.addListener('browserPageLoaded', callbackFunc)
    ).pipe(take(1));
    return observable;
  }

  onBrowserPageFinished(callbackFunc: any): Observable<any> {
    const observable = defer(() =>
      Browser.addListener('browserFinished', callbackFunc)
    ).pipe(take(1));
    return observable;
  }

  removeAllListeners(): Observable<void> {
    const observable = defer(Browser.removeAllListeners).pipe(take(1));
    return observable;
  }
}
