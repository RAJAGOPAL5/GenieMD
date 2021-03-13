import { ElementRef, OnChanges, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

interface UserView {
  name?: string;
  image?: string;
}

interface ViewModel {
  primary?: UserView;
  items?: UserView[];
}

@Component({
  selector: 'app-care-circle',
  templateUrl: './care-circle.component.html',
  styleUrls: ['./care-circle.component.scss']
})
export class CareCircleComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('circleContainer', { static: true }) circleEl: ElementRef<any>;
  @Input() config: ViewModel = {
    primary: {},
    items: []
  };
  @Output() stopLoader: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.render();
    }, 1000 * 4);
  }

  ngOnChanges() {
    this.render();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.stopLoader.emit();
    }, 1000 * 5);
  }

  render() {
    const width = this.circleEl.nativeElement.clientWidth;
    const circles = this.circleEl.nativeElement.querySelectorAll('.circle-item');
    let angle = 360 - 90;
    const dangle = 360 / (this.config.items || []).length;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < circles.length; ++i) {
      const circle = circles[i];
      angle += dangle;
      circle.style.transform = `rotate(${angle}deg) translate(${width / 2}px) rotate(-${angle}deg)`;
    }
  }

}
