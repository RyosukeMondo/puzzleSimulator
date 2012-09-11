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

    var targetFaces = {
        "UU1":[
            "UUC4","UUC3","UUC2","UUC1","UUC0",
            "UUE9","UUE8","UUE7","UUE6","UUE5","UUE4","UUE3","UUE2","UUE1","UUE0",
            "UUT4","UUT3","UUT2","UUT1","UUT0",
            "FFC3","FFE5","FFE4","FFC2",
            "LLC3","LLE5","LLE4","LLC2",
            "LBC3","LBE5","LBE4","LBC2",
            "RBC3","RBE5","RBE4","RBC2",
            "RRC3","RRE5","RRE4","RRC2"
            ],
        "UU1P":[
            "UUC3","UUC2","UUC1","UUC0","UUC4",
            "UUE7","UUE6","UUE5","UUE4","UUE3","UUE2","UUE1","UUE0","UUE9","UUE8",
            "UUT3","UUT2","UUT1","UUT0","UUT4",
            "LLC3","LLE5","LLE4","LLC2",
            "LBC3","LBE5","LBE4","LBC2",
            "RBC3","RBE5","RBE4","RBC2",
            "RRC3","RRE5","RRE4","RRC2",
            "FFC3","FFE5","FFE4","FFC2"
        ]
    }
/*    jQuery.each( targetFaces, function(turnName){
        if( turnName[1] == "1" || turnName[1] == "2" ) {
            var target = turnName.replace( turnName[1], parseInt( turnName[1] ) - 1 );
            jQuery.merge( targetFaces[turnName], targetFaces[target]);
        }
    });*/

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

        if(e.which == 38) {
            x++;
            updateFaces($faces);
        }
        if(e.which == 40) {
            x--;
            updateFaces($faces);
        }
        if(e.which == 37) {
            y++;
            updateFaces($faces);
        }
        if(e.which == 39) {
            y--;
            updateFaces($faces);
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
        "UU","UUP","FF","FFP","FL","FLP",
        "LB","LBP","RB","RBP","RR","RRP",
        "FL","FLP","DL","DLP","BB","BBP",
        "DR","DRP","FR","FRP","DD","DDP",
        "undo","LayerToggle"
    ]
    var $keys = $('#keys');
    for( var i = 0; i < availableOperation.length; i++ ) {
        var $span = $('<span/>');
        var decorate = " :";
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

    initCube();
});