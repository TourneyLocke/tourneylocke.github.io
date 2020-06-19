$(function(){
  //const TwitchAPI = import('./twitchapi.js');
  var rand = Math.random(1, 10);
  //read the json
  let url = 'assets/js/players/list.json?v='+rand;
  var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  var env = "tourneylocke.github.io";
  //env = "localhost";
  var userList = null;
  var allow_medals = true;
  $.getJSON(url, function( data ){

    userList = data;
    for (var i = 0; i < data.players.length; i++) {
      create_player(data.players[i], i+1);
    }
    $('.player').not('.player-banned').click(function(){
      var twitter = $(this).data('twitter');
      var twitch = $(this).data('twitch');
      var youtube = $(this).data('youtube');
      var video = $(this).data('video');
      update_socials(twitter, twitch, youtube, video);
    });
  });

  function create_player(player, index){
    var player_banned = "";
    var all_medals = "";

    if(player != undefined){
      var cls = "col-6 col-md-4 col-lg-3 col-xl-2",
          icon = "assets/images/twitch.png",
          edition_img = "zekrom.png",
          edition = "white",
          is_video = false;
      if(player.youtube != undefined && player.youtube != ""){
        icon = "assets/images/youtube.png";
      }
      if(player.edition != undefined && player.edition == "black"){
        edition_img = "reshiram.png";
        edition = "black";
      }
      if(player.banned != undefined && player.banned != "" && player.banned){
        player_banned = "player-banned";
      }
      if(player.video != undefined && player.video != "" && player.video === true){
        is_video = true;
      }
      var user_block = "<div class='"+ cls +" nopadding'><div class='player "+ player_banned +"' data-twitter='"+ player.twitter +"' data-twitch='"+ player.twitch +"' data-youtube='"+ player.youtube +"' data-video='"+ is_video +"' style='background-image: url(assets/images/players/bg/"+ player.username.toLowerCase() +".jpg);'><div class='player-info'><div class='player-icon' style='background-image: url(assets/images/players/icon/"+ player.username.toLowerCase() +".jpg)'></div><div class='player-name'><p><img class='player-platform' src='"+ icon +"'/>"+ player.username +"</p></div></div><div class='player-edition edition-"+ edition +"'><img src='assets/images/team_icon/"+ edition_img +"'/></div><div class='player-medals "+ (allow_medals ? "" : "d-none") +"'>"+all_medals+"</div></div></div>";
      if(!player.hidden){
        $('#load_players').append(user_block);
      }
    }
  }

  function update_socials(tt, tw, yt, vd){
    console.log(vd);
    var twitch = "<iframe src='https://player.twitch.tv/?channel="+ tw +"&parent="+env+"'></iframe>";
    var twitter = "<a class='twitter-timeline' data-lang='es' data-theme='dark' href='https://twitter.com/"+ tt +"'></a><script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script>";
    var chat = "<iframe frameborder='0' scrolling='no' src='https://www.twitch.tv/embed/"+ tw +"/chat?darkpopout&parent="+env+"' width='100%' height=''></iframe>";
    var youtube = "<iframe src='https://www.youtube.com/embed/live_stream?channel="+ yt +"&autoplay=1' frameborder='0' allowfullscreen></iframe>";

    if(isChrome){
      $('.twitch-chat-container').addClass('chrome');
    }

    if(yt != "undefined" && yt != ""){
      if(vd != "undefined" && vd){
        window.open("https://www.youtube.com/channel/"+ yt +"/videos", "_blank");
      } else{
        open_social();
        $('.twitch-container').html(youtube);
        $('.tab').first().addClass('d-none');
        $('.twitch-chat-container').addClass('d-none');
        $('.twitter-container').removeClass('d-none');
      }
    } else{
      open_social();
      $('.tab').first().removeClass('d-none');
      $('.twitch-chat-container').removeClass('d-none');
      $('.twitter-container').addClass('d-none');
      $('.twitch-container').html(twitch);
    }

    $('.twitter-container').html(twitter);
    $('.twitch-chat-container').html(chat);
  }
  function open_social(){
    $('.social-popup').removeClass('d-none');

    $('body').addClass('locked');

    $('.tab').removeClass('active-tab');
    $('.tab').first().addClass('active-tab');

    $('.twitch-chat-container').removeClass('d-none');
    $('.twitter-container').addClass('d-none');
  }
  function close_social(){
    $('.social-popup').addClass('d-none');
    $('body').removeClass('locked');
    $('.twitch-container').html('');
    $('.twitter-container').html('');
    $('.twitch-chat-container').removeClass('d-none');
    $('.twitter-container').addClass('d-none');
  }

  $('.closebtn').click(function(){
    close_social();
  });
  $('.tabs .tab').click(function(){
    $dt = $(this).data('tab');
    $('.twitch-chat-container').addClass('d-none');
    $('.twitter-container').addClass('d-none');
    $('.active-tab').removeClass('active-tab');
    $(this).addClass('active-tab');
    $('#'+$dt+'-tab').removeClass('d-none');
  });

  function init_animation(){
    $('.loading-screen').removeClass('d-none');
    $('.loading-screen').attr('style', 'opacity: 1');
    $('.loading-screen img').attr('style', 'transform: translateY(0)');
    setTimeout(function () {
      $('.loading-screen img').attr('style', 'transform: translateY(-1000px)');
    }, 1000);
    setTimeout(function () {
      $('.loading-screen').attr('style', 'opacity: 0');
      setTimeout(function () {
        $('.loading-screen').addClass('d-none');
        $('body').removeClass('locked');
      }, 500);
    }, 1000);
  }
  init_animation();
});
