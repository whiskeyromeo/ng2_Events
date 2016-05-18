import {bootstrap} from '@angular/platform-browser-dynamic';
import {AppComponent} from './components/app.component';
import { FORM_PROVIDERS } from '@angular/common';
import { EventStore } from './stores/events.store';

bootstrap(AppComponent, [FORM_PROVIDERS, EventStore]);
