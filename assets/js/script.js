var boardWidth = 500,
    boardHeight = 450,
    boxSize = 135;

var level = 1,
    score = 0;

var timeoutHandler;

var spells = {
    QQQ: {name: 'cold', key: 'QQQ'},
    QQW: {name: 'ghost', key: 'QQW'},
    QWW: {name: 'tornado', key: 'QWW'},
    WWW: {name: 'emp', key: 'WWW'},
    EWW: {name: 'alacrity', key: 'WWE'},
    EQW: {name: 'blast', key: 'QWE'},
    EEW: {name: 'meteor', key: 'WEE'},
    EQQ: {name: 'wall', key: 'QQE'},
    EEQ: {name: 'spirit', key: 'QEE'},
    EEE: {name: 'sun', key: 'EEE'}
};
var spellKeys = Object.keys(spells);
var opacity;

function createFallBox() {

    var nextTime = 2500 / level;
    timeoutHandler = setTimeout(function() {
        var spellKey = spellKeys[Math.floor(Math.random() * spellKeys.length)];
        var spell = spells[spellKey].name;
        var $box = $('<div class="box ' + spell + '">' + spells[spellKey].key + '</div>').appendTo('.game-board');
        var top = '-' + boxSize + 'px';
        var left = Math.floor(boxSize * (Math.random() * 3)) + 'px';
        opacity = 1 - level / 5;
        if (opacity < 0) {
            opacity = 0;
        }
        $box.css({top: top, left: left, color: 'rgba(255,255,255,' + opacity + ')', 'text-shadow': '0 2px 5px rgba(0,0,0,' + opacity + ')'}).animate({top: boardHeight + 'px'},  13000 / level, 'linear', function() {
            $box.remove();
        });
        createFallBox();
    }, nextTime);

}

createFallBox();

$(document).on('keydown', function(e) {
    var code = e.keyCode || e.which;
    console.log(code);
    var letter = '';
    switch (code) {
        case 81:
            letter = 'Q';
            break;
        case 87:
            letter = 'W';
            break;
        case 69:
            letter = 'E';
            break;
        case 82:
            letter = 'R';
            break;
    }
    if (letter) {
        if (letter == 'R') {
            $('.invoke').css({transition: 'none', opacity: 1}).finish().animate({opacity: 0.5}, 500, function() {
                $('.invoke').css({transition: 'all 0.3s', color: 'rgba(255,255,255,' + opacity + ')', 'text-shadow': '0 2px 5px rgba(0,0,0,' + opacity + ')'});
            });
            // get letters
            var letters = $($('.normal').html()).text();
            if (letters.length == 3) {
                // sort letters
                var spellKey = letters.split('').sort().join('');
                var spell = spells[spellKey].name;
                var match = $('.box.' + spell).first();
                if (match.length == 1) {
                    level += 0.01;
                    score += 1;
                    $('.score').text(score);
                    if ((level ^ 0) === level) {
                        $('.level').text(level);
                    }
                    match.finish();
                }
                console.log(spell);
            }
        } else {
            if ($('.normal .spell-key').length == 3) {
                $('.normal .spell-key').first().remove();
            }
            $('<div class="spell-key ' + letter + '">' + letter + '</div>').css({color: 'rgba(255,255,255,' + opacity + ')', 'text-shadow': '0 2px 5px rgba(0,0,0,' + opacity + ')'}).appendTo('.game-spells .normal');
        }
    }
});

