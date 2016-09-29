function runSearch(){
	try{
		$.getJSON('https://itunes.apple.com/search?term='+formatCriteria($('#searchTerm').val())+'&media=music&limit=100&callback=?', 
		  	function(items) {
				var songs = "";

				$.each(items.results, function(index,song){
					var displayItem = '<div class="row">';
					displayItem += '<div class="col-sm-3"><center>';
					displayItem += '<img class="img-thumbnail" src="' + song.artworkUrl100 + '">';
					displayItem += '</center></div>';
					displayItem += '<div class="col-sm-3"><center>';
					displayItem += '<h5>' + song.trackName + '</h5>';
					displayItem += '<h5>'+ song.artistName +'</h5>';
					displayItem += '<p>'+ song.collectionName;
					displayItem += '</center></div>';
					displayItem += '<div class="col-sm-3"><center>';			
					displayItem += '<p>Collection Price: ' + song.collectionPrice;
					displayItem += '<br>Track Price: ' + song.trackPrice + '</p></center></div>';
					displayItem += '<div class="col-sm-3"><center>';
					displayItem += '<audio controls><source src="'+ song.previewUrl + '" type="audio/mpeg">';
					displayItem += 'Your browser does not support the audio element.</audio>';
					displayItem += '</center></div>'
					displayItem += '<div class="col-sm-12"><hr></div></div>';
					songs += displayItem;

				});
/*				$.each(items.results, function(index, song){

					var displayItem = '<div class="col-sm-6"><center>'
					displayItem += '<img class="img-thumbnail" src="' + song.artworkUrl100 + '">';
					displayItem += '<h5>' + song.trackName + '</h5>';
					displayItem += '<h5>'+ song.artistName +'</h5>';
					displayItem += '<p class="text-muted">'+ song.collectionName;
					displayItem += '<br>Collection Price: ' + song.collectionPrice;
					displayItem += '<br>Track Price: ' + song.trackPrice + '</p>';
					displayItem += '<audio controls><source src="'+ song.previewUrl +'" type="audio/mpeg">';
					displayItem += 'Your browser does not support the audio element.</audio>';
					displayItem += '</center></div>';
					songs += displayItem;	
				});*/

	            $('#results').html(songs);

	            //jPages
	            $(function() {
					$("div.holder").jPages({
						containerID: "results"
					});
				});

	            if(items.resultCount == 0)
	            {
	              var noResultsMessage = "No items found in the iTunes library for " + $('#searchTerm').val();
	              $('#results').html('<div class="col-md-12"><center><h4>' + noResultsMessage + '</h4></center></div>');
	            }
        	});
	}
	catch (err){
		console.log(err);
	}
}

function formatCriteria(criteria){
	return criteria.trim().replace(/ /g, "+");
}

function searchYouTube(){
	try{

		//initialize API Key
		gapi.client.setApiKey("AIzaSyC9IcvsoIFHxGEkRcgGZWx48gDKmTe7muQ");
		gapi.client.load("youtube","v3", function(){});

		//setup search
		var search = gapi.client.youtube.search({
			part: "snippet",
			type: "video",
			q: formatCriteria($('#searchTerm').val()),
			max: 5,
			order: "viewCount"
		});

		//execute request
		request.execute(function(data) {
			var data = data.result;
			$.each(data.items, function(index, item){
				var videos = "";
				var displayItem = '<div class="row">';
				displayItem += '<div class="col-sm-6"><center>';
				displayItem += '<iframe class="video w100" width="200" height="200" src="' + item.id.videoID + '">'
				displayItem += '</center></div>';
				displayItem += '<div class="col-sm-6"><center>';
				displayItem += '<h5>' + item.snippet.title + '</h5>';
				displayItem += '</center></div>';
				displayItem += '<div class="col-sm-12"><hr></div></div>';
				videos += displayItem;
			});


			$('#results').html(videos);

		    //jPages
		    $(function() {
				$("div.holder").jPages({
					containerID: "results"
				});
			});

		    if(items.resultCount == 0)
		    {
		      var noResultsMessage = "No items found in the YouTube library for " + $('#searchTerm').val();
		      $('#results').html('<div class="col-md-12"><center><h4>' + noResultsMessage + '</h4></center></div>');
		    }

		});
	}
	catch(err){
		console.log(err);
	}
}

$(document).ready(function(){

});