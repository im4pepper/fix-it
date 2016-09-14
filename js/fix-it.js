$(document).ready(function(){
  $('#search-term').submit(function(event){
    event.preventDefault();
    var searchTerm = $("#query").val();
    getRequest(searchTerm);
  });
});

function getRequest(searchTerm){
  var params = {
    q: searchTerm,
    r: 'json',
    part: 'snippet',
    type: 'video',
    videoType: 'any',
    //regionCode: 'ISO 3166-1 alpha-2',
    key: 'AIzaSyCFf3S7fwAekL6dSkB41nrWJGZpg_zynUI',
    maxResults: '5',
    order: 'rating'
  };
  url = 'https://www.googleapis.com/youtube/v3/search';

  $.getJSON(url, params, function(data){
    console.log(data.items);
    showResults(data.items);
  });
}

function showResults(results){
  var html = "";
  var baseYouTubeURL="https://www.youtube.com/watch?v="
  $.each(results, function(index,item){
    html += '<p>' + item.snippet.title  + '<br>' + item.snippet.description + '<br>' + '<a href="' + baseYouTubeURL + item.id.videoId + '" target="_blank"><img src="' + item.snippet.thumbnails.default.url + '"></a>' + '<hr>' + '</p>';
    //console.log(item.snippet.title);
  });
  $('#search-results').html(html);
}