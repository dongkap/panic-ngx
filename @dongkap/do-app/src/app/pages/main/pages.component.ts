import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NbMenuItem } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import {
  AUTH_INDEXED_DB,
  USER_SERVICE,
  IndexedDBEncFactoryService,
  UserService,
  UserModel,
  SecurityResourceModel,
  OAUTH_INFO,
  ApiBaseResponse,
  HTTP_SERVICE,
  HttpFactoryService,
  APIModel,
  API,
} from '@dongkap/do-core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'do-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <do-layout
      [name]="name"
      [image]="image"
      [extraMenu]="extraMenu">
      <nb-menu [items]="menus"></nb-menu>
      <router-outlet></router-outlet>
    </do-layout>
  `,
})
export class PagesComponent implements OnInit, OnDestroy {

  public menus: NbMenuItem[] = [];
  public extraMenu: NbMenuItem[] = [];
  public name: string;
  public image: string;
  private destroy$: Subject<any> = new Subject<any>();

  constructor(
    private translate: TranslateService,
    @Inject(USER_SERVICE) private userService: UserService,
    @Inject(AUTH_INDEXED_DB) private authIndexedDB: IndexedDBEncFactoryService,
    @Inject(HTTP_SERVICE) private http: HttpFactoryService,
    @Inject(API) private api: APIModel,
    @Inject(OAUTH_INFO) private oauthResource: SecurityResourceModel,
    private swPush: SwPush,
    private titleService: Title) {
      this.setMenus();
      this.translate.onTranslationChange.pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.setMenus();
      });
      this.swPush.subscription.subscribe((subscription: PushSubscription) => {
        if (subscription === null) {
          this.swPush.requestSubscription({serverPublicKey: this.oauthResource.vapid})
            .then((pushSubscription: PushSubscription) => {
              console.log(pushSubscription);
              const sub: any = JSON.parse(JSON.stringify(pushSubscription));
              this.http.HTTP_AUTH(this.api['notification']['push-subscribe'], sub)
                .subscribe((response: ApiBaseResponse) => {});
          });
        }
      });
      this.swPush.messages.subscribe((message: {notification: NotificationOptions}) => {
        const data: any = JSON.parse(message.notification.data);
        if (data['id'] || message.notification.tag === 'panic') {
          titleService.setTitle('(1) '+ titleService.getTitle());
        }
      });
      this.swPush.notificationClicks.subscribe(({action, notification}) => {
        console.log(action);
        console.log(notification);
      });
  }

  ngOnInit() {
    this.setExtraMenu();
    this.translate.onTranslationChange.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.setExtraMenu();
    });
    this.userService.onUserChange.pipe(takeUntil(this.destroy$))
      .subscribe((user: UserModel) => {
        this.name = user.name;
        this.image = user.image;
    });

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  setMenus() {
    this.authIndexedDB.getEnc('menus').then((value: string) => {
      this.menus = JSON.parse(value);
    });
  }

  setExtraMenu() {
    this.extraMenu = [];
    this.extraMenu.push({ title: '' });
    this.authIndexedDB.getEnc('extras').then((value: string) => {
      const extras: any[] = JSON.parse(value);
      if (extras) {
        extras.forEach(extra => {
          this.extraMenu.push({ title: extra.title, link : extra.link });
        });
      }
      this.translate.get('Logout').subscribe((result: string) => {
        this.extraMenu.push({ title: result, link : '/auth/logout' });
      });
      this.extraMenu.splice(0, 1);
    });
  }

}
