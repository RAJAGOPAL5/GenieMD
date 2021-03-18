import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
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
      dob: {
        title: 'DOB',
        filter: false
      },
      email: {
        title: 'Monitors',
        filter: false,
        type: 'html',
        valuePrepareFunction: (value) => {
          return '<a href="">View Notes</a>';
        }

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
      dob: '02-12-1989',
      email: 'Sincere@april.biz',
      careManager: 'Minetta Costa',
      contact: '<nb-icon icon="close-outline"></nb-icon>'
    },
    {
      id: 2,
      name: 'Ervin Howell',
      dob: '02-12-1989',
      email: 'Shanna@melissa.tv',
      careManager: 'Minetta Costa',
      contact: '<nb-icon icon="close-outline"></nb-icon>'
    },
    {
      id: 11,
      name: 'Nicholas DuBuque',
      dob: '02-12-1989',
      email: 'Rey.Padberg@rosamond.biz',
      careManager: 'Minetta Costa',
      contact: '<nb-icon icon="close-outline"></nb-icon>'
    },
    {
      id: 12,
      name: 'Nicholas DuBuque',
      dob: '02-12-1989',
      email: 'Rey.Padberg@rosamond.biz',
      careManager: 'Minetta Costa',
      contact: '<nb-icon icon="close-outline"></nb-icon>'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }
  open(id) {
    console.log('idd', id);
  }
  onCustomAction(event) {
    console.log('event', event);
  }
}
