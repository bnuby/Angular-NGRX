import { take, map, switchMap, catchError } from 'rxjs/operators';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of, from, OperatorFunction, forkJoin } from 'rxjs';
import { environment } from '~template/src/environments/environment';

/**
 * Server Side Translation Loader
 */
export class SSRLanguageLoader implements TranslateLoader {

  getTranslation(lang: string): Observable<any> {

    // Load Extra Path Language
    const extraPaths = environment?.translation?.extraPaths || [];
    const resolver = (path: string) => {
      return from(import('../../assets/i18n' + `/${path}/${lang}.json`)).pipe(
        take(1),
        map(v => {
          return {
            [path]: v.default
          };
        }),
        catchError(e => {
          console.log(`Server Fetch Error path: ${path}, lang: ${lang}`);
          return of({});
        })
      );
    };
    const resolves = [];
    for (const path of extraPaths) {
      resolves.push(resolver(path));
    }
    // Fork All Request
    return forkJoin<any>([
      from(import(`../../assets/i18n/${lang}.json`)).pipe(
        take(1),
        map(v => {
          return v.default;
        }),
        catchError(e => {
          console.log(`Server Fetch Error path: root, lang: ${lang}`);
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
      })
    );
  }

}
