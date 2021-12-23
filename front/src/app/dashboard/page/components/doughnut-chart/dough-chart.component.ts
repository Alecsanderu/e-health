import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-dough-chart',
  templateUrl: './dough-chart.component.html',
  styleUrls: [ './dough-chart.component.scss']
})
export class DoughChartComponent implements OnInit {
    
    
    data: any;
    
    chartOptions: any;
    
    constructor() {}
    
    ngOnInit() {
        this.data = {
            labels: ['Materiale Cumparate','Materiale Folosite','Stoc'],
            datasets: [
                {
                    data: [100, 60, 40],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }
            ]
        };
    }
   

}
