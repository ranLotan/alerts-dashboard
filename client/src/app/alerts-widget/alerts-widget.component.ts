import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlertsService } from '../_services/alerts.service';
import { IAlerts } from '../_interfaces/alerts';
import { Subject, Subscription, interval, takeUntil } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-alerts-widget',
  templateUrl: './alerts-widget.component.html',
  styleUrls: ['./alerts-widget.component.css']
})
export class AlertsWidgetComponent implements OnInit, OnDestroy{
  public alerts: IAlerts[] = [
    {
      "dismissed": false,
      "name": "Johns",
      "description": "reprehenderit do deserunt veniam consectetur do incididunt",
      "severity": 3,
      "date": "2017-03-01T03:06:42 -02:00",
      "source": "officia",
      "alertId": "e9febbf1-5ec8-4a2e-950f-f5559114d4b1"
    },
    {
      "dismissed": false,
      "name": "Whitley",
      "description": "cupidatat adipisicing enim proident et do commodo",
      "severity": 4,
      "date": "2016-08-09T05:37:26 -03:00",
      "source": "nostrud",
      "alertId": "f0c3458f-9ecf-47b4-b723-1cc332ba3e60"
    },
    {
      "dismissed": false,
      "name": "Lott",
      "description": "officia voluptate consectetur mollit consequat dolore sit",
      "severity": 6,
      "date": "2020-10-03T02:53:15 -03:00",
      "source": "nisi",
      "alertId": "fa578396-6b31-40e0-a2fb-535fc2090daf"
    },
    {
      "dismissed": false,
      "name": "Dianne",
      "description": "dolore incididunt esse cillum veniam deserunt consectetur",
      "severity": 2,
      "date": "2015-02-25T06:47:46 -02:00",
      "source": "elit",
      "alertId": "3dadcc3e-a3dc-461b-9d88-8a02f9f28b43"
    },
    {
      "dismissed": false,
      "name": "Barnes",
      "description": "cillum aliquip labore non cillum sunt aliquip",
      "severity": 9,
      "date": "2014-03-16T10:27:54 -02:00",
      "source": "proident",
      "alertId": "14ba060a-e377-49c5-bb47-08b939665693"
    },
    {
      "dismissed": false,
      "name": "Casey",
      "description": "proident sunt nostrud anim nulla velit deserunt",
      "severity": 10,
      "date": "2020-11-09T08:14:22 -02:00",
      "source": "id",
      "alertId": "296cf513-15e2-4065-9726-8ab594d20b3c"
    }
  ];
  public alert: any;

  public activeAlertsData: MatTableDataSource<IAlerts> = new MatTableDataSource<IAlerts>();
  public dissmisedAlertsData: MatTableDataSource<IAlerts> = new MatTableDataSource<IAlerts>();
  public displayedColumns = [ 'dismissed', 'name', 'description', 'date', 'severity', 'source', 'alertId' ];
  private getAlertsSubscription: Subscription | undefined; 
  private unsubscribe$ = new Subject(); 
  

  constructor(private alertsService: AlertsService ){ 
  }
  
  ngOnInit(): void {
    this.initUserData();
    this.getAlertsSubscription = interval(15000).pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
      console.log(`get next alert, number ${x}`);
      this.alertsService.getAlerts().subscribe({
        next: (alert) => { 
          alert.dismissed = false;
          alert.date = new Date(+alert.date).toISOString();
          this.addAlertToTable(this.activeAlertsData, [ alert ]);
          this.saveAlerts();
        },
        error: error => {
          alert(error.massage);
          console.log(error);
        }
      });
    });
  }  

  ngOnDestroy(): void {
    this.getAlertsSubscription?.unsubscribe();
    this.unsubscribe$.next('');
    this.unsubscribe$.complete();
  }

  public initUserData(){
    const userData = this.alertsService.getUserData();
    if (!userData){
      return;
    }
    const activeAlerts = userData.filter(alert => !alert.dismissed);
    const inactiveAlerts = userData.filter(alert => alert.dismissed);

    this.addAlertToTable(this.activeAlertsData, activeAlerts);
    this.addAlertToTable(this.dissmisedAlertsData, inactiveAlerts);
  }

  public saveAlerts(){
    this.alertsService.setUserData([...this.activeAlertsData.data, ...this.dissmisedAlertsData.data]);
  }
  public announceSortChange(event: any){
    console.log(event);
  }

  public changeAlertStatus($alert: IAlerts){
    console.log($alert);
    if ($alert.dismissed){
      this.addAlertToTable(this.dissmisedAlertsData, [ $alert ] );
    }
    else{
      this.addAlertToTable(this.activeAlertsData, [ $alert ]);
    }
    this.saveAlerts();
  }

  public addAlertToTable(tableData : MatTableDataSource<IAlerts>, alerts: IAlerts[]) {
    tableData.data = [...tableData.data, ...alerts];
  }
}

