import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { applyPolyfills, defineCustomElements } from '@paperless/core/loader';

applyPolyfills()
	.then(() => defineCustomElements())
	.then(() => platformBrowserDynamic().bootstrapModule(AppModule))
	.catch(err => console.error(err));
