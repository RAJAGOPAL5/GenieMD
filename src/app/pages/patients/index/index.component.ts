import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  isCompact = false;

  constructor( private route: Router) { }

  ngOnInit(): void {
    this.route.events.subscribe(data => {
      const url = this.route.url;
      this.isCompact = url.substr(url.lastIndexOf('/') + 1) === 'patients' ? false : true;
    });
  }

}
