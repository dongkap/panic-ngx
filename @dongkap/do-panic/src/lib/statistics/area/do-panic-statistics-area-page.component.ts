import { Component, OnInit, OnDestroy, Injector, ViewEncapsulation } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { NbThemeService } from '@nebular/theme';
import { HttpFactoryService, HTTP_SERVICE, API, APIModel } from '@dongkap/do-core';

@Component({
  selector: 'do-panic-statistics-area',
  styleUrls: ['./do-panic-statistics-area-page.component.scss'],
  templateUrl: './do-panic-statistics-area-page.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DoPanicStatisticsAreaPageComponent implements OnInit, OnDestroy {

  public options: any = {};
  public data: any;
  public dataSelect: any[];
  public selected: any;
  private destroy$: Subject<void> = new Subject<void>();
  private http: HttpFactoryService;
  private api: APIModel;
  private themeSubscription: Subscription;
  private axis: any[];
  private legend: any[];
  private series: any[];


  constructor(injector: Injector, private theme: NbThemeService) {
    this.http = injector.get(HTTP_SERVICE);
    this.api = injector.get(API);
  }

  ngOnInit(): void {
    const year: number = new Date().getFullYear();
    const tempData: number[] = [];
    for (let i: number = 3; i >= 0; i--) {
      tempData.push(year - i);
    }
    this.dataSelect = tempData;
    this.selected = year;
    this.getStatistics();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.themeSubscription.unsubscribe();
  }

  private getStatistics(): void {
    this.http.HTTP_AUTH(
      this.api['panic']['statistics-area'],
      null,
      null,
      null,
      [this.selected]).subscribe((values: any) => {
        this.axis = values['axis']['data'];
        this.legend = values['legend']['data'];
        this.series = [];
        values['series'].forEach((series: any) => {
          this.series.push({
            name: series['name'],
            type: 'bar',
            barWidth: '10%',
            data: series['data'][series['name']],
          });
        });
        this.buildChart();
      });
  }

  private buildChart(): void {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data: this.legend,
          textStyle: {
            color: echarts.textColor,
          },
        },
        grid: {
          left: '2%',
          right: '3%',
          bottom: '5%',
          top: '15%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: this.axis,
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              show: true,
              interval: 0,
              rotate: 45,
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: this.series,
      };
    });
  }

  public onSelectChange(data: any): void {
    this.selected = data;
    this.getStatistics();
  }

}
