import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-combo-chart',
  templateUrl: './combo-chart.component.html',
  styleUrls: ['./combo-chart.component.scss']
})
export class ComboChartComponent implements OnInit {
    
    
    data: any;
    
    chartOptions: any;
    
    constructor() {}
    
    ngOnInit() {
        this.data = {
            labels: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'],
            datasets: [{
                type: 'line',
                label: 'Personal',
                borderColor: '#42A5F5',
                borderWidth: 2,
                fill: false,
                data: [ 50, 25, 12, 48, 56, 76, 12, 54, 42, 26, 15, 13 ]
            }, {
                type: 'bar',
                label: 'Pacienti Internati',
                backgroundColor: '#F59E0B',
                data: [ 21, 84, 24, 75, 37, 65, 34, 15, 12, 56, 23, 52,
                ],
                borderColor: 'white',
                borderWidth: 2
            }, {
                type: 'bar',
                label: 'Pacieti Externati',
                backgroundColor: '#22C55E',
                data: [ 41, 52, 24, 74, 23, 21, 41, 24, 74, 23, 21, 25 ]
            },
                {
                    type: 'bar',
                    label: 'Pacieti Decedati',
                    backgroundColor: '#EF4444',
                    data: [ 1, 2, 15, 4, 2, 2, 3, 10, 1, 1, 13, 11 ]
                }]
        };
        
        this.chartOptions =  {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };
    }
   

}
