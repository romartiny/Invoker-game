function startGame() {
    return game();
}

function game() {

    var boardWidth = 500,
        boardHeight = 450,
        boxSize = 135;

    var play = true,
        difficulty = 1,
        timer = 1,
        level = 2,
        score = 200,
        preScore = 200;

    var timeoutHandler;
    var timeout;

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

    timer = 1;
    startTimer(0);
    keyTap();
    document.getElementById('game-board').innerHTML = "";

    function createFallBox() {

        var nextTime = 2500 / level;
        timeoutHandler = setTimeout(function () {
            var spellKey = spellKeys[Math.floor(Math.random() * spellKeys.length)];
            var spell = spells[spellKey].name;
            var $box = $('<div class="box ' + spell + '">' + spells[spellKey].key + '</div>').appendTo('.game-board');
            var top = '-' + boxSize + 'px';
            var left = Math.floor(boxSize * (Math.random() * 3)) + 'px';
            opacity = 1 - level / 5;
            if (opacity < 0) {
                opacity = 0;
            }

            function moveBox() {
                $box.css({
                    top: top,
                    left: left,
                    color: 'rgba(255,255,255,' + opacity + ')',
                    'text-shadow': '0 2px 5px rgba(0,0,0,' + opacity + ')'
                }).attr('id', spell).animate({top: boardHeight + 'px'}, 13000 / level, 'linear', function () {
                    preScore += 1;
                    console.log(preScore)
                    console.log(score)
                    if (preScore > score) {
                        $box.remove();
                        $box.stop();
                        return gameEnd();
                    } else {
                        $box.stop();
                        return $box.remove();
                    }
                });
            }

            moveBox();

            createFallBox();

        }, nextTime);

        function gameEnd() {
            clearTimeout(timeoutHandler);
            timer = 0;
            score = 200;
            preScore = 200;
            level = 1;
            for (let i = 0; i < 5; i++) {
                document.getElementById('game-board').innerHTML = "";
            }

        }
    }

    createFallBox();


    function startTimer(duration) {
        var timerRef = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timerRef / 60, 10);
            seconds = parseInt(timerRef % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            if (timer === 1) {
                document.getElementById("time").innerHTML = minutes + ":" + seconds;
                if (++timerRef < 0) {
                    timerRef = duration;
                }
            } else {

            }

        }, 1000);
    }

    function keyTap() {
        $(document).on('keydown', function (e) {
            var opacity;
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
                    $('.invoke').css({transition: 'none', opacity: 1}).finish().animate({opacity: 0.5}, 500, function () {
                        $('.invoke').css({
                            transition: 'all 0.3s',
                            color: 'rgba(255,255,255,' + opacity + ')',
                            'text-shadow': '0 2px 5px rgba(0,0,0,' + opacity + ')'
                        });
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
                            $('.current-score').text(score);
                            console.log(level)
                            if ((Number((level ^ 0).toFixed(2))) === level) {
                                $('.current-level').text(level);
                            }
                            level = parseFloat(level.toFixed(2));
                            match.finish();
                        }
                        console.log(spell);
                    }
                } else {
                    if ($('.normal .spell-key').length == 3) {
                        $('.normal .spell-key').first().remove();
                    }
                    $('<div class="spell-key ' + letter + '">' + letter + '</div>').css({
                        color: 'rgba(255,255,255,' + opacity + ')',
                        'text-shadow': '0 2px 5px rgba(0,0,0,' + opacity + ')'
                    }).appendTo('.game-spells .normal');
                }
            }
        });
    }

    return 1;
}