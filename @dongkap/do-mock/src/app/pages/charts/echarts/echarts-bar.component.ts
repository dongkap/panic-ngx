import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-echarts-bar',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsBarComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.success, colors.info, colors.primaryLight],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
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
        yAxis: [
          {
            type: 'category',
            data: ['Bali'],
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: 'Score 1',
            type: 'bar',
            barWidth: '10%',
            data: [10, 52, 200, 334, 390, 330, 220],
          },
          {
            name: 'Score 2',
            type: 'bar',
            barWidth: '10%',
            data: [45, 10, 45, 90, 20, 80, 20],
          },
          {
            name: 'Score 3',
            type: 'bar',
            barWidth: '10%',
            data: [54, 44, 68, 56, 43, 77, 54],
          },
        ],
      };

      /*
      this.options = {
        backgroundColor: echarts.bg,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data: ['Fire'],
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
        yAxis: [
          {
            type: 'category',
            data: ['Bali'],
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: 'Fire',
            type: 'bar',
            barWidth: '10%',
            data: [0],
          },
          {
            name: 'Abduction',
            type: 'bar',
            barWidth: '10%',
            data: [0],
          },
          {
            name: 'Theft',
            type: 'bar',
            barWidth: '10%',
            data: [1],
          },
          {
            name: 'Hospital Emergency Room',
            type: 'bar',
            barWidth: '10%',
            data: [0],
          },
          {
            name: 'Unrest',
            type: 'bar',
            barWidth: '10%',
            data: [0],
          },
          {
            name: 'Sexual Harrassment',
            type: 'bar',
            barWidth: '10%',
            data: [0],
          },
          {
            name: 'Threat',
            type: 'bar',
            barWidth: '10%',
            data: [0],
          },
          {
            name: 'Bullying',
            type: 'bar',
            barWidth: '10%',
            data: [0],
          },
          {
            name: 'Others',
            type: 'bar',
            barWidth: '10%',
            data: [0],
          },
        ],
      }; */
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
