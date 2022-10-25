import { Component, Injector } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '@dongkap/do-shared';

@Component({
  selector: 'do-terms-conditions-page',
  styleUrls: ['./terms-conditions-page.component.scss'],
  templateUrl: './terms-conditions-page.component.html',
})
export class TermsConditionsPageComponent extends BaseComponent<any> implements OnInit, OnDestroy {

  public content: string;
  protected destroy$: Subject<any> = new Subject<any>();

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    const data: any = {
      parameterCode: 'TERMS_CONDITIONS.DONGKAP'
    };
    this.http.HTTP_AUTH(this.api['master']['parameter'], data)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response: any) => {
      this.content = response['parameterValue'];
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

}
