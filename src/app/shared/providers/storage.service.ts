import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { defer, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  // expDate = -1 => store data forever
  set(key: string, value: any, delayMinutes?: number) {
    const expDate = delayMinutes ? this.addTimeInMiliseconds(delayMinutes) : -1;
    const valueJSON = this.stringifyToJSON(value, expDate);
    const observable = defer(() =>
      Preferences.set({ key, value: valueJSON })
    ).pipe(take(1));
    return observable;
  }

  get(key: string) {
    const observable = defer(() => Preferences.get({ key })).pipe(
      take(1),
      map((res) => {
        if (!res?.value) return null;
        const { data, expDate } = this.parseJSON(res.value);
        if (expDate == -1) return data;
        const now = new Date().getTime();
        if (expDate > now) return data;
        // else
        this.remove(key);
        return null;
      })
    );
    return observable;
  }

  remove(key: string): Observable<void> {
    const observable = defer(() => Preferences.remove({ key })).pipe(take(1));
    return observable;
  }

  clear(): Observable<void> {
    const observable = defer(Preferences.clear).pipe(take(1));
    return observable;
  }

  //#region helpers
  private addTimeInMiliseconds(milisecondsToAdd: number) {
    return new Date().getTime() + milisecondsToAdd * 60000;
  }

  private stringifyToJSON(data: any, expDate: number): string {
    const result = JSON.stringify({ data, expDate });
    return result;
  }

  private parseJSON(value): any {
    const result = JSON.parse(value);
    return result;
  }
  //#endregion helpers
}
