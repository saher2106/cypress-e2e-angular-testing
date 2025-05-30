import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { ApplicationConfig, isDevMode } from '@angular/core';

import { provideState, provideStore } from '@ngrx/store';
import { postsFeatureKey, postsReducer } from './posts/store/reducers';
import { PostsEffects } from './posts/store/effects';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    provideState(postsFeatureKey, postsReducer),
    provideEffects(PostsEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
};
