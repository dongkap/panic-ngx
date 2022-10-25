import { Component } from '@angular/core';

@Component({
  selector: 'do-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
  <span class="created-by">© {{year}} {{ 'SMART' | translate }}</span>
  <a [routerLink]="'/app/user/terms'">{{ 'message.terms-conditions' | translate }}</a>
  <a [routerLink]="'/app/user/privacy-policy'">{{ 'message.privacy-policy' | translate }}</a>
  `,
})
export class FooterComponent {
  public year: number = (new Date()).getFullYear();
}
