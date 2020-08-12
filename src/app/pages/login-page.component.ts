import { Button, ModalComponent } from './../components/modal/modal.component';
import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '~template/src/app/common/base.component';

@Component({
  selector: 'app-login-page',
  template: `
    <div class="foreground">

      <ng-container #modal></ng-container>

      <form #form="ngForm">
        <h3 [style]="{textAlign: 'center'}">{{ "app.welcome-login" | translate }}</h3>
        <div class="inputs">


          <p>
            <mat-form-field class="example-full-width">
              <mat-label>Username</mat-label>
              <input matInput [(ngModel)]="username" name="username" placeholder="Ex. admin">
            </mat-form-field>
          </p>

          <p>
            <mat-form-field class="example-full-width">
              <mat-label>Password</mat-label>
              <input
                matInput
                [(ngModel)]="password"
                name="password"
                placeholder="Ex. Password"
                type="password"
              >
            </mat-form-field>
          </p>

        </div>

        <div [style]="{
          display: 'flex',
          justifyContent: 'center'
        }">
          <button mat-raised-button color="primary" (click)="onLogin()">{{ 'login' | translate }}</button>
        </div>
      </form>

      <app-language></app-language>
    </div>
  `,
  styles: [`
    .foreground {
      display: flex;
      width: 100vw;
      height: 100vh;
      justify-content: center;
      align-items: center;
    }

    div form {
      transform: translateY(-20px);
    }
  `]
})
export class LoginPageComponent extends BaseComponent {

  @ViewChild('modal', { read: ViewContainerRef, })
  containerRef: ViewContainerRef;

  username = '';
  password = '';

  buttons: Button[] = [
    {
      title: 'Cancel',
      color: 'warn'
    },
    {
      title: 'Okay',
      color: 'primary'
    },
  ];

  constructor(
    private readonly router: Router,
    private readonly resolver: ComponentFactoryResolver,
  ) {
    super();
  }

  onLogin(): void {
    // TODO: Login Method
    this.router.navigate(['/home/dashboard']);
  }

  showModal(): void {
    // clear all container view
    this.containerRef.clear();

    // create modal
    const modalRef = ModalComponent.createModal(this.containerRef, this.resolver);
    const modal = modalRef.instance;
    modal.title = 'Modal Title';
    modal.body = 'Modal Body';
    const buttons: Button[] = [
      {
        title: 'OK',
        color: 'primary',
        onClick: () => {
          this.containerRef.clear();
        }
      }
    ];
    modal.buttons = buttons;

    // Hide Modal when clicked.
    this.addSub = modal.overlayClick.subscribe(() => {
      this.containerRef.clear();
    });
  }

}
