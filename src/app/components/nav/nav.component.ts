import { AuthService, User } from './../../services/auth.services';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { BaseComponent } from '~template/src/app/common/base.component';


/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface NavItem {
  name: string;
  url?: string;
  icon?: string;
  children?: NavItem[];
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent extends BaseComponent implements OnDestroy {

  user: User;

  navitems: NavItem[] = [
    {
      name: 'home',
      children: [
        {
          name: 'product',
          url: '/home/product'
        }
      ]
    },
  ];

  currentPath = '/';
  translatePaths = {};

  treeControl = new NestedTreeControl<NavItem>(node => node.children);
  dataSource = new MatTreeNestedDataSource<NavItem>();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  hasChild = (_: number, node: NavItem) => !!node.children && node.children.length > 0;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly router: Router,
    private authService: AuthService,
    translate: TranslateService,
    route: ActivatedRoute,
  ) {
    super();
    // set side nav items
    this.dataSource.data = this.navitems;
    // get path translation

    this.addSub = translate.stream('menu').subscribe(menu => {
      this.translatePaths = menu;
    });

    // listen route change
    this.addSub = route.url.subscribe(urls => {
      this.currentPath = router.url;
    });

    // listen auth user change
    this.addSub = authService.userBehavior.subscribe(user => {
      this.user = user;
    });

    authService.fakeLogin();
  }

  /**
   * Get Route Path Title
   *
   * @readonly
   * @type {string}
   */
  get currentPathTitle(): string {
    const pathArray = [];
    const paths = this.currentPath.split('/').slice(1);
    for (const path of paths) {
      if (this.translatePaths[path]) {
        pathArray.push(this.translatePaths[path]);
      } else {
        pathArray.push(path);
      }
    }
    return pathArray.join(' > ');
  }

  /**
   * Navigate Route
   *
   * @param {string} url
   */
  goTo(url: string): void {
    if (url) {
      this.router.navigate([url]);
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  login(): void {
    // TODO: Login logic
    this.authService.fakeLogin();
  }

  logout(): void {
    // TODO: Logout logic
    this.authService.logout();
  }
}
