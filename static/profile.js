var artistMbids = [];
$('li').each(function() {
    artistMbids.push( $(this).text() );
  });;
console.log(artistMbids);

artistMbids.forEach(function(artistMbid) {


    var model = {
        artistInfo: []
    }

    var api = {
        root: "http://ws.audioscrobbler.com/2.0/",
        token: "eeac2a521ed64a26c3d6d1217bdc4aa2"
    }

function likedArtists(callback) {

    $.ajax({
    url: api.root,
    data: {
        limit: 20,
        method: "artist.getinfo",
        api_key: api.token,
        mbid: artistMbid,
        format: "json"
        

    },
    success: function(response) {
        model.artistInfo = response
        callback(response);
        console.log(model.artistInfo);
    }
    });
}
function render() {

    var title = "<h4>" + model.artistInfo.artist.name + "</h4>";
    var image = "<img id='band-img' src='" + model.artistInfo.artist.image[2]["#text"] + "'>";
            
    var artistSpan = $("<span></span>")
    .attr("class", "tag")
    .append(image)
    .append(title);

    $('#artist').append(artistSpan);
}

$(document).ready(function() {
    likedArtists(render);
  });

});