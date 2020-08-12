import { BaseTheme, BaseSize } from './../../common/base.theme';
import { Component, Input, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ViewChild, ElementRef, AfterViewInit, HostListener, Output, EventEmitter } from '@angular/core';
import { reverse } from 'lodash';

export interface Button {
  title: string;
  color?: 'primary' | 'accent' | 'warn';
  onClick?: VoidFunction;
}

interface ModalOptions {
  show?: boolean;
  title?: string;
  type?: BaseTheme;
  body?: string;
  size?: BaseSize;
  buttons?: Button[];
}


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @ViewChild('modalOverlay')
  private overlay: ElementRef;

  @Input() show = true;

  @Input() title = 'Modal Title';

  @Input() type: BaseTheme = 'normal';

  @Input() body = 'Modal Body';

  @Input() size: BaseSize = 'sm';

  @Input() buttons: Button[] = [];

  @Output() overlayClick = new EventEmitter();

  get classes(): {} {
    return {
      'custom-modal': true,
      [this.size]: true,
      [this.type]: true
    };
  }

  static createModal(view: ViewContainerRef, resolver: ComponentFactoryResolver, opts?: ModalOptions): ComponentRef<ModalComponent> {
    const factory = resolver.resolveComponentFactory(ModalComponent);
    const ref = view.createComponent<ModalComponent>(factory);
    ref.instance.buttons.push({
      title: 'OK',
      color: 'primary',
      onClick: () => view.clear(),
    });

    // for loop init opts data
    if (opts) {
      for (const key in opts) {
        if (opts[key]) {
          ref.instance[key] = opts[key];
        }
      }
    }
    return ref;
  }

  @HostListener('click', ['$event'])
  onClick = (e: Event) => {
    if (this.overlay && e.target === this.overlay.nativeElement) {
      this.overlayClick.emit();
    }
  }

}
