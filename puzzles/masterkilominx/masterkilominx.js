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
    var faceName = ['UU','FF','LL','LB','RB','RR',"FL","DL","BB","DR","FR","DD"];
    var store = new Persist.Store('state');

    function genFaces( $dst ) {
        jQuery.each( faceName, function(i,name){
        });
    };

    // cssTbl.
    var mag = 200;
    var x = 1;
    var y = -17;
    function applyTransform( target) {
        var r = mag*1.4;
        var faceRotate = [
            // rotateZ,translateZ,rotateY,rotateX
            [0,0,90,[x,y,r]],
            [180,0,-26.5,[x,y,r]],
            [180,72,-26.5,[x,y,r]],
            [180,144,-26.5,[x,y,r]],
            [180,216,-26.5,[x,y,r]],
            [180,288,-26.5,[x,y,r]],
            [0,324,-26.5,[x,y,r]],
            [0,252,-26.5,[x,y,r]],
            [0,180,-26.5,[x,y,r]],
            [0,108,-26.5,[x,y,r]],
            [0,36,-26.5,[x,y,r]],
            [0,0,-90,[x,y,r]]
        ];

        var label = target.className.animVal != undefined ? target.className.animVal.split(' ')[1]: undefined;
        if( label == undefined ) return;
        //var facePosOffset = parseInt( label.slice(-1) );
        var faceType = faceName.indexOf(label.slice(0,2));

        var cssOpe =
                'rotateZ(' + faceRotate[faceType][0] + 'deg)' +
                'rotateY(' + faceRotate[faceType][1] + 'deg)' +
                'rotateX(' + faceRotate[faceType][2] + 'deg)' +
                'translate3d(' +
                    faceRotate[faceType][3][0] + 'px,' +
                    faceRotate[faceType][3][1] + 'px,' +
                    faceRotate[faceType][3][2] + 'px)' +
                    "scale3d(" + mag / 200 + ',' + mag / 200 + ',' + mag / 200 + ')';


        $(target)
            .css('-webkit-transform-origin', "50% 50%")
            .css('-moz-transform-origin', "50% 50%")
            .css('-ms-transform-origin', "50% 50%")
            .css('-o-transform-origin', "50% 50%")
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
        var len = mag * 2;
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
        genFaces($faces);
        updateFaces(); // 描画処理.
        updateLayout();
        getLastColorSetting();
    }

    var faceOrder = {
        "C40":["C4","E8","E9","C0"],
        "C04":["C0","E9","E8","C4"],
        "E70":["E7","T4","T0","E0"],
        "E07":["E0","T0","T4","E7"],
        "E63":["E6","T3","T2","E3"],
        "E36":["E3","T2","T3","E6"],
        "C32":["C3","E5","E4","C2"],
        "C23":["C2","E4","E5","C3"],
        "C34":["C3","E6","E7","C4"],
        "C43":["C4","E7","E6","C3"],
        "E58":["E5","T3","T4","E8"],
        "E85":["E8","T4","T3","E5"],
        "E41":["E4","T2","T1","E1"],
        "E14":["E1","T1","T2","E4"],
        "C21":["C2","E3","E2","C1"],
        "C12":["C1","E2","E3","C2"],
        "E29":["E2","T1","T0","E9"],
        "E92":["E3","T0","T1","E2"],
        "C10":["C1","E1","E0","C0"],
        "C01":["C0","E8","E1","C1"]
    }
    var convTable = {
        "UU1":["FF","C32","RR","C32","RB","C32","LB","C32","LL","C32"],
        "UU2":["FF","E36","RR","E36","RB","E36","LB","E36","LL","E36"],
        "FF1":["UU","C23","LL","C34","FL","C01","FR","C40","RR","C12"],
        "FF2":["UU","E36","LL","E58","FL","E92","FR","E70","RR","E14"],
        "LL1":["UU","C34","LB","C34","DL","C01","FL","C40","FF","C12"],
        "LL2":["UU","E58","LB","E58","DL","E92","FL","E70","FF","E14"],
        "LB1":["UU","C40","RB","C34","BB","C01","DL","C40","LL","C12"],
        "LB2":["UU","E70","RB","E58","BB","E92","DL","E70","LL","E14"],
        "RB1":["UU","C01","RR","C34","DR","C01","BB","C40","LB","C12"],
        "RB2":["UU","E92","RR","E58","DR","E92","BB","E70","LB","E14"],
        "RR1":["UU","C12","FF","C34","FR","C01","DR","C40","RB","C12"],
        "RR2":["UU","E14","FF","E58","FR","E92","DR","E70","RB","E14"],
        "FL1":["FF","C01","FL","C40","DL","C12","DD","C40","FR","C34"],
        "FL2":["FF","E92","FL","E70","DL","E14","DD","E70","FR","E58"],
        "DL1":["FL","C01","LB","C40","BB","C12","DD","C34","FL","C34"],
        "DL2":["FL","E92","LB","E70","BB","E14","DD","E58","FL","E58"],
        "BB1":["LB","C01","RB","C40","DR","C12","DD","C23","FL","C34"],
        "BB2":["LB","E92","RB","E70","DR","E14","DD","E36","FL","E58"],
        "DR1":["RR","C01","FR","C12","DD","C12","BB","C34","RB","C12"],
        "DR2":["RR","E92","FR","E14","DD","E14","BB","E58","RB","E14"],
        "FR1":["FF","C40","FL","C12","DD","C01","DR","C34","RR","C01"],
        "FR2":["FF","E70","FL","E14","DD","E92","DR","E58","RR","E92"],
        "DD1":["FL","C23","DL","C23","BB","C23","DR","C23","FR","C23"],
        "DD2":["FL","E36","DL","E36","BB","E36","DR","E36","FR","E36"]
    }
    var wholeTable = {
        "UU3":{
            "top":"UU1",
            "first":["FF","C0","RR","C0","RB","C0","LB","C0","LL","C0"],
            "second":["FL","C0","FR","C0","DR","C0","BB","C0","DL","C0"],
            "bottom":"DD1P"
        },
        "FF3":{
            "top":"FF1",
            "first":["UU","C0","RR","C4","FR","C2","FL","C3","LL","C1"],
            "second":["LB","C3","RB","C2","DR","C4","DD","C0","DL","C1"],
            "bottom":"BB1P"
        },
        "LL3":{
            "top":"LL1",
            "first":["UU","C1","FF","C0","FL","C2","DL","C3","LB","C1"],
            "second":["DD","C4","BB","C1","RB","C3","RR","C2","FR","C4"],
            "bottom":"DR1P"
        },
        "LB3":{
            "top":"LB1",
            "first":["UU","C2","LL","C4","DL","C2","BB","C3","RB","C1"],
            "second":["RR","C3","FF","C2","FL","C4","DD","C3","DR","C1"],
            "bottom":"FR1P"
        },
        "RB3":{
            "top":"RB1",
            "first":["UU","C3","LB","C4","BB","C2","DR","C3","RR","C1"],
            "second":["FL","C2","DL","C4","DD","C2","FR","C1","FF","C3"],
            "bottom":"FL1P"
        },
        "RR3":{
            "top":"RR1",
            "first":["UU","C4","FF","C1","DR","C3","DR","C2","RB","C4"],
            "second":["LL","C3","FL","C2","DD","C1","BB","C4","LB","C2"],
            "bottom":"DL1P"
        }
    }

    var targetFaces = {
        "UU1":[
            "UUC3","UUC2","UUC1","UUC0","UUC4",
            "UUE7","UUE6","UUE5","UUE4","UUE3","UUE2","UUE1","UUE0","UUE9","UUE8",
            "UUT3","UUT2","UUT1","UUT0","UUT4"
        ],
        "UU1P":[
            "UUC4","UUC3","UUC2","UUC1","UUC0",
            "UUE9","UUE8","UUE7","UUE6","UUE5","UUE4","UUE3","UUE2","UUE1","UUE0",
            "UUT4","UUT3","UUT2","UUT1","UUT0",
        ],
        "FF1":[
            "FFC3","FFC2","FFC1","FFC0","FFC4",
            "FFE7","FFE6","FFE5","FFE4","FFE3","FFE2","FFE1","FFE0","FFE9","FFE8",
            "FFT3","FFT2","FFT1","FFT0","FFT4"
        ],
        "FF1P":[
            "FFC4","FFC3","FFC2","FFC1","FFC0",
            "FFE9","FFE8","FFE7","FFE6","FFE5","FFE4","FFE3","FFE2","FFE1","FFE0",
            "FFT4","FFT3","FFT2","FFT1","FFT0"
        ],
        "LL1":[
            "LLC3","LLC2","LLC1","LLC0","LLC4",
            "LLE7","LLE6","LLE5","LLE4","LLE3","LLE2","LLE1","LLE0","LLE9","LLE8",
            "LLT3","LLT2","LLT1","LLT0","LLT4",
        ],
        "LL1P":[
            "LLC4","LLC3","LLC2","LLC1","LLC0",
            "LLE9","LLE8","LLE7","LLE6","LLE5","LLE4","LLE3","LLE2","LLE1","LLE0",
            "LLT4","LLT3","LLT2","LLT1","LLT0",
        ],
        "LB1":[
            "LBC3","LBC2","LBC1","LBC0","LBC4",
            "LBE7","LBE6","LBE5","LBE4","LBE3","LBE2","LBE1","LBE0","LBE9","LBE8",
            "LBT3","LBT2","LBT1","LBT0","LBT4",
        ],
        "LB1P":[
            "LBC4","LBC3","LBC2","LBC1","LBC0",
            "LBE9","LBE8","LBE7","LBE6","LBE5","LBE4","LBE3","LBE2","LBE1","LBE0",
            "LBT4","LBT3","LBT2","LBT1","LBT0",
        ],
        "RB1":[
            "RBC3","RBC2","RBC1","RBC0","RBC4",
            "RBE7","RBE6","RBE5","RBE4","RBE3","RBE2","RBE1","RBE0","RBE9","RBE8",
            "RBT3","RBT2","RBT1","RBT0","RBT4",
        ],
        "RB1P":[
            "RBC4","RBC3","RBC2","RBC1","RBC0",
            "RBE9","RBE8","RBE7","RBE6","RBE5","RBE4","RBE3","RBE2","RBE1","RBE0",
            "RBT4","RBT3","RBT2","RBT1","RBT0",
        ],
        "RR1":[
            "RRC3","RRC2","RRC1","RRC0","RRC4",
            "RRE7","RRE6","RRE5","RRE4","RRE3","RRE2","RRE1","RRE0","RRE9","RRE8",
            "RRT3","RRT2","RRT1","RRT0","RRT4",
        ],
        "RR1P":[
            "RRC4","RRC3","RRC2","RRC1","RRC0",
            "RRE9","RRE8","RRE7","RRE6","RRE5","RRE4","RRE3","RRE2","RRE1","RRE0",
            "RRT4","RRT3","RRT2","RRT1","RRT0",
        ],
        "FL1":[
            "FLC3","FLC2","FLC1","FLC0","FLC4",
            "FLE7","FLE6","FLE5","FLE4","FLE3","FLE2","FLE1","FLE0","FLE9","FLE8",
            "FLT3","FLT2","FLT1","FLT0","FLT4",
        ],
        "FL1P":[
            "FLC4","FLC3","FLC2","FLC1","FLC0",
            "FLE9","FLE8","FLE7","FLE6","FLE5","FLE4","FLE3","FLE2","FLE1","FLE0",
            "FLT4","FLT3","FLT2","FLT1","FLT0"
        ],
        "DL1":[
            "DLC3","DLC2","DLC1","DLC0","DLC4",
            "DLE7","DLE6","DLE5","DLE4","DLE3","DLE2","DLE1","DLE0","DLE9","DLE8",
            "DLT3","DLT2","DLT1","DLT0","DLT4"
        ],
        "DL1P":[
            "DLC4","DLC3","DLC2","DLC1","DLC0",
            "DLE9","DLE8","DLE7","DLE6","DLE5","DLE4","DLE3","DLE2","DLE1","DLE0",
            "DLT4","DLT3","DLT2","DLT1","DLT0"
        ],
        "BB1":[
            "BBC3","BBC2","BBC1","BBC0","BBC4",
            "BBE7","BBE6","BBE5","BBE4","BBE3","BBE2","BBE1","BBE0","BBE9","BBE8",
            "BBT3","BBT2","BBT1","BBT0","BBT4"
        ],
        "BB1P":[
            "BBC4","BBC3","BBC2","BBC1","BBC0",
            "BBE9","BBE8","BBE7","BBE6","BBE5","BBE4","BBE3","BBE2","BBE1","BBE0",
            "BBT4","BBT3","BBT2","BBT1","BBT0"
        ],
        "DR1":[
            "DRC3","DRC2","DRC1","DRC0","DRC4",
            "DRE7","DRE6","DRE5","DRE4","DRE3","DRE2","DRE1","DRE0","DRE9","DRE8",
            "DRT3","DRT2","DRT1","DRT0","DRT4",
        ],
        "DR1P":[
            "DRC4","DRC3","DRC2","DRC1","DRC0",
            "DRE9","DRE8","DRE7","DRE6","DRE5","DRE4","DRE3","DRE2","DRE1","DRE0",
            "DRT4","DRT3","DRT2","DRT1","DRT0",
        ],
        "FR1":[
            "FRC3","FRC2","FRC1","FRC0","FRC4",
            "FRE7","FRE6","FRE5","FRE4","FRE3","FRE2","FRE1","FRE0","FRE9","FRE8",
            "FRT3","FRT2","FRT1","FRT0","FRT4",
        ],
        "FR1P":[
            "FRC4","FRC3","FRC2","FRC1","FRC0",
            "FRE9","FRE8","FRE7","FRE6","FRE5","FRE4","FRE3","FRE2","FRE1","FRE0",
            "FRT4","FRT3","FRT2","FRT1","FRT0",
        ],
        "DD1":[
            "DDC3","DDC2","DDC1","DDC0","DDC4",
            "DDE7","DDE6","DDE5","DDE4","DDE3","DDE2","DDE1","DDE0","DDE9","DDE8",
            "DDT3","DDT2","DDT1","DDT0","DDT4",
        ],
        "DD1P":[
            "DDC4","DDC3","DDC2","DDC1","DDC0",
            "DDE9","DDE8","DDE7","DDE6","DDE5","DDE4","DDE3","DDE2","DDE1","DDE0",
            "DDT4","DDT3","DDT2","DDT1","DDT0"
        ]
    }
    var onFaceRotate = $.extend(true,{},targetFaces);

    // layer 1, 2の生成.
    jQuery.each( convTable, function(name,ary){
        console.log( "targetFaces " + name );
        var currentAry = targetFaces[name];
        if( targetFaces[name] == undefined ) {
            targetFaces[name] = [];
            currentAry = targetFaces[name];
        }
        var nameP = name + "P";
        var currentAryP = targetFaces[nameP];
        if (targetFaces[nameP] == undefined ) {
            targetFaces[nameP] = [];
            currentAryP = targetFaces[nameP];
        }

        for( var i = 0; i < ary.length; i+= 2) {
            var order = ary[i+1];
            for( var j = 0; j < faceOrder[order].length; j++ ) {
                currentAry.push( ary[i] + faceOrder[order][j] );
            }
            var iP = (i + 2) % ary.length;
            var orderP = ary[iP+1];
            for( var j = 0; j < faceOrder[orderP].length; j++ ) {
                currentAryP.push( ary[iP] + faceOrder[orderP][j] );
            }
        }
    });
    var onFace = [
        "C0","E0","E1","T0",
        "C1","E2","E3","T1",
        "C2","E4","E5","T2",
        "C3","E6","E7","T3",
        "C4","E8","E9","T4"
    ];

    jQuery.each( wholeTable, function(name,pack){
        var result = onFaceRotate[pack["top"]].slice(),
            resultP = onFaceRotate[pack["top"]+"P"].slice();
        jQuery.merge( result, onFaceRotate[pack["bottom"]]);
        jQuery.merge( resultP, onFaceRotate[pack["bottom"].slice(0,-1)]);
        var targetFirst = pack["first"];
        var targetSecond = pack["second"];
        for( var i = 0; i < targetFirst.length; i++ ){
            var indexFirst = onFace.indexOf( targetFirst[i+1] );
            for( var j = 0; j < onFace.length; j ++ ) {
                var pos = (indexFirst + j) % onFace.length;
                result.push( targetFirst[i] + onFace[pos] );
            }
            var indexSecond = onFace.indexOf( targetSecond[i+1] );
            for( var j = 0; j < onFace.length; j ++ ) {
                var pos = (indexSecond + j) % onFace.length;
                result.push( targetSecond[i] + onFace[pos] );
            }
            var iP = (i + 2) % targetFirst.length;
            var indexP = onFace.indexOf( targetFirst[iP+1] );
            for( var j = 0; j < onFace.length; j ++ ) {
                var pos = (indexP + j) % onFace.length;
                resultP.push( targetFirst[iP] + onFace[pos] );
            }
            var iPSecond = (i + 2) % targetSecond.length;
            var indexPSecond = onFace.indexOf( targetSecond[iPSecond+1] );
            for( var j = 0; j < onFace.length; j ++ ) {
                var pos = (indexPSecond + j) % onFace.length;
                resultP.push( targetSecond[iPSecond] + onFace[pos] );
            }
        }
        targetFaces[name] = result.slice();
        targetFaces[name+"P"] = resultP.slice();
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
        $target.attr('fill',colorTbl[after]);
        /*var tmpClassName = $target[0].className;
        tmpClassName = tmpClassName.replace(colorTbl[pre], colorTbl[after]);
        $target[0].className = tmpClassName;
        $target.css('background-color',colorList[colorTbl[after][0]]);*/
    }

    var history = [];
    var layer = "1";
    var levels = [ "outer", "inner", "whole"];
    function turn( turnType ) {
        turnType = (turnType.indexOf('P') != -1) ? turnType.slice(0,2) + layer + "P" : turnType + layer;
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
            jQuery.each( $(this).children(), function(){
                targetName = this.className.animVal;
                if( targetFace == undefined ) {
                    console.log( this.className.animVal);
                }
                var index = targetFace.indexOf( targetName );
                if( index == -1) return;
                colorTbl[targetFace[index]] = $(this).attr('fill');
            });
        });

        jQuery.each( $faces.children(), function(i,v){
            jQuery.each( $(this).children(), function(){
                targetName = this.className.animVal;
                var index = targetFace.indexOf( targetName );
                if( index == -1) return;
                var currentName = targetFace[index];
                var newName = getNewPosName(currentName,turnType);
                if( currentName != newName ) {
                    replaceClass(currentName,newName, $(this), colorTbl);
                }
                //applyTransform($(this)[0]);
            });
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
                    //turn( turns[Math.floor(Math.random()*turns.length)] );
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
            if( turnName == "minus") {
                layer --;
                layer = ( layer > 1 ) ? layer : 1;
                $('#layer span').html(levels[layer-1]);
            } else if( turnName == "plus") {
                layer ++;
                layer = ( layer < 4 ) ? layer : 3;
                $('#layer span').html(levels[layer-1]);
            } else {
                turn( turnName );
            }
        }
        if( isFinish() ) {
            $('#hint').removeClass('off');
        } else {
            $('#hint').addClass('off');
        }
    });

    function isFinish(){
        var $planes = $faces.children();
        for( var i = 0; i < $planes.length; i ++ ){
            var $stickers = $planes.eq(i).children();
            var color = $stickers.eq(0).attr('fill');
            for( var j= 0; j < $stickers.length; j++ ){
                if( color != $stickers.eq(j).attr('fill') ) {
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
        "UU","UUP","FF","FFP","LL","LLP",
        "LB","LBP","RB","RBP","RR","RRP",
        "FL","FLP","DL","DLP","BB","BBP",
        "DR","DRP","FR","FRP","DD","DDP",
        "undo","plus","minus"
    ]
    var $keys = $('#keys');
    for( var i = 0; i < availableOperation.length; i++ ) {
        var $span = $('<span/>');
        var decorate = " :";
        $span.html(availableOperation[i] + decorate);
        if( availableOperation[i] == "plus" || availableOperation[i] == "minus"){
            $span.html("Layer " + availableOperation[i] + decorate);
        }
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
        if( i < 24) {
            if( i % 2 == 1 ) {
                $keys.append($('<br/>'));
            }
        } else {
            $keys.append($('<br/>'));
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

    // 色の初期設定.
    var colorList = {
        'UU':"#FFFFFF",
        'FF':"#FF0000",
        'LL':"#008800",
        'LB':"#8833ff",
        'RB':"#ffff00",
        'RR':"#0033ff",
        "FL":"#fff373",
        "DL":"#00fFff",
        "BB":"#ff6600",
        "DR":"#77ff77",
        "FR":"#ff45bB",
        "DD":"#bababa"
    }
    jQuery.each( colorList, function(name,hex){
        $('.'+name+"Color")
            .children()
                .attr('fill', hex)
                .attr('stroke-width','2px');
    })
    // 前回の設定が読み込められれば適用.
    function getLastColorSetting(){
        store.get('colorList', function(ok, val) {
            if (ok) {
                if( val != null) {
                    jQuery.each( val.split(','), function(i,v){
                        var tmp = v.split(':');
                        colorList[tmp[0]] = tmp[1];
                        $('.'+tmp[0]+"Color").children().attr('fill', tmp[1]);
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
        $('.'+faceType+"Color").children().attr('fill',rgbTo16(newBg));
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
    var lastX = 270, offsetX = 0; // + 270
    var lastY = -62, offsetY = 0; // + 20
    function mouseOver(e){
        var y = (e.pageX - offsetX) * 1 + 90,
            x = (e.pageY - offsetY) * -1 - 90;

        if( $('#rotate').attr('checked') ){
            rotate(x,y,0);
            lastX = e.pageX - offsetX;
            lastY = e.pageY - offsetY;
        }
    }
    // 回転実処理------------------------------------------------------------
    function rotate(newX,newY,newZ){
        var x = parseInt((newX || 0)),
            y = parseInt((newY || 0)),
            z = newZ,
            cube = document.getElementById('faces');

        var operation = "rotateZ(" + z + "deg) rotateX(" + x + "deg) rotateY(" + y + "deg)";
        cube.style.webkitTransform = operation;
        cube.style.MozTransform     = operation;
        cube.style.MSTransform      = operation;
        cube.style.OTransform       = operation;
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