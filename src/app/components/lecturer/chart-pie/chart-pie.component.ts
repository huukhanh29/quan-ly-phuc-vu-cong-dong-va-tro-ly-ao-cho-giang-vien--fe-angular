import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';

import { ChucDanhService } from './../../../services/chuc-danh.service';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.css'],
})
export class ChartPieComponent implements OnInit {
  title = 'ng2-charts-demo';
  totalHours: number = 0;
  missHours: number = 0;
  requiredHours: number = 0;
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  public pieChartLabels: string[] = [
    'Giờ chưa hoàn thành',
    'Giờ hoàn thành',
  ];

  public pieChartDatasets: { data: number[] }[] = [{ data: [0, 0] }]; // Initial data

  public pieChartLegend = true;
  public pieChartPlugins = [];
  academicYears: string[] = [];
  selectedYear: string;
  constructor(
    private chucDanhService: ChucDanhService,
    private taiKhoanService: TaiKhoanService
  ) {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    if (currentMonth >= 7) {
      this.selectedYear = `${currentYear - 1}-${currentYear}`;

    } else {
      this.selectedYear = `${currentYear}-${currentYear + 1}`;
    }
    console.log(this.selectedYear)
  }

  ngOnInit(): void {
    this.loadAcademicYears();
    this.loadChartData();
  }
  loadChartData() {
    this.chucDanhService.getChartData(this.selectedYear).subscribe((data) => {
      this.pieChartDatasets = [
        { data: [data.missHours, data.totalHours] },
      ];
      this.missHours = data.missHours;
      this.requiredHours = data.requiredHours;
      this.totalHours = data.totalHours;
    });
  }
  loadAcademicYears() {
    this.taiKhoanService.getAcademicYearsByUser().subscribe((data) => {
      this.academicYears = data;
      if (this.academicYears.indexOf(this.selectedYear) === -1) {
        this.academicYears.push(this.selectedYear);
        this.academicYears.sort((a, b) => a.localeCompare(b));
      }
    });
}

  onYearChange(): void {
    console.log(this.selectedYear);
    this.loadChartData();
  }
}
