import { environment } from '~template/src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { take, switchMap, catchError } from 'rxjs/operators';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, forkJoin, of } from 'rxjs';

/**
 * Browser Side Translation Loader
 */
export class BrowserLanguageLoader implements TranslateLoader {

  constructor(private http: HttpClient) { }

  getTranslation(lang: string): Observable<any> {

    // Load Extra Path Language
    const extraPaths = environment?.translation?.extraPaths || [];
    const resolver = (path: string) => {
      return this.http.get(`/assets/i18n/${path}/${lang}.json`)
        .pipe(
          take(1),
          switchMap(v => {
            return of({ [path]: v });
          }),
          catchError(e => {
            console.log(`Browser Fetch Error path: ${path}, lang: ${lang}`);
            return of({});
          })
        );
    };
    const resolves = [];
    for (const path of extraPaths) {
      resolves.push(resolver(path));
    }

    // Fork Get Translation
    return forkJoin<any>([
      this.http.get(`/assets/i18n/${lang}.json`).pipe(
        take(1),
        catchError(e => {
          console.log(`Browser Fetch Error path: root, lang: ${lang}`);
          return of({});
        })
        ),
      ...resolves,
    ]).pipe(
      take(1),
      switchMap(v => {
        let root = v[0];
        v = v.slice(1);
        for (const dict of v) {
          root = Object.assign(root, dict);
        }
        return of(root);
      }),
    );
  }

}
