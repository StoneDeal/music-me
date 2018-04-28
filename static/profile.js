var artistMbids = $('#artists-mbid').innerHTML;
console.log(artistMbids);

/*
var model = {
    artistInfo: []
}

var api = {
    root: "http://ws.audioscrobbler.com/2.0/",
    token: "eeac2a521ed64a26c3d6d1217bdc4aa2"
}

    
$.ajax({
url: api.root,
data: {
    limit: 20,
    method: "artist.getinfo",
    api_key: api.token,
    mbid: getParameterByName('artist'),
    format: "json"
    

},
success: function(response) {
    model.artistInfo = response
    callback(response);
    console.log(model.artistInfo);
}
});



        
$("#artist").empty();
console.log(model.artistInfo.artist)
var href = "/profile?artist=" + getParameterByName('artist');
var title = "<h3>" + model.artistInfo.artist.name + "</h3>";
var image = "<img id='band-img' src='" + model.artistInfo.artist.image[3]["#text"] + "'>"; 
var url = "<h4><a href='" + model.artistInfo.artist.url + "' target='_blank'>Listen</a></h4>";
var like = "<h4><a href='" + href + "'>I Like This!</a></h4>";
        
var artistSpan = $("<span></span>")
.attr("class", "tag")
.append(image)
.append(title)
.append(url)
.append(like);

$('#artist').append(artistSpan);

*/
