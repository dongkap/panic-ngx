import { Component, Injector, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@dongkap/do-shared';
import { MainMenuPageComponent } from '../main/main-menu-page.component';
import { ExtraMenuPageComponent } from '../extra/extra-menu-page.component';

@Component({
  selector: 'do-menu-page',
  styleUrls: ['./menu-page.component.scss'],
  templateUrl: './menu-page.component.html',
})
export class MenuPageComponent extends BaseComponent<any> implements OnInit, OnDestroy {

  public loading: boolean = false;
  public tab: string = 'main';
  protected destroy$: Subject<any> = new Subject<any>();

  @ViewChild('mainMenu', { static: true }) mainMenu: MainMenuPageComponent;
  @ViewChild('extraMenu', { static: true }) extraMenu: ExtraMenuPageComponent;

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleLoadingAnimation(event: any) {
    this.tab = event.tabId;
    this.loading = true;
    if (this.tab === 'main') {
      this.mainMenu.loadDataMenu()
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.loading = false;
      });
    } else {
      this.extraMenu.loadDataMenu()
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.loading = false;
      });
    }
  }

}
