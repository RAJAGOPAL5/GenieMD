import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NbDialogModule, NbLayoutModule, NbThemeModule, NbIconModule, NbInputModule, NbTreeGridModule, NbCardModule, NbButtonModule, NbActionsModule, NbPopoverModule, NbPopoverDirective } from '@nebular/theme';
import { MissingTranslationHandler, MissingTranslationHandlerParams, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DevicesComponent } from './components/devices/devices.component';
import { ReactiveFormsModule } from '@angular/forms';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "../../assets/i18n/", ".json");
}
@NgModule({
  declarations: [HeaderComponent, FooterComponent, DevicesComponent],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbDialogModule.forChild(),
    NbIconModule,
    ReactiveFormsModule,
    NbInputModule,
    NbTreeGridModule,
    NbCardModule,
    NbActionsModule,
    NbButtonModule,
    NbPopoverModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
        })
  ],
  exports: [NbLayoutModule,
    TranslateModule,
    DevicesComponent
  ]
})
export class SharedModule { }
