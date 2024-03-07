import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IAlerts } from '../_interfaces/alerts';
import { MatSort } from '@angular/material/sort'; 
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-alerts-table',
  templateUrl: './alerts-table.component.html',
  styleUrls: ['./alerts-table.component.css']
})
export class AlertsTableComponent {

  public alert: any;

  @ViewChild(MatSort) sort!: MatSort;
  @Input() title: string = 'Alerts Table';
  @Input() tableData!: MatTableDataSource<IAlerts>;
  @Input() displayedColumns!: string[];
  @Output() sendAlert: EventEmitter<IAlerts> = new EventEmitter<IAlerts>();

  constructor(){}

  ngAfterViewInit() {
    this.tableData.sort = this.sort;
  }

  public getColorBySeverity(severity: number){
    // Calculate normalized value (0-1) for interpolation
    const normalizedValue = Math.max(0, Math.min(1, (severity - 1) / 9));
    // Use linear interpolation between green and red
    const green = Math.floor(255 * normalizedValue);
    const red = 255 - green;
    return `rgb(${green}, ${red}, 0, 0.7)`; // Green to red color spectrum
  }

  public toggleAlertStatus(alert: IAlerts){
    alert.dismissed = !alert.dismissed;
    const alertIndex = this.tableData.data.indexOf(alert);
    if (alertIndex == -1){
      return;
    } 

    this.tableData.data.splice(alertIndex, 1);
    this.tableData.data = [...this.tableData.data];
    this.sendAlert.emit(alert);
  }
}
