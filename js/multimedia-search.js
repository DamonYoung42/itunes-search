function executeSearch(){
	$(document).ready(function(){
		try{

			if ($('#searchTerm').val() === ""){
				alert("Please enter a search term.");
			}
			else{
					
				if ($('input[name=searchService]:checked').val() === "Both"){
					searchiTunes();
					searchYouTube();			
				}
				else if	($('input[name=searchService]:checked').val() === "iTunes"){
					hideYouTube();
					searchiTunes();
				}
				else{
					hideiTunes();
					searchYouTube();
				}

			}
		}
		catch(err){
			console.log(err);
		}
	});
}


function searchiTunes(){
	$(document).ready(function(){

		try{
			$.getJSON('https://itunes.apple.com/search?term='+formatCriteria($('#searchTerm').val())+'&media=music&limit=100&callback=?', 
			  	function(data) {
					var songs = "";

					$.each(data.results, function(index,song){
						var displayItem = '<div class="row">';
						displayItem += '<div class="col-sm-3"><center>';
						displayItem += '<img class="img-thumbnail" src="' + song.artworkUrl100 + '">';
						displayItem += '</center></div>';
						displayItem += '<div class="col-sm-2"><center>';
						displayItem += '<h5>' + song.trackName + '</h5>';
						displayItem += '<h5>'+ song.artistName +'</h5>';
						displayItem += '<p>'+ song.collectionName;
						displayItem += '</center></div>';
						displayItem += '<div class="col-sm-2"><center>';			
						displayItem += '<p>Collection Price: ' + song.collectionPrice;
						displayItem += '<br>Track Price: ' + song.trackPrice + '</p></center></div>';
						displayItem += '<div class="col-sm-5"><center>';
						displayItem += '<audio controls><source src="'+ song.previewUrl + '" type="audio/mpeg">';
						displayItem += 'Your browser does not support the audio element.</audio>';
						displayItem += '</center></div>'
						displayItem += '<div class="col-sm-12"><hr></div></div>';
						songs += displayItem;

					});

		            if(data.resultCount === 0)
		            {
		            	$('#iTunesHeadline').hide();
		            	$('#iTunesPagination').hide();
		            	$('#iTunesResults').show();
						var noResultsMessage = "No items found in the iTunes library for " + $('#searchTerm').val();
						$('#iTunesResults').html('<div class="col-md-12"><center><h4>' + noResultsMessage + '</h4></center></div>');

		            }
		            else{
						showiTunes();
		            	$('#iTunesResults').html(songs);

			            //jPages
			            $(function() {
							$("#iTunesPagination").jPages({
								containerID: "iTunesResults"
							});
						});				
		            }
	        	});
		}
		catch (err){
			console.log(err);
		}
	});
}

function searchYouTube(){
	$(document).ready(function(){
		try{
			$.ajax({
				url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=25&order=relevance&q='+formatCriteria($('#searchTerm').val())+'&key=AIzaSyC9IcvsoIFHxGEkRcgGZWx48gDKmTe7muQ',
				dataType: 'json',
				type: 'GET',
				success: function(data) {
					var videos = '';
					$.each(data.items, function(index, video){
					var displayItem = '<div class="row">';
					displayItem += '<div class="col-sm-6"><center>';
					displayItem += '<img class="img-thumbnail" src="' + video.snippet.thumbnails.default.url + '">';
					//displayItem += '<iframe width="300" height="120" src="https://www.youtube.com/embed/' + video.id.videoId + '"></iframe>';
					displayItem += '</center></div>';
					displayItem += '<div class="col-sm-6"><center>';
					displayItem += '<h5><a href="https://www.youtube.com/watch?v=' + video.id.videoId + '" target="_blank">Watch: ' + video.snippet.title +'</a></h5>';
					displayItem += '</center></div>';
					displayItem += '<div class="col-sm-12"><hr></div></div>';
					videos += displayItem;
					});

					if(data.items.length === 0){
						$('#YouTubeHeadline').hide();
						$('#YouTubePagination').hide();
						$('#YouTubeResults').show();

						var noResultsMessage = "No items found in the YouTube library for " + $('#searchTerm').val();

						$('#YouTubeResults').html('<div class="col-md-12"><center><h4>' + noResultsMessage + '</h4></center></div>');
					}
					else{
						showYouTube();
						$('#YouTubeResults').html(videos);

						//jPages
						$(function() {
							$("#YouTubePagination").jPages({
								containerID: "YouTubeResults"
							});
						});


					}
				}
			});
			
		}
		catch(err){
			console.log(err);
		}
	});
}

function hideYouTube(){
	$('#YouTubeHeadline').hide();
	$('#YouTubeResults').hide();
	$('#YouTubePagination').hide();
}

function hideiTunes(){
	$('#iTunesHeadline').hide();
	$('#iTunesResults').hide();
	$('#iTunesPagination').hide();
}

function showYouTube(){
	$('#YouTubeHeadline').show();
	$('#YouTubeResults').show();
	$('#YouTubePagination').show();
}

function showiTunes(){
	$('#iTunesHeadline').show();
	$('#iTunesResults').show();
	$('#iTunesPagination').show();
}
function formatCriteria(criteria){
	return criteria.trim().replace(/ /g, "+");
}
// function searchYouTube(){
// 	try{

// 		//initialize API Key
// 		//gapi.client.setApiKey("AIzaSyC9IcvsoIFHxGEkRcgGZWx48gDKmTe7muQ");
// 		gapi.load('client', init);
// 		gapi.load("youtube","v3", function(){
// 				// setup search
				
// 				// https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=viewCount&q=coldplay&type=video&key=AIzaSyC9IcvsoIFHxGEkRcgGZWx48gDKmTe7muQ
				
// 				var search = gapi.client.youtube.search({
// 					part: "snippet",
// 					type: "video",
// 					q: formatCriteria($('#searchTerm').val()),
// 					max: 5,
// 					order: "viewCount"
// 				});

// 				//execute request
// 				search.execute(function(data) {
// 					var data = data.result;
// 					$.each(data.items, function(index, item){
// 						var videos = "";
// 						var displayItem = '<div class="row">';
// 						displayItem += '<div class="col-sm-6"><center>';
// 						displayItem += '<iframe class="video w100" width="200" height="200" src="' + item.id.videoID + '">'
// 						displayItem += '</center></div>';
// 						displayItem += '<div class="col-sm-6"><center>';
// 						displayItem += '<h5>' + item.snippet.title + '</h5>';
// 						displayItem += '</center></div>';
// 						displayItem += '<div class="col-sm-12"><hr></div></div>';
// 						videos += displayItem;
// 					});


// 					$('#results').html(videos);

// 				    //jPages
// 				    $(function() {
// 						$("div.holder").jPages({
// 							containerID: "results"
// 						});
// 					});

// 				    if(items.resultCount == 0)
// 				    {
// 				      var noResultsMessage = "No items found in the YouTube library for " + $('#searchTerm').val();
// 				      $('#results').html('<div class="col-md-12"><center><h4>' + noResultsMessage + '</h4></center></div>');
// 				    }

// 				});
// 		});
// 	}
// 	catch(err){
// 		console.log(err);
// 	}
// }

// function init() {
//   gapi.client.setApiKey('AIzaSyC9IcvsoIFHxGEkRcgGZWx48gDKmTe7muQ');
//   gapi.client.load('urlshortener', 'v1');
// }