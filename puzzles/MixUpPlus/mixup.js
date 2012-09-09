jQuery(function(){

    var $faces = $('#faces');
    var faceName = ['U','F','L','B','R','D'];
    var faceNameMiddle = ["M","E","S"];
    var store = new Persist.Store('state');

    function genCenter( $dst ) {
        jQuery.each( faceName, function(i,v){
            var $tmp = $('<div/>');
            $tmp.addClass ('face')
                .addClass ( v + 'Color')
                .addClass ( v + '0' )
                //.html(v + '0')
                .addClass( 'faceCenter' );
            $dst.append( $tmp );
        });
    };
    function genCorner( $dst ) {
        jQuery.each( faceName, function(i,v){
            for( var num = 0; num < 4; num++ ) {
                var $tmp = $('<div/>');
                $tmp.addClass ('face')
                    .addClass ( v + 'Color')
                    .addClass ( v + (num + 1) )
                    .html( v + (num + 1) )
                    .addClass( 'faceCorner' );
                $dst.append( $tmp );
            }
        });
    };
    function genEdge( $dst ) {
        jQuery.each( faceName, function(i,v){
            for( var num = 0; num < 8; num++ ) {
                var $tmp = $('<div/>');
                var edgeIO = 'I';
                if( num % 2 == 0) edgeIO = 'O';
                var edgeXY = 'Y';
                if( Math.floor(num/2) % 2 == 1) edgeXY = 'X';
                $tmp.addClass ('face')
                    .addClass ( v + 'Color')
                    .addClass ( v + 'E' + edgeIO + (num + 1) )
                    //.html ( v + 'E' + edgeIO + (num + 1) )
                    .addClass( 'faceEdge' + edgeXY );
                $dst.append( $tmp );
            }
        });
    };
    function genMiddle( $dst ) {
        jQuery.each( faceNameMiddle, function(i,v){
            for( var num = 0; num < 28; num++ ) {
                var $tmp = $('<div/>');
                $tmp.addClass ('face')
                    .addClass ( v + 'Color')
                    .addClass ( v + num )
                    //.html ( v + num )
                    .addClass( 'tilt' + v);
                if( num < 20 ) {
                    if( (num - 2) % 5 == 0 ) {
                        $tmp.addClass('faceCenter');
                    } else if( v == "E") {
                        $tmp.addClass( 'faceEdgeY' );
                    } else if( v == "S") {
                        //console.log( "S:" + v + " => " + i);
                        if( Math.floor( num / 5) % 2 == 1) {
                            $tmp.addClass( 'faceEdgeX' );
                        } else {
                            $tmp.addClass( 'faceEdgeY' );
                        }
                    } else {
                        $tmp.addClass( 'faceEdgeX' );
                    }
                } else {
                    $tmp.removeClass( 'tilt' + v).addClass( 'tilt' + faceNameMiddle[(i+1)%faceNameMiddle.length]);
                    if( v == "S" ) {
                        $tmp.addClass( 'faceEdgeX' );
                    } else if ( v == "E") {
                        if( num % 2 == 0) {
                            $tmp.addClass( 'faceEdgeX' );
                        } else {
                            $tmp.addClass( 'faceEdgeY' );
                        }
                    } else {
                        $tmp.addClass( 'faceEdgeY' );
                    }

                }
                $dst.append( $tmp );
            }
        });
    };
    // cssTbl.
    var mag = 200;
    function applyTransform( target) {
        var faceRotate = [['X',90],['X',0],['Y',270],['X',-180],['Y',90],['X',-90]];
        var unit = 141.161356 * mag / 200; // Math.round( Math.sqrt(2) * 10000 ) / 10000;
        var margin = 5;
        var facePos = [
            [mag,mag],[mag+unit,0],[mag+unit,mag+unit],[0,mag+unit],[0,0],
            [mag+unit+mag/2,mag],[mag+unit,mag],[mag,mag+unit+mag/2],[mag,mag+unit],[0,mag],[mag/2,mag],[mag,0],[mag,mag/2]
        ];
        var originPos = mag + unit / 2 + 1; // 4 = margin分
        var pos = target.classList[2];
        if( pos == undefined ) return;

        var faceType = faceName.indexOf(pos[0]);

        var faceNameConv = {
            "E":["FEO5","FEI6","F0","FEI2","FEO1","REO5","REI6","R0","REI2","REO1",
                "BEO1","BEI2","B0","BEI6","BEO5","LEO5","LEI6","L0","LEI2","LEO1",
                "LEO3","DEO5","LEO3","DEO5","LEO3","DEO5","LEO3","DEO5"],
            "M":["FEO7","FEI8","F0","FEI4","FEO3","DEO7","DEI8","D0","DEI4","DEO3",
                "BEO7","BEI8","B0","BEI4","BEO3","UEO7","UEI8","U0","UEI4","UEO3",
                "LEO1","FEO5","LEO1","FEO5","LEO1","FEO5","LEO1","FEO5"],
            "S":["UEO5","UEI6","U0","UEI2","UEO1","REO7","REI8","R0","REI4","REO3",
                "DEO1","DEI2","D0","DEI6","DEO5", "LEO3","LEI4","L0","LEI8","LEO7",
                "FEO3","BEO3","FEO3","BEO3","FEO3","BEO3","FEO3","BEO3"]
        }
        var tiltDuo = {
            "M": ["Z","X"],
            "E": ["Y","Z"],
            "S": ["Z","Z"]
        }
        var midLetter = "";
        var midNum = 0;
        if( faceType == -1 ) { // Middleのとき.
            //console.log(pos[0] + " " + parseInt( pos.slice(1)));
            midLetter = pos[0];
            midNum = parseInt( pos.slice(1));
            pos = faceNameConv[pos[0]][parseInt( pos.slice(1))];
            faceType = faceName.indexOf(pos[0]);
        }
        var faceNum = parseInt( pos.slice(-1) );
        var facePosNum = 0;
        if( pos.length == 2 ) {
            facePosNum = faceNum;
        } else {
            facePosNum = faceNum + 4;
        }
        var tiltOpe = "";
        if( $(target).hasClass('tiltM') ) {
            tiltOpe = "rotateX(-45deg)";
        }
        if( $(target).hasClass('tiltE') ) {
            if( pos[0] == 'B') {
                tiltOpe = "rotateY(-45deg)";
            } else {
                tiltOpe = "rotateY(45deg)";
            }
        }
        if( $(target).hasClass('tiltS') ) {
            if( pos[0] == 'D') {
                tiltOpe = "rotateY(-45deg)";
            } else if( pos[0] == 'L') {
                tiltOpe = "rotateX(45deg)";
            } else if( pos[0] == 'R') {
                tiltOpe = "rotateX(-45deg)";
            } else {
                tiltOpe = "rotateY(45deg)";
            }
        }
        var tiltMid = "";
        if( midLetter != "" && midNum >= 20 ) {
            console.log( midLetter);
            tiltMid = " rotate" + tiltDuo[midLetter][midNum%2] + "(" + (45 + 90 * (Math.round(midNum/2) - 20)) + "deg) ";
        }

        $(target)
            .css('-webkit-transform-origin', originPos + 'px ' + originPos + 'px 0px')
            .css('-webkit-transform',
            'rotate' + faceRotate[faceType][0] + '(' + faceRotate[faceType][1] + 'deg)' + tiltMid + tiltOpe +
                'translate3d(' + (facePos[facePosNum][0] + margin) + 'px, ' + (facePos[facePosNum][1] + margin) + 'px, ' + originPos + 'px)');
    };
    function updateFaces (){
        jQuery.each($faces.children(), function(){
            applyTransform( this );
        });
    };
    function updateLayout(){
        jQuery.each($faces.children(), function(i,target){
            if( $(target).hasClass('faceCenter')) {
                var len = mag / 2 * Math.sqrt(2) - 10;
                $(target).css('width',len).css('height',len);
            }
            if( $(target).hasClass('faceCorner')) {
                var len = mag - 10;
                $(target).css('width',len).css('height',len);
            }
            if( $(target).hasClass('faceEdgeX')) {
                var w = mag / 2 * Math.sqrt(2) - 10;
                var h = mag / 2 - 10;
                $(target).css('width',w).css('height',h);
            }
            if( $(target).hasClass('faceEdgeY')) {
                var h = mag / 2 * Math.sqrt(2) - 10;
                var w = mag / 2 - 10;
                $(target).css('width',w).css('height',h);
            }
        });
        var len = mag * 2 + mag / 2 * Math.sqrt(2);
        $('#faces').css('width',len).css('height',len);
        $('#hint').css('width',len);

        var winWidth = $(window).width();
        var leftMargin = Math.floor( (winWidth - len) / 2 / winWidth * 100 );
        $('#cubeContainer').css('left',leftMargin + '%');
        var winHeight = $(window).width();
        var topMargin = Math.floor( (winHeight - len) / 2 / winHeight * 100 );
        $('#cubeContainer').css('top',topMargin/2 + '%');
    }

    // 面の作成-------------------
    function init(){
        genCenter($faces);
        genCorner($faces);
        genEdge($faces);
        genMiddle($faces);
        updateFaces(); // 描画処理.
        updateLayout();
    }
    init();

    var posNames = [
        "U0","U1","U2","U3","U4","F0","F1","F2","F3","F4",
        "L0","L1","L2","L3","L4","B0","B1","B2","B3","B4",
        "R0","R1","R2","R3","R4","D0","D1","D2","D3","D4",
        "UEO1","UEI2","UEO3","UEI4","UEO5","UEI6","UEO7","UEI8",
        "FEO1","FEI2","FEO3","FEI4","FEO5","FEI6","FEO7","FEI8",
        "LEO1","LEI2","LEO3","LEI4","LEO5","LEI6","LEO7","LEI8",
        "DEO1","DEI2","DEO3","DEI4","DEO5","DEI6","DEO7","DEI8",
        "BEO1","BEI2","BEO3","BEI4","BEO5","BEI6","BEO7","BEI8",
        "REO1","REI2","REO3","REI4","REO5","REI6","REO7","REI8"
    ]
    var posCodes = [

        [ 0, 2, 0],[+1,+2,-1],[+1,+2,+1],[-1,+2,+1],[-1,+2,-1],[ 0, 0, 2],[+1,+1,+2],[+1,-1,+2],[-1,-1,+2],[-1,+1,+2],
        [-2, 0, 0],[-2,+1,+1],[-2,-1,+1],[-2,-1,-1],[-2,+1,-1],[ 0, 0,-2],[+1,+1,-2],[+1,-1,-2],[-1,-1,-2],[-1,+1,-2],
        [ 2, 0, 0],[+2,+1,+1],[+2,-1,+1],[+2,-1,-1],[+2,+1,-1],[ 0,-2, 0],[+1,-2,-1],[+1,-2,+1],[-1,-2,+1],[-1,-2,-1],
        [+1,+3, 0],[+2,+3, 0],[ 0,+3,+1],[ 0,+3,+2],[-1,+3, 0],[-2,+3, 0],[ 0,+3,-1],[ 0,+3,-2],
        [+1, 0,+3],[+2, 0,+3],[ 0,-1,+3],[ 0,-2,+3],[-1, 0,+3],[-2, 0,+3],[ 0,+1,+3],[ 0,+2,+3],
        [-3, 0,+1],[-3, 0,+2],[-3,-1, 0],[-3,-2, 0],[-3, 0,-1],[-3, 0,-2],[-3,+1, 0],[-3,+2, 0],
        [+1,-3, 0],[+2,-3, 0],[ 0,-3,+1],[ 0,-3,+2],[-1,-3, 0],[-2,-3, 0],[ 0,-3,-1],[ 0,-3,-2],
        [+1, 0,-3],[+2, 0,-3],[ 0,-1,-3],[ 0,-2,-3],[-1, 0,-3],[-2, 0,-3],[ 0,+1,-3],[ 0,+2,-3],
        [+3, 0,+1],[+3, 0,+2],[+3,-1, 0],[+3,-2, 0],[+3, 0,-1],[+3, 0,-2],[+3,+1, 0],[+3,+2, 0]
    ]
    var targetFaces = {
        "U":["U0","U2","U3","U4","U1","UEO3","UEI4","UEO5","UEI6","UEO7","UEI8","UEO1","UEI2",
            "L1","B3","R1","F1","L4","B2","R4","F4","LEO7","BEO3","REO7","FEO7","LEI8","BEI4","REI8","FEI8",
            "S19","S18","S17","S16","M14","M13","M12","M11","S0","S1","S2","S3","M15","M16","M17","M18",
            "S26","S23","M20","M25","S21","S20","M23","M22"],
        "UP" :["U0","U1","U2","U3","U4","UEO1","UEI2","UEO3","UEI4","UEO5","UEI6","UEO7","UEI8",
            "F1","L1","B3","R1","F4","L4","B2","R4","FEO7","LEO7","BEO3","REO7","FEI8","LEI8","BEI4","REI8",
            "M15","M16","M17","M18","S19","S18","S17","S16","M14","M13","M12","M11","S0","S1","S2","S3",
            "M23","M22","S26","S23","M20","M25","S21","S20"],
        "F":["F0","F2","F3","F4","F1","FEO3","FEI4","FEO5","FEI6","FEO7","FEI8","FEO1","FEI2",
            "R4","REO5","REI6","R3","D1","DEO7","DEI8","D4","L2","LEO1","LEI2","L1","U3","UEO3","UEI4","U2",
            "E19","E18","E17","E16","M19","M18","M17","M16","E0","E1","E2","E3","M0","M1","M2","M3",
            "E26","E25","M21","M24","E23","E24","M22","M23"],
        "FP" :["F0","F1","F2","F3","F4","FEO1","FEI2","FEO3","FEI4","FEO5","FEI6","FEO7","FEI8",
            "U3","UEO3","UEI4","U2","R4","REO5","REI6","R3","D1","DEO7","DEI8","D4","L2","LEO1","LEI2","L1",
            "M0","M1","M2","M3","E19","E18","E17","E16","M19","M18","M17","M16","E0","E1","E2","E3",
            "M22","M23","E26","E25","M21","M24","E23","E24"],
        "L":["L0","L2","L3","L4","L1","LEO3","LEI4","LEO5","LEI6","LEO7","LEI8","LEO1","LEI2",
            "F4","FEO5","FEI6","F3","D4","DEO5","DEI6","D3","B4","BEO5","BEI6","B3","U4","UEO5","UEI6","U3",
            "E14","E13","E12","E11","S15","S16","S17","S18","E15","E16","E17","E18","S14","S13","S12","S11",
            "E24","E23","S24","S25","E21","E22","S23","S26"],
        "LP" :["L0","L1","L2","L3","L4","LEO1","LEI2","LEO3","LEI4","LEO5","LEI6","LEO7","LEI8",
            "U4","UEO5","UEI6","U3","F4","FEO5","FEI6","F3","D4","DEO5","DEI6","D3","B4","BEO5","BEI6","B3",
            "S14","S13","S12","S11","E14","E13","E12","E11","S15","S16","S17","S18","E15","E16","E17","E18",
            "S23","S26","E24","E23","S24","S25","E21","E22"],
        "B":["B0","B2","B3","B4","B1","BEO3","BEI4","BEO5","BEI6","BEO7","BEI8","BEO1","BEI2",
            "L4","LEO5","LEI6","L3","D3","DEO3","DEI4","D2","R2","REO1","REI2","R1","U1","UEO7","UEI8","U4",
            "E9","E8","E7","E6","M10","M11","M12","M13","E10","E11","E12","E13","M9","M8","M7","M6",
            "E22","E21","M26","M27","E27","E20", "M25","M20"],
        "BP" :["B0","B1","B2","B3","B4","BEO1","BEI2","BEO3","BEI4","BEO5","BEI6","BEO7","BEI8",
            "U1","UEO7","UEI8","U4","L4","LEO5","LEI6","L3","D3","DEO3","DEI4","D2","R2","REO1","REI2","R1",
            "M9","M8","M7","M6","E9","E8","E7","E6","M10","M11","M12","M13","E10","E11","E12","E13",
            "M25","M20","E22","E21","M26","M27","E27","E20"],
        "R":["R0","R2","R3","R4","R1","REO3","REI4","REO5","REI6","REO7","REI8","REO1","REI2",
            "B2","BEO1","BEI2","B1","D2","DEO1","DEI2","D1","F2","FEO1","FEI2","F1","U2","UEO1","UEI2","U1",
            "E4","E3","E2","E1","S4","S3","S2","S1","E5","E6","E7","E8","S5","S6","S7","S8",
            "E20","E27","S27","S22","E25","E26","S20","S21"],
        "RP" :["R0","R1","R2","R3","R4","REO1","REI2","REO3","REI4","REO5","REI6","REO7","REI8",
            "U2","UEO1","UEI2","U1","B2","BEO1","BEI2","B1","D2","DEO1","DEI2","D1","F2","FEO1","FEI2","F1",
            "S5","S6","S7","S8","E4","E3","E2","E1","S4","S3","S2","S1","E5","E6","E7","E8",
            "S20","S21","E20","E27","S27","S22","E25","E26"],
        "D":["D0","D2","D3","D4","D1","DEO3","DEI4","DEO5","DEI6","DEO7","DEI8","DEO1","DEI2",
            "R3","REO3","REI4","R2","B1","BEO7","BEI8","B4","L3","LEO3","LEI4","L2","F3","FEO3","FEI4","F2",
            "S10","S11","S12","S13","M4","M3","M2","M1","S9","S8","S7","S6","M5","M6","M7","M8",
            "S22","S27","M27","M26","S25","S24","M24","M21"],
        "DP" :["D0","D1","D2","D3","D4","DEO1","DEI2","DEO3","DEI4","DEO5","DEI6","DEO7","DEI8",
            "F3","FEO3","FEI4","F2","R3","REO3","REI4","R2","B1","BEO7","BEI8","B4","L3","LEO3","LEI4","L2",
            "M5","M6","M7","M8","S10","S11","S12","S13","M4","M3","M2","M1","S9","S8","S7","S6",
            "M24","M21","S22","S27","M27","M26","S25","S24"],
        "E"  :["REO5","REI6","R0","REI2","REO1","BEO1","BEI2","B0","BEI6","BEO5",
            "LEO5","LEI6","L0","LEI2","LEO1","FEO5","FEI6","F0","FEI2","FEO1",
            "E0","E1","E2","E3","E4","E5","E6","E7","E8","E9",
            "E10","E11","E12","E13","E14","E15","E16","E17","E18","E19",
            "E26","E25","S4","S5","E20","E27","M10","M9","E22","E21","S15","S14","E24","E23","M19","M0"],
        "EP":["E0","E1","E2","E3","E4","E5","E6","E7","E8","E9",
            "E10","E11","E12","E13","E14","E15","E16","E17","E18","E19",
            "FEO5","FEI6","F0","FEI2","FEO1","REO5","REI6","R0","REI2","REO1",
            "BEO1","BEI2","B0","BEI6","BEO5","LEO5","LEI6","L0","LEI2","LEO1",
            "M19","M0","E26","E25","S4","S5","E20","E27","M10","M9","E22","E21","S15","S14","E24","E23"],
        "M":["M0","M1","M2","M3","M4","M5","M6","M7","M8","M9",
            "M10","M11","M12","M13","M14","M15","M16","M17","M18","M19",
            "DEO7","DEI8","D0","DEI4","DEO3","BEO7","BEI8","B0","BEI4","BEO3",
            "UEO7","UEI8","U0","UEI4","UEO3","FEO7","FEI8","F0","FEI4","FEO3",
            "E19","E0","M24","M21","S10","S9","M26","M27","E10","E9","M20","M25","S19","S0","M22","M23"],
        "MP":["FEO7","FEI8","F0","FEI4","FEO3","DEO7","DEI8","D0","DEI4",
            "DEO3","BEO7","BEI8","B0","BEI4","BEO3","UEO7","UEI8","U0","UEI4","UEO3",
            "M0","M1","M2","M3","M4","M5","M6","M7","M8","M9",
            "M10","M11","M12","M13","M14","M15","M16","M17","M18","M19",
            "M22","M23","E19","E0","M24","M21","S10","S9","M26","M27","E10","E9","M20","M25","S19","S0"],
        "S":["S0","S1","S2","S3","S4","S5","S6","S7","S8","S9",
            "S10","S11","S12","S13","S14","S15","S16","S17","S18","S19",
            "REO7","REI8","R0","REI4","REO3","DEO1","DEI2","D0","DEI6","DEO5",
            "LEO3","LEI4","L0","LEI8","LEO7","UEO5","UEI6","U0","UEI2","UEO1",
            "S21","S20","E5","E4","S27","S22","M5","M4","S25","S24","E14","E15","S23","S26","M14","M15"],
        "SP":["UEO5","UEI6","U0","UEI2","UEO1","REO7","REI8","R0","REI4","REO3",
            "DEO1","DEI2","D0","DEI6","DEO5", "LEO3","LEI4","L0","LEI8","LEO7",
            "S0","S1","S2","S3","S4","S5","S6","S7","S8","S9",
            "S10","S11","S12","S13","S14","S15","S16","S17","S18","S19",
            "M14","M15","S21","S20","E5","E4","S27","S22","M5","M4","S25","S24","E14","E15","S23","S26"]
    }
    var targetFacesTilt = {
        "U" :["LEI4","L0","LEI8","LEO7","UEO5","UEI6","U0","UEI2",
            "BEI8","B0","BEI4","BEO3","UEO7","UEI8","U0","UEI4"],
        "UP":["BEI8","B0","BEI4","BEO3","UEO7","UEI8","U0","UEI4",
            "UEI2","U0","UEI6","UEO5","LEO7","LEI8","L0","LEI4"]
    }
    var targetPositions = {
        "U":["U","UP"],
        "UP":["UP","U"],
        "F":["F","FP"],
        "FP":["FP","F"],
        "L":["L","LP"],
        "LP":["LP","L"],
        "B":["B","BP"],
        "BP":["BP","B"],
        "R":["R","RP"],
        "RP":["RP","R"],
        "D":["D","DP"],
        "DP":["DP","D"],
        "E":["E","EP"],
        "EP":["EP","E"],
        "S":["S","SP"],
        "SP":["SP","S"],
        "M":["M","MP"],
        "MP":["MP","M"]
    }

    function getNewPosName(name,turnType) {
        var targetPos = targetPositions[turnType];
        var index = targetFaces[targetPos[0]].indexOf( name );
        return targetFaces[targetPos[1]][index];
    }

    function changeEdgeType(turnType, $target) {
        var namePos = faceName.indexOf($target[0].classList[1][0]);
        if( namePos == -1) return;
        if( faceName[namePos] == turnType[0] || turnType[0] == "F" || turnType[0] == "B" || turnType[0] == "S" ) {
            var edgeType = $target[0].classList[3];
            if( edgeType == "faceEdgeX") {
                $target[0].className = $target[0].className.replace("faceEdgeX","faceEdgeY");
            }
            if( edgeType == "faceEdgeY") {
                $target[0].className = $target[0].className.replace("faceEdgeY","faceEdgeX");
            }
        }
    }

    function changeEdgeTypeMiddle(turnType, $target) {

        var edgeType = $target[0].classList[3];
        if( edgeType == "faceEdgeX") {
            $target[0].className = $target[0].className.replace("faceEdgeX","faceEdgeY");
        }
        if( edgeType == "faceEdgeY") {
            $target[0].className = $target[0].className.replace("faceEdgeY","faceEdgeX");
        }

    }

    function replaceClass(pre,after,$target, colorTbl) {
        // $facesから該当するクラスのdivを取得してclassを置き換え.
        var tmpClassName = $target[0].className;
        tmpClassName = tmpClassName.replace(colorTbl[pre], colorTbl[after]);
        $target[0].className = tmpClassName;
    }

    var history = [];
    var exceptionTurn = ['u','uP','f','fP','r','rP'];
    var exceptionTurnTable = {
        'u':['U','EP','EP','DP'],
        'uP':['UP','E','E','D'],
        'f':['F','S','S','BP'],
        'fP':['FP','SP','SP','B'],
        'r':['R','MP','MP','LP'],
        'rP':['RP','M','M','L']
    }
    function turn( turnType ) {
        if( turnType != "undo" ) {
            var turnIndex = exceptionTurn.indexOf(turnType);
            if( turnIndex != -1 ) {
                for( var i = 0; i < exceptionTurnTable[exceptionTurn[turnIndex]].length; i++ ){
                    turn(exceptionTurnTable[exceptionTurn[turnIndex]][i]);
                }
                return;
            } else {
                history.push(turnType);
            }
        } else if( history.length > 0 ){
            turnType = history.pop();
            if( turnType.indexOf("P") != -1 ) {
                turnType = turnType[0];
            } else {
                turnType += "P";
            }
        }
        var colorTbl = {};
        // 関係するfaceを取得.
        var targetFace = targetFaces[turnType];
        // 実回転処理.
        jQuery.each( $faces.children(), function(){
            var targetName = this.classList[2];
            var index = targetFace.indexOf( targetName );
            if( index == -1) return;
            colorTbl[targetFace[index]] = this.classList[1];
        });

        jQuery.each( $faces.children(), function(i,v){
            var targetName = this.classList[2];
            var index = targetFace.indexOf( targetName );
            if( index == -1) return;
            var newName = getNewPosName(targetFace[index],turnType);
            //changeEdgeType(turnType, $(this));
            if( targetFace[index] != newName ) {
                replaceClass(targetFace[index],newName, $(this), colorTbl);
                applyTransform($(this)[0]);
            }
        });
    }

    var turns = faceName.slice();
    jQuery.merge( turns, faceNameMiddle );
    $('body').keyup(function(e){
        console.log(e.which);
        if( keyTable[e.which] == undefined ) {
            if(e.which == 32) { // spaceのとき
                if( isFinish() ) {
                    for( var i = 0; i < 100; i++ ){
                        turn( turns[Math.floor(Math.random()*turns.length)] );
                    }
                    $('#hint').addClass('off');
                }
            }
            return;
        }
        turn( keyTable[e.which] );
        if( isFinish() ) {
            $('#hint').removeClass('off');
        } else {
            $('#hint').addClass('off');
        }
    });

    function isFinish(){
        var $check = $('.FColor,.UColor,.LColor,.BColor,.DColor,.RColor');
        if( $check.hasClass("tiltE") || $check.hasClass("tiltE") || $check.hasClass("tiltE") ) {
            return false;
        }
        for(var i = 0; i < faceName.length; i++ ){
            var $color = $('.'+faceName[i]+"Color");
            var checkLetter = $color[0].classList[2][0];
            for( var j = 0; j < $color.length;j++ ){
                if( checkLetter != $color[j].classList[2][0] ) {
                    return false;
                }
            }
        }
        return true;
    }

    // controlパネル関連----------------------------
    var isShow = true;
    $("button[name='toggle']").click(function(){
        $('#panel').slideToggle();
        if( isShow ) {
            isShow = false;
            setTimeout(function(){
                $('#control').css('background','rgba(0,0,0,0.0)');
            },500);
        } else {
            isShow = true;
            $('#control').css('background','rgba(0,0,0,0.5)');
        }
    });
    $('#mag').change(function(){
        mag = parseInt( this.value );

        updateFaces();
        updateLayout();
    });
    jQuery.bind("resize",updateLayout());

    var viewRange = 1200;
    $('#viewRange').change(function(){
        viewRange = parseInt( this.value);
        $('#cubeViewPort').css('-webkit-perspective',viewRange + 'px');
    })
    $("button[name='reset']").click(function(){
        jQuery.each( $faces.children(), function(){
            $(this).remove();
        })
        init();
        $('#hint').removeClass('off');
    });
    var keyTable = {
        74:"B",87:"BP",75:"D",77:"DP",190:"E",67:"EP",84:"F",69:"FP",79:"L",65:"LP",73:"M",68:"MP",
        83:"R",78:"RP",71:"S",80:"SP",72:"U",85:"UP",27:"undo",55:'fP',86:'r',81:'rP',90:"u",187:"uP",
        76:"f",55:'fP'
    };
    // 前回の設定.
    store.get('keyTable', function(ok, val) {
        if (ok) {
            jQuery.each( val.split(','), function(i,v){
                var tmp = v.split(':');
                keyTable[tmp[0]] = tmp[1];
                $('select[name=' + tmp[1] +']').val( tmp[0]);
            });
        }
    });
    $('select').change(function(){
        keyTable[parseInt(this.value)] = this.name;
        var keyTableString = "";
        jQuery.each( keyTable, function(i,v){
            keyTableString += i + ':' + v + ',';
        });
        store.set('keyTable', keyTableString);
    });
    $('#backFace').click(function(){
        if( this.checked ) {
            $('.face').css('-webkit-backface-visibility','visible');
        } else {
            $('.face').css('-webkit-backface-visibility','hidden');
        }
    })

    // 回転時処理---------------------------------------------------
    document.querySelector('#cubeViewPort').addEventListener("mousemove", mouseOver, false);
    var lastX = 270, offsetX = 0;
    var lastY = 270, offsetY = 0;
    function mouseOver(e){
        var y = (e.pageX - offsetX) * 1 + 90,
            x = (e.pageY - offsetY) * -1 - 90;

        if( $('#rotate').attr('checked') ){
            rotate(x,y);
            lastX = e.pageX - offsetX;
            lastY = e.pageY - offsetY;
        }
    }
    // 回転実処理------------------------------------------------------------
    function rotate(newX,newY){
        var x = parseInt((newX || 0)),
            y = parseInt((newY || 0)),
            cube = document.getElementById('faces');

        cube.style.webkitTransform = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
        cube.style.MozTransform = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
        //cube.style.transform = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
    }
    // キューブがクリックされたとき最後のクリック位置情報からoffsetを取得
    $('#cubeViewPort').click(function(e){
        $('#rotate').trigger('click');
        offsetX = e.pageX - lastX;
        offsetY = e.pageY - lastY;
    });
});