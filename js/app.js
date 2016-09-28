function runSearch(){
	try {
		  $.ajax({
          url: 'https://itunes.apple.com/search?term='+formatCriteria($('#searchTerm').val())+'&limit=200'+"&callback=?",
          dataType: 'json',
          type: 'GET',
          success: function(items) 
          {
			var songs = "";
			$.each(items.results, function(index, song){
			  var track = '<div class="col-sm-3"><center>';
			  track += '<img class="img-thumbnail" src="'+ song.artworkUrl100 +'"><br>';
			  track += '<audio controls><source src="'+ song.previewUrl +'" type="audio/mpeg">';
			  track += 'Your browser does not support the audio element.</audio>';
			  track += '<h4>'+ song.trackName +'<h4>';
			  track += '<h5>'+ song.artistName +'</h5>';
			  track += '<p>'+ song.collectionName +'</p>';
			  track += '</center></div>';
			  songs += track;
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
              $('#results').html('<div class="col-sm-12"><center><h4>' + noResultsMessage + '</h4></center></div>');
            }
          }
        });
	}
	catch (err){
		console.log(err);
	}
	

}

function formatCriteria(criteria){
	return criteria.trim().replace(/ /g, "+");
	//return terms.replace(/[^a-zA-Z]+/g, ' ').trim().replace(/ /g,'+');
}

//jPages pagination
// $(function() {
// 	$("div.holder").jPages({
// 		containerID: "results"
// 	});
// });