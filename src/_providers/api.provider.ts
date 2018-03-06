import { Injectable } from '@angular/core';
import { ENV } from './../config/config.dev';
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { CurrentUserService } from '../app/app.services.list';

@Injectable()
export class Api extends Http {
  private currentUserServiceProvider: CurrentUserService = new CurrentUserService;

  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions
  ) {
    super(backend, defaultOptions);
  }

  get(path: string, options: RequestOptionsArgs = new RequestOptions()): Observable<Response> {
    return super
      .get(this.apiUrl(path), this.getRequestOptionWithHeaders(options))
      .catch(this.formatErrorResponse);
  }

  post(path: string, body: any, options: RequestOptionsArgs = new RequestOptions()): Observable<Response> {
    if (options) {
      return super
        .post(this.apiUrl(path), JSON.stringify(body), this.getRequestOptionWithHeaders(options))
        .catch(this.formatErrorResponse);
    } else {
      return super
      .post(this.apiUrl(path), JSON.stringify(body), null)
      .catch(this.formatErrorResponse);
    }
  }

  patch(path: string, body: any, options: RequestOptionsArgs = new RequestOptions()): Observable<Response> {
    return super
      .patch(this.apiUrl(path), JSON.stringify(body), this.getRequestOptionWithHeaders(options))
      .catch(this.formatErrorResponse);
  }

  delete(path: string, options: RequestOptionsArgs = new RequestOptions()): Observable<Response> {
    return super
      .delete(this.apiUrl(path), this.getRequestOptionWithHeaders(options))
      .catch(this.formatErrorResponse);
  }

  private apiUrl(path: string | Request): string {
    if (typeof (path) === 'string') {
      if (path.substring(0, 4) === 'http') {
        return path;
      } else {
        return `${ENV.API_URL}${path}`;
      }
    } else {
      return `${ENV.API_URL}${path.url}`;
    }
  }

  private getRequestOptionWithHeaders(options: RequestOptionsArgs): RequestOptionsArgs {
    if (!options.headers) {
      options.headers = new Headers();
    }

    options.headers.append('Content-Type', 'application/json');
    options.headers.append('Accept', 'application/json');

    if (this.currentUserServiceProvider.authenticated()) {
      const token = localStorage.getItem('Token');
      options.headers.append('Authorization', `Bearer ${token}`);
    }

    return options;
  }

  private formatErrorResponse(response: Response): Observable<any> {
    try {
      return Observable.throw(response.json());
    } catch (_error) {
      return Observable.throw({ message: response.statusText });
    }
  }
}
