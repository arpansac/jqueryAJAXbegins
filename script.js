var button = $('#append-button');

console.log(button);

var message = "message";

button.click(function(){

	var myText = $('<p>', {
		'html': message,
		'class': 'blue',
		
	});


	console.log(myText);

	$('#text-container').append(myText);


});



var dogImageButton = $('#get-dog-image');

function updateImageTag(imageLink){
	$('#dog-random-image').attr('src', imageLink);
}

function getImage(){
	var breed = $('#dog-breed').val();
	$.ajax({
		type: 'get',
		// random image
		// url: 'https://dog.ceo/api/breeds/image/random',
		
		//for breed image 
		url: 'https://dog.ceo/api/breed/' + breed + '/images/random',

		success: function(responseData){
			console.log('response Data: ', responseData);
			updateImageTag(responseData.message);
		},
		error: function(){
			console.log('some error has occured');
		}

	});
}


dogImageButton.click(function(){
	getImage();
});







// this method creates an image tag and appends it to the image-grid element
function createImage(imageLink){

	// create a tag in memory
	let newImg = $('<img>', {
		'src': imageLink
	});

	// append it to the grid
	$('#image-grid').append(newImg);
}

// get the form
var marsForm = $('#mars-form');

// do something on submit
marsForm.submit(function(event){
	// prevent the default behaviour of the form
	event.preventDefault();


	// send an ajax request to fetch the list of images
	$.ajax({
		type: 'get',
		url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos',
		// data is query params for get request
		data: {
			sol: $('#sol').val(),
			page: $('#page').val(),
			api_key: '<YOUR API KEY>'
		},
		// on receiving data successfully, empty the grid and add new images
		success: function(responseData){
			let photos = responseData.photos;
			$('#image-grid').empty();
			for (let i = 0; i < photos.length; i++){
				createImage(photos[i].img_src);
			}


		},
		// in case of an error, handle here
		error: function(){
			console.log('some error');
		}


	});
});























