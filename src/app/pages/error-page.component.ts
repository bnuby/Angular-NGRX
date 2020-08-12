import { Component } from '@angular/core';

@Component({
  template: `
    <div class="error-page">
      {{ 'error page' | translate }}
    </div>
  `,
  styles: [`
    .error-page {
      min-width: 100vw;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `]
})
export class ErrorPageComponent {

}
