import { ModuleWithProviders, NgModule } from '@angular/core';
export class CoreConfigOptions {
  baseURL?: string;
  production?: boolean;
}
@NgModule({
  declarations: [],
  imports: [
  ],
  exports: []
})
export class CoreModule {
  static forRoot(config: CoreConfigOptions): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: CoreConfigOptions,
          useValue: config
        }
      ]
    }
  }
 }
