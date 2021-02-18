import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NbDialogModule, NbLayoutModule, NbThemeModule } from '@nebular/theme';


@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbDialogModule.forChild()
  ],
  exports: [NbLayoutModule]
})
export class SharedModule { }
