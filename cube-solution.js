$(function(){
    //$('div.post>div.entry').slideToggle();
    $('div.post>h2.title').click(function(){
        var $entry = $(this).parent().children('.entry');
        $entry.slideToggle();
        var $span = $(this).children('span');
        if( $span.html() == "+" ) {
            $span.html('-');
        } else {
            $span.html('+');
        }
    });
    $('div.post>h2.title').css('cursor','pointer');

    $('#showAlgo').click(function(){
        $('.algo').slideToggle();
    });
    $('div.algo>button').click(function(){
        $(this).next().slideToggle();
    });
});
