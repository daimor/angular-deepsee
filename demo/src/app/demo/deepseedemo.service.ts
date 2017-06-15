import { Injectable } from '@angular/core';
import { URLSearchParams, ResponseOptions, Response } from '@angular/http';
import {
  InMemoryDbService,
  InMemoryBackendConfigArgs,
  ParsedUrl,
  RequestInfo,
  createErrorResponse,
  emitResponse,
  HttpMethodInterceptorArgs,
  STATUS
} from 'angular-in-memory-web-api';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export const DeepSeeDemoConfig: InMemoryBackendConfigArgs = {
  apiBase: '/MDX2JSON/',
  passThruUnknownUrl: true,
  caseSensitiveSearch: true
}

@Injectable()
export class DeepSeeDemoBaseService implements InMemoryDbService {
  createDb() {
    return {
      DataSource: require('./DataSource/'),
      MDX: require('./MDX/'),
      MDXDrillthrough: require('./MDXDrillthrough/')
    };
  }

  getDataSource(pivot: string): any {
    return {};
  }
}

@Injectable()
export class DeepSeeDemoService extends DeepSeeDemoBaseService {

  parseUrl(url: string): ParsedUrl {
    try {
      const loc = this.getLocation(url);
      const path = loc.pathname.substring(1);
      let [base, collectionName, id] = path.split('/');
      const resourceUrl = base + '/' + collectionName + '/';

      const query = loc.search && new URLSearchParams(loc.search.substr(1));

      const result = { base, collectionName, id, query, resourceUrl };
      return result;
    } catch (err) {
      const msg = `unable to parse url '${url}'; original error: ${err.message}`;
      throw new Error(msg);
    }
  }

  // HTTP POST interceptor
  protected post(interceptorArgs: HttpMethodInterceptorArgs) {
    // Returns a "cold" observable that won't be executed until something subscribes.
    return new Observable<Response>((responseObserver: Observer<Response>) => {
      let resOptions: ResponseOptions;

      const { query, collection, collectionName, headers, req } = interceptorArgs.requestInfo;
      let id;
      let postData = req.json();
      let operation = collectionName;
      let data;

      switch (operation) {
        case 'DataSource':
          let pivot = postData.DataSource; id = pivot;
          data = this.findBy(collection, 'fullName', pivot);
          break;
        case 'MDX':
          let mdx = postData.MDX;
          data = this.findBy(collection, 'mdx', mdx);
          data = data ? data.data : this.findBy(collection, 'mdx', '').data;
          break;
        case 'MDXDrillthrough':
          let table = postData.MDX.match(/FROM \[([^\]]+)\]/)[1].toLowerCase(); id = table;
          data = this.findBy(collection, 'table', table);
          data = data ? data.data : { children: [] };
          break;
      }

      if (data) {
        resOptions = new ResponseOptions({
          body: Object.assign({}, data),
          headers: headers,
          status: STATUS.OK
        });
      } else {
        resOptions = createErrorResponse(req, STATUS.NOT_FOUND,
          `'${collectionName}' with id='${id}' not found`);
      }

      emitResponse(responseObserver, req, resOptions);
      return () => { }; // unsubscribe function
    });
  }

  private getLocation(href: string) {
    if (href.startsWith('http')) {
      href = href.replace(/^https?:\/\/[^/]+/, '');
    }
    let uri = this.parseuri(href);
    let loc = {
      host: uri.host,
      protocol: uri.protocol,
      port: uri.port,
      pathname: uri.path.replace(/\/\/+/gm, '/'),
      search: uri.query ? '?' + uri.query : ''
    };
    return loc;
  };


  private parseuri(str: string): any {
    const URL_REGEX = /^((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?/;
    const key = ['relative', 'path', 'directory', 'file', 'query', 'anchor'];
    let m = URL_REGEX.exec(str);
    let uri = {};
    let i = 14;

    while (i--) { uri[key[i]] = m[i] || ''; }
    return uri;
  }

  private findBy(collection: any[], property: string, value: number | string) {
    return collection.find((item: any) => item[property] === value);
  }
}
