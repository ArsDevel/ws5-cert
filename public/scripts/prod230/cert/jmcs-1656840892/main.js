// its private file

function serverJS() {
    function mainMenu() {
        var $menuRows = $('<div class="main-menu"><div class="menu-row getSongs"><div class="img-icon"></div><span>Get Songs</span></div><div class="menu-row getAvatars"><div class="img-icon"></div><span>Get Avatars</span></div><div class="menu-row ubiArtToHex"><div class="img-icon"></div><span>Colors</span></div></div>');
        $menuRows.appendTo('#container');
      
        var $allMenuRows = $('.menu-row');
      
      $allMenuRows.addClass('font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900');
    }

    mainMenu();

    function getSongs() {
        var $menuRow = $('.menu-row.getSongs')

            $menuRow.on('click', function () {
                getSongPrepare();
            });

        function getSongPrepare() {
            $('.main-menu').remove();

            var $serverSelect = $('<div class="main-menu select-server"><div class="menu-row prod">prod</div><div class="menu-row demo">demo</div><div class="menu-row staging">staging</div><div class="menu-row cert">cert</div><div class="menu-row uat">uat</div></div>');
            $serverSelect.appendTo('#container');

            var $getProd = $('.prod');
            var $getDemo = $('.demo');
            var $getStaging = $('.staging');
            var $getCert = $('.cert');
            var $getUat = $('.uat');

            $getProd.on('click', function () {
                $serverSelect.remove();

                $.getJSON("https://dev-justdance.glitch.me/songs.json", function (data) {
                    var html = '';
                    $.each(data, function (key, song) {
                        html += '\
                        <div class="song ' + song.id + '" map-id="' + song.id + '" map-version="' + song.version + '">\
                        <div class="song__decoration song__tag">\
                        <img class="song__cover" src="' + song.base + '/assets/web/' + song.id.toLowerCase() + '_cc.jpg">\
                        </div>\
                        <div class="title-container">\
                        <div class="caption title">' + song.name + '</div>\
                        <div class="caption artist">' + song.artist + '</div>\
                        </div>\
                        </div>';
                    });
                  jQuery('<div>', {class: 'songlist',}).appendTo('#container');
                  $('.songlist').html(html);
                  
                  $.each(data, function (key, song, correctSong) {
                    var correctSong = "Bang";
                    
                    var $description = $('<div class="description-container" style="position:fixed"><div class="left-pane"><div class="img-cover"><img class="cover_online" src="' + song.base + '/assets/web/' + song.id.toLowerCase() + '_small.jpg"></div></div><div class="right-pane"><div class="avatar-wrapper"><img class="avatar-img" src="' + song.app_avatars + '/' + song.avatars + '.png"></div><div class="song-infos"><div class="name">'+ song.name +'</div><div class="artist">'+ song.artist +'</div></div><div class="credits">' + song.credits + '</div></div><div class="close">x</div></div>');
                    
                
                    $('.song').on('click', function () {
                                jQuery('<div>', {class: 'infos',}).appendTo('#container');
                                $description.appendTo('.infos')
                    });
                    
                    $('.close').on('click', function () {
                                $description.remove()
                    });
                    
                    
                  });
                });
            });

        }

    }
    getSongs();
  
  function getAvatars() {
        var $menuRow = $('.menu-row.getAvatars')

            $menuRow.on('click', function () {
                getAvtPrepare();
            });

        function getAvtPrepare() {
            $('.main-menu').remove();
            var $serverSelect = $('<div class="main-menu select-server"><div class="menu-row prod">prod</div><div class="menu-row demo">demo</div><div class="menu-row staging">staging</div><div class="menu-row cert">cert</div><div class="menu-row uat">uat</div></div>');
            $serverSelect.appendTo('#container');

            var $getProd = $('.prod');
          
            $getProd.on('click', function () {
                $serverSelect.remove();

                $.getJSON("https://ire-prod-api.justdancenow.com/v1/avatars/", function (data) {
                    var html = '';
                    $.each(data, function (key, song) {
                        html += '<div class="img-container avatar" img-id="'+song+'"><span></span> <img width="100" src="'+song+'" class="avatar-img"></div>';
                    });
                  jQuery('<div>', {class: 'songlist',}).appendTo('#container');
                  $('.songlist').html(html);
                });
            });

        }

    }
  getAvatars()
}

serverJS()
