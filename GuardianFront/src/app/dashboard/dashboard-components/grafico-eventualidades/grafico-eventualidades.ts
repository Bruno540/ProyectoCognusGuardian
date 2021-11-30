import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { EstadisticasService } from 'src/app/services/estadisticas.service';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';

@Component({
  selector: 'app-grafico-eventualidades',
  templateUrl: './grafico-eventualidades.html',
  styleUrls: ['./grafico-eventualidades.css']
})
export class GraficoEventualidadesComponent implements OnInit {

  fechainicio?: string ="";
  fechafin?: string ="";


  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Cantidad eventualidades' ,lineTension: 0.1},
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any}) = {
    responsive: true,
    annotation: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
          display: true,
          ticks: {
              suggestedMin: 0,  
              beginAtZero: true,
              suggestedMax: 25,   // minimum value will be 0.
          }
      }],
      xAxes: [{
        position:'center'
    }],
      
  }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'blue'
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];


  constructor(private estadisticasService: EstadisticasService, private handleError: HandleErrorsService) {
    this.obtenerEstadisticas();
  }

  obtenerEstadisticas(){
    this.estadisticasService.obtenerCantidadEventualidades(this.fechainicio,this.fechafin).subscribe(data=>{
      this.lineChartData[0].data = [];
      this.lineChartLabels = [];
      data.forEach((element: any) => {
        this.lineChartLabels.push(element.month);
        this.lineChartData[0].data?.push(element.count);
      });
    },err=>{
      this.handleError.showErrors(err);
    });
  }

  ngOnInit(): void {
  }

}
