import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ClinicPromptComponent } from './shared/components/clinic-prompt/clinic-prompt.component';
import { NbDialogService, NbIconLibraries } from '@nebular/theme';
import { ClinicService } from './shared/service/clinic.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'remote-patient-monitoring';
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialogService: NbDialogService,
    private clinicService: ClinicService,
    private titleService: Title,
    private iconLibraries: NbIconLibraries
    ) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => {
      const rt = this.getChild(this.activatedRoute);
      rt.data.subscribe(data => {
        this.titleService.setTitle(data.title)
      });
    });
  }

  ngAfterViewInit() {
    const id = this.clinicService.id;
    if(!id) {
      this.open();
    }
  }

  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }

  open() {
    this.dialogService.open(ClinicPromptComponent);
  }
}
