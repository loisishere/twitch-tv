var streamers = ["freecodecamp", "GeoffStorbeck", "bennyfits","CookingForNoobs","terakilobyte", "habathcx", "notmichaelmcdonald", "RobotCaleb", "medrybw", "comster404", "brunofin", "thomasballinger", "joe_at_underflow", "noobs2ninjas", "mdwasp", "beohoff", "xenocomagain", "the_happy_hob","ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function updateTwitchList(status) {
  $('.container .row .user').remove();

  streamers.forEach(function(data) {
    $.getJSON("https://api.twitch.tv/kraken/users/" + data + "?callback=?", function(val) {
      if (status === "All") {
        if (!val._links) {
          $(".row").append("<div class='user DNE'><div class='twitchImage'><img src='http://www.egmods.com/main/tutphotoshop/easy/stone/clouds.gif'></div><div class='details'><h2>" + data + "</h2><p>" + val.message + "</p></div></div>");
        } else {
          $.getJSON("https://api.twitch.tv/kraken/streams/" + data + "?callback=?", function(v) {
            if (!v.stream) {

              $(".row").append("<div class='user Offline'><div class='twitchImage'><img src='https://static-cdn.jtvnw.net/jtv-static/404_preview-300x300.png'></div><div class='details'><h2>" + data + "</h2><p>User is offline</p></div></div>");
            } else if (v.stream) {
              $(".row").append("<a href='https://www.twitch.tv/"+v.stream.channel["display_name"]+"' target='_blank'><div class='user Online'><div class='twitchImage'><img src='"+v.stream.preview.medium+"'></div><div class='details'><h2>" + v.stream.channel["display_name"] + "</h2><p>"+v.stream.channel.status+"</p></div></div></a>");

            }
          })
        }
      } else {
        $.getJSON("https://api.twitch.tv/kraken/streams/" + data + "?callback=?", function(v) {

          if (!v.stream) {

            if (status === "Offline") {
              $(".row").append("<div class='user Offline'><div class='twitchImage'><img src='https://static-cdn.jtvnw.net/jtv-static/404_preview-300x300.png'></div><div class='details'><h2>" + data + "</h2><p>User is offline</p></div></div>");
            }
          } else {
            if (status === "Online") {
              $(".row").append("<a href='https://www.twitch.tv/"+v.stream.channel["display_name"]+"' target='_blank'><div class='user Online'><div class='twitchImage'><img src='"+v.stream.preview.medium+"'></div><div class='details'><h2>" + v.stream.channel["display_name"] + "</h2><p>"+v.stream.channel.status+"</p></div></div></a>");
            }
          }

        })
      }
    })
  })
}
$(document).ready(function() {
  updateTwitchList("All");
  $(".allUsers").click(function() {
    updateTwitchList("All");
  })
  $(".on").click(function() {
    updateTwitchList("Online");
  })
  $(".off").click(function() {

    updateTwitchList("Offline");
  })
})