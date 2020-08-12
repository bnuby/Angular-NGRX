import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { take, switchMap, delay, tap, map, mergeAll, catchError, switchAll } from 'rxjs/operators';
import { Observable, of, forkJoin, from, defer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LanguageResolver implements Resolve<Observable<boolean> | Promise<boolean>> {

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId,
    private readonly http: HttpClient,
    private readonly translate: TranslateService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> {

    let lang = this.translate.currentLang || this.translate.defaultLang;
    if (isPlatformBrowser(this.platformId)) {
      lang = (route.queryParams.lang as string) || localStorage.getItem('lang') || lang;
    }


    // Fork Join
    return forkJoin([
      // Load current choosen language
      this.translate.use(lang).pipe(take(1)),
      // Fetch default Path
      this.translate.getTranslation(lang).pipe(
        take(1),
        tap(v => {
          this.translate.setTranslation(lang, v);
        }),
      ),
    ]).pipe(
      take(1),
      switchMap(v => {
        return of(true);
      }),
    );
  }

}
