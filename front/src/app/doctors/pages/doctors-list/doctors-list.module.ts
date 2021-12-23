import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { OrderListModule } from 'primeng/orderlist';
import { TableModule } from 'primeng/table';
import { EventService } from '../../../config/services/event.service';
import { SharedModule } from '../../../shared/shared.module';
import { DoctorCreateFormComponent } from './components/doctor-create-form/doctor-create-form.component';
import { DoctorCreateModalComponent } from './components/doctor-create-modal/doctor-create-modal.component';
import { DoctorScheduleComponent } from './components/doctor-schedule/doctor-schedule.component';
import { DoctorsTableComponent } from './components/doctors-table/doctors-table.component';
import { DoctorsListPageComponent } from './doctors-list-page/doctors-list-page.component';
import { DoctorsListRoutingModule } from './doctors-list-routing.module';


FullCalendarModule.registerPlugins( [
                                        dayGridPlugin,
                                        timeGridPlugin,
                                        interactionPlugin,
                                    ] );

@NgModule( {
               declarations: [
                   DoctorsListPageComponent,
                   DoctorsTableComponent,
                   DoctorScheduleComponent,
                   DoctorCreateFormComponent,
                   DoctorCreateModalComponent,
               ],
               providers   : [
                   DialogService,
                   EventService,
               ],
               imports: [
                   CommonModule,
                   DoctorsListRoutingModule,
                   SharedModule,
                   DataViewModule,
                   InputTextModule,
                   ButtonModule,
                   TableModule,
                   OrderListModule,
                   FullCalendarModule,
                   FullCalendarModule,
                   ReactiveFormsModule,
               ],
           } )
export class DoctorsListModule {
}
