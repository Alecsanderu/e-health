import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ChartModule } from 'primeng/chart';
import { TabViewModule } from 'primeng/tabview';
import { ComboChartComponent } from './page/components/combo-chart/combo-chart.component';
import { DoughChartComponent } from './page/components/doughnut-chart/dough-chart.component';
import { CardModule } from 'primeng/card';
import { SharedModule } from '../shared/shared.module';
import { RadarChartComponent } from './page/components/radar-chart/radar-chart.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ComboChartComponent,
    DoughChartComponent,
    RadarChartComponent
  ],
              imports: [
                  CommonModule,
                  DashboardRoutingModule,
                  ChartModule,
                  TabViewModule,
                  CardModule,
                  SharedModule
              ]
          })
export class DashboardModule { }
