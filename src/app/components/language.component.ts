import { Component, Inject, PLATFORM_ID, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-language',
  template: `
      <div [class]="classes">
      <mat-form-field class="example-full-width">
        <mat-label>{{ 'language' | translate | titlecase }}</mat-label>
        <mat-select
          name="language"
          (selectionChange)="onChangeLanguage($event)"
          [value]="this.currentLanguage"
        >
          <mat-option value="en">English</mat-option>
          <mat-option value="zh">中文</mat-option>
        </mat-select>
      </mat-form-field>
    </div>
  `,
  styles: [`
    .language-fixed {
      position: fixed;
      bottom: 0;
      left: 20px;
    }

    .language {
      padding-top: 10px;
      display: flex;
      justify-content: center;
    }

  `]
})
export class LanguageComponent {

  @Input()
  theme: 'primary' | 'normal' = 'normal';

  @Input()
  fixed = true;

  get classes() {
    return {
      'language-fixed': this.fixed,
      language: !this.fixed,
      [this.theme]: true
    };
  }

  currentLanguage = 'en';

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private translateService: TranslateService,
  ) {
    this.currentLanguage = translateService.currentLang;
  }

  onChangeLanguage(e: MatSelectChange): void {
    this.translateService.use(e.value);
    localStorage.setItem('lang', e.value);
  }
}
