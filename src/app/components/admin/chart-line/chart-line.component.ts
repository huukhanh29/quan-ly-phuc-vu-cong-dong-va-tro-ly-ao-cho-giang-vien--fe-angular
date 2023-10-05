import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { LichSuService } from 'src/app/services/lich-su.service';

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.css']
})
export class ChartLineComponent implements OnInit{
  public lineChartData!: ChartConfiguration<'line'>['data'];
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };
  public lineChartLegend = true;
  public years!: number[];
  public selectedYear!: number;

  constructor(private lichSuService: LichSuService) { }

  ngOnInit(): void {
    this.lichSuService.getDistinctYears().subscribe(years => {
      this.years = years;
      this.selectedYear = this.years[0];
      this.updateChart(this.selectedYear);
    });
  }

  updateChart(year: number): void {
    this.lichSuService.getChartData(year).subscribe(data => {
      this.lineChartData = {
        labels: data.labels,
        datasets: [{
          data: data.data,
          label: 'hihi',


        }]
      };
    });
  }

  onYearChange(year: number): void {
    this.updateChart(year);
  }
}
