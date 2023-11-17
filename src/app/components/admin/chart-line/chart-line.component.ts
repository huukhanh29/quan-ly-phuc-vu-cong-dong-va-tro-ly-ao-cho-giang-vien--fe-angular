
import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { LichSuService } from 'src/app/services/lich-su.service';

@Component({
  selector: 'app-chart-line',
  templateUrl: './chart-line.component.html',
  styleUrls: ['./chart-line.component.css']
})
export class ChartLineComponent implements OnInit {
  public lineChartData!: ChartConfiguration<'line'>['data'];
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        type: 'linear', // Sử dụng trục x kiểu số
        position: 'bottom', // Hiển thị ở dưới biểu đồ
        ticks: {
          stepSize: 1, // Đặt khoảng giữa các giá trị là 1 để hiển thị từ 1 đến 12
        },
      },
    },
  };
  public lineChartLegend = true;
  public years!: any[];
  public selectedYear: any;

  constructor(private lichSuService: LichSuService) {}

  ngOnInit(): void {
    this.lichSuService.getDistinctYears().subscribe({
      next: (years) => {
        this.years = years;
        this.selectedYear = this.years[0];
        if (this.selectedYear === undefined) {
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear();
          const yearAsString = `${currentYear}`;
          this.updateChart(yearAsString);
        } else {
          this.updateChart(this.selectedYear);
        }
      },
      error: (err) => {},
    });
  }

  updateChart(year: string): void {
    this.lichSuService.getChartData(year).subscribe((data) => {
      this.lineChartData = {
        labels: Array.from({ length: 12 }, (_, i) => i + 1), // Sử dụng mảng từ 1 đến 12 làm nhãn trục x
        datasets: [
          {
            data: data.data,
            label: 'Lượt hỏi',
          },
        ],
      };
    });
  }

  onYearChange(year: any): void {
    this.updateChart(year);
  }
}
