// wait until document is loaded to execute these functions
$(document).ready(function(){

	// creating variable containing array of preset animals
	var buttonArray = ["Elephant Seal", "Beetle Larva", "Popplio", "Baby Hippo"];
	// saving api key in variable
	var apiKey = "wPg1YGjcKPyROXQ0XAmJ8XgiZvlElTln";

	// for loop that dynamically creates buttons with animal names on the page
	for (var i = 0; i < buttonArray.length; i++){
		var button = $("<button>");
		button.text(buttonArray[i]);
		button.attr("data-name", buttonArray[i]);
		button.addClass("animalButtons");
		$("#buttonsGoHere").append(button);
	}

	// event click listener for pressing one of the animal buttons
	$(document).on("click", ".animalButtons", function(){
		// getting the data name in a variable
		var searchTermV1 = $(this).attr("data-name");
		console.log(searchTermV1);
		
		// adding a plus instead of space if the term has a space in it to make it easier to put in the api url
		var searchTerm = searchTermV1.replace(" ", "+")
		
		// putting together giphy api url
		var url = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + apiKey + "&limit=5";
		
		//calling ajax
		$.ajax({
        url: url,
        method: "GET"
      	}).done(function(response) {
      		// console logging response object
      		console.log(response);

      		// for loop that loops through response object results and creates img elements with the object data
	      	for (var i = 0; i < 5; i++){

	      		// creating div to hold rating and image
	      		var gifDiv = $("<div>");

	      		// creating p tag for rating
	      		var ratingInfo = $("<p>");

	      		// creating variable for rating info and entering text
	      		var rating = response.data[i].rating;
				ratingInfo.text("Rating: " + rating);

				// creating p tag for img element
				var gifP = $("<p>");

	      		// creating img element in variable
	      		var gif = $("<img>");

	      		// creating variable to hold url and still url
	      		var imageSRC = response.data[i].images.original_still.url;
	      		var imageSRCanimated = response.data[i].images.original.url;
	      		var imageSRCstill = response.data[i].images.original_still.url;

	      		// adding an attributes to the img element
	      		gif.attr("src", imageSRC);
	      		gif.addClass("gif");
	      		gif.attr("data-animated", imageSRCanimated);
	      		gif.attr("data-paused", imageSRCstill);
	      		gif.attr("data-state", "still");

	      		// appending image to gifP
	      		gifP.append(gif);
	      		ratingInfo.append(gifP);

	      		// appending gif to the gifsGoHere div
	      		$("#gifsGoHere").prepend(ratingInfo);
	      	}	
      	});
	});


	// event click listener
	$("#addAnimalName").on("click", function(){
		

		// gets the value of the input from the animalNameSubmit div
		var buttonValue = $("#animalNameSubmit").val().trim();

		// if/eslse statement compares buttonValue to an empty string
		if (buttonValue.length < 1){

			// alert to say it's empty
			alert("Hey!!!!!");
		} else {

			// else push the buttonValue to the buttonArray
			buttonArray.push(buttonValue);

			// empty the buttonsGoHere div
			$("#buttonsGoHere").empty();

			// run four loop that generates buttons
			for (var i = 0; i < buttonArray.length; i++){
				var button = $("<button>");
				button.text(buttonArray[i]);
				button.attr("data-name", buttonArray[i]);
				button.addClass("animalButtons");
				$("#buttonsGoHere").append(button);
			}
		}}
	);

	// gif pausing function
	$(document).on("click", ".gif", function(){
		// if the data state is set to animated
		if($(this).attr("data-state") == "animated"){
			// change data state to still
			$(this).attr("data-state", "still");
			// change image source to the still image
			$(this).attr("src", $(this).attr("data-paused"));
		} else {
			$(this).attr("data-state", "animated");
			$(this).attr("src", $(this).attr("data-animated"));
		}
	});
});