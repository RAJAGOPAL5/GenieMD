import { Component, ElementRef, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';

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
      conditions: {
        title: 'Conditions',
        filter: false
      },

      blood: {
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
      name: 'Adams Graham',
      conditions: 'High Blood Pressure',
      blood: '110/72',
      careManager: 'Minetta Costa',
      contact: '<nb-icon icon="close-outline"></nb-icon>',
      oximetry: '--',
      lastChecked: '21 days ago',
      minutesMonth: '00:00',
      weight: '190.6 lbs',
      glucose: '102 mgdl(A)'
    },
    {
      id: 2,
      name: 'Ervin Howell',
      conditions: 'High Obesity',
      blood: '143/80',
      careManager: 'Minetta Costa',
      contact: '<nb-icon icon="close-outline"></nb-icon>',
      oximetry: '--',
      lastChecked: '13 days ago',
      minutesMonth: '00:00',
      weight: '140.9 lbs',
      glucose: '--'
    },
    {
      id: 11,
      name: 'Brooks DuBuque',
      conditions: 'Low sugar level',
      blood: '128/95',
      careManager: 'Minetta Costa',
      contact: '<nb-icon icon="close-outline"></nb-icon>',
      oximetry: '--',
      lastChecked: '21 days ago',
      minutesMonth: '00:00',
      weight: '180.8 lbs',
      glucose: '81 mgdl(A)'
    },
    {
      id: 12,
      name: 'Nicholas DuBuque',
      conditions: 'High Blood pressure',
      blood: '130/30',
      careManager: 'Minetta Costa',
      contact: '<nb-icon icon="close-outline"></nb-icon>',
      oximetry: '--',
      lastChecked: '10 days ago',
      minutesMonth: '00:00',
      weight: '159.8 lbs',
      glucose: '--'
    }
  ];
  ColumnMode = ColumnMode;
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  readonly pageLimit = 10;
  isLoading = false;
  pageNumber = 1;


  constructor(
    private el: ElementRef,
  ) { }

  ngOnInit(): void {
  }

  onScroll(offsetY: number) {
    // total height of all rows in the viewport
    const viewHeight = this.el.nativeElement.getBoundingClientRect().height - this.headerHeight;

    // check if we scrolled to the end of the viewport
    if (!this.isLoading && offsetY + viewHeight >= this.data.length * this.rowHeight) {
      // total number of results to load
      let limit = this.pageLimit;

      // check if we haven't fetched any results yet
      if (this.data.length === 0) {
        // calculate the number of rows that fit within viewport
        const pageSize = Math.ceil(viewHeight / this.rowHeight);

        // change the limit to pageSize such that we fill the first page entirely
        // (otherwise, we won't be able to scroll past it)
        limit = Math.max(pageSize, this.pageLimit);
      }
      console.log('limit', limit);
      this.pageNumber = limit;
    }
  }

  getRowHeight(row) {
    return row.height;
  }
}
