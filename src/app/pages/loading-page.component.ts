import { Component } from '@angular/core';

@Component({
  template: `<div><app-loading></app-loading></div>`,
  styles: [`
    :host {
      width: 100%;
    }
    div {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class LoadingPageComponent {
}
