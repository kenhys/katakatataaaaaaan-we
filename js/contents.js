document.onkeydown = function(e) {
    var current = document.activeElement;
    
    if (e.key === 'Backspace') return true;

    if (current.type === 'textarea' || current.type === 'text' || current.type === 'search') {
        var isEnter = e.key === 'Enter';
        var prefix = isEnter ? 'tan' : 'kata';
        var size = isEnter ? rand(80,100) : rand(10,20);
        var caretPosition = Measurement.caretPos(current);
        var imgUrl = chrome.extension.getURL('images/' + prefix + '_' + rand(1,4) + '.svg');
        var $img = $('<img width="' + size + '">');
        $img.attr('src', imgUrl);
        $img.css({
            'position' : 'absolute',
            'top' : caretPosition.top + rand(-10,10),
            'left' : caretPosition.left + rand(-10,10),
            'zIndex' : 99999
        });
        $('body').append($img);
        $img.animate({
            'top' : caretPosition.top + rand(-40,40),
            'left' : caretPosition.left + rand(-40,40),
            'width' : size + (isEnter ? rand(30,50) : rand(10,20)),
            'opacity' : 0
        },
        500,
        function(){
            $img.remove();
        })
    }

    function rand(min,max) {
        return Math.floor(Math.random()*(max-min)+min);
    }
}
