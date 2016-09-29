function runSearch(){
	try{
		$(document).ready(function() {
		  $.getJSON('https://itunes.apple.com/search?term='+formatCriteria($('#searchTerm').val())+'&media=music&limit=100&callback=?', 
		  	function(items) {
				var songs = "";
				$.each(items.results, function(index, song){

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
				});

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
		});
	}
	catch (err){
		console.log(err);
	}
}

function formatCriteria(criteria){
	return criteria.trim().replace(/ /g, "+");
}