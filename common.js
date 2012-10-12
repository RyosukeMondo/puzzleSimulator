$(function(){
    $('div.post>h2.title').click(function(){
        var $entry = $(this).parent().children('.entry');
        $entry.slideToggle();
        var $span = $(this).children('span');
        if( $span.html() == "+" ) {
            $span.html('-');
        } else {
            $span.html('+');
        }
    }).css('cursor','pointer');
});
