import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

// Paquete para peticiones http
import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

// Paquete para traducción
import {
  TranslateModule,
  TranslateLoader,
} from '@ngx-translate/core';
import {
  ModuleTranslateLoader,
  IModuleTranslationOptions
} from '@larscom/ngx-translate-module-loader';

// Paquete para formularios
import { FormsModule } from '@angular/forms';

// Configuración de rutas
import { AppRoutingModule } from './app-routing.module';

// Plantillas

import { AppComponent } from './app.component';

export function createTranslateLoader(http: HttpClient) {
  const baseTranslateUrl = './assets/i18n';
  const options: IModuleTranslationOptions = {
    modules: [
    ]
  };
  return new ModuleTranslateLoader(http, options);
}

@NgModule({
  declarations: [
  ],
  imports: [
    AppComponent,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
    }),
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
          preset: Aura,
          options: {
            darkModeSelector: false || 'none'
          }
        }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
