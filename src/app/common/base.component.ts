import { Subscription } from 'rxjs';
import { OnDestroy, Component } from '@angular/core';

@Component({ template: ''  })
export abstract class BaseComponent implements OnDestroy {

  private readonly subs: Subscription[] = [];

  set addSub(sub: Subscription) {
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
