## Angular2 Event Planner

**NOTE: This was built using Angular2 when it was still in an unstable statemany other versions of Angular have been released which are much better to work with, see my other repository [ng5-simple-auth](https://github.com/whiskeyromeo/ng5_simple_auth) for an example.**

Written 7.8.2016

This was the result of me toying around with a bit of Angular2. The edges are all pretty rough but all in all I think it gives a nice run around of using Angular2 with typescript. 

Anyone that fires this off will quickly realize that there are still a lot little annoyances in dealing with Angular2 in its current release candidate status. The transition to rc-1 was actually made while I had this on the backburner and so there are a number of components integrated into this which will be deprecated in the not too distant future( RIP router-deprecated, formBuilder...).

Compiling down to es5 also seems to throw a lot of tslint errors during the compile which I am hoping to find a way to stop here in the not too distant future.

Happy Hacking.


### To Run:

Clone the repository and perform a token
```cd ng2_Events && npm install```

From there you should be able to get up and running using 
```
npm start
```
This project was built on the angular2-quickstart skeleton, with a few modifications.

*Note: use ```httpster -s ``` to allow for pushState.*


### Notes

The project sometimes has trouble finding main.js, I've found that a refresh fixes this. 

The model structure for Users and Events is not ideal. Guests probably be stored in an array and checked against a database of users but really, its not something I'm worried about doing at the moment. 

LocalStorage seems to need a refresh of the page to recognize new signups. Figured it wasn't worth correcting since actually storing information with plaintext passwords on the client side is about as bad as it gets...

The Autocomplete API from google maps does not seem to function properly unless run using lite-server and then only on the add event page. 

When Compiling, often there are issues thrown up, [this link has a decent explanation( cannot find name 'Promise')](https://github.com/angular/angular/issues/7280).

The current development configuration uses lite-server and child_process.exec to update the application. This is not optimal for a number of reasons including a tendency to excede the max buffer size within a fairly short period of time. Switching to gulp-server or something of the like is currently on the list of todos...


### Resources

[Angular2 Latest Docs](https://angular.io/docs/ts/latest/)

[Stack Question on Google Maps AutoComplete API in Angular2](http://stackoverflow.com/questions/35881815/implementing-autocomplete-for-angular2#)

[Thoughram custom validators in Angular2](http://blog.thoughtram.io/angular/2016/03/14/custom-validators-in-angular-2.html)

[Stack Question Angular2 validator with multiple form fields](http://stackoverflow.com/questions/31788681/angular2-validator-which-relies-on-multiple-form-fields)

[Open Issue with pristine forms/reset in Angular2](https://github.com/angular/angular/issues/4933)

[Integrating Gulp with Angular2](http://blog.scottlogic.com/2015/12/24/creating-an-angular-2-build.html)

[Loading google maps api asynchronously](http://stackoverflow.com/questions/34931771/how-to-load-google-maps-api-asynchronously-in-angular2)
