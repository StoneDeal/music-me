var artistMbids = [];
$('li').each(function() {
    artistMbids.push( $(this).text() );
  });;
console.log(artistMbids);

artistMbids.forEach(function(artistMbid) {


    var model = {
        artistInfo: [],
        simArtistInfo: []
    }

    var api = {
        root: "http://ws.audioscrobbler.com/2.0/",
        token: "eeac2a521ed64a26c3d6d1217bdc4aa2"
    }
    

function likedArtist(callback) {

    $.ajax({
    url: api.root,
    data: {
        limit: 20,
        method: "artist.getinfo",
        artist: artistMbid,
        api_key: api.token,
        format: "json"
        

    },
    success: function(response) {
        model.artistInfo = response
        callback(response);
        console.log(model.artistInfo);
    }
    });
}
function recommendedArtists(callback) {
    $.ajax({
        url: api.root,
        data: {
            limit: 5,
            method: "artist.getsimilar",
            api_key: api.token,
            artist: artistMbid,
            format: "json"
            
    
        },
        success: function(simResponse) {
            model.simArtistInfo = simResponse
            callback(simResponse);
            console.log(model.simArtistInfo);
        }
        });
    
}
function render() {

    var likedArtist = "<h3>" + "Because you like " + model.artistInfo.artist.name + "</h3>";
    var artistDiv = $('<div></div>')
    .append(likedArtist);

    model.simArtistInfo.similarartists.artist.forEach(function(artist) {
     
    var artistHref = "/artist?artist=" + artist.mbid;
    var title = "<h6><a href='" + artistHref + "'>" + artist.name + "</a></h6>";
    var image = "<img id='band-img' src='" + artist.image[2]["#text"] + "'>";
            
    var artistSpan = $("<span></span>")
    .attr("class", "tag")
    .append(image)
    .append(title);

    artistDiv.append(artistSpan);
    });

    $('#artist').append(artistDiv);
}

$(document).ready(function() {
    likedArtist(render);
    recommendedArtists(render);
  });

});