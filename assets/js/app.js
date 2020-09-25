$(function() {
    let artist;
    let title;
    let cover;

    getTitrage();

    $('main .modal-draggable').on('click', function() {
        $(this).toggleClass('active');
    });

    function getTitrage() {
        $.ajax({
            type: 'GET',
            url: 'https://players.nrjaudio.fm/wr_api/live/fr?act=get_plist&id_wr=158&fmt=json',
            dataType: 'json',
            success: function(response) {
                response = response['itms'];
                //console.log(response['itms']);

                for(i = 0; i < response.length; i++) {
                    artist = response[i]['art'];

                    if ($('main.index .titrage h2.artist').text() != artist) {
                        title = response[i]['tit'];
                        cover = 'https://players.nrjaudio.fm/live-metadata/player/img/600x/' + response[i]['cov'];
                        
                        if (i == 0) {
                            $('main.index .titrage h1.title').text(title);
                            $('main.index .titrage h2.artist').text(artist);
                            $('main.index .titrage img').attr('src', cover);
                            $('main.index .titrage img').attr('alt', artist);
                            $('main.index').css('background-image', 'url('+ cover +')');
                            console.log(artist)
                        }
                    }
                }
            }
        })
    }

    setInterval(function() {
        getTitrage();
    }, 10000);
});