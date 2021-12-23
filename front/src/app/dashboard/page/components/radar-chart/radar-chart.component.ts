import { Component, OnInit } from '@angular/core';


@Component( {
                selector   : 'app-radar-chart',
                templateUrl: './radar-chart.component.html',
                styleUrls  : [ './radar-chart.component.scss' ]
            } )
export class RadarChartComponent implements OnInit {
    
    
    data: any;
    
    chartOptions: any;
    
    constructor() {
    }
    
    ngOnInit() {
        this.data = {
            labels  : [ 'Anevrism', 'Anorexie', 'Bâlbâială', 'Boala Parkinson' ],
            datasets: [
                {
                    label                    : 'Batrani',
                    backgroundColor          : 'rgba(179,181,198,0.2)',
                    borderColor              : 'rgba(179,181,198,1)',
                    pointBackgroundColor     : 'rgba(179,181,198,1)',
                    pointBorderColor         : '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor    : 'rgba(179,181,198,1)',
                    data                     : [ 65, 59, 90, 81 ]
                },
                {
                    label                    : 'Copii',
                    backgroundColor          : 'rgba(255,99,132,0.2)',
                    borderColor              : 'rgba(255,99,132,1)',
                    pointBackgroundColor     : 'rgba(255,99,132,1)',
                    pointBorderColor         : '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor    : 'rgba(255,99,132,1)',
                    data                     : [ 11, 48, 40, 0 ]
                },
                {
                    label                    : 'Adulti',
                    backgroundColor          : 'rgb(136, 241, 136)',
                    borderColor              : 'rgb(20, 86, 20)',
                    pointBackgroundColor     : 'rgb(20, 25, 20)',
                    pointBorderColor         : '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor    : 'rgba(255,99,132,1)',
                    data                     : [ 45, 23, 23, 15 ]
                }
            ]
        };
        
        
    }
}
