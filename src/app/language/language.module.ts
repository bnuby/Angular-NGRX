import { BrowserLanguageLoader } from './browser-language-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule, Inject, PLATFORM_ID } from '@angular/core';
import { environment } from 'projects/template/src/environments/environment';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { SSRLanguageLoader } from '~template/src/app/language/ssr-language-loader';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


// Http Loader Factory;
export function HttpLoaderFactory(http: HttpClient, platformId: string): TranslateLoader {
  if (isPlatformServer(platformId)) {
    // Server Side Language Loader
    return new SSRLanguageLoader();
  }
  // Browser Side Language Loader
  return new BrowserLanguageLoader(http);
}

@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient, PLATFORM_ID],
      }
    }),
  ],

})
export class LanguageModule {

  readonly languages: string[] = environment.translation.languages;
  readonly fallback = environment.translation.fallback;

  constructor(
    @Inject(PLATFORM_ID) platformId,
    translate: TranslateService
  ) {
    translate.addLangs(this.languages);
    translate.setDefaultLang(this.fallback);
    const browserLang = translate.getBrowserLang();
    translate.use(this.languages.includes(browserLang) ? browserLang : this.fallback);
  }

}
