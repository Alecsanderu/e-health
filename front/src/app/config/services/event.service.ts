import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EventService {
    
    constructor(private http: HttpClient) { }
    
    getEvents() {
        return this.http.get<any>('assets/data/scheduleevents.json')
                   .toPromise()
                   .then((res: any )=> <any[]>res.data)
                   .then((data: any) => { return data; });
    }
}
