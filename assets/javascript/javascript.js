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

	// event click listener
	$("#addAnimalName").click(function(){

		// gets the value of the input from the animalNameSubmit div
		var buttonValue = $("#animalNameSubmit").val().trim();

		// if/eslse statement compares buttonValue to an empty string
		if (buttonValue.length < 1){

			// if yes, alert to say it's empty
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

	// event click listener for pressing one of the animal buttons
	$(".animalButtons").click(function(){

		// getting the data name in a variable
		var searchTermV1 = $(this).attr("data-name");
		
		// adding a plus instead of space if the term has a space in it to make it easier to put in the api url
		var searchTerm = searchTermV1.replace(" ", "+")
		console.log(searchTerm);
		
		// putting together giphy api url
		var url = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + apiKey + "&limit=5";
		
		//calling ajax
		$.ajax({
        url: url,
        method: "GET"
      	}).done(function(response) {
	      	console.log(response);
	      	for (var i = 0; i < 5; i++){
	      		var gif = $("<img>");
	      		var imageSRC = response.data[i].images.original.url;
	      		console.log(imageSRC);
	      		gif.attr("src", imageSRC);
	      		$("#gifsGoHere").append("<img>");
	      	}	
      	});
	});
});