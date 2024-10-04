import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http'; 

// Add HttpClient to your appConfig providers
const updatedAppConfig = {
  ...appConfig,
  providers: [
    ...appConfig.providers || [], // Spread existing providers if any
    provideHttpClient() // Provide HttpClient here
  ]
};

bootstrapApplication(AppComponent, updatedAppConfig)
  .catch((err) => console.error(err));
