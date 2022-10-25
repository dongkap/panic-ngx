import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  NbMediaBreakpointsService,
  NbMenuItem,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';
import { LayoutService } from '../../services/layout.service';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'do-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() public name: string;
  @Input() public image: string;
  @Input() public logo: string = '/assets/images/logo.png';
  @Input() public extraMenu: NbMenuItem[] = [];
  public userPictureOnly: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private sidebarService: NbSidebarService,
              private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService,
              private layoutService: LayoutService,
              private locationStrategy: LocationStrategy,
              private router: Router) {
    this.logo = this.locationStrategy.getBaseHref().replace(/\/$/, '') + this.logo;
  }

  ngOnInit() {
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }

  navigateHome() {
    this.router.navigate(['/app/home']);
    return false;
  }
}
