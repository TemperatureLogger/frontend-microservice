import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import * as $ from "jquery";
// Import API that communicates with database
import { ApiService } from '../api.service';

// Import the prototype for environmental data
import { EnvironmentData } from '../../environmentData';
//import { timeStamp } from 'console';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public lineBigDashboardChartType;
  public gradientStroke;
  public chartColor;
  public canvas : any;
  public ctx;
  public gradientFill;
  public lineBigDashboardChartData:Array<any>;
  public lineBigDashboardChartOptions:any;
  public lineBigDashboardChartLabels:Array<any>;
  public lineBigDashboardChartColors:Array<any>

  public gradientChartOptionsConfiguration: any;
  public gradientChartOptionsConfigurationWithNumbersAndGrid: any;

  public lineChartType;
  public lineChartData:Array<any>;
  public lineChartOptions:any;
  public lineChartLabels:Array<any>;
  public lineChartColors:Array<any>

  public lineChartWithNumbersAndGridType;
  public lineChartWithNumbersAndGridData:Array<any>;
  public lineChartWithNumbersAndGridOptions:any;
  public lineChartWithNumbersAndGridLabels:Array<any>;
  public lineChartWithNumbersAndGridColors:Array<any>

  public lineChartGradientsNumbersType;
  public lineChartGradientsNumbersData:Array<any>;
  public lineChartGradientsNumbersOptions:any;
  public lineChartGradientsNumbersLabels:Array<any>;
  public lineChartGradientsNumbersColors:Array<any>
  
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  public hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }

  /* Create variable to reffer API */
  constructor(private api: ApiService) {}

  /* Create storage for the responce of GET requests */
  temperature: number[] = [];
  humidity: number[] = [];
  temperatures: number[] = [38.71, 26.5, 1.45, 3.76, 41.3, 17.42, 14.77, 21.85, 29.06, 27.84, 35.95, 29.11, 24.74, 47.06, 6.17, 21.03, 36.69, 38.71, 8.48, 7.78];
  humidities: number[] = [95.58, 69.98, 87.62, 29.8, 87.83, 36.84, 84.86, 82.74, 58.31, 40.0, 52.11, 89.08, 35.1, 59.02, 80.34, 97.4, 58.9, 20.87, 88.44, 95.28];  
  timestamps : number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 , 20, 21]
  tstamps : number[] = this.timestamps;
  humTstamps : number[] = this.timestamps;
  /* Define method to get data from the database via the API */
  getAllData() {
    this.api.getAllData()
    .subscribe(data => {
      for (const entry of (data as EnvironmentData[])) {
        // console.log(entry.id);
        this.temperature.push(entry.temperature);
        this.humidity.push(entry.humidity);
      }
    });
  }

  /* Define method to get data from the local storage via the API */
  getLocalData() {
    this.api.getLocalData()
      .subscribe(data => {
        for (const entry of (data as EnvironmentData[])) {
          // console.log(entry.id);
          this.temperature.push(entry.temperature);
          this.humidity.push(entry.humidity);
        }
      });
  }

  /* Make default configurations for a graph */
  ngSetGenericGraphOptions() {
    this.gradientChartOptionsConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: 1,
      scales: {
        yAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };
  }

  /* Load the template from the bar graph */
  ngLoad_Graph() {
  /* Third graph. */
      /* TODO: decide which data gets represented here */
      this.canvas = document.getElementById("barChartSimpleGradientsNumbers");
      this.ctx = this.canvas.getContext("2d");

      this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
      this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
      this.gradientFill.addColorStop(1, this.hexToRGB('#2CA8FF', 0.6));


      this.lineChartGradientsNumbersData = [
          {
            label: "Active Countries",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            fill: true,
            borderWidth: 1,
            data: [80, 99, 86, 96, 123, 85, 100, 75, 88, 90, 123, 155]
          }
        ];
      this.lineChartGradientsNumbersColors = [
      {
        backgroundColor: this.gradientFill,
        borderColor: "#2CA8FF",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#2CA8FF",
      }
    ];
      this.lineChartGradientsNumbersLabels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      this.lineChartGradientsNumbersOptions = {
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          tooltips: {
            bodySpacing: 4,
            mode: "nearest",
            intersect: 0,
            position: "nearest",
            xPadding: 10,
            yPadding: 10,
            caretPadding: 10
          },
          responsive: 1,
          scales: {
            yAxes: [{
              gridLines: {
                zeroLineColor: "transparent",
                drawBorder: false
              },
              ticks: {
                  stepSize: 20
              }
            }],
            xAxes: [{
              display: 0,
              ticks: {
                display: false
              },
              gridLines: {
                zeroLineColor: "transparent",
                drawTicks: false,
                display: false,
                drawBorder: false
              }
            }]
          },
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 15,
              bottom: 15
            }
          }
        }

      this.lineChartGradientsNumbersType = 'bar';
  }

  /* Load the template for the hummidity graph */
  ngLoadHumGraph(dataOx, dataOy) {
    /* Make configurations */
    this.gradientChartOptionsConfigurationWithNumbersAndGrid = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: true,
      scales: {
        yAxes: [{
          gridLines: {
            zeroLineColor: "transparent",
            drawBorder: false
          },
          ticks: {
              stepSize: 10
          }
        }],
        xAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

    /* Still doing condigurations */
    this.canvas = document.getElementById("lineChartExampleWithNumbersAndGrid");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#18ce0f');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, this.hexToRGB('#18ce0f', 0.4));

    /* Graph responsible for Humidity */
    this.lineChartWithNumbersAndGridData = [
      {
        label: "Humidity",
        pointBorderWidth: 2,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 1,
        pointRadius: 4,
        fill: true,
        borderWidth: 2,
        data: dataOy
      }
    ];
    this.lineChartWithNumbersAndGridColors = [
    {
      borderColor: "#18ce0f",
      pointBorderColor: "#FFF",
      pointBackgroundColor: "#18ce0f",
      backgroundColor: this.gradientFill
    }
    ];
    /* TODO add timestamp here */
    this.lineChartWithNumbersAndGridLabels = dataOx
    this.lineChartWithNumbersAndGridOptions = this.gradientChartOptionsConfigurationWithNumbersAndGrid;

    this.lineChartWithNumbersAndGridType = 'line';
  }

  /* Load the template for the temperature graph */
  ngLoadTempGraph(dataOx, dataOy) {
    /* Graph responsible for Ilustrating Temperature */
    this.canvas = document.getElementById("lineChartExample");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#80b6f4');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");

    this.lineChartData = [
        {
          label: "Temperature",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          borderWidth: 2,
          data: dataOy
        }
      ];
      this.lineChartColors = [
      {
        borderColor: "#f96332",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#f96332",
        backgroundColor: this.gradientFill
      }
    ];
    this.lineChartLabels = dataOx//["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.lineChartOptions = this.gradientChartOptionsConfiguration;

    this.lineChartType = 'line';
  }

  /* Load dashboard graph */
  ngLoadDashboardGraph(dataOx, dataOy) {
    this.chartColor = "#FFFFFF";
    this.canvas = document.getElementById("bigDashboardChart");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#80b6f4');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 200, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");

    this.lineBigDashboardChartData = [
        {
          label: "Data",

          pointBorderWidth: 1,
          pointHoverRadius: 7,
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          fill: true,
          borderWidth: 2,
          /* OX for Dashboard graph */
          data: dataOx
        }
      ];
      this.lineBigDashboardChartColors = [
       {
         backgroundColor: this.gradientFill,
         borderColor: this.chartColor,
         pointBorderColor: this.chartColor,
         pointBackgroundColor: "#2c2c2c",
         pointHoverBackgroundColor: "#2c2c2c",
         pointHoverBorderColor: this.chartColor,
       }
     ];
    /* OY data for graph */
    this.lineBigDashboardChartLabels = dataOy;
    this.lineBigDashboardChartOptions = {

          layout: {
              padding: {
                  left: 20,
                  right: 20,
                  top: 0,
                  bottom: 0
              }
          },
          maintainAspectRatio: false,
          tooltips: {
            backgroundColor: '#fff',
            titleFontColor: '#333',
            bodyFontColor: '#666',
            bodySpacing: 4,
            xPadding: 12,
            mode: "nearest",
            intersect: 0,
            position: "nearest"
          },
          legend: {
              position: "bottom",
              fillStyle: "#FFF",
              display: false
          },
          scales: {
              yAxes: [{
                  ticks: {
                      fontColor: "rgba(255,255,255,0.4)",
                      fontStyle: "bold",
                      beginAtZero: true,
                      maxTicksLimit: 5,
                      padding: 10
                  },
                  gridLines: {
                      drawTicks: true,
                      drawBorder: false,
                      display: true,
                      color: "rgba(255,255,255,0.1)",
                      zeroLineColor: "transparent"
                  }

              }],
              xAxes: [{
                  gridLines: {
                      zeroLineColor: "transparent",
                      display: false,

                  },
                  ticks: {
                      padding: 10,
                      fontColor: "rgba(255,255,255,0.4)",
                      fontStyle: "bold"
                  }
              }]
          }
    };
    this.lineBigDashboardChartType = 'line';
  }

  displayMonth() {
    let n = this.temperatures.length;
    this.temperatures = this.temperatures.slice(n - 10, n);
    this.timestamps = this.timestamps.slice(n - 10, n);
  }

  onTempChange(value:string) {
    let n = this.temperatures.length;
    let m = this.timestamps.length;
    if (value == "Last Month") {
      this.temperature = this.temperatures.slice(n - 10, n);
      this.tstamps = this.timestamps.slice(m - 10, m);
      this.ngLoadTempGraph(this.tstamps, this.temperature);
    } else if (value == "Last Week") {
      this.temperature = this.temperatures.slice(n - 4, n);
      this.tstamps = this.timestamps.slice(m - 4, m);
      this.ngLoadTempGraph(this.tstamps, this.temperature);
    } else if (value == "Today") {
      this.temperature = this.temperatures.slice(n - 2, n);
      this.tstamps = this.timestamps.slice(m - 2, m);
      this.ngLoadTempGraph(this.tstamps, this.temperature);
    } 
    else {
      this.temperature = this.temperatures;
      this.tstamps = this.timestamps;
      this.ngLoadTempGraph(this.tstamps, this.temperature);
  }}

  onHumChange(value:string) {
    let n = this.humidities.length;
    let m = this.timestamps.length;
    if (value == "Last Month") {
      this.humidity = this.humidities.slice(n - 10, n);
      this.humTstamps = this.timestamps.slice(m - 10, m);
      this.ngLoadHumGraph(this.humTstamps, this.humidity);
    } else if (value == "Last Week") {
      this.humidity = this.humidities.slice(n - 4, n);
      this.humTstamps = this.timestamps.slice(m - 4, m);
      this.ngLoadHumGraph(this.humTstamps, this.humidity);
    } else if (value == "Today") {
      this.humidity = this.humidities.slice(n - 2, n);
      this.humTstamps = this.timestamps.slice(m - 2, m);
      this.ngLoadHumGraph(this.humTstamps, this.humidity);
    } 
    else {
      this.humidity = this.humidities;
      this.humTstamps = this.timestamps;
      this.ngLoadHumGraph(this.humTstamps, this.humidity);
  }}

  ngOnInit() {

    /* Try get data for the dashboard table */
    this.temperature = this.temperatures
    console.log("Getting data...");
    this.getLocalData();
    // this.getAllData();
    console.log("Got data.");

    /* Set generic graph options */
    this.ngSetGenericGraphOptions();

    /* Load dashboard graph */
    this.ngLoadDashboardGraph(this.temperature, this.humidity);

    /*Load temperature (left) graph */
    this.ngLoadTempGraph(this.tstamps, this.temperature);

    /* Load Humidity (middle) graph */
    this.ngLoadHumGraph(this.humTstamps, this.humidities);

    /* Load left graph */
    this.ngLoad_Graph();
  }
  

}
