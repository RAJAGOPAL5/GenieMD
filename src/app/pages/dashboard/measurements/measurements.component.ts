import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: ['./measurements.component.scss']
})
export class MeasurementsComponent implements OnInit {
  settings = {
    actions: false,
    search: false,
    edit: {
      editButtonContent: '<i class="nb-compose"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    columns: {
      name: {
        title: 'Name',
        filter: false
      },
      username: {
        title: 'Conditions',
        filter: false
      },

      email: {
        title: 'Blood Pressure',
        filter: false,
      },
      weight: {
        title: 'Weight',
        filter: false
      },
      glucose: {
        title: 'Blood Glucose',
        filter: false,
      },
      pulse: {
        title: 'Pulse Oximetry',
        filter: false
      }, lastChecked: {
        title: 'Last Checked',
        filter: false
      },
      minutesMonth: {
        title: 'Minutes This Month',
        filter: false
      },
      careManager: {
        title: 'Assigned Care Manager',
        filter: false
      },
      id: {
        title: 'Contact',
        filter: false,
        type: 'html',
        valuePrepareFunction: (value) => {
          // tslint:disable-next-line:max-line-length
          return '<i class="fas fa-phone text-primary"></i> <i class="far fa-comment-dots text-primary"></i> <i class="fas fa-video text-primary"></i>';
        }
      }
    }
  };
  data = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      careManager: 'Minetta Costa',
      contact: '<nb-icon icon="close-outline"></nb-icon>',
      pulse: '--',
      lastChecked: '21 days ago',
      minutesMonth: '00.00',
      weight: '159.8 lbs',
      measurement: 2,
      glucose: '102mgdl(A)'
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
      careManager: 'Minetta Costa',
      contact: '<nb-icon icon="close-outline"></nb-icon>',
      pulse: '--',
      lastChecked: '21 days ago',
      minutesMonth: '00.00',
      weight: '159.8 lbs',
      measurement: 2,
      glucose: '102mgdl(A)'

    },
    {
      id: 11,
      name: 'Nicholas DuBuque',
      username: 'Nicholas.Stanton',
      email: 'Rey.Padberg@rosamond.biz',
      careManager: 'Minetta Costa',
      contact: '<nb-icon icon="close-outline"></nb-icon>',
      pulse: '--',
      lastChecked: '21 days ago',
      minutesMonth: '00.00',
      weight: '159.8 lbs',
      measurement: 2,
      glucose: '102mgdl(A)'

    },
    {
      id: 12,
      name: 'Nicholas DuBuque',
      username: 'Nicholas.Stanton',
      email: 'Rey.Padberg@rosamond.biz',
      careManager: 'Minetta Costa',
      contact: '<nb-icon icon="close-outline"></nb-icon>',
      pulse: '--',
      lastChecked: '21 days ago',
      minutesMonth: '00.00',
      weight: '159.8 lbs',
      measurement: 2,
      glucose: '102mgdl(A)'

    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
