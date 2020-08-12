import { Component, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';

@Component({
  selector: 'app-loading-overlay',
  template: '<div class="overlay"><app-loading></app-loading></div>',
  styles: [`
    :host {
      position: fixed;
      display: flex;
      background-color: rgba(50.2%, 50.2%, 50.2%, 0.8);
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      align-items: center;
      justify-content: center;
      z-index: 200;
    }
  `]
})
export class LoadingOverlayComponent {

  static create(containerRef: ViewContainerRef, resolver: ComponentFactoryResolver): ComponentRef<LoadingOverlayComponent> {
    const factory = resolver.resolveComponentFactory(LoadingOverlayComponent);
    const overlayRef = containerRef.createComponent(factory);
    return overlayRef;
  }

}
