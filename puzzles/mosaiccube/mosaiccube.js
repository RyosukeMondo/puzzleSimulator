// 座標.
var X = 0;
var Y = 1;

// 回転の指定.
var axis = 0;
var deg = 1;

// class名 RC1の位置.
var facePos = 0;
var faceKind = 1;

jQuery(function(){
    var $faces = $('#faces');
    var faceName = ['U','F','L','B','R','D'];
    var store = new Persist.Store('state');

    function genCenter( $dst ) {
        jQuery.each( faceName, function(i,v){
            for( var num = 0; num < 4; num++ ) {
                var $tmp = $('<div/>');
                var name = v + 'T' + num;
                $tmp.addClass ('face')
                    .addClass ( v + 'Color')
                    .addClass ( name )
                    //.html( name )
                    .addClass( 'faceCenter' );
                $dst.append( $tmp );
            }
        });
    };
    function genCenterOuter( $dst ) {
        jQuery.each( faceName, function(i,v){
            for( var num = 0; num < 8; num++ ) {
                var $tmp = $('<div/>');
                var name = v + 'O' + num;
                $tmp.addClass ('face')
                    .addClass ( v + 'Color')
                    .addClass ( name )
                    //.html( name )
                    .addClass( 'faceCenterOuter' );
                $dst.append( $tmp );
            }
        });
    };
    function genCorner( $dst ) {
        jQuery.each( faceName, function(i,v){
            for( var num = 0; num < 4; num++ ) {
                var $tmp = $('<div/>');
                var faceName =  v + "C" + (num + 1);
                $tmp.addClass ('face')
                    .addClass ( v + 'Color')
                    .addClass ( faceName )
                    .html( faceName )
                    .addClass( 'faceCorner' );
                $dst.append( $tmp );
            }
        });
    };
    function genEdge( $dst ) {
        jQuery.each( faceName, function(i,v){
            for( var num = 0; num < 8; num++ ) {
                var $tmp = $('<div/>');
                var label = v + 'E' + num;
                $tmp.addClass ('face')
                    .addClass ( v + 'Color')
                    .addClass ( label )
                    //.html ( label )
                    .addClass( 'faceEdge' );
                $dst.append( $tmp );
            }
        });
    };
    // cssTbl.
    var mag = 100;
    function applyTransform( target) {
        var faceRotate = [['X',90],['X',0],['Y',270],['X',-180],['Y',90],['X',-90]];
        var unit = 141.161356 * mag / 200; // Math.round( Math.sqrt(2) * 10000 ) / 10000;
        var margin = 5;
        var facePosition = {
            "T":[[mag*1.25,mag*1.25],[mag*2.03,mag*1.24],[mag*2.03,mag*2.01],[mag*1.25,mag*2.03]],
            "C":[[mag,mag],[mag*3,0],[mag*3,mag*3],[0,mag*3],[0,0]],
            "O":[[mag*0.385,mag*1.11],[mag*1.1,mag*0.4],[mag*2.06,mag*0.4],[mag*2.8,mag*1.1],          //[mag*0.5,mag*1.2]  [mag*0.385,mag*1.11]
                [mag*2.8,mag*2.1],[mag*2.1,mag*2.8],[mag*1.09,mag*2.8],[mag*0.375,mag*2.07]],
            "E":[[mag*3,mag],[mag*3,mag*2],[mag*2,mag*3],[mag,mag*3],[0,mag*2],[0,mag],[mag,0],[mag*2,0]]
        }

        var originPos = mag * 2 + 1; // 4 = margin分
        var label = target.classList[2];
        if( label == undefined ) return;
        var facePosOffset = parseInt( label.slice(-1) );
        var faceType = faceName.indexOf(label[facePos]);
        var rotateZForCenter = "";
        if( label[faceKind] == "T" || label[faceKind] == "O" ) {
            rotateZForCenter = "rotateZ(45deg)";
        }

        var cssOpe = 'rotate' + faceRotate[faceType][axis] + '(' + faceRotate[faceType][deg] + 'deg)' +
            rotateZForCenter +
            'translate3d(' + (facePosition[label[faceKind]][facePosOffset][X] + margin) + 'px, ' +
            (facePosition[label[faceKind]][facePosOffset][Y] + margin) + 'px, ' + originPos + 'px)';
        $(target)
            .css('-webkit-transform-origin', originPos + 'px ' + originPos + 'px 0px')
            .css('-moz-transform-origin', originPos + 'px ' + originPos + 'px 0px')
            .css('-ms-transform-origin', originPos + 'px ' + originPos + 'px 0px')
            .css('-o-transform-origin', originPos + 'px ' + originPos + 'px 0px')
            .css('-webkit-transform',cssOpe)
            .css('-moz-transform',cssOpe)
            .css('-ms-transform',cssOpe)
            .css('-o-transform',cssOpe);
    };
    function updateFaces (){
        jQuery.each($faces.children(), function(){
            applyTransform( this );
        });
    };
    function updateLayout(){
        jQuery.each($faces.children(), function(i,target){
            if( $(target).hasClass('faceCenter')) {
                var len = mag * Math.sqrt(2) / 2 - 5;
                $(target).css('width',len).css('height',len);
            }
            if( $(target).hasClass('faceCenterOuter')) {
                var magCenterOuter =  mag + Math.sqrt((mag - 100));
                var len = mag * Math.sqrt(2) / 2;
                $(target).css('width',len).css('height',len);
            }
            if( $(target).hasClass('faceCorner')) {
                var len = mag - 10;
                $(target).css('width',len).css('height',len);
            }
            if( $(target).hasClass('faceEdge')) {
                var h = mag - 10;
                var w = mag - 10;
                $(target).css('width',w).css('height',h);
            }
        });
        var len = mag * 4;
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
    function initCube(){
        genCenter($faces);
        genCenterOuter($faces);
        genCorner($faces);
        genEdge($faces);
        updateFaces(); // 描画処理.
        updateLayout();
        getLastColorSetting();
    }

    var targetFaces = {
        "F0":["UC2","RC4","FC1"],
        "F0P":["FC1","UC2","RC4"],
        "F1":["UE1","UO3","UE2","UO4","FE7","FO1","FE0","FO2","RE5","RO7","RE6","RO0"],
        "F1P":["FE7","FO1","FE0","FO2","RE5","RO7","RE6","RO0","UE1","UO3","UE2","UO4"],
        "F2":["UE0","UO2","UT1","UT2","UO5","UE3","FE6","FO0","FT0","FT1","FO3","FE1","RE4","RO6","RT3","RT0","RO1","RE7"],
        "F2P":["FE6","FO0","FT0","FT1","FO3","FE1","RE4","RO6","RT3","RT0","RO1","RE7","UE0","UO2","UT1","UT2","UO5","UE3"],
        "f0":["DC1","RC3","FC2"],
        "f0P":["RC3","FC2","DC1"],
        "f1":["DE7","DO1","DO2","DE0","RE3","RO5","RO6","RE4","FE1","FO3","FO4","FE2"],
        "f1P":["RE3","RO5","RO6","RE4","FE1","FO3","FO4","FE2","DE7","DO1","DO2","DE0"],
        "f2":["DE6","DO0","DT0","DT1","DO3","DE1","RE2","RO4","RT2","RT3","RO7","RE5","FE0","FO2","FT1","FT2","FO5","FE3"],
        "f2P":["RE2","RO4","RT2","RT3","RO7","RE5","FE0","FO2","FT1","FT2","FO5","FE3","DE6","DO0","DT0","DT1","DO3","DE1"],
        "L0":["UC3","LC1","FC4"],
        "L0P":["LC1","FC4","UC3"],
        "L1":["UE3","UO5","UO6","UE4","LE7","LO1","LO2","LE0","FE5","FO7","FO0","FE6"],
        "L1P":["LE7","LO1","LO2","LE0","FE5","FO7","FO0","FE6","UE3","UO5","UO6","UE4"],
        "L2":["UE2","UO4","UT2","UT3","UO7","UE5","LE6","LO0","LT0","LT1","LO3","LE1","FE4","FO6","FT3","FT0","FO1","FE7"],
        "L2P":["LE6","LO0","LT0","LT1","LO3","LE1","FE4","FO6","FT3","FT0","FO1","FE7","UE2","UO4","UT2","UT3","UO7","UE5"],
        "l0":["DC4","FC3","LC2"],
        "l0P":["FC3","LC2","DC4"],
        "l1":["DE5","DO7","DO0","DE6","FE3","FO5","FO6","FE4","LE1","LO3","LO4","LE2"],
        "l1P":["FE3","FO5","FO6","FE4","LE1","LO3","LO4","LE2","DE5","DO7","DO0","DE6"],
        "l2":["DE4","DO6","DT3","DT0","DO1","DE7","FE2","FO4","FT2","FT3","FO7","FE5","LE0","LO2","LT1","LT2","LO5","LE3"],
        "l2P":["FE2","FO4","FT2","FT3","FO7","FE5","LE0","LO2","LT1","LT2","LO5","LE3","DE4","DO6","DT3","DT0","DO1","DE7"],
        "R0":["UC1","RC1","BC2"],
        "R0P":["RC1","BC2","UC1"],
        "R1":["RE7","RO1","RO2","RE0","BE1","BO3","BO4","BE2","UE7","UO1","UO2","UE0"],
        "R1P":["BE1","BO3","BO4","BE2","UE7","UO1","UO2","UE0","RE7","RO1","RO2","RE0"],
        "R2":["UE6","UO0","UT0","UT1","UO3","UE1","RE6","RO0","RT0","RT1","RO3","RE1","BE0","BO2","BT1","BT2","BO5","BE3"],
        "R2P":["RE6","RO0","RT0","RT1","RO3","RE1","BE0","BO2","BT1","BT2","BO5","BE3","UE6","UO0","UT0","UT1","UO3","UE1"],
        "r0":["DC2","BC1","RC2"],
        "r0P":["BC1","RC2","DC2"],
        "r1":["DE1","DO3","DO4","DE2","BE7","BO1","BO2","BE0","RE1","RO3","RO4","RE2"],
        "r1P":["BE7","BO1","BO2","BE0","RE1","RO3","RO4","RE2","DE1","DO3","DO4","DE2"],
        "r2":["DE0","DO2","DT1","DT2","DO5","DE3","BE6","BO0","BT0","BT1","BO3","BE1","RE0","RO2","RT1","RT2","RO5","RE3"],
        "r2P":["BE6","BO0","BT0","BT1","BO3","BE1","RE0","RO2","RT1","RT2","RO5","RE3","DE0","DO2","DT1","DT2","DO5","DE3"],
        "B0":["UC4","BC3","LC4"],
        "B0P":["BC3","LC4","UC4"],
        "B1":["UE5","UO7","UO0","UE6","BE3","BO5","BO6","BE4","LE5","LO7","LO0","LE6"],
        "B1P":["BE3","BO5","BO6","BE4","LE5","LO7","LO0","LE6","UE5","UO7","UO0","UE6"],
        "B2":["UE4","UO6","UT3","UT0","UO1","UE7","BE2","BO4","BT2","BT3","BO7","BE5","LE4","LO6","LT3","LT0","LO1","LE7"],
        "B2P":["BE2","BO4","BT2","BT3","BO7","BE5","LE4","LO6","LT3","LT0","LO1","LE7","UE4","UO6","UT3","UT0","UO1","UE7"],
        "b0":["DC3","LC3","BC4"],
        "b0P":["LC3","BC4","DC3"],
        "b1":["DE3","DO5","DO6","DE4","LE3","LO5","LO6","LE4","BE5","BO7","BO0","BE6"],
        "b1P":["LE3","LO5","LO6","LE4","BE5","BO7","BO0","BE6","DE3","DO5","DO6","DE4"],
        "b2":["DE2","DO4","DT2","DT3","DO7","DE5","LE2","LO4","LT2","LT3","LO7","LE5","BE4","BO6","BT3","BT0","BO1","BE7"],
        "b2P":["LE2","LO4","LT2","LT3","LO7","LE5","BE4","BO6","BT3","BT0","BO1","BE7","DE2","DO4","DT2","DT3","DO7","DE5"],
        "X":["RC1","RC4","RC3","RC2",
            "RE7","RE6","RE5","RE4","RE3","RE2","RE1","RE0",
            "RO1","RO0","RO7","RO6","RO5","RO4","RO3","RO2",
            "RT0","RT3","RT2","RT1",
            "UC4","UE6","UE7","UC1","UO0","UO1","UE5","UO7","UT0","UO2","UE0","UT3","UT1","UE4","UO6","UT2","UO3","UE1","UC3","UE3","UO5","UE2","UO4","UC2",
            "FC4","FE6","FE7","FC1","FO0","FO1","FE5","FO7","FT0","FO2","FE0","FT3","FT1","FE4","FO6","FT2","FO3","FE1","FC3","FE3","FO5","FE2","FO4","FC2",
            "DC4","DE6","DE7","DC1","DO0","DO1","DE5","DO7","DT0","DO2","DE0","DT3","DT1","DE4","DO6","DT2","DO3","DE1","DC3","DE3","DO5","DE2","DO4","DC2",
            "BC4","BE6","BE7","BC1","BO0","BO1","BE5","BO7","BT0","BO2","BE0","BT3","BT1","BE4","BO6","BT2","BO3","BE1","BC3","BE3","BO5","BE2","BO4","BC2",
            "LC4","LC3","LC2","LC1",
            "LE5","LE4","LE3","LE2","LE1","LE0","LE7","LE6",
            "LO7","LO6","LO5","LO4","LO3","LO2","LO1","LO0",
            "LT3","LT2","LT1","LT0"
        ],
        "XP":["RC4","RC3","RC2","RC1",
            "RE5","RE4","RE3","RE2","RE1","RE0","RE7","RE6",
            "RO7","RO6","RO5","RO4","RO3","RO2","RO1","RO0",
            "RT3","RT2","RT1","RT0",
            "FC4","FE6","FE7","FC1","FO0","FO1","FE5","FO7","FT0","FO2","FE0","FT3","FT1","FE4","FO6","FT2","FO3","FE1","FC3","FE3","FO5","FE2","FO4","FC2",
            "DC4","DE6","DE7","DC1","DO0","DO1","DE5","DO7","DT0","DO2","DE0","DT3","DT1","DE4","DO6","DT2","DO3","DE1","DC3","DE3","DO5","DE2","DO4","DC2",
            "BC4","BE6","BE7","BC1","BO0","BO1","BE5","BO7","BT0","BO2","BE0","BT3","BT1","BE4","BO6","BT2","BO3","BE1","BC3","BE3","BO5","BE2","BO4","BC2",
            "UC4","UE6","UE7","UC1","UO0","UO1","UE5","UO7","UT0","UO2","UE0","UT3","UT1","UE4","UO6","UT2","UO3","UE1","UC3","UE3","UO5","UE2","UO4","UC2",
            "LC1","LC4","LC3","LC2",
            "LE7","LE6","LE5","LE4","LE3","LE2","LE1","LE0",
            "LO1","LO0","LO7","LO6","LO5","LO4","LO3","LO2",
            "LT0","LT3","LT2","LT1"
        ],
        "Y":["FC1","FC4","FC3","FC2",
            "FE7","FE6","FE5","FE4","FE3","FE2","FE1","FE0",
            "FO1","FO0","FO7","FO6","FO5","FO4","FO3","FO2",
            "FT0","FT3","FT2","FT1",
            "UC4","UE6","UE7","UC1","UO0","UO1","UE5","UO7","UT0","UO2","UE0","UT3","UT1","UE4","UO6","UT2","UO3","UE1","UC3","UE3","UO5","UE2","UO4","UC2",
            "LC3","LE4","LE5","LC4","LO6","LO7","LE3","LO5","LT3","LO0","LE6","LT2","LT0","LE2","LO4","LT1","LO1","LE7","LC2","LE1","LO3","LE0","LO2","LC1",
            "DC2","DE2","DE3","DC3","DO4","DO5","DE1","DO3","DT2","DO6","DE4","DT1","DT3","DE0","DO2","DT0","DO7","DE5","DC1","DE7","DO1","DE6","DO0","DC4",
            "RC1","RE0","RE1","RC2","RO2","RO3","RE7","RO1","RT1","RO4","RE2","RT0","RT2","RE6","RO0","RT3","RO5","RE3","RC4","RE5","RO7","RE4","RO6","RC3",
            "BC4","BC3","BC2","BC1",
            "BE5","BE4","BE3","BE2","BE1","BE0","BE7","BE6",
            "BO7","BO6","BO5","BO4","BO3","BO2","BO1","BO0",
            "BT3","BT2","BT1","BT0"
        ],
        "YP":["FC4","FC3","FC2","FC1",
            "FE5","FE4","FE3","FE2","FE1","FE0","FE7","FE6",
            "FO7","FO6","FO5","FO4","FO3","FO2","FO1","FO0",
            "FT3","FT2","FT1","FT0",
            "LC3","LE4","LE5","LC4","LO6","LO7","LE3","LO5","LT3","LO0","LE6","LT2","LT0","LE2","LO4","LT1","LO1","LE7","LC2","LE1","LO3","LE0","LO2","LC1",
            "DC2","DE2","DE3","DC3","DO4","DO5","DE1","DO3","DT2","DO6","DE4","DT1","DT3","DE0","DO2","DT0","DO7","DE5","DC1","DE7","DO1","DE6","DO0","DC4",
            "RC1","RE0","RE1","RC2","RO2","RO3","RE7","RO1","RT1","RO4","RE2","RT0","RT2","RE6","RO0","RT3","RO5","RE3","RC4","RE5","RO7","RE4","RO6","RC3",
            "UC4","UE6","UE7","UC1","UO0","UO1","UE5","UO7","UT0","UO2","UE0","UT3","UT1","UE4","UO6","UT2","UO3","UE1","UC3","UE3","UO5","UE2","UO4","UC2",
            "BC1","BC4","BC3","BC2",
            "BE7","BE6","BE5","BE4","BE3","BE2","BE1","BE0",
            "BO1","BO0","BO7","BO6","BO5","BO4","BO3","BO2",
            "BT0","BT3","BT2","BT1"
        ]
    }
    jQuery.each( targetFaces, function(turnName){
        if( turnName[1] == "1" || turnName[1] == "2" ) {
            var target = turnName.replace( turnName[1], parseInt( turnName[1] ) - 1 );
            jQuery.merge( targetFaces[turnName], targetFaces[target]);
        }
    });

    var targetPositions = {}; // F0 -> F0P ...　の連想配列を作成.
    jQuery.each( targetFaces, function(turnName) {
        if( turnName.indexOf("P") != -1) {
            targetPositions[turnName] = [turnName, turnName.replace("P","")];
        } else {
            targetPositions[turnName] = [turnName, turnName + "P"];
        }
    });

    function getNewPosName(name,turnType) {
        var targetPos = targetPositions[turnType];
        var index = targetFaces[targetPos[0]].indexOf( name );
        return targetFaces[targetPos[1]][index];
    }

    function replaceClass(pre,after,$target, colorTbl) {
        // $facesから該当するクラスのdivを取得してclassを置き換え.
        var tmpClassName = $target[0].className;
        tmpClassName = tmpClassName.replace(colorTbl[pre], colorTbl[after]);
        $target[0].className = tmpClassName;
        $target.css('background-color',colorList[colorTbl[after][0]]);
    }

    var history = [];
    function turn( turnType ) {
        if( turnType != "undo" ) {
            history.push(turnType);
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

    var turns = [];
    jQuery.each( targetFaces, function(turnType) {
        turns.push( turnType );
    });
    $('body').keyup(function(e){
        console.log(e.which);
        if(e.which == 32) { // spaceのとき
            if( isFinish() ) {
                for( var i = 0; i < 100; i++ ){
                    turn( turns[Math.floor(Math.random()*turns.length)] );
                }
                $('#hint').addClass('off');
            }
            return;
        }

        var turnName = "";
        jQuery.each( keyTable, function(i,v){
            if( v == e.which ) {
                turnName = i;
            }
        });
        if( turnName != "" ) {
            turn( turnName );
        }
        if( isFinish() ) {
            $('#hint').removeClass('off');
        } else {
            $('#hint').addClass('off');
        }
    });

    function isFinish(){
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
    // キー入力UIの準備
    var availableKeys = {
        65:"A",66:"B",67:"C",68:"D",
        69:"E",70:"F",71:"G",72:"H",
        73:"I",74:"J",75:"K",76:"L",
        77:"M",78:"N",79:"O",80:"P",
        81:"Q",82:"R",83:"S",84:"T",
        85:"U",86:"V",87:"W",88:"X",
        89:"Y",90:"Z",44:",",190:".",
        47:"/", 7:"'",187:";",27:"ESC"}
    var availableOperation = [
        "F0","F1","F2","F0P","F1P","F2P",
        "f0","f1","f2","f0P","f1P","f2P",
        "L0","L1","L2","L0P","L1P","L2P",
        "l0","l1","l2","l0P","l1P","l2P",
        "R0","R1","R2","R0P","R1P","R2P",
        "r0","r1","r2","r0P","r1P","r2P",
        "B0","B1","B2","B0P","B1P","B2P",
        "b0","b1","b2","b0P","b1P","b2P",
        "X","XP","Y","YP",
        "undo"
    ]
    var $keys = $('#keys');
    for( var i = 0; i < availableOperation.length; i++ ) {
        var $span = $('<span/>');
        var decorate = ( Math.floor((i / 3) % 2) == 1) ? "_:" : "__:";
        $span.html(availableOperation[i] + decorate);
        $keys.append($span);
        var $select = $('<select/>');
        $select.attr('name',availableOperation[i]);
        jQuery.each( availableKeys, function(keyCode,letter){
            var $option = $('<option/>');
            $option.attr('value',keyCode).html(letter);
            $select.append($option);
        });
        var $option = $('<option/>');
        $option.attr('value',-1).html('none').attr('selected',"");
        $select.append($option);
        $keys.append($select);
        if( i <= 48) {
            if( i % 3 == 2 ) {
                $keys.append($('<br/>'));
            }
        } else {
            if( i % 2 == 1 ) {
                $keys.append($('<br/>'));
            }
        }
    }
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
        $('#cubeViewPort')
            .css('-webkit-perspective',viewRange + 'px')
            .css('-moz-perspective',viewRange + 'px')
            .css('-ms-perspective',viewRange + 'px')
            .css('-o-perspective',viewRange + 'px');

    })
    $("button[name='reset']").click(function(){
        jQuery.each( $faces.children(), function(){
            $(this).remove();
        })
        initCube();
        $('#hint').removeClass('off');
    });
    var keyTable = {  };
    // 前回の設定
    store.get('keyTable', function(ok, val) {
        if (ok) {
            if( val != null) {
                var tmpAry = val.split(',');
                if( tmpAry.length <= 53) {
                    jQuery.each( val.split(','), function(i,v){
                        var tmp = v.split(':');
                        if( isFinite(tmp[1]) ) { // 数値であれば.
                            keyTable[tmp[0]] = parseInt(tmp[1]);
                            var $update = $('select[name=' + tmp[0] +']');
                            if( $update.val() == "-1") {
                                $update.val( tmp[1]);
                            }
                        }
                    });
                }
            }
        }
    });


    var colorList = {
        "U":"#FFFFFF",
        "F":"#FF0000",
        "L":"#008000",
        "R":"#FFFF00",
        "B":"#FFA500",
        "D":"#0000FF"
    }
    // 前回の設定.
    function getLastColorSetting(){
        store.get('colorList', function(ok, val) {
            if (ok) {
                if( val != null) {
                    jQuery.each( val.split(','), function(i,v){
                        var tmp = v.split(':');
                        colorList[tmp[0]] = tmp[1];
                        $('.'+tmp[0]+"Color").css('background-color',tmp[1]);
                    });
                }
            }
        });
    }
    getLastColorSetting();

    $('select').change(function() {
        if (this.name == "faceColor") {
            $('#colorSelector div').css('background-color', colorList[this.value]);
            $('#colorSelector').ColorPicker({ color:colorList[this.value]});
        } else { // キーボード設定.
            keyTable[this.name] = parseInt(this.value);
            var keyTableString = "";
            jQuery.each(keyTable, function (i, v) {
                keyTableString += i + ':' + v + ',';
            });
            store.set('keyTable', keyTableString.slice(0,-1));
        }
    });
    var rgbTo16 = function(col){
        return "#" + col.match(/\d+/g).map(function(a){return ("0" + parseInt(a).toString(16)).slice(-2)}).join("");
    }
    $('.colorpicker_submit').click(function(){
        var newBg = $('#colorSelector div').css('background-color');
        var faceType = $('select[name="faceColor"]').val();
        $('.'+faceType+"Color").css('background-color',newBg);
        colorList[faceType] = rgbTo16(newBg);
        var ColorListString = "";
        jQuery.each(colorList, function (i, v) {
            ColorListString += i + ':' + v + ',';
        });
        store.set('colorList', ColorListString);
    });

    $('#backFace').click(function(){
        var ope = "";
        if( this.checked ) {
            ope = 'visible';
        } else {
            ope = 'hidden';
        }
        $('.face').css('-webkit-backface-visibility',ope)
                    .css('-moz-backface-visibility',ope)
                    .css('-ms-backface-visibility',ope)
                    .css('-o-backface-visibility',ope);

    })


    // 回転時処理---------------------------------------------------
    document.querySelector('#cubeViewPort').addEventListener("mousemove", mouseOver, false);
    var lastX = 225, offsetX = 0;
    var lastY = -55, offsetY = 0;
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
        cube.style.MsTransform = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
        cube.style.OTransform = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
        //cube.style.transform = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
    }
    // キューブがクリックされたとき最後のクリック位置情報からoffsetを取得
    $('#cubeViewPort').click(function(e){
        $('#rotate').trigger('click');
        offsetX = e.pageX - lastX;
        offsetY = e.pageY - lastY;
    });

    initCube();
});