// 座標.
var X = 0;
var Y = 1;

// 回転の指定.
var axis = 0;
var deg = 1;

// class名 RC1の位置.
var facePos = 0;
var faceKind = 1;

var Cube = function(){
    var $faces = $('#faces');
    var faceName = ['U','F','L','B','R','D'];

    var mag = 200; // 拡大率.
    var r = mag; // 半径.
    var facePosition = [
        // rotateZ,translateZ,rotateY,rotateX
        [0,0,90,[0,0,r]],
        [0,0,0,[0,0,r]],
        [0,-90,0,[0,0,r]],
        [0,-180,0,[0,0,r]],
        [0,-270,0,[0,0,r]],
        [0,0,-90,[0,0,r]]
    ];
    var faceColor = {
        'U':"#FFFFFF",
        'F':"#FF0000",
        'L':"#00FF00",
        'R':"#FFFF00",
        "B":"#FFAA00",
        "D":"#0000FF"
    }

    var svgData = [
        "M394.998,371.466c-23.814-61.865-57.044-119.385-99.014-171.342 c41.941-51.845,75.165-109.225,99.014-170.947V371.466L394.998,371.466z",
        "M372.859,394.998H28.522c61.923-23.8,119.493-57.025,171.496-99.008 C252.432,338.095,310.447,371.318,372.859,394.998L372.859,394.998z",
        "M5.002,374.786V31.199c24.099,61.445,57.489,118.513,99.511,170.02  C62.17,253.818,28.768,312.089,5.002,374.786L5.002,374.786z",
        "M200.751,104.72C148.566,62.413,90.76,28.953,28.524,5.001h344.81  C310.977,28.919,253.044,62.383,200.751,104.72L200.751,104.72z",
        "M289.504,192.23c-24.463-29.318-51.623-56.529-80.873-81.021C263.853,66.793,325.429,32.39,391.871,8.8  C368.327,75.32,333.931,136.949,289.504,192.23L289.504,192.23z",
        "M391.626,391.199c-66.571-23.313-128.3-57.483-183.706-101.69c29.53-24.627,56.931-51.997,81.58-81.49  C333.817,263.237,368.131,324.795,391.626,391.199L391.626,391.199z",
        "M9.584,391.334c23.38-66.024,57.467-127.268,101.445-182.257c24.522,29.099,51.755,56.123,81.071,80.44  C137.058,333.662,75.729,367.869,9.584,391.334L9.584,391.334z",
        "M110.978,193.318C65.75,137.521,30.774,75.138,6.913,7.712c67.496,23.637,129.99,58.417,185.954,103.49  C163.215,136,135.709,163.58,110.978,193.318L110.978,193.318z",
        "M200.003,283.084c-29.929-24.673-57.67-52.198-82.549-81.906c25.056-30.32,53.045-58.387,83.293-83.52  c29.855,24.846,57.516,52.556,82.313,82.466C258.059,230.226,230.148,258.106,200.003,283.084L200.003,283.084z"
    ];
    var svgDataName = ["E1","E3","E5","E7","C0","C2","C4","C6","T8"];
    var availableTurn = ["F","b","L","r","R","l","B","f"];
    var turnAxes = [["1,-1,1"],["-1,1,-1"],["-1,-1,1"],["1,1,-1"],["1,-1,-1"],["-1,1,1"],["-1,-1,-1"],["1,1,1"]];
    var turnTable = [
        ["U2","F0","R6"],["D4","L4","B2"],["U4","L0","F6"],["D2","B4","R2"],
        ["U0","R0","B6"],["D6","F4","L2"],["U6","B0","L6"],["D0","R4","F2"]
    ];

    var currentAnimation = {};
    var currentOperation = "";
    var currentTargetStickers = null;

    var parseTurnOperation = function( turnOperation ){
        var operation = {};
        operation["layer"] = turnOperation[1];
        operation["turn"] = turnOperation[0];
        operation["isPrime"] = (turnOperation[2] == "P" );
        return operation;
    }

    var getTargetSticker = function(turnOperation){
        var operation = parseTurnOperation( turnOperation );
        // F
        var currentTurnIndex = availableTurn.indexOf( operation["turn"]);
        var targetAry = turnTable[ currentTurnIndex ];
        var order = [];
        var next = ( currentTurnIndex % 2 == 0 ) ? 1 : -1;
        var nextTargetAry = turnTable[currentTurnIndex + next];
        if( !operation["isPrime"] ) {
            for ( var i = 0 ; i < targetAry.length; i++ )order.push( targetAry[i][0] );
            if( operation["layer"] == 2 ) {
                for ( var i = nextTargetAry.length - 1; i >= 0; i-- )order.push( nextTargetAry[i][0] );
            }
        } else {
            for ( var i = targetAry.length - 1; i >= 0; i-- )order.push( targetAry[i][0] );
            if( operation["layer"] == 2 ) {
                for ( var i = 0 ; i < nextTargetAry.length; i++ )order.push( nextTargetAry[i][0] );
            }
        }
        var targetStickers = {};
        jQuery.each( faceName, function(i,v){
            targetStickers[v] = [];
        })
        if( operation["layer"] == 1 ) {
            for( var i = 0; i < targetAry.length; i++ ) {
                var currentFaceName = targetAry[i]; // U2...
                targetStickers[currentFaceName[0]].push( currentFaceName[0] + "T8");
                var baseNum = (parseInt(currentFaceName[1] - 2 + 8)%8);
                for( var index = 0; index < 5; index++ ) {
                    var type = (index % 2 == 0) ? "C": "E";
                    targetStickers[currentFaceName[0]].push( currentFaceName[0] + type + (baseNum + index) % 8 );
                }
            }
        } else if( operation["layer"] == 2 ) {
            var table = [];
            jQuery.merge(table, targetAry);
            jQuery.merge(table, nextTargetAry);
            var indexTable = {};
            for( var i = 0; i < table.length; i++ ) {
                indexTable[table[i][0]] = parseInt( table[i][1] );
            }
            for( var index = 0; index < faceName.length; index++ ) {
                targetStickers[faceName[index]].push( faceName[index] + "T8");
                for( var i = 0; i < 8; i++ ) {
                    var offsetIndex = (indexTable[faceName[index]] + i) % 8;
                    var type = (offsetIndex % 2 == 0) ? "C": "E";
                    targetStickers[faceName[index]].push( faceName[index] + type + offsetIndex );
                }
            }
        }
        return { "stickers":targetStickers, "order":order };
    };

    var turnExecuteEnd = function(shadow){
        var home = shadow.className.animVal.split(" ")[1];
        var $home = $('#faces>svg:not(.shadow).' + home);

        var order = currentTargetStickers["order"];
        var stickers = currentTargetStickers["stickers"];
        var preFace = home;
        var afterFace = "";
        var tmpIndex = order.indexOf( home );
        if( order.length != faceName.length ){
            afterFace = order[ (tmpIndex + 1) % 3 ];
        } else {
            var adjIndex = tmpIndex % 3; // 0,1,2
            var adjIndex2 = (adjIndex + 1) % 3 ;
            adjIndex2 += (tmpIndex >= 3) ? 3 : 0;
            afterFace = order[ adjIndex2 ];
        }

        jQuery.each( $(shadow).children(),function(){
            var preLabel = this.className.animVal;
            var index = stickers[preFace].indexOf( preLabel );
            var afterLabel = stickers[afterFace][index];

            var $pre = $('#faces>svg>path.' + preLabel);
            $pre.attr('fill',currentState[afterLabel]);
            $home[0].appendChild( this );
        });
        that.checkComplete();
    };

    var currentState = {};
    var backUpCurrentState = function(){
        var $target = $('#faces>svg:not(shadow)>path');
        jQuery.each( $target, function(){
            currentState[ this.className.animVal ] = $(this).attr('fill');
        });
    }

    var isEmpty = function (hash) {
        for ( var i in hash ) return false;
        return true;
    }

    var that = {
        generateFaces: function(){
            for( var faceNum = 0; faceNum < faceName.length; faceNum ++ ){
                var $svg = $('<svg class="face ' + faceName[faceNum] +'"></svg>');
                var $shadow = $('<svg class="face ' + faceName[faceNum] + ' shadow"></svg>');
                for( var i = 0; i < svgData.length; i++ ) {
                    var svgNS = "http://www.w3.org/2000/svg";
                    var c = document.createElementNS(svgNS, "path");
                    var name = faceName[faceNum];
                    c.setAttribute("fill", faceColor[name]);
                    c.setAttribute("d", svgData[i]);
                    c.setAttribute('class', name + svgDataName[i]);
                    c.setAttribute("style", "position:absolute");
                    $svg[0].appendChild( c );
                }
                $faces[0].appendChild( $svg[0]);
                $faces[0].appendChild( $shadow[0]);
            }
        },
        setPosition: function() {
            var planes = $faces.children();
            for( var i = 0; i < planes.length; i ++ ) {
                var currentFaceName = $(planes[i]).attr('class').split(" ")[1];
                var currentPosAry = facePosition[faceName.indexOf(currentFaceName)];

                var cssOpe =
                    'rotateZ(' + currentPosAry[0] + 'deg)' +
                        'rotateY(' + currentPosAry[1] + 'deg)' +
                        'rotateX(' + currentPosAry[2] + 'deg)' +
                        'translate3d(' +
                        currentPosAry[3][0] + 'px,' +
                        currentPosAry[3][1] + 'px,' +
                        currentPosAry[3][2] + 'px)' +
                        "scale3d(" + mag / 200 + ',' + mag / 200 + ',' + mag / 200 + ')';

                $(planes[i])
                    .css('-webkit-transform-origin', "50% 50%")
                    .css('-moz-transform-origin', "50% 50%")
                    .css('-ms-transform-origin', "50% 50%")
                    .css('-o-transform-origin', "50% 50%")
                    .css('-webkit-transform',cssOpe)
                    .css('-moz-transform',cssOpe)
                    .css('-ms-transform',cssOpe)
                    .css('-o-transform',cssOpe);
            }
        },
        getAvailableTurns: function(){
            return availableTurn;
        },
        turnExecute: function(turnOperation){  //F1P
            var $shadow = $('.shadow');
            // 回転中に次の回転命令がきた場合。アニメーションを停止して終了処理を実行.
            if( currentOperation != "") {
                jQuery.each( $shadow, function(i,shadowPlane){
                    var name = shadowPlane.className.animVal.split(' ')[1];
                    clearInterval( currentAnimation[name]["time"] );
                    $(shadowPlane)
                        .css('-webkit-transform',currentAnimation[name]["matrix"])
                        .css('-moz-transform',currentAnimation[name]["matrix"])
                        .css('-ms-transform',currentAnimation[name]["matrix"])
                        .css('-o-transform',currentAnimation[name]["matrix"]);
                    turnExecuteEnd(shadowPlane);
                });
                currentOperation = turnOperation;
                currentAnimation = {};
                currentState = {};
            }

            backUpCurrentState(); // 現在の色のリストを取得.
            currentOperation = turnOperation;
            currentTargetStickers = getTargetSticker(currentOperation);
            var targetStickers = currentTargetStickers["stickers"];
            jQuery.each( $shadow, function(i,val){
                var currentFaceName = this.className.animVal.split(" ")[1];
                for( var i = 0; i < targetStickers[currentFaceName].length; i++ ){
                    try {
                        val.appendChild( $('#faces>svg>path.' + targetStickers[currentFaceName][i])[0]);
                    } catch(e) {
                        console.log(e);
                    }
                }
            });

            var operation = parseTurnOperation( currentOperation );
            var axesIndex = availableTurn.indexOf(operation["turn"]);
            var axes = turnAxes[axesIndex];
            jQuery.each( $shadow, function(i,shadowPlane){
                var matrix = "";
                var webkit = $(this).css('-webkit-transform');
                matrix = ( webkit != "") ? webkit : "";
                var moz = $(this).css('-moz-transform');
                matrix = ( moz != "") ? webkit : "";
                var ms = $(this).css('-ms-transform');
                matrix = ( ms != "") ? webkit : "";
                var o = $(this).css('-o-transform');
                matrix = ( o != "") ? webkit : "";

                var rotate = 0;
                var name = shadowPlane.className.animVal.split(' ')[1];
                var isPrime = operation["isPrime"];
                var time = setInterval(function(){
                    if( isPrime ) {
                        rotate -= 120 / 33 * 2;
                    } else {
                        rotate += 120 / 33 * 2;
                    }

                    if( Math.abs(rotate) < 120 ) {
                        var operation = "rotate3d(" + axes + "," + rotate + "deg) " + matrix;
                        $(shadowPlane)
                            .css('-webkit-transform',operation)
                            .css('-moz-transform',operation)
                            .css('-ms-transform',operation)
                            .css('-o-transform',operation);
                    } else {
                        $(shadowPlane)
                            .css('-webkit-transform',matrix)
                            .css('-moz-transform',matrix)
                            .css('-ms-transform',matrix)
                            .css('-o-transform',matrix);
                        clearInterval( time );
                        turnExecuteEnd(shadowPlane);
                        delete currentAnimation[name];
                        if( isEmpty( currentAnimation ) ) {
                            currentOperation = "";
                        }
                    }
                },33);
                currentAnimation[name] = {"time":time,"matrix":matrix};
            });
        },
        checkComplete: function(){
            var isComplete = true;
            var $planes = $('#faces>svg:not(.shadow)');
            for( var i = 0; i < $planes.length; i ++ ){
                var $stickers = $planes.eq(i).children();
                if( $stickers.length == 0) {
                    isComplete = false; return;
                }
                var color = $stickers.eq(0).attr('fill');
                for( var j= 0; j < $stickers.length; j++ ){
                    if( color != $stickers.eq(j).attr('fill') ) {
                        isComplete = false;
                        break;
                    }
                }
                if( !isComplete ) break;
            }
            if( isComplete ){
                $('#hint').removeClass('off');
            } else {
                $('#hint').addClass('off');
            }
            return isComplete;
        },
        scramble: function(){
            if( that.checkComplete() ) {
                for( var i = 0; i < 100; i++ ){
                    var rand = Math.floor(Math.random()*availableTurn.length);
                    var targetTurn = availableTurn[rand];
                    var prime =  ((i % 2) == 0) ? "P":"";
                    that.turnExecute( targetTurn + "1" + prime );
                }
            }
        },
        setMagnification: function( magnification ) {
            mag = magnification;
            for ( var i = 0; i < facePosition.length; i ++ ){
                facePosition[i][3][2] = mag;
            }
            that.setPosition();
        }
    }
    return that;
}

