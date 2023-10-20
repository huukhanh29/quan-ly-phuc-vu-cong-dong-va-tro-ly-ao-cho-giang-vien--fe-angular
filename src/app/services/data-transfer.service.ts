import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  private dataSubject = new BehaviorSubject<any | null>(this.getDataFromStorage());
  currentData = this.dataSubject.asObservable();

  constructor() { }

  sendData(data: any) {
    this.saveDataToStorage(data);
    this.dataSubject.next(data);
  }

  private saveDataToStorage(data: any) {
    localStorage.setItem('lecturerData', JSON.stringify(data));
  }

  private getDataFromStorage(): any | null {
    const storedData = localStorage.getItem('lecturerData');
    return storedData ? JSON.parse(storedData) : null;
  }
}
