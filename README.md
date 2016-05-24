## Event Planning 

Still a number of problems popping up here and there, mainly due to a lack of documentation on some of the features I've been trying to implement . Finally was able to work around issues surrounding the use of ngFormControl and Date objects. Instead of trying to work with it further I bypassed using ngFormControl on the startTime property and am utilizing ngModel to capture instead. This is then passed to the constructor when a new Event is created. 

####TODO

Bring together the datepicker and timepicker templates to make it so that instead of having a startTime and startDate the two will be joined. Likewise to the endTime and endDate.

Integrate more Css functionality
	- Create Cards To represent the created events
	- Separate Event creation/viewing/updates to respective pages
	- Tie in accounts to created events so that only those that
	create the events can modify them
	- Decorate the validations
	- Update the landing page and navigation

Integrate 0Auth functionality

Input the validations for signup, login, and event creation
