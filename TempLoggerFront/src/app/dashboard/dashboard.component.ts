import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import * as $ from "jquery";
// Import API that communicates with database
import { ApiService } from '../api.service';
// Import interface to model data from the API
import { EnvironmentData } from '../../environmentData';
// Import API that communicates with auth service
import { ApiUsers } from '../api.users';


var MONTHLY_CAP = 16;
var WEEKLY_CAP = 10;
var DAILY_CAP = 5;

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
  constructor(private api: ApiService, private api_users: ApiUsers) {}

  /* Create storage for the responce of GET requests */
  /* Variables to stor the results of API calls */
  serialNumbers1: number[] = [];
  temperatures1: number[] = [];
  humidities1: number[] = [];
  timestamps1: number[] = [];

  /* Define method to get data from the database via the API */
  getAllData() {
    /* Reset entries */
    this.timestamps1 = [];
    this.temperatures1 = [];
    this.humidities1 = [];
    this.serialNumbers1 = [];

    console.log("Dashboard token:" + this.api_users.get_bearer_token());

    /* Make API call */
    this.api.getAllData(this.api_users.get_bearer_token())
    .subscribe(data => {
      for (const entry of (data as EnvironmentData[])) {
        this.timestamps1.push(entry.time);
        this.temperatures1.push(entry.temperature);
        this.humidities1.push(entry.humidity);
        this.serialNumbers1.push(entry.serialNumber);
      }
    });
  }

  /* Define method to get data from the database via the API */
  getEntries(N) {
    /* Reset entries */
    this.timestamps1 = [];
    this.temperatures1 = [];
    this.humidities1 = [];
    this.serialNumbers1 = [];

    /* Make API call */
    this.api.getEntries(N, this.api_users.get_bearer_token())
    .subscribe(data => {
      for (const entry of (data as EnvironmentData[])) {
        this.timestamps1.push(entry.time);
        this.temperatures1.push(entry.temperature);
        this.humidities1.push(entry.humidity);
        this.serialNumbers1.push(entry.serialNumber);
      }
    });
  }

  /* Define method to get data from the local storage via the API */
  getLocalData() {
    this.api.getLocalData()
      .subscribe(data => {
        for (const entry of (data as EnvironmentData[])) {
          this.temperatures1.push(entry.temperature);
          this.humidities1.push(entry.humidity);
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
  ngLoadTimestampGraph(dataOy) {
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
            data: dataOy//[80, 99, 86, 96, 123, 85, 100, 75, 88, 90, 123, 155]
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

  // /* NOTE: REFACTO THIS BS CODE */
  // displayMonth() {
  //   let n = this.temperatures.length;
  //   this.temperatures = this.temperatures.slice(n - 10, n);
  //   this.timestamps = this.timestamps.slice(n - 10, n);
  // }

  onTempChange(value:string) {
    /* Initialize default entries and reset temperature and timestamps */
    var N = 0;
    var graph_temperatures = [];
    var temperature_timestamps = [];

    /* COmpute how many entries required */
    if (value == "Last Month")
      N = MONTHLY_CAP;
    if (value == "Last Week")
      N = WEEKLY_CAP;
    if (value == "Today")
      N = DAILY_CAP;
    
    /* Make API call */
    if (N != 0)
      this.getEntries(N);
    else
      this.getAllData();

    /* Store data in local variables */
    graph_temperatures = this.temperatures1;
    temperature_timestamps = this.timestamps1;

    /* Redraw graph */
    this.ngLoadTempGraph(graph_temperatures, temperature_timestamps);

  }

  onHumChange(value:string) {
      /* Initialize default entries and reset temperature and timestamps */
      var N = 0;
      var graph_humidity = [];
      var humidity_timestamps = [];

      /* COmpute how many entries required */
      if (value == "Last Month")
        N = MONTHLY_CAP;
      if (value == "Last Week")
        N = WEEKLY_CAP;
      if (value == "Today")
        N = DAILY_CAP;
      
      /* Make API call */
      if (N != 0)
        this.getEntries(N);
      else
        this.getAllData();
  
      /* Store data in local variables */
      graph_humidity = this.humidities1;
      humidity_timestamps = this.timestamps1;

      /* Redraw graph */
      this.ngLoadHumGraph(humidity_timestamps, graph_humidity);
  }

  ngOnInit() {
    /* Initialize variables */
    /* Variables to draw dashboard graph */
    var dashboard_temperatures = [];
    var dashboard_humidities = [];

    /* Variables to draw temperature graph */
    var graph_temperatures = [];
    var temperature_timestamps = [];

    /* Variables to draw humidity graph */
    var graph_humidity = [];
    var humidity_timestamps = [];


    /* Try get data fot the initial tables */
    this.getAllData();

    /* Save the dashboard data */
    dashboard_temperatures = this.temperatures1;
    dashboard_humidities = this.humidities1;

    /* Save the temperature graph data */
    graph_temperatures = this.temperatures1;
    temperature_timestamps = this.timestamps1;

    /* Save the hunidity graph data */
    graph_humidity = this.humidities1;
    humidity_timestamps = this.timestamps1;

    /* Set generic graph options */
    this.ngSetGenericGraphOptions();

    /* Load dashboard graph */
    this.ngLoadDashboardGraph(dashboard_temperatures, dashboard_humidities);

    /*Load temperature (left) graph */
    this.ngLoadTempGraph(graph_temperatures, temperature_timestamps);

    /* Load Humidity (middle) graph */
    this.ngLoadHumGraph(humidity_timestamps, graph_humidity);

    /* Load right graph */
    this.ngLoadTimestampGraph([80, 99, 86, 96, 123, 85, 100, 75, 88, 90, 123, 155]);
  }

}
