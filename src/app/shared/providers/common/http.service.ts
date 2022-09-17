import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ResponseModel } from '../../model/response.model';
import { StorageService } from '../native/storage.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiUrl: string = environment.baseUrl;
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  /**
   * Create POST request
   * @param path Path after base url
   * @param body Body.
   * @param options Optional object with HttpParams and/or HttpHeaders.
   * @returns Generic observable.
   */
  post<T>(options?: CustomHttpOptions): Observable<T> {
    return this.httpClient
      .post<ResponseModel>(this.apiUrl + options.path, options.body, {
        headers: options?.headers,
        params: options?.params,
      })
      .pipe(map((res) => this.extractDataFromResponseModel(res)));
    // .pipe(catchError(this.handleError));
  }

  /**
   * Create GET request
   * @param path Path after base url
   * @param body Body.
   * @param options Optional object with HttpParams and/or HttpHeaders.
   * @returns Generic observable.
   */
  get<T>(options?: CustomHttpOptions): Observable<T> {
    // generate cache key
    const params = options?.params?.toString();
    const path = options.withoutBaseUrl
      ? options.path
      : this.apiUrl + options.path;
    const cacheKey = params ? options.path + '?' + params : options.path;
    // data from cache
    const cacheObservable$ = this.storageService.get(cacheKey);
    // data from api (cache if is needed)
    const apiObservable$ = this.httpClient
      .get<any>(path, {
        headers: options?.headers,
        params: options?.params,
      })
      .pipe(
        map((res) => this.extractDataFromResponseModel(res)),
        tap((res) =>
          this.checkIfCacheIsNeeded(cacheKey, res, options.cacheTime)
        )
      );

    // if data is not find in cache, return data from api
    return cacheObservable$.pipe(
      switchMap((value) => (value ? of(value) : apiObservable$))
    );
  }

  /**
   * Create PUT request
   * @param path Path after base url
   * @param body Body.
   * @param options Optional object with HttpParams and/or HttpHeaders.
   * @returns Generic observable.
   */
  put<T>(options?: CustomHttpOptions): Observable<T> {
    return this.httpClient
      .put<ResponseModel>(this.apiUrl + options.path, options.body, {
        headers: options?.headers,
        params: options?.params,
      })
      .pipe(map((res) => this.extractDataFromResponseModel(res)));
    // .pipe(catchError(this.handleError));
  }

  /**
   * Create DELETE request
   * @param path Path after base url
   * @param body Body.
   * @param options Optional object with HttpParams and/or HttpHeaders.
   * @returns Generic observable.
   */
  delete<T>(options?: CustomHttpOptions): Observable<T> {
    return this.httpClient
      .delete<ResponseModel>(this.apiUrl + options.path, {
        headers: options?.headers,
        params: options?.params,
      })
      .pipe(map((res) => this.extractDataFromResponseModel(res)));
    // .pipe(catchError(this.handleError));
  }

  private checkIfCacheIsNeeded(cacheKey, res, cacheDelay) {
    if (cacheDelay && res)
      this.storageService.set(cacheKey, res, cacheDelay).subscribe();
  }

  private extractDataFromResponseModel(response: ResponseModel) {
    return response.results;
  }
}

interface CustomHttpOptions {
  path: string;
  body?: any;
  headers?: HttpHeaders;
  params?: HttpParams;
  cacheTime?: number;
  withoutBaseUrl?: boolean;
}
