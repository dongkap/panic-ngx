import { Component, OnInit, OnDestroy, Inject, Injector } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { API, APIModel, HttpFactoryService, HTTP_SERVICE } from '@dongkap/do-core';
import { LeafletModel } from '@dongkap/do-shared';
import { PanicService } from '../../services/panic.service';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'do-panic-monitoring',
  styleUrls: ['./do-panic-monitoring-page.component.scss'],
  templateUrl: './do-panic-monitoring-page.component.html',
})
export class DoPanicMonitoringPageComponent implements OnInit, OnDestroy {

  public showInfo: boolean = false;
  public markers: LeafletModel[];
  public markerSelected: LeafletModel;
  private destroy$: Subject<void> = new Subject<void>();
  private http: HttpFactoryService;
  private api: APIModel;

  constructor(injector: Injector, private panicService: PanicService,
    private swPush: SwPush) {
    this.http = injector.get(HTTP_SERVICE);
    this.api = injector.get(API);
    this.panicService.onCheckPanic()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getAllPanicStorage();
    });
    this.swPush.messages.subscribe((message: {notification: NotificationOptions}) => {
      console.log(message);
      const data: any = JSON.parse(message.notification.data);
      if (data['id'] || message.notification.tag === 'panic') {
        this.panicService.notifyPanic(data);
      }
    });
  }

  ngOnInit(): void {
    this.getAllPanicServer();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getAllPanicServer(): void {
    this.http.HTTP_AUTH(this.api['panic']['get-allpanic']).subscribe((values: any[]) => {
      const temps: any[] = [];
      console.log(values);
      values.forEach((data: any) => {
        temps.push({
          mark: [
            data['latestLatitude'], data['latestLongitude'],
          ],
          title: data['name'],
          alt: data['id'],
          className: 'pulse',
        });
      });
      this.markers = temps;
      try {
        this.panicService.clearAllPanic().then(() => {
          if (values.length) {
            this.panicService.putAllPanic(values);
          }
        });
      } catch (error) {}
    });
  }

  private getAllPanicStorage(): void {
    this.panicService.getAllPanic().subscribe((values: any[]) => {
      const temps: any[] = [];
      console.log(values);
      values.forEach((data: any) => {
        temps.push({
          mark: [
            data['latestLatitude'], data['latestLongitude'],
          ],
          title: data['name'],
          alt: data['id'],
          className: 'pulse',
        });
      });
      this.markers = temps;
    });
  }

  public onMarker(data: LeafletModel): void {
    this.markerSelected = data;
    this.showInfo = true;
  }

  public onToggleInfo(showInfo: boolean): void {
    this.showInfo = showInfo;
  }

}