var Control = function(turns){
    var store = new Persist.Store('state');

    var availableKeys = {
        65:"A",66:"B",67:"C",68:"D",69:"E",70:"F",71:"G",72:"H",73:"I",74:"J",75:"K",76:"L",77:"M",78:"N",79:"O",80:"P",
        81:"Q",82:"R",83:"S",84:"T",85:"U",86:"V",87:"W",88:"X",89:"Y",90:"Z",44:",",190:".",47:"/", 7:"'",187:";",27:"ESC",
        48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",55:"6",56:"7","57":"8",59:"9"};
    // 色の初期設定.
    var colorList = {
        'U':"#FFFFFF",
        'F':"#FF0000",
        'L':"#008800",
        'B':"#8833ff",
        'R':"#ffff00",
        'D':"#0033ff"
    }
    var keyTable = {  };
    var btnPos = {};

    var availableTurns = turns;

    var generateSelection = function($target, name){
        var $div = $('<div class="bn"></div>').html('[o]').css('display','inline');
        var $button = $('<button/>');
        $button.html(name)
            .attr('type','button')
            .css('width','50px')
            .css('height','50px');
        $div.append($button);
        var $select = $('<select/>');
        $select.attr('name',name)
            .css('width','80px')
            .css('height','50px');
        jQuery.each( availableKeys, function(keyCode,letter){
            var $option = $('<option/>');
            $option.attr('value',keyCode).html(letter);
            $select.append($option);
        });
        var $option = $('<option/>');
        $option.attr('value',-1).html('none').attr('selected',"");
        $select.append($option);
        $div.append($select);

        $target.append($div);

        function start(){};
        function stop(){
            var $btn = $(this).children().eq(0);
            btnPos[$btn.html()] = [$(this).css('left'),$(this).css('top')];
            var btnPosStr = "";
            jQuery.each( btnPos, function(i,v){
                console.log( i + " " + v );
                btnPosStr += i + ":[" + v[0] + ',' + v[1] + "]@@@";
            });
            store.set('ButtonPos', btnPosStr.slice(0,-1));
        };
        function drag(){};
        $('.bn').draggable({start:start,stop:stop,drag:drag});
    }

    var isShow = true;

    var that = {
        generateKeys: function(){
            var $keys = $('#keys');
            jQuery.each( availableTurns, function(i,val){
                generateSelection( $keys, val );
                generateSelection( $keys, val + "P" );
                $keys.append($('<br/>'));
            });
            generateSelection( $keys, "Minus" );
            $keys.append($('<br/>'));
            generateSelection( $keys, "Plus" );
            $keys.append($('<br/>'));
        },
        eventBind: function(){
            // show/hideボタン.
            $("button[name='toggle']").click(function(){
                $('#panel').slideToggle();
                $('select').slideToggle();
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

            // キーバインド設定 -----------------------------------
            $('select[name!="faceColor"]').change(function() {
                keyTable[this.name] = parseInt(this.value);
                var keyTableString = "";
                jQuery.each(keyTable, function (i, v) {
                    keyTableString += i + ':' + v + ',';
                });
                store.set('keyBindSetting', keyTableString.slice(0,-1));
            });


            // 色変更 -------------------------------------------------
            $('select[name="faceColor"]').change(function() {
                $('#colorSelector div').css('background-color', colorList[this.value]);
                $('#colorSelector').ColorPicker({ color:colorList[this.value]});
            });

            var rgbTo16 = function(col){
                return "#" + col.match(/\d+/g).map(function(a){return ("0" + parseInt(a).toString(16)).slice(-2)}).join("");
            }
            $('.colorpicker_submit').click(function(){
                var newBg = $('#colorSelector div').css('background-color');
                var faceType = $('select[name="faceColor"]').val();
                $('#faces>svg:not(.shadow).'+faceType+'>path')
                    .attr('fill',rgbTo16(newBg));
                colorList[faceType] = rgbTo16(newBg);
                var ColorListString = "";
                jQuery.each(colorList, function (i, v) {
                    ColorListString += i + ':' + v + ',';
                });
                store.set('colorSetting', ColorListString);
            });

            // [view range].
            var viewRange = 1200;
            $('#viewRange').change(function(){
                viewRange = parseInt( this.value);
                $('#cubeViewPort')
                    .css('-webkit-perspective',viewRange + 'px')
                    .css('-moz-perspective',viewRange + 'px')
                    .css('-ms-perspective',viewRange + 'px')
                    .css('-o-perspective',viewRange + 'px');

            })

            // [back face].
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
        },
        restoreLastSettings: function(){
            // キーボード設定.
            store.get('keyBindSetting', function(ok, val) {
                if (ok) {
                    if( val != null) {
                        keyTable = {  };
                        try {
                            var tmpAry = val.split(',');
                            jQuery.each( tmpAry, function(i,v){
                                var tmp = v.split(':');
                                if( isFinite(tmp[1]) ) { // 数値であれば.
                                    keyTable[tmp[0]] = parseInt(tmp[1]);
                                    var $update = $('select[name=' + tmp[0] +']');
                                    if( $update.val() == "-1") {
                                        $update.val( tmp[1]);
                                    }
                                }
                            });
                        } catch (e) {
                            keyTable = {};
                        }
                    }
                }
            });

            // 色設定.
            store.get('colorSetting', function(ok, val) {
                if (ok) {
                    if( val != null) {
                        jQuery.each( val.split(','), function(i,v){
                            var tmp = v.split(':');
                            colorList[tmp[0]] = tmp[1];
                            if( tmp[0] != "") {
                                var $target = $('#faces>svg.'+tmp[0]).children();
                                jQuery.each( $target, function(){
                                    $(this)
                                        .attr('fill', tmp[1])
                                        .attr('stroke', "#000000");
                                })
                            }
                        });
                    } else {
                        jQuery.each( colorList, function(name,hex){
                            var $target = $('#faces>svg.'+name).children();
                            jQuery.each( $target, function(){
                                $(this)
                                    .attr('fill', hex)
                                    .attr('stroke', "#000000");
                            })
                        })
                    }
                }
            });

            // ボタンの位置情報.
            store.get('ButtonPos', function(ok, val) {
                if (ok) {
                    if( val != null) {
                        try {
                            var tmpAry = val.split('@@@');
                            jQuery.each( tmpAry, function(i,v){
                                var tmp = v.split(':');
                                if( isFinite(tmp[1]) ) { // 数値であれば.
                                    keyTable[tmp[0]] = parseInt(tmp[1]);
                                    var $update = $('select[name=' + tmp[0] +']');
                                    if( $update.val() == "-1") {
                                        $update.val( tmp[1]);
                                    }
                                }
                            });
                        } catch (e) {
                            keyTable = {};
                        }
                    }
                }
            });

        },
        getTurnName: function(keyCode){
            var turnName = "";
            jQuery.each( keyTable, function(i,v){
                if ( v == keyCode ) {
                    turnName = i;
                }
            });
            return turnName;
        }
    }
    return that;
};

var LayerControl = function(){
    var levels = ["single","whole"];
    var min = 1;
    var max = 2;
    var currentLayer = min;

    var that = {
        plus: function(){
            currentLayer ++;
            currentLayer = ( currentLayer < max ) ? currentLayer: max;
            $('#layer span').html(levels[currentLayer-1]);
        },
        minus: function(){
            currentLayer --;
            currentLayer = ( min > 1 ) ? min : 1;
            $('#layer span').html(levels[currentLayer-1]);
        },
        getValue: function(){
            return currentLayer;
        }
    }
    return that;
}

var WindowControl = function(){
    // 回転時処理---------------------------------------------------
    document.querySelector('#cubeViewPort').addEventListener("mousemove", mouseOver, false);
    var lastX =  315 + 270, offsetX = 0; // + 270
    var lastY = -35  - 20, offsetY = 0; // + 20
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
            y = parseInt((newY || 0));
        cube = document.getElementById('faces');

        var operation = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
        cube.style.webkitTransform = operation;
        cube.style.MozTransform     = operation;
        cube.style.MSTransform      = operation;
        cube.style.OTransform       = operation;
    }
    // キューブがクリックされたとき最後のクリック位置情報からoffsetを取得
    $('#cubeViewPort').click(function(e){
        $('#rotate').trigger('click');
        offsetX = e.pageX - lastX;
        offsetY = e.pageY - lastY;
    }).css('cursor','pointer');

    var that = {
        updateLayout: function(){
            var len = 200 * 2;
            $('#faces').css('width',len).css('height',len);
            $('#hint').css('width',len);

            var winWidth = $(window).width();
            var leftMargin = Math.floor( (winWidth - len) / 2 / winWidth * 100 );
            $('#cubeContainer').css('left',leftMargin + '%');
            var winHeight = $(window).width();
            var topMargin = Math.floor( (winHeight - len) / 2 / winHeight * 100 );
            $('#cubeContainer').css('top',topMargin/2 + '%');
        }
    };
    return that;
}

jQuery(function(){
    var cube = Cube();
    cube.generateFaces();
    cube.setPosition();

    var control = Control(cube.getAvailableTurns());
    control.generateKeys();
    control.restoreLastSettings();
    control.eventBind();

    var layerCtrl = LayerControl();
    var windowCtrl = WindowControl();

    var parseTurnName = function (turnName) {
        if( turnName == "") return;
        if( turnName.match('Minus') != null) {
            layerCtrl.minus();
            return;
        }
        if( turnName.match('Plus') != null) {
            layerCtrl.plus();
            return;
        } else {
            var turn = turnName[0];
            var prime = ( turnName[1] != undefined) ? turnName[1] : "";
            cube.turnExecute( turn + layerCtrl.getValue() + prime);
        }

        cube.checkComplete();
    }

    $('body').keyup(function(e){
        console.log(e.which);
        if(e.which == 32) { // spaceのとき
            cube.scramble();
            cube.checkComplete();
        }

        var turnName = control.getTurnName(e.which);
        parseTurnName(turnName);
    });


    $('.bn>button').click(function(){
        parseTurnName( $(this).html() );
    });


    $('svg:not(.shadow)>path').dblclick( function(){
        console.log( this );
    })

    $('#mag').change(function(){
        var mag = parseInt( this.value );
        cube.setMagnification( mag );
    });

    // ウインドウリサイズ時のイベント.
    jQuery.bind("resize",windowCtrl.updateLayout());

    // リセットボタン --------------------------
    $("button[name='reset']").click(function(){
        control.restoreLastSettings();
        $('#hint').removeClass('off');
    });

    // faceBookのコメントを縮小.
    $('button[name="hide"]').click(function(){
        $('.fb-comments').slideToggle();
    });

    function setOperate(){
        var agent = navigator.userAgent;
        if(agent.search(/iPhone/) != -1){
            $("body").addClass("iphone"); //iPhoneには「body class="iphone"」追加
            window.onorientationchange = setView;
        }else if(agent.search(/iPad/) != -1){
            $("body").addClass("ipad"); //iPadには「body class="ipad"」追加
            $('#fb').css('display','none');
            window.onorientationchange = setView;
        }else if(agent.search(/Android/) != -1){
            $("body").addClass("android"); //Androidには「body class="android"」追加
            window.onresize = setView;
        }else{
            $("body").addClass("other"); //上記以外には「body class="other"」追加
            window.onorientationchange = setView;
        }
    }

});