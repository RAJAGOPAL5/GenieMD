import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  menus: NbMenuItem[] = [
    {
      title: 'Patients',
      icon: 'people-outline',
      link: '/patients'
    }
  ];
  constructor(
    private sidebarService: NbSidebarService
  ) { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.sidebarService.toggle();
  }

}
