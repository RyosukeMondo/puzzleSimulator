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
    var faceNum = 9;

    var mag = 200; // 拡大率.
    var r = mag; // 半径.
    var facePosition = {
        // rotateZ,translateZ,rotateY,rotateX
        "U":[0,0,90,[0,0,1]],
        "F":[90,0,0,[0,0,1]],
        "L":[90,0,-90,[0,0,1]],
        "B":[90,0,-180,[0,0,1]],
        "R":[90,0,-270,[0,0,1]],
        "D":[0,0,-90,[0,0,1]]
    };


    var faceColor = {
        'U':"#FFFFFF",
        'F':"#FF0000",
        'L':"#00FF00",
        'R':"#FFFF00",
        "B":"#FFAA00",
        "D":"#0000FF"
    }

    var svgData3x3 = [
        "M394,121.333c0,3.3-2.7,6-6,6H278.667c-3.3,0-6-2.7-6-6V12c0-3.3,2.7-6,6-6H388c3.3,0,6,2.7,6,6V121.333z",
        "M394,254.667c0,3.3-2.7,6-6,6H278.667c-3.3,0-6-2.7-6-6V145.334c0-3.3,2.7-6,6-6H388c3.3,0,6,2.7,6,6		V254.667z",
        "M394,388c0,3.3-2.7,6-6,6H278.667c-3.3,0-6-2.7-6-6V278.667c0-3.3,2.7-6,6-6H388c3.3,0,6,2.7,6,6V388z",
        "M260.667,388c0,3.3-2.7,6-6,6H145.334c-3.3,0-6-2.7-6-6V278.667c0-3.3,2.7-6,6-6h109.333c3.3,0,6,2.7,6,6		V388z",
        "M127.333,388c0,3.3-2.7,6-6,6H12c-3.3,0-6-2.7-6-6V278.667c0-3.3,2.7-6,6-6h109.334c3.3,0,6,2.7,6,6V388z",
        "M127.333,254.667c0,3.3-2.7,6-6,6H12c-3.3,0-6-2.7-6-6V145.334c0-3.3,2.7-6,6-6h109.333c3.3,0,6,2.7,6,6		V254.667z",
        "M127.334,121.332c0,3.3-2.7,6-6,6H12c-3.3,0-6-2.7-6-6V12c0-3.3,2.7-6,6-6h109.334c3.3,0,6,2.7,6,6V121.332z",
        "M260.667,121.333c0,3.3-2.7,6-6,6H145.334c-3.3,0-6-2.7-6-6V12c0-3.3,2.7-6,6-6h109.333c3.3,0,6,2.7,6,6		V121.333z",
        "M260.667,254.667c0,3.3-2.7,6-6,6H145.334c-3.3,0-6-2.7-6-6V145.334c0-3.3,2.7-6,6-6h109.333		c3.3,0,6,2.7,6,6V254.667z"
    ];

    var generateFaceType = {
        "U":svgData3x3,
        "F":svgData3x3,
        "L":svgData3x3,
        "B":svgData3x3,
        "R":svgData3x3,
        "D":svgData3x3
    }

    var availableTurn = ["U","F","L","B","R","D","M","E","S","X","Y","Z"]; // 回転名を変更するときはturnTableも変更すること.
    var turnAxesAry = [
        {"axis":[" 0,-1, 0"]  ,"offset":[0,0,0] ,"rotate": 90},
        {"axis":[" 0, 0, 1"]  ,"offset":[0,0,0] ,"rotate": 90},
        {"axis":["-1, 0, 0"]  ,"offset":[0,0,0] ,"rotate": 90},
        {"axis":[" 0, 0,-1"]  ,"offset":[0,0,0] ,"rotate": 90},
        {"axis":[" 1, 0, 0"]  ,"offset":[0,0,0] ,"rotate": 90},
        {"axis":[" 0, 1, 0"]  ,"offset":[0,0,0] ,"rotate": 90},
        {"axis":["-1, 0, 0"]  ,"offset":[0,0,0] ,"rotate": 90},
        {"axis":[" 0, 1, 0"]  ,"offset":[0,0,0] ,"rotate": 90},
        {"axis":[" 0, 0, 1"]  ,"offset":[0,0,0] ,"rotate": 90},
        {"axis":[" 1, 0, 0"]  ,"offset":[0,0,0] ,"rotate": 90},
        {"axis":[" 0, 0, 1"]  ,"offset":[0,0,0] ,"rotate": 90},
        {"axis":[" 0,-1, 0"]  ,"offset":[0,0,0] ,"rotate": 90}];
    var turnAxes = {};
    for( var i = 0; i < turnAxesAry.length; i++ )turnAxes[availableTurn[i]] = turnAxesAry[i];

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

    var turnTable = {
        'layer1': {
            'U': [
                [['F', 'R', 'B','L'],['FF04','FF05','FF06',"RF04","RF05","RF06","BF04","BF05","BF06","LF04","LF05","LF06"]],
                [['U'],["UF00","UF01","UF02","UF03","UF04","UF05","UF06","UF07","UF08"]]
            ],
            'F': [
                [['U', 'L', 'D','R'],["UF02","UF03","UF04","LF06","LF07","LF00","DF06","DF07","DF00","RF02","RF03","RF04"]],
                [['F'],["FF00","FF01","FF02","FF03","FF04","FF05","FF06","FF07","FF08"]]
            ],
            'L': [
                [['U', 'B', 'D', 'F'], ['UF04', 'UF05', 'UF06', 'BF06', 'BF07', 'BF00', 'DF04', 'DF05', 'DF06', 'FF02', 'FF03', 'FF04']],
                [['L'],["LF00","LF01","LF02","LF03","LF04","LF05","LF06","LF07","LF08"]]
            ],
            'B': [
                [['U', 'R', 'D', 'L'], ['UF06', 'UF07', 'UF00', 'RF06', 'RF07', 'RF00', 'DF02', 'DF03', 'DF04', 'LF02', 'LF03', 'LF04']],
                [['B'],["BF00","BF01","BF02","BF03","BF04","BF05","BF06","BF07","BF08"]]
            ],
            'R': [
                [['U', 'F', 'D', 'B'], ['UF00', 'UF01', 'UF02', 'FF06', 'FF07', 'FF00', 'DF00', 'DF01', 'DF02', 'BF02', 'BF03', 'BF04']],
                [['R'],["RF00","RF01","RF02","RF03","RF04","RF05","RF06","RF07","RF08"]]
            ],
            'D': [
                [['F', 'L', 'B', 'R'], ['FF00', 'FF01', 'FF02', 'LF00', 'LF01', 'LF02', 'BF00', 'BF01', 'BF02', 'RF00', 'RF01', 'RF02']],
                [['D'],["DF00","DF01","DF02","DF03","DF04","DF05","DF06","DF07","DF08"]]
            ],
            'E':[
                [['F', 'L', 'B', 'R'], ['FF07', 'FF08', 'FF03', 'LF07', 'LF08', 'LF03', 'BF07', 'BF08', 'BF03', 'RF07', 'RF08', 'RF03']]
            ],
            'M':[
                [['U', 'B', 'D', 'F'], ['UF03', 'UF08', 'UF07', 'BF05', 'BF08', 'BF01', 'DF03', 'DF08', 'DF07', 'FF01', 'FF08', 'FF05']]
            ],
            'S':[
                [['U', 'L', 'D', 'R'], ['UF01', 'UF08', 'UF05', 'LF05', 'LF08', 'LF01', 'DF05', 'DF08', 'DF01', 'RF01', 'RF08', 'RF05']]
            ],
            'X': [
                [["U", "F","D","B"],[
                    "UF00","UF01","UF02","UF03","UF04","UF05","UF06","UF07",
                    "UF08",
                    "FF06","FF07","FF00","FF01","FF02","FF03","FF04","FF05",
                    "FF08",
                    "DF00","DF01","DF02","DF03","DF04","DF05","DF06","DF07",
                    "DF08",
                    "BF02","BF03","BF04","BF05","BF06","BF07","BF00","BF01",
                    "BF08"
                ]],
                [["L"],["LF07","LF06","LF05","LF04","LF03","LF02","LF01","LF00","LF08"]],
                [["R"],["RF00","RF01","RF02","RF03","RF04","RF05","RF06","RF07","RF08"]]
            ],
            'Y': [
                [["U", "L","D","R"],[
                    "UF00","UF01","UF02","UF03","UF04","UF05","UF06","UF07",
                    "UF08",
                    "LF04","LF05","LF06","LF07","LF00","LF01","LF02","LF03",
                    "LF08",
                    "DF04","DF05","DF06","DF07","DF00","DF01","DF02","DF03",
                    "DF08",
                    "RF00","RF01","RF02","RF03","RF04","RF05","RF06","RF07",
                    "RF08"
                ]],
                [["F"],["FF00","FF01","FF02","FF03","FF04","FF05","FF06","FF07","FF08"]],
                [["B"],["BF07","BF06","BF05","BF04","BF03","BF02","BF01","BF00","BF08"]]
            ],
            'Z': [
                [["F", "R","B","L"],[
                    "FF06","FF07","FF00","FF01","FF02","FF03","FF04","FF05",
                    "FF08",
                    "RF06","RF07","RF00","RF01","RF02","RF03","RF04","RF05",
                    "RF08",
                    "BF06","BF07","BF00","BF01","BF02","BF03","BF04","BF05",
                    "BF08",
                    "LF06","LF07","LF00","LF01","LF02","LF03","LF04","LF05",
                    "LF08"
                ]],
                [["U"],["UF00","UF01","UF02","UF03","UF04","UF05","UF06","UF07","UF08"]],
                [["D"],["DF07","DF06","DF05","DF04","DF03","DF02","DF01","DF00","DF08"]]
            ]
        }};

    var getTargetSticker = function(turnOperation){
        var operation = parseTurnOperation( turnOperation );
        var processAry = turnTable["layer" + operation["layer"]][operation["turn"]]; // [[],[]] ....

        var order = [];
        var targetStickers = [];
        jQuery.each(processAry, function(pcsIdx, process) {
            var targetAry = process[0];
            var turnLabel = process[1];

            order[pcsIdx] = [];
            if( !operation["isPrime"] ) {
                for ( var index = 0 ; index < targetAry.length; index++ )order[pcsIdx].push( targetAry[index] );
            } else {
                for ( var index = targetAry.length - 1; index >= 0; index-- )order[pcsIdx].push( targetAry[index] );
            }
            for( var i = 0; i < turnLabel.length; i++ ){
                if( targetStickers[pcsIdx] == undefined) {
                    targetStickers[pcsIdx] = {};
                }
                if( targetStickers[pcsIdx][turnLabel[i][0]] == undefined )
                    targetStickers[pcsIdx][turnLabel[i][0]] = [];
                targetStickers[pcsIdx][turnLabel[i][0]].push(turnLabel[i]);
            }
        });
        if( operation["isPrime"] ) { // 逆向きの配列をセットし、回転を逆転させる。
            for( var i = 0; i < order.length; i++ ) {
                if( order[i].length == 1 ){
                    jQuery.each( targetStickers[i], function(key,val){
                        var tmp = val.pop();    // センターピースのみ取り外し。
                        val = val.reverse();
                        val.push( tmp );        // お尻につけておく。
                        //targetStickers[key] = targetStickers[key].reverse();
                    });
                }
            }
        }

        return { "stickers":targetStickers, "order":order };
    };

    var turnExecuteEnd = function(shadow){
        var home = shadow.className.animVal.split(" ")[1];
        var $home = $('#faces>svg:not(.shadow).' + home);

        var orderAry = currentTargetStickers["order"];
        var stickersAry = currentTargetStickers["stickers"];
        var preFace = home;
        var afterFace = "";
        for( var i = 0; i < orderAry.length; i ++ ) {
            var order = orderAry[i];
            var stickers = stickersAry[i];
            var tmpIndex = order.indexOf( preFace );
            if( tmpIndex == -1 ) continue;
            var len = order.length;
            if( len == 1 ) {      // 1面だけの入れ替え.
                afterFace = preFace;
                jQuery.each( $(shadow).children(),function(){
                    var preLabel = this.className.animVal;
                    var preIndex = stickers[preFace].indexOf( preLabel );
                    var afterIndex = (preIndex + 6) % 8; // 8 = 入れ替わる面の数.
                    var afterLabel = stickers[afterFace][afterIndex];

                    if( parseInt(preLabel.slice(-1)) != 8) { // 8 = Centerの場合は入れ替えなし.
                        var $pre = $('#faces>svg>path.' + preLabel);
                        $pre.attr('fill',currentState[afterLabel]);
                    }
                    $home[0].appendChild( this );

                });
            } else { // 2面に渡る入れ替え.
                var adjIndex = tmpIndex % len;
                var adjIndex2 = (adjIndex + 1) % len ;
                adjIndex2 += (tmpIndex >= len) ? len : 0;
                afterFace = order[ adjIndex2 ];

                jQuery.each( $(shadow).children(),function(){
                    var preLabel = this.className.animVal;
                    var index = stickers[preFace].indexOf( preLabel );
                    var afterLabel = stickers[afterFace][index];

                    var $pre = $('#faces>svg>path.' + preLabel);
                    $pre.attr('fill',currentState[afterLabel]);
                    $home[0].appendChild( this );
                });
            }
        };

        that.checkComplete();
        var className = $(shadow).attr("class");
        $(shadow).attr('class', className.replace(" moving", ""));
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

    var partsGroup = [
        ["UF01","RF05"],["UF03","FF05"],["UF05","LF05"],["UF07","BF05"],
        ["FF03","LF07"],["LF03","BF07"],["BF03","RF07"],["RF03","FF07"],
        ["DF07","FF01"],["DF01","RF01"],["DF03","BF01"],["DF05","LF01"],
        ["UF02","FF06","RF04"],["UF04","FF04","LF06"],["UF06","LF04","BF06"],["UF00","BF04","RF06"],
        ["DF00","FF00","RF02"],["DF06","FF02","LF00"],["DF04","LF02","BF00"],["DF02","RF00","BF02"]
    ]
    var getNextSticker = function(label){
        var newLabel = "";

        var faces = getFaces( label );
        var dstLabel = getLabel( faces );

        return dstLabel;
    }

    var getGroupLabels = function(label){
        var group = null;
        var labels = [];
        for( var i = 0; i < partsGroup.length; i++ )
        {
            var idx = partsGroup[i].indexOf(label);
            if( idx != -1) {
                group = partsGroup[i];
                for( var j = 0; j < group.length; j++ ){
                    if( group[j] != label) {
                        labels.push(group[j]);
                    }
                }
                break;
            }
        }
        return labels;
    };

    // ラベルから色の配列を取得.
    var getFaces = function(label){
        var group = null;
        var colors = [];
        colors.push($('.' + label).attr('fill'));
        var labels = getGroupLabels(label);
        for( i = 0; i < labels.length; i++ ){
            colors.push($('.' + labels[i]).attr('fill'));
        }

        var faces = [];
        for( var i = 0; i < colors.length; i++ ){
            jQuery.each( faceColor, function(face,v){
                if( colors[i] == v ) {
                    faces.push( face );
                }
            });
        }
        return faces;
    }

    // 色の配列から、先頭色のラベル名を取得.
    var getLabel = function(faces){
        var relateGroup = [];
        var partsGroupCopy = partsGroup.slice();
        var tmpGroup = [];
        for( var f = 0; f < faces.length; f++ )
        {
            for( var i = 0; i < partsGroupCopy.length; i++ )
            {
                var group = partsGroupCopy[i];
                if( faces.length != group.length ) continue;
                var hasFace = false;
                for( var j = 0; j < group.length; j++ )
                {
                    var label = group[j];
                    if( label[0] == faces[f])
                    {
                        hasFace = true;
                        break;
                    }
                }
                if( hasFace ) {
                    tmpGroup.push(partsGroupCopy[i]);
                }
            }
            partsGroupCopy = tmpGroup;
            tmpGroup = [];
        }

        var dstLabel = "";
        var chkGroup = partsGroupCopy[0];
        for( var i = 0; i< chkGroup.length; i++ ){
            var label = chkGroup[i];
            if( label[0] == faces[0]) {
                dstLabel = label;
            }
        }
        return dstLabel;
    };
    var getUnsolvedLabelEdge = function(doneList){
        // 辺
        if( doneList.length < 24) { // 24 = 辺のステッカーの数. すべて分析済みの場合24になる.
            for( var i = 0; i < faceName.length; i++ ){
                var f = faceName[i];
                var len = generateFaceType[f].length;
                for( var j = 0; j < Math.floor(len/2); j++ ){
                    var num = j * 2 + 1;
                    var newLabel = f + "F" + ("00" + num).slice(-2);
                    if( doneList.indexOf(newLabel) == -1) {
                        return newLabel;
                    }
                }
            }
        }
        return "";
    };
    var getUnsolvedLabelCorner = function(doneList){
        // 角
        for( var i = 0; i < faceName.length; i++ ){
            var f = faceName[i];
            var len = generateFaceType[f].length;
            for( var j = 0; j < Math.floor(len/2) - 1; j++ ){ // -1 = センター分.
                var num = j * 2;
                var newLabel = f + "F" + ("00" + num).slice(-2);
                if( doneList.indexOf(newLabel) == -1) {
                    return newLabel;
                }
            }
        }
        return "";
    };

    var getAlgorithmOrder = function(firstLabel, funcGetUnsolvedLabel, lastLabel){
        var doneList = [];
        var isNewLoop = false;
        var nextLabel = firstLabel;
        var algorithmOrder = [];
        while(true){
            if( !isNewLoop ) {
                doneList.push( nextLabel);
                var labels = getGroupLabels(nextLabel);
                for( var i = 0; i < labels.length; i ++ ){
                    doneList.push( labels[i] );
                }
            }
            nextLabel = getNextSticker( nextLabel );
            if( doneList.indexOf(nextLabel) != -1 ) {
                isNewLoop = true;
                nextLabel = funcGetUnsolvedLabel(doneList);
                if( nextLabel == "") {
                    if( algorithmOrder.length % 2 == 1) {
                        algorithmOrder.push( lastLabel );
                    }
                    break;
                }
            } else {
                isNewLoop = false;
            }
            if( algorithmOrder.slice(-1) == nextLabel ){
                algorithmOrder.pop();
            } else {
                algorithmOrder.push( nextLabel );
            }
        }
        return algorithmOrder;
    };
    var labelNames = {
        "UF00":"D","UF01":"A","UF02":"A","UF03":"B","UF04":"B","UF05":"C","UF06":"C","UF07":"D",
        "FF00":"E","FF01":"F","FF02":"F","FF03":"G","FF04":"G","FF05":"H","FF06":"H","FF07":"E",
        "LF00":"I","LF01":"J","LF02":"J","LF03":"K","LF04":"K","LF05":"L","LF06":"L","LF07":"I",
        "BF00":"M","BF01":"N","BF02":"N","BF03":"O","BF04":"O","BF05":"P","BF06":"P","BF07":"M",
        "RF00":"Q","RF01":"R","RF02":"R","RF03":"S","RF04":"S","RF05":"T","RF06":"T","RF07":"Q",
        "DF00":"X","DF01":"U","DF02":"U","DF03":"V","DF04":"V","DF05":"W","DF06":"W","DF07":"X"
    }
    var convResult = function( edgeOrder, cornerOrder){
        var edgeTbl = [];
        for( var i = 0; i < edgeOrder.length; i++ ){
            edgeTbl.push( labelNames[edgeOrder[i]] );
        }
        var cornerTbl = [];
        for( var i = 0; i < cornerOrder.length; i ++ ){
            cornerTbl.push( labelNames[cornerOrder[i]]);
        }
        return {"edge":edgeTbl,"corner":cornerTbl};
    };

    var algos = {
        "FF03":"U' L' U M2 U' L U",
        "DF05":"U' L2 U M2 U' L2 U",
        "BF07":"U' L U M2 U' L' U",
        "UF05":"L U' L' U M2 U' L U L'",
        "FF07":"U R U' M2 U R' U'",
        "DF01":"U R2 U' M2 U R2 U'",
        "BF03":"U R' U' M2 U R U'",
        "UF01":"R' U R U' M2 U R' U' R",
        "LF01":"B L B' M2 B L' B'",
        "LF07":"B L2 B' M2 B L2 B'",
        "LF05":"B L' B' M2 B L B'",
        "LF03":"L B L' B' M2 B L B' L'",
        "RF01":"B' R' B M2 B' R B",
        "RF03":"B' R2 B M2 B' R2 B",
        "RF05":"B' R B M2 B' R' B",
        "RF07":"R' B' R B M2 B' R' B R",
        "UF03":"U2 M' U2 M'",
        "DF03":"M U2 M U2",
        "FF05":"F E R U R' E' R U' R' F' M2",
        "BF01":"M2 F R U R' E R U' R' E' F'",
        "BF05":"L U' L' U L B L' B' M2 B L B' L' U' L U L'",
        "UF07":"M2",
        "UF00":"R2",
        "UF02":"U' R2 L' U' L U R2 U' L' U L U R2",
        "UF04":"L U' L' U L' U' L U R2 U' L' U L U' L U L'",
        "UF06":"L' U' L U R2 U' L' U L",
        "BF00":"U' L U R2 U' L' U",
        "BF02":"U' R2 L' U' L U R U' L' U L R U R2",
        "BF04":"L U' L' U L U' L' U R2 U' L U L' U' L U L'",
        "BF06":"U' L U L2 U' L' U R2 U' L U L2 U' L' U",
        "DF02":"D' R2 L U' L U R2 U' L' U L' D R2",
        "DF04":"L U' L U L2 U' L' U R2 U' L U L2 U' L' U L'",
        "DF06":"U' L2 U R2 U' L2 U",
        "LF00":"L2 U' L' U R2 U' L U L2",
        "LF02":"L U' L' U R2 U' L U L'",
        "LF04":"U' L' U R2 U' L U",
        "LF06":"L' U' L' U R2 U' L U L",
        "FF02":"U' L' U L' U' L U R2 U' L' U L U' L U",
        "FF04":"R' U L U' R2 U L' U' R",
        "FF06":"D' R U' L2 U R' U' L2 U D R2",
        "RF00":"R' U R2 U' R' F' R U R2 U' R' F",
        "RF04":"F' R U R2 U' R' F R U R2 U' R",
        "RF06":"U' L U L' U' L U L' R2 L U' L' U L U' L' U"
    }

    var mLayer = ["FF05","BF01","UF03","DF03"];
    var rLayer = ["FF06","BF02","UF02","DF02","RF04","RF00"];

    var checkFlip = function(macroBtnName, macro, label, layer){
        var edgeIdx = parseInt( macro[0] ) * 10 + parseInt( macro[1]);
        if( edgeIdx % 2 == 1) {  // 奇数のとき
            var idx = layer.indexOf( label );
            if( idx != -1 ) {
                var convIdx = idx % 2 == 0 ? idx + 1 : idx - 1;
                label = layer[convIdx];
            }
        }
        return label;
    }

    var that = {
        generateFaces: function(){
            for( var faceNum = 0; faceNum < faceName.length; faceNum ++ ){
                var $svg = $('<svg class="face ' + faceName[faceNum] +'"></svg>');
                $svg.css('width',"400px").css('height',"400px");
                var $shadow = $('<svg class="face ' + faceName[faceNum] + ' shadow"></svg>');
                $shadow.css('width',"400px").css('height',"400px");
                var svgData = generateFaceType[faceName[faceNum]];
                for( var i = 0; i < svgData.length; i++ ) {
                    var svgNS = "http://www.w3.org/2000/svg";
                    var c = document.createElementNS(svgNS, "path");
                    var name = faceName[faceNum];
                    c.setAttribute("fill", faceColor[name]);
                    c.setAttribute("d", svgData[i]);
                    c.setAttribute('class', name + "F" + ("00" + i).slice(-2));
                    c.setAttribute("style", "position:absolute");
                    $svg[0].appendChild( c );

                }
                $faces[0].appendChild( $svg[0]);
                $faces[0].appendChild( $shadow[0]);
            }
        },
        getOperation: function(faceName){
            var currentPosAry = facePosition[faceName];
            var cssOpe =
                'rotateZ(' + currentPosAry[0] + 'deg)' +
                    'rotateY(' + currentPosAry[1] + 'deg)' +
                    'rotateX(' + currentPosAry[2] + 'deg)' +
                    'translate3d(' +
                    currentPosAry[3][0] + 'px,' +
                    currentPosAry[3][1] + 'px,' +
                    currentPosAry[3][2] * mag + 'px)' +
                    "scale3d(" + mag / 200 + ',' + mag / 200 + ',' + mag / 200 + ')';
            return cssOpe;
        },
        setPosition: function() {
            var planes = $faces.children();
            for( var i = 0; i < planes.length; i ++ ) {
                var currentFaceName = $(planes[i]).attr('class').split(" ")[1];
                var cssOpe = that.getOperation( currentFaceName );
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
                    var className = $(this).attr("class");
                    $(this).attr('class', className.replace(" moving",""));
                });
                currentOperation = turnOperation;
                currentAnimation = {};
                currentState = {};

            }
            jQuery.each( $shadow, function(){
                var className = $(this).attr("class");
                $(this).attr('class', className + " moving");
            });

            backUpCurrentState(); // 現在の色のリストを取得.
            currentOperation = turnOperation;
            currentTargetStickers = getTargetSticker(currentOperation);
            var targetStickersAry = currentTargetStickers["stickers"];
            jQuery.each( $shadow, function(i,val){
                var currentFaceName = this.className.animVal.split(" ")[1];
                jQuery.each( targetStickersAry, function(i,targetStickers){
                    if( targetStickers[currentFaceName] != undefined) {
                        for( var i = 0; i < targetStickers[currentFaceName].length; i++ ){
                            try {
                                val.appendChild( $('#faces>svg>path.' + targetStickers[currentFaceName][i])[0]);
                            } catch(e) {
                                console.log(e);
                            }
                        }
                    }
                });
            });

            var operation = parseTurnOperation( currentOperation );
            var axes = turnAxes[operation["turn"]]["axis"];
            var axisOffset = turnAxes[operation["turn"]]["offset"];
            var rotateDeg = turnAxes[operation["turn"]]["rotate"];
            jQuery.each( $shadow, function(i,shadowPlane){
                var currentFaceName = $(this).attr('class').split(" ")[1];
                var matrix = that.getOperation( currentFaceName );

                var rotate = 0;
                var name = shadowPlane.className.animVal.split(' ')[1];
                var isPrime = operation["isPrime"];
                //console.log( "axisOffset :" + axisOffset[1]);
                var axOffsetPre = 'translate3d('+
                    axisOffset[0]+'px,'+
                    axisOffset[1]+'px,'+
                    axisOffset[2]+'px) ';
                var axOffsetAfter = 'translate3d('+
                    -axisOffset[0]+'px,'+
                    -axisOffset[1]+'px,'+
                    -axisOffset[2]+'px) ';
                var frameRate = 33;
                var meanTime = 0.5;
                var time = setInterval(function(){
                    if( isPrime ) {
                        rotate -= rotateDeg / frameRate / meanTime;
                    } else {
                        rotate += rotateDeg / frameRate / meanTime;
                    }

                    if( Math.abs(rotate) < rotateDeg ) {
                        var operation = axOffsetPre +
                            "rotate3d(" + axes + "," + rotate + "deg) " +
                            axOffsetAfter + matrix;

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
                },frameRate);
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
                    var rand = Math.floor(Math.random()*(availableTurn.length-6)); // -6 = M E S X Y Z を使わない.
                    var targetTurn = availableTurn[rand];
                    var prime =  ((Math.floor(Math.random()*2) % 2) == 0) ? "P":"";
                    //var layer =  ((Math.floor(Math.random()*2) % 2) == 0) ? "1":"2";
                    that.turnExecute( targetTurn + "1" + prime );
                }
            }
        },
        setMagnification: function( magnification ) {
            mag = magnification;
            that.setPosition();
        },
        analyze: function(){
            var edgeOrder = getAlgorithmOrder("DF07", getUnsolvedLabelEdge, "DF03");
            var cornerOrder = getAlgorithmOrder("DF00", getUnsolvedLabelCorner, "DF06");
            return convResult(edgeOrder,cornerOrder);;
        },
        setColorTable: function(colorList){
            faceColor = colorList;
        },
        scrambleByInput: function(scramble){
            scramble = scramble.split(' ');
            var queue = [];
            for( var i = 0; i < scramble.length; i ++ ){
                var turn = scramble[i];
                if( turn.length == 1){
                    queue.push( turn + "1");
                    //that.turnExecute( turn + "1");
                } else if( turn.length == 2) {
                    if( turn[1] == 2){
                        queue.push( turn[0] + "1");
                        queue.push( turn[0] + "1");
                        //that.turnExecute( turn[0] + "1");
                        //that.turnExecute( turn[0] + "1");
                    } else if( turn[1] == "'") {
                        queue.push( turn[0] + "1" + "P");
                        //that.turnExecute( turn[0] + "1" + "P");
                    }
                }
            }
            var seek = 0;
            var time = setInterval(function(){
                var turn = queue[seek++];
                that.turnExecute( turn );
                if( queue.length == seek ){
                    clearInterval(time);
                }

            }, 500 );
        },
        ExecuteMacro: function(macro,type){
            jQuery.each( labelNames, function(label,v){
                if( macro.slice(2) == v ) {
                    var checkNum = parseInt(label.slice(-1));
                    if( type == "edge" && checkNum % 2 == 1 ) {
                        label = checkFlip("edgeMacro", macro, label, mLayer);
                        that.scrambleByInput( algos[label] );
                    } else if( type == "corner" && checkNum % 2 == 0) {
                        label = checkFlip("cornerMacro", macro, label, rLayer);
                        that.scrambleByInput( algos[label] );
                    }
                }
            });
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

    var availableTurns = turns;

    var generateSelection = function($target, name){
        var $button = $('<button/>');
        $button.html(name)
            .attr('type','button')
            .css('width','50px')
            .css('height','50px');
        $target.append($button);
        var $select = $('<select/>');
        $select.attr('name',name)
            .css('width','80px')
            .css('height','50px');

        var $option = $('<option/>');
        $option.attr('value',-1).html('none'); // .attr('selected',"")
        $select.append($option);

        jQuery.each( availableKeys, function(keyCode,letter){
            var $option = $('<option/>');
            $option.attr('value',keyCode).html(letter);
            if( name[0] == letter && name[1] != "P") {
                keyTable[name] = name.charCodeAt(0);
                $option.attr('selected','');
            }
            $select.append($option);
        });

        $target.append($select);
    }

    var isShow = true;

    var that = {
        setAlgorithms: function(algo){
            $('#algoBtn').html("");
            $('#algoBtn').append('Edge:<br>');
            for( var e = 0; e < algo["edge"].length; e ++ ){
                var $btn = $('<button></button>');
                var name = algo["edge"][e];
                $btn.attr('name',"edgeMacro")
                    .html( ("00"+e).slice(-2) + name );
                $('#algoBtn').append( $btn );
            }
            $('#algoBtn').append('<br>Corner:<br>');
            for( var c = 0; c < algo["corner"].length; c ++ ){
                var $btn = $('<button></button>');
                var name = algo["corner"][c];
                $btn.attr('name','cornerMacro')
                    .html( ("00"+c).slice(-2) + name );
                $('#algoBtn').append( $btn );
            }
        },
        getColorTable: function(){
            return colorList;
        },
        generateKeys: function(){
            var $keys = $('#keys');
            jQuery.each( availableTurns, function(i,val){
                generateSelection( $keys, val );
                generateSelection( $keys, val + "P" );
                $keys.append($('<br/>'));
            });
            /*
            generateSelection( $keys, "Minus" );
            $keys.append($('<br/>'));
            generateSelection( $keys, "Plus" );
            $keys.append($('<br/>'));*/
        },
        eventBind: function(){
            // show/hideボタン.
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
            //store.set('keyBindSetting');
            store.get('keyBindSetting', function(ok, val) {
                if (ok) {
                    if( val != null) {
                        //keyTable = {  };
                        try {
                            var tmpAry = val.split(',');
                            jQuery.each( tmpAry, function(i,v){
                                var tmp = v.split(':');
                                if( isFinite(tmp[1]) ) { // 数値であれば.
                                    keyTable[tmp[0]] = parseInt(tmp[1]);
                                    var $update = $('select[name=' + tmp[0] +']');
                                    //if( $update.val() == "-1") {
                                        $update.val( tmp[1]);
                                    //}
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
    var levels = ["outer","inner"];
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
    /*
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
    });*/

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
    cube.setColorTable( control.getColorTable() );

    var layerCtrl = LayerControl();
    var windowCtrl = WindowControl();

    var parseTurnName = function (turnName, isShift) {
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
            prime = (isShift && prime == "") ? "P" : "";
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
        var isShift = (e.shiftKey) ? true : false;

        var turnName = control.getTurnName(e.which);
        parseTurnName(turnName, isShift);
    });


    $('#keys>button').click(function(){
        parseTurnName( $(this).html() );
    });

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

    // debug.
    var barNum = 0;
    $('svg:not(.shadow)>path').mouseover( function(){
        console.log( this.className.animVal + "------------------------------" );
    });

    $('button[name="analyze"]').click(function(){
        var algorithms = cube.analyze();
        control.setAlgorithms( algorithms );
        $('button[name="edgeMacro"]').click(function(){
            cube.ExecuteMacro($(this).html(),"edge");
        });
        $('button[name="cornerMacro"]').click(function(){
            cube.ExecuteMacro($(this).html(),"corner");
        });
    });

    $('button[name="scramble"]').click(function(){
        cube.scrambleByInput($('input[name="scramble"]').val());
    });

});