## Event Planner

Written 7.8.2016

This was the result of me toying around with a bit of Angular2. The edges are all pretty rough
and I make no claims as to having any serious front-end development skills, but all in all I think it gives a nice run around of using Angular2 with typescript. 

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

Or you can use gulp to create a build folder. Run ```gulp```
and ``` cd build ``` to get into the root where you can run the 
project using something like httpster or http-server.
*Note: use ```httpster -s ``` to allow for pushState.*



## Notes
About Signup

LocalStorage seems to take a minute to recognize new signups.

