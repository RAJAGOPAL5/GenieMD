import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { ListComponent } from './list/list.component';
import { UpsertComponent } from './upsert/upsert.component';
import { IndexComponent } from './index/index.component';
import { NbCardModule, NbFormFieldModule, NbInputModule, NbListModule, NbRouteTabsetModule, NbTabsetModule, NbUserModule, NbIconModule, NbSpinnerModule, NbButtonModule, NbRadioModule, NbSelectModule, NbToggleModule, NbDatepickerModule, NbActionsModule, NbButtonGroupModule, NbCheckboxModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "../../assets/i18n/", ".json");
}


@NgModule({
  declarations: [ListComponent, UpsertComponent, IndexComponent, AddComponent, FilterDialogComponent],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    NbCardModule,
    NbUserModule,
    NbListModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbFormFieldModule,
    NbInputModule,
    NbIconModule,
    FormsModule,
    NbSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbRadioModule,
    NbSelectModule,
    NbToggleModule,
    NbDatepickerModule,
    NbActionsModule,
    NbButtonGroupModule,
    NbListModule,
    NbActionsModule,
    NbCheckboxModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
        })
  ],
  entryComponents: [AddComponent]
})
export class PatientsModule { }
