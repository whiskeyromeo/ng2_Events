import {bootstrap} from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {AppComponent} from './components/app.component';
import { FORM_PROVIDERS } from '@angular/common';
import { provide } from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';
import { EventStore } from './stores/events.store';
import { AuthConfig, AuthHttp } from 'angular2-jwt';

bootstrap(AppComponent, [
	FORM_PROVIDERS,
	EventStore,
	HTTP_PROVIDERS,
	ROUTER_PROVIDERS
]).catch(err => console.log(err));
