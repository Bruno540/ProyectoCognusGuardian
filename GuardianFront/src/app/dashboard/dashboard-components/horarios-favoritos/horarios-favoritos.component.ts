import { Component, OnInit } from "@angular/core";
import { EstadisticasService } from "src/app/services/estadisticas.service";
import { HandleErrorsService } from "src/app/services/handle.errors.service";

@Component({
  selector: "app-horarios-favoritos",
  templateUrl: "./horarios-favoritos.component.html",
  styleUrls: ["./horarios-favoritos.component.css"],
})
export class HorariosFavoritosComponent implements OnInit {
  constructor(
    private estadisticasService: EstadisticasService,
    private handleError: HandleErrorsService
  ) {}

  public lineChartData: Array<any> = [];

  fechainicio?: string = "";
  fechafin?: string = "";

  ngOnInit(): void {
    this.obtenerEstadisticas();
  }

  obtenerEstadisticas() {
    this.estadisticasService
      .obtenerHorariosFavoritos(this.fechainicio, this.fechafin)
      .subscribe(
        (data1) => {
          this.lineChartData = [
            {
              data: data1,
            },
          ];
          this.lineChartLabels = [];
          for (const bar of data1) {
            this.lineChartLabels.push(bar.x);
          }
        },
        (err) => {
          this.handleError.showErrors(err);
        }
      );
  }

  public lineChartLabels: Array<string> = [];
  public lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            suggestedMin: 0,
            callback: function (value: any, index: any, values: any) {
              return value + "%";
            },
            beginAtZero: true,
            suggestedMax: 100,
          },
        },
      ],
      xAxes: [
        {
          display: true,
          ticks: {
            callback: function (value: any, index: any, values: any) {
              return value + " hs";
            },
          },
        },
      ],
    },
  };
  public lineChartColors: Array<Object> = [
    {
      // grey
      backgroundColor: "rgba(41, 98, 255,0.1)",
      borderColor: "#2962FF",
      pointBackgroundColor: "#2962FF",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "#2962FF",
    },
    {
      // dark grey
      backgroundColor: "rgba(116, 96, 238,0.1)",
      borderColor: "#7460ee",
      pointBackgroundColor: "#7460ee",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "#7460ee",
    },
  ];
  public lineChartLegend = false;
  public lineChartType = "bar";
}
