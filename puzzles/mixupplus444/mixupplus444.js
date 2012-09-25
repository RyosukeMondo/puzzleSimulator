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

    var faceName = [
        'U','F','L','B','R','D',
        'UM','FM','BM','DM',
        'FE',"LE","BE","RE",
        "US","LS","DS","RS",
        "UFR","DFR","URB","DRB","UBL","DBL","ULF","DLF",
        "RFD","LFD","RDB","LDB","RBU","LBU","RUF","LUF",
        "BUR","FUR","BRD","FRD","BDL","FDL","BLU","FLU"
    ];

    var mag = 200; // 拡大率.
    var r = mag; // 半径.
    var facePosition = {
        // rotateZ,translateZ,rotateY,rotateX
        "U": [   0,   0,  90,[0,0,1]],
        "F": [  90,   0,   0,[0,0,1]],
        "L": [  90,   0, -90,[0,0,1]],
        "B": [  90,   0,-180,[0,0,1]],
        "R": [  90,   0,-270,[0,0,1]],
        "D": [   0,   0, -90,[0,0,1]],
        "UM":[   0,   0,  45,[0,0,1]],
        "FM":[  90,  45,   0,[0,0,1]],
        "BM":[  90,  45, 180,[0,0,1]],
        "DM":[   0,   0, 225,[0,0,1]],
        "FE":[  90,   0,  45,[0,0,1]],
        "LE":[  90,   0, -45,[0,0,1]],
        "BE":[  90,   0,-135,[0,0,1]],
        "RE":[  90,   0,-225,[0,0,1]],
        "US":[  45,   0,  90,[0,0,1]],
        "LS":[ 135,   0, -90,[0,0,1]],
        "RS":[ 135,   0,-270,[0,0,1]],
        "DS":[  45,   0, -90,[0,0,1]],
        "UFR":[   0,  45,  45,[0,0,1]],
        "DFR":[   0,  45, -45,[0,0,1]],
        "URB":[   0, 135,  45,[0,0,1]],
        "DRB":[   0, 135, -45,[0,0,1]],
        "UBL":[   0, 225,  45,[0,0,1]],
        "DBL":[   0, 225, -45,[0,0,1]],
        "ULF":[   0, 315,  45,[0,0,1]],
        "DLF":[   0, 315, -45,[0,0,1]],
        "RFD":[  90,  45,  45,[0,0,1]],
        "LFD":[  90,  45, -45,[0,0,1]],
        "RDB":[  90, 135,  45,[0,0,1]],
        "LDB":[  90, 135, -45,[0,0,1]],
        "RBU":[  90, 225,  45,[0,0,1]],
        "LBU":[  90, 225, -45,[0,0,1]],
        "RUF":[  90, 315,  45,[0,0,1]],
        "LUF":[  90, 315, -45,[0,0,1]],
        "BUR":[ 135,  45, 180,[0,0,1]],
        "FUR":[ 135, 135, 180,[0,0,1]],
        "BRD":[ 225,  45, 180,[0,0,1]],
        "FRD":[ 225, 135, 180,[0,0,1]],
        "BDL":[ 315,  45, 180,[0,0,1]],
        "FDL":[ 315, 135, 180,[0,0,1]],
        "BLU":[  45,  45, 180,[0,0,1]],
        "FLU":[  45, 135, 180,[0,0,1]]
    };


    var faceColor = {};

    var svgDataMixUpPlus444 = [
        "M394,135.757c0,3.3-2.7,6-6,6h-55.879c-3.3,0-8.7,0-12,0h-55.879c-3.3,0-6-2.7-6-6V79.878			c0-3.3,0-8.7,0-12V12c0-3.3,2.7-6,6-6h55.879c3.3,0,8.7,0,12,0H388c3.3,0,6,2.7,6,6v55.878c0,3.3,0,8.7,0,12V135.757z",
        "M394,188c0,3.3-2.7,6-6,6h-49.879c-3.3,0-6-2.7-6-6v-28.243c0-3.3,2.7-6,6-6H388			c3.3,0,6,2.7,6,6V188z",
        "M394,240.241c0,3.3-2.7,6-6,6h-49.879c-3.3,0-6-2.7-6-6v-28.24c0-3.3,2.7-6,6-6H388			c3.3,0,6,2.7,6,6V240.241z",
        "M320.121,240.241c0,3.3-2.7,6-6,6h-49.88c-3.3,0-6-2.7-6-6V212c0-3.3,2.7-6,6-6h49.88			c3.3,0,6,2.7,6,6V240.241z",
        "M320.121,188c0,3.3-2.7,6-6,6h-49.88c-3.3,0-6-2.7-6-6v-28.243c0-3.3,2.7-6,6-6h49.88			c3.3,0,6,2.7,6,6V188z",
        "M246.241,188c0,3.3-2.7,6-6,6h-28.24c-3.3,0-6-2.7-6-6v-28.242c0-3.3,2.7-6,6-6h28.24			c3.3,0,6,2.7,6,6V188z",
        "M394,388c0,3.3-2.7,6-6,6h-55.879c-3.3,0-8.7,0-12,0h-55.879c-3.3,0-6-2.7-6-6v-55.879			c0-3.3,0-8.7,0-12v-55.879c0-3.3,2.7-6,6-6h55.879c3.3,0,8.7,0,12,0H388c3.3,0,6,2.7,6,6v55.879c0,3.3,0,8.7,0,12V388z",
        "M246.241,388c0,3.3-2.7,6-6,6h-28.24c-3.3,0-6-2.7-6-6v-49.879c0-3.3,2.7-6,6-6h28.24			c3.3,0,6,2.7,6,6V388z",
        "M194,388c0,3.3-2.7,6-6,6h-28.24c-3.3,0-6-2.7-6-6v-49.879c0-3.3,2.7-6,6-6H188			c3.3,0,6,2.7,6,6V388z",
        "M194,314.121c0,3.3-2.7,6-6,6h-28.241c-3.3,0-6-2.7-6-6v-49.88c0-3.3,2.7-6,6-6H188			c3.3,0,6,2.7,6,6V314.121z",
        "M246.241,314.121c0,3.3-2.7,6-6,6H212c-3.3,0-6-2.7-6-6v-49.88c0-3.3,2.7-6,6-6h28.241			c3.3,0,6,2.7,6,6V314.121z",
        "M246.241,240.241c0,3.3-2.7,6-6,6h-28.24c-3.3,0-6-2.7-6-6v-28.24c0-3.3,2.7-6,6-6h28.24			c3.3,0,6,2.7,6,6V240.241z",
        "M141.759,388c0,3.3-2.7,6-6,6H79.878c-3.3,0-8.7,0-12,0H12.001c-3.3,0-6-2.7-6-6v-55.879			c0-3.3,0-8.7,0-12v-55.879c0-3.3,2.7-6,6-6h55.876c3.3,0,8.7,0,12,0h55.881c3.3,0,6,2.7,6,6v55.879c0,3.3,0,8.7,0,12V388z",
        "M67.877,240.241c0,3.3-2.7,6-6,6H12c-3.3,0-6-2.7-6-6V212c0-3.3,2.7-6,6-6h49.877			c3.3,0,6,2.7,6,6V240.241z",
        "M67.878,187.999c0,3.3-2.7,6-6,6H12c-3.3,0-6-2.7-6-6v-28.241c0-3.3,2.7-6,6-6h49.878			c3.3,0,6,2.7,6,6V187.999z",
        "M141.758,187.999c0,3.3-2.7,6-6,6h-49.88c-3.3,0-6-2.7-6-6v-28.241c0-3.3,2.7-6,6-6h49.88			c3.3,0,6,2.7,6,6V187.999z",
        "M141.758,240.241c0,3.3-2.7,6-6,6H85.879c-3.3,0-6-2.7-6-6v-28.24c0-3.3,2.7-6,6-6h49.879			c3.3,0,6,2.7,6,6V240.241z",
        "M194,240.241c0,3.3-2.7,6-6,6H159.76c-3.3,0-6-2.7-6-6v-28.24c0-3.3,2.7-6,6-6H188			c3.3,0,6,2.7,6,6V240.241z",
        "M141.757,135.757c0,3.3-2.7,6-6,6H79.878c-3.3,0-8.7,0-12,0H12.001c-3.3,0-6-2.7-6-6V79.878			c0-3.3,0-8.7,0-12V12.001c0-3.3,2.7-6,6-6h55.876c3.3,0,8.7,0,12,0h55.879c3.3,0,6,2.7,6,6v55.876c0,3.3,0,8.7,0,12V135.757z",
        "M193.999,61.878c0,3.3-2.7,6-6,6h-28.241c-3.3,0-6-2.7-6-6V12c0-3.3,2.7-6,6-6h28.241			c3.3,0,6,2.7,6,6V61.878z",
        "M246.241,61.877c0,3.3-2.7,6-6,6h-28.24c-3.3,0-6-2.7-6-6V12c0-3.3,2.7-6,6-6h28.24			c3.3,0,6,2.7,6,6V61.877z",
        "M246.241,135.756c0,3.3-2.7,6-6,6h-28.24c-3.3,0-6-2.7-6-6V85.879c0-3.3,2.7-6,6-6h28.24			c3.3,0,6,2.7,6,6V135.756z",
        "M193.999,135.758c0,3.3-2.7,6-6,6h-28.241c-3.3,0-6-2.7-6-6v-49.88c0-3.3,2.7-6,6-6h28.241			c3.3,0,6,2.7,6,6V135.758z",
        "M193.999,187.999c0,3.3-2.7,6-6,6h-28.241c-3.3,0-6-2.7-6-6v-28.241c0-3.3,2.7-6,6-6h28.241			c3.3,0,6,2.7,6,6V187.999z"
    ];

    var svgDataMixUpPlus444MiddleH = [
        "M394,188c0,3.3-2.7,6-6,6h-49.879c-3.3,0-6-2.7-6-6v-28.243c0-3.3,2.7-6,6-6H388			c3.3,0,6,2.7,6,6V188z",
        "M394,240.241c0,3.3-2.7,6-6,6h-49.879c-3.3,0-6-2.7-6-6v-28.24c0-3.3,2.7-6,6-6H388			c3.3,0,6,2.7,6,6V240.241z",
        "M320.121,240.241c0,3.3-2.7,6-6,6h-49.88c-3.3,0-6-2.7-6-6V212c0-3.3,2.7-6,6-6h49.88			c3.3,0,6,2.7,6,6V240.241z",
        "M320.121,188c0,3.3-2.7,6-6,6h-49.88c-3.3,0-6-2.7-6-6v-28.243c0-3.3,2.7-6,6-6h49.88			c3.3,0,6,2.7,6,6V188z",
        "M246.241,188c0,3.3-2.7,6-6,6h-28.24c-3.3,0-6-2.7-6-6v-28.242c0-3.3,2.7-6,6-6h28.24			c3.3,0,6,2.7,6,6V188z",
        "M246.241,240.241c0,3.3-2.7,6-6,6h-28.24c-3.3,0-6-2.7-6-6v-28.24c0-3.3,2.7-6,6-6h28.24			c3.3,0,6,2.7,6,6V240.241z",
        "M67.877,240.241c0,3.3-2.7,6-6,6H12c-3.3,0-6-2.7-6-6V212c0-3.3,2.7-6,6-6h49.877			c3.3,0,6,2.7,6,6V240.241z",
        "M67.878,187.999c0,3.3-2.7,6-6,6H12c-3.3,0-6-2.7-6-6v-28.241c0-3.3,2.7-6,6-6h49.878			c3.3,0,6,2.7,6,6V187.999z",
        "M141.758,187.999c0,3.3-2.7,6-6,6h-49.88c-3.3,0-6-2.7-6-6v-28.241c0-3.3,2.7-6,6-6h49.88			c3.3,0,6,2.7,6,6V187.999z",
        "M141.758,240.241c0,3.3-2.7,6-6,6H85.879c-3.3,0-6-2.7-6-6v-28.24c0-3.3,2.7-6,6-6h49.879			c3.3,0,6,2.7,6,6V240.241z",
        "M194,240.241c0,3.3-2.7,6-6,6H159.76c-3.3,0-6-2.7-6-6v-28.24c0-3.3,2.7-6,6-6H188			c3.3,0,6,2.7,6,6V240.241z",
        "M193.999,187.999c0,3.3-2.7,6-6,6h-28.241c-3.3,0-6-2.7-6-6v-28.241c0-3.3,2.7-6,6-6h28.241			c3.3,0,6,2.7,6,6V187.999z"
    ];

    var svgDataMixUpPlus444MiddleV = [
        "M246.241,188c0,3.3-2.7,6-6,6h-28.24c-3.3,0-6-2.7-6-6v-28.242c0-3.3,2.7-6,6-6h28.24			c3.3,0,6,2.7,6,6V188z",
        "M246.241,388c0,3.3-2.7,6-6,6h-28.24c-3.3,0-6-2.7-6-6v-49.879c0-3.3,2.7-6,6-6h28.24			c3.3,0,6,2.7,6,6V388z",
        "M194,388c0,3.3-2.7,6-6,6h-28.24c-3.3,0-6-2.7-6-6v-49.879c0-3.3,2.7-6,6-6H188			c3.3,0,6,2.7,6,6V388z",
        "M194,314.121c0,3.3-2.7,6-6,6h-28.241c-3.3,0-6-2.7-6-6v-49.88c0-3.3,2.7-6,6-6H188			c3.3,0,6,2.7,6,6V314.121z",
        "M246.241,314.121c0,3.3-2.7,6-6,6H212c-3.3,0-6-2.7-6-6v-49.88c0-3.3,2.7-6,6-6h28.241			c3.3,0,6,2.7,6,6V314.121z",
        "M246.241,240.241c0,3.3-2.7,6-6,6h-28.24c-3.3,0-6-2.7-6-6v-28.24c0-3.3,2.7-6,6-6h28.24			c3.3,0,6,2.7,6,6V240.241z",
        "M194,240.241c0,3.3-2.7,6-6,6H159.76c-3.3,0-6-2.7-6-6v-28.24c0-3.3,2.7-6,6-6H188			c3.3,0,6,2.7,6,6V240.241z",
        "M193.999,61.878c0,3.3-2.7,6-6,6h-28.241c-3.3,0-6-2.7-6-6V12c0-3.3,2.7-6,6-6h28.241			c3.3,0,6,2.7,6,6V61.878z",
        "M246.241,61.877c0,3.3-2.7,6-6,6h-28.24c-3.3,0-6-2.7-6-6V12c0-3.3,2.7-6,6-6h28.24			c3.3,0,6,2.7,6,6V61.877z",
        "M246.241,135.756c0,3.3-2.7,6-6,6h-28.24c-3.3,0-6-2.7-6-6V85.879c0-3.3,2.7-6,6-6h28.24			c3.3,0,6,2.7,6,6V135.756z",
        "M193.999,135.758c0,3.3-2.7,6-6,6h-28.241c-3.3,0-6-2.7-6-6v-49.88c0-3.3,2.7-6,6-6h28.241			c3.3,0,6,2.7,6,6V135.758z",
        "M193.999,187.999c0,3.3-2.7,6-6,6h-28.241c-3.3,0-6-2.7-6-6v-28.241c0-3.3,2.7-6,6-6h28.241			c3.3,0,6,2.7,6,6V187.999z"
    ];

    var svgDataMixUpPlus444OuterEdge01 = [
        "M394,188c0,3.3-2.7,6-6,6h-49.879c-3.3,0-6-2.7-6-6v-28.243c0-3.3,2.7-6,6-6H388			c3.3,0,6,2.7,6,6V188z",
        "M394,240.241c0,3.3-2.7,6-6,6h-49.879c-3.3,0-6-2.7-6-6v-28.24c0-3.3,2.7-6,6-6H388			c3.3,0,6,2.7,6,6V240.241z",
    ];
    var svgDataMixUpPlus444OuterEdge23 = [
        "M246.241,388c0,3.3-2.7,6-6,6h-28.24c-3.3,0-6-2.7-6-6v-49.879c0-3.3,2.7-6,6-6h28.24			c3.3,0,6,2.7,6,6V388z",
        "M194,388c0,3.3-2.7,6-6,6h-28.24c-3.3,0-6-2.7-6-6v-49.879c0-3.3,2.7-6,6-6H188			c3.3,0,6,2.7,6,6V388z",
    ];
    var svgDataMixUpPlus444OuterEdge45 = [
        "M67.877,240.241c0,3.3-2.7,6-6,6H12c-3.3,0-6-2.7-6-6V212c0-3.3,2.7-6,6-6h49.877			c3.3,0,6,2.7,6,6V240.241z",
        "M67.878,187.999c0,3.3-2.7,6-6,6H12c-3.3,0-6-2.7-6-6v-28.241c0-3.3,2.7-6,6-6h49.878			c3.3,0,6,2.7,6,6V187.999z",
    ];
    var svgDataMixUpPlus444OuterEdge67 = [
        "M193.999,61.878c0,3.3-2.7,6-6,6h-28.241c-3.3,0-6-2.7-6-6V12c0-3.3,2.7-6,6-6h28.241			c3.3,0,6,2.7,6,6V61.878z",
        "M246.241,61.877c0,3.3-2.7,6-6,6h-28.24c-3.3,0-6-2.7-6-6V12c0-3.3,2.7-6,6-6h28.24			c3.3,0,6,2.7,6,6V61.877z",
    ];

    var svgDataArrow = [
        "M116.5,60.5c0,1.655,1.342,3,3,3s3-1.344,3-3V36.377h12.005L119.547,10.47L104.59,36.377H116.5V60.5z",
        "M159.09,37.119H171v24.123c0,1.656,1.343,3.001,2.999,3.001s3.001-1.345,3.001-3.001V37.119h12.004l-14.958-25.907	L159.09,37.119z",
        "M211.589,37.119h11.909v24.124c0,1.657,1.344,3,3.002,3c1.655,0,3-1.343,3-3V37.119h12.004l-14.957-25.907L211.589,37.119z",
        "M276.499,61.241c0,1.657,1.344,3,3.001,3c1.655,0,3.001-1.343,3.001-3V37.119h12.003l-14.957-25.907l-14.958,25.907h11.91	V61.241z",
        "M339,122h24.123v12.004l25.907-14.958l-25.907-14.958V116H339c-1.657,0-3.001,1.341-3.001,2.999	C335.999,120.658,337.343,122,339,122z",
        "M362.381,170.5h-24.124c-1.658,0-2.999,1.343-2.999,2.999c0,1.658,1.341,3.001,2.999,3.001h24.124v12.004l25.907-14.958	l-25.907-14.958V170.5z",
        "M362.381,223h-24.124c-1.658,0-2.999,1.343-2.999,2.999c0,1.657,1.341,3,2.999,3h24.124v12.005l25.907-14.957	l-25.907-14.957V223z",
        "M362.381,275.999h-24.124c-1.658,0-2.999,1.344-2.999,3.001c0,1.655,1.341,2.999,2.999,2.999h24.124v12.005l25.907-14.957	l-25.907-14.957V275.999z",
        "M283.499,338.5c0-1.658-1.343-3.001-3-3.001c-1.656,0-2.999,1.343-2.999,3.001v24.123h-12.005l14.958,25.907l14.957-25.907	h-11.911V338.5z",
        "M228.999,337.757c0-1.656-1.343-2.999-2.999-2.999c-1.657,0-3,1.343-3,2.999v24.124h-12.005l14.958,25.907l14.957-25.907	h-11.911V337.757z",
        "M176.5,337.757c0-1.656-1.343-2.999-3-2.999c-1.657,0-3,1.343-3,2.999v24.124h-12.003l14.958,25.907l14.958-25.907H176.5	V337.757z",
        "M123.5,337.757c0-1.656-1.343-2.999-3-2.999s-3,1.343-3,2.999v24.124h-12.003l14.958,25.907l14.958-25.907H123.5V337.757z",
        "M60.999,276.999H36.877v-12.004L10.97,279.953l25.907,14.957V283h24.122c1.657,0,3.001-1.344,3.001-3	C64,278.343,62.656,276.999,60.999,276.999z",
        "M61.742,222.499H37.619v-12.004l-25.907,14.958l25.907,14.957V228.5h24.123c1.657,0,3-1.345,3-3.001	S63.399,222.499,61.742,222.499z",
        "M61.742,170H37.619v-12.005l-25.907,14.958l25.907,14.958V176h24.123c1.656,0,3.001-1.345,3.001-3.001	S63.398,170,61.742,170z",
        "M37.619,123h24.123c1.656,0,3-1.342,3-3s-1.344-3-3-3H37.619v-12.004l-25.907,14.958l25.907,14.958V123z",
        "M159.955,95.119h29.591v22.123c0,1.656,3.336,5.001,7.451,5.001c4.112,0,7.456-3.345,7.456-5.001V95.119h29.823	l-37.163-25.907L159.955,95.119z",
        "M303.881,159.955v29.591h-22.123c-1.656,0-5.001,3.336-5.001,7.451c0,4.112,3.345,7.456,5.001,7.456h22.123v29.823	l25.907-37.163L303.881,159.955z",
        "M239.045,303.881h-29.591v-22.123c0-1.656-3.337-5.001-7.451-5.001c-4.112,0-7.456,3.345-7.456,5.001v22.123h-29.823	l37.163,25.907L239.045,303.881z",
        "M95.119,239.045v-29.591h22.123c1.656,0,5.001-3.337,5.001-7.451c0-4.112-3.345-7.456-5.001-7.456H95.119v-29.823	l-25.907,37.163L95.119,239.045z"
    ];

    var generateFaceType = {
        "U":svgDataMixUpPlus444,
        "F":svgDataMixUpPlus444,
        "L":svgDataMixUpPlus444,
        "B":svgDataMixUpPlus444,
        "R":svgDataMixUpPlus444,
        "D":svgDataMixUpPlus444,
        "UM":svgDataMixUpPlus444MiddleV,
        "FM":svgDataMixUpPlus444MiddleH,
        "BM":svgDataMixUpPlus444MiddleH,
        "DM":svgDataMixUpPlus444MiddleV,
        "FE":svgDataMixUpPlus444MiddleV,
        "LE":svgDataMixUpPlus444MiddleV,
        "BE":svgDataMixUpPlus444MiddleV,
        "RE":svgDataMixUpPlus444MiddleV,
        "US":svgDataMixUpPlus444MiddleH,
        "LS":svgDataMixUpPlus444MiddleH,
        "DS":svgDataMixUpPlus444MiddleH,
        "RS":svgDataMixUpPlus444MiddleH,
        "UFR":svgDataMixUpPlus444OuterEdge23,
        "DFR":svgDataMixUpPlus444OuterEdge67,
        "URB":svgDataMixUpPlus444OuterEdge23,
        "DRB":svgDataMixUpPlus444OuterEdge67,
        "UBL":svgDataMixUpPlus444OuterEdge23,
        "DBL":svgDataMixUpPlus444OuterEdge67,
        "ULF":svgDataMixUpPlus444OuterEdge23,
        "DLF":svgDataMixUpPlus444OuterEdge67,
        "RFD":svgDataMixUpPlus444OuterEdge23,
        "LFD":svgDataMixUpPlus444OuterEdge67,
        "RDB":svgDataMixUpPlus444OuterEdge23,
        "LDB":svgDataMixUpPlus444OuterEdge67,
        "RBU":svgDataMixUpPlus444OuterEdge23,
        "LBU":svgDataMixUpPlus444OuterEdge67,
        "RUF":svgDataMixUpPlus444OuterEdge23,
        "LUF":svgDataMixUpPlus444OuterEdge67,
        "BUR":svgDataMixUpPlus444OuterEdge45,
        "FUR":svgDataMixUpPlus444OuterEdge01,
        "BRD":svgDataMixUpPlus444OuterEdge45,
        "FRD":svgDataMixUpPlus444OuterEdge01,
        "BDL":svgDataMixUpPlus444OuterEdge45,
        "FDL":svgDataMixUpPlus444OuterEdge01,
        "BLU":svgDataMixUpPlus444OuterEdge45,
        "FLU":svgDataMixUpPlus444OuterEdge01

    };

    var turnTable = {
        'layer1': {
            'U': [
                [['F', 'R', 'B', 'L'],[
                    'F12',"F13","F14","F15","F16","F18",
                    'R12',"R13","R14","R15","R16","R18",
                    'B12',"B13","B14","B15","B16","B18",
                    'L12',"L13","L14","L15","L16","L18"
                ]],
                [['U'],[
                    'U00','U01','U02','U03','U04','U05','U06','U07','U08','U09','U10','U11',
                    'U12','U13','U14','U15','U16','U17','U18','U19','U20','U21','U22','U23'
                ]],
                [['UM','US','BM','LS'],[
                    'UM03','UM06','UM11','UM10','UM07','UM08','UM09','UM00','UM05','UM04',
                    'US02','US05','US10','US09','US06','US07','US08','US11','US04','US03',
                    'BM02','BM05','BM10','BM09','BM06','BM07','BM08','BM11','BM04','BM03',
                    'LS02','LS05','LS10','LS09','LS06','LS07','LS08','LS11','LS04','LS03'
                ]],
                [["RUF","BUR",'LBU','FLU'],[
                    "RUF01","RUF00","BUR01",'BUR00','LBU01','LBU00','FLU01','FLU00'
                ]],
                [["LUF",'FUR','RBU','BLU'],[
                    "LUF00",'LUF01','FUR00','FUR01','RBU00','RBU01','BLU00','BLU01'
                ]]
            ],
            'F': [
                [['U', 'L', 'D', 'R'],[
                    'U06','U07','U08','U09','U10','U12',
                    'L18','L19','L20','L21','L22','L00',
                    'D18','D19','D20','D21','D22','D00',
                    'R06','R07','R08','R09','R10','R12'
                ]],
                [['F'],[
                    'F00','F01','F02','F03','F04','F05','F06','F07','F08','F09','F10','F11',
                    'F12','F13','F14','F15','F16','F17','F18','F19','F20','F21','F22','F23'
                ]],
                [['UM','LE','FM','FE'],[
                    'UM10','UM11','UM06','UM03','UM02','UM01','UM04','UM05','UM00','UM09',
                    'LE04','LE05','LE00','LE09','LE08','LE07','LE10','LE11','LE06','LE03',
                    'FM03','FM04','FM11','FM08','FM07','FM06','FM09','FM10','FM05','FM02',
                    'FE10','FE11','FE06','FE03','FE02','FE01','FE04','FE05','FE00','FE09'
                ]],
                [["RUF","ULF",'LFD','DFR'],[
                    "RUF01","RUF00","ULF01",'ULF00','LFD01','LFD00','DFR01','DFR00'
                ]],
                [["LUF",'DLF','RFD','UFR'],[
                    "LUF00",'LUF01','DLF00','DLF01','RFD00','RFD01','UFR00','UFR01'
                ]]
            ],
            'L': [
                [['U', 'B', 'D', 'F'],[
                    'U12','U13','U14','U15','U16','U18',
                    'B18','B19','B20','B21','B22','B00',
                    'D12','D13','D14','D15','D16','D18',
                    'F06','F07','F08','F09','F10','F12'
                ]],
                [['L'],[
                    'L00','L01','L02','L03','L04','L05','L06','L07','L08','L09','L10','L11',
                    'L12','L13','L14','L15','L16','L17','L18','L19','L20','L21','L22','L23'
                ]],
                [['LS','BE','DS','LE'],[
                    'LS09','LS10','LS05','LS02','LS01','LS00','LS03','LS04','LS11','LS08',
                    'BE04','BE05','BE00','BE09','BE08','BE07','BE10','BE11','BE06','BE03',
                    'DS03','DS04','DS11','DS08','DS07','DS06','DS09','DS10','DS05','DS02',
                    'LE10','LE11','LE06','LE03','LE02','LE01','LE04','LE05','LE00','LE09'
                ]],
                [["BLU","DBL",'FDL','ULF'],[
                    "BLU00","BLU01","DBL00",'DBL01','FDL00','FDL01','ULF00','ULF01'
                ]],
                [["FLU",'UBL','BDL','DLF'],[
                    "FLU01",'FLU00','UBL01','UBL00','BDL01','BDL00','DLF01','DLF00'
                ]]
            ],
            'B': [
                [['U', 'R', 'D', 'L'],[
                    'U18','U19','U20','U21','U22','U00',
                    'R18','R19','R20','R21','R22','R00',
                    'D06','D07','D08','D09','D10','D12',
                    'L06','L07','L08','L09','L10','L12'
                ]],
                [['B'],[
                    'B00','B01','B02','B03','B04','B05','B06','B07','B08','B09','B10','B11',
                    'B12','B13','B14','B15','B16','B17','B18','B19','B20','B21','B22','B23'
                ]],
                [['BM','RE','DM','BE'],[
                    'BM08','BM11','BM05','BM02','BM01','BM00','BM03','BM04','BM10','BM09',
                    'RE03','RE06','RE00','RE09','RE08','RE07','RE10','RE11','RE05','RE04',
                    'DM09','DM00','DM06','DM03','DM02','DM01','DM04','DM05','DM11','DM10',
                    'BE09','BE00','BE06','BE03','BE02','BE01','BE04','BE05','BE11','BE10'
                ]],
                [["RBU","DRB",'LDB','UBL'],[
                    "RBU00","RBU01","DRB00",'DRB01','LDB00','LDB01','UBL00','UBL01'
                ]],
                [["LBU","URB",'RDB','DBL'],[
                    "LBU01","LBU00","URB01",'URB00','RDB01','RDB00','DBL01','DBL00'
                ]]
            ],
            'R': [
                [['U', 'F', 'D', 'B'],[
                    'U00','U01','U02','U03','U04','U06',
                    'F18','F19','F20','F21','F22','F00',
                    'D00','D01','D02','D03','D04','D06',
                    'B06','B07','B08','B09','B10','B12'
                ]],
                [['R'],[
                    'R00','R01','R02','R03','R04','R05','R06','R07','R08','R09','R10','R11',
                    'R12','R13','R14','R15','R16','R17','R18','R19','R20','R21','R22','R23'
                ]],
                [['US','FE','RS','RE'],[
                    'US09','US10','US05','US02','US01','US00','US03','US04','US11','US08',
                    'FE04','FE05','FE00','FE09','FE08','FE07','FE10','FE11','FE06','FE03',
                    'RS03','RS04','RS11','RS08','RS07','RS06','RS09','RS10','RS05','RS02',
                    'RE10','RE11','RE06','RE03','RE02','RE01','RE04','RE05','RE00','RE09'
                ]],
                [["FUR","DFR",'BRD','URB'],[
                    "FUR00","FUR01","DFR00",'DFR01','BRD00','BRD01','URB00','URB01'
                ]],
                [["BUR","UFR",'FRD','DRB'],[
                    "BUR01","BUR00","UFR01",'UFR00','FRD01','FRD00','DRB01','DRB00'
                ]]
            ],
            'D': [
                [['F', 'L', 'B', 'R'],[
                    'F00','F01','F02','F03','F04','F06',
                    'L00','L01','L02','L03','L04','L06',
                    'B00','B01','B02','B03','B04','B06',
                    'R00','R01','R02','R03','R04','R06',
                ]],
                [['D'],[
                    'D00','D01','D02','D03','D04','D05','D06','D07','D08','D09','D10','D11',
                    'D12','D13','D14','D15','D16','D17','D18','D19','D20','D21','D22','D23'
                ]],
                [['FM','DS','DM','RS'],[
                    'FM08','FM11','FM04','FM03','FM00','FM01','FM02','FM05','FM10','FM09',
                    'DS08','DS11','DS04','DS03','DS00','DS01','DS02','DS05','DS10','DS09',
                    'DM03','DM06','DM11','DM10','DM07','DM08','DM09','DM00','DM05','DM04',
                    'RS08','RS11','RS04','RS03','RS00','RS01','RS02','RS05','RS10','RS09'
                ]],
                [["LFD","BDL",'RDB','FRD'],[
                    "LFD01","LFD00","BDL01",'BDL00','RDB01','RDB00','FRD01','FRD00'
                ]],
                [["RFD","FDL",'LDB','BRD'],[
                    "RFD00","RFD01","FDL00",'FDL01','LDB00','LDB01','BRD00','BRD01'
                ]]
            ],
            'MM': [
                [['LS','LBU','BE','LDB','DS','LFD','LE','LUF'],[
                    'LS07','LS06','LBU01','LBU00','BE02','BE01','LDB01','LDB00',
                    'DS01','DS00','LFD01','LFD00','LE08','LE07','LUF01','LUF00'
                ]],
                [['US','RBU','RE','RDB','RS','RFD','FE','RUF'],[
                    'US06','US07','RBU00','RBU01','RE07','RE08','RDB00','RDB01',
                    'RS00','RS01','RFD00','RFD01','FE01','FE02','RUF00','RUF01'
                ]],
                [['U','BM','B','DM','D','FM','F', 'UM'],[
                    'U08','U09','U17','U23','U22','U19','U07','U10','U11','U05','U21','U20',
                    'BM07','BM08','BM11','BM04','BM03','BM00','BM06','BM09','BM10','BM05','BM02','BM01',
                    'B14','B15','B23','B05','B04','B01','B13','B16','B17','B11','B03','B02',
                    'DM02','DM03','DM06','DM11','DM10','DM07','DM01','DM04','DM05','DM00','DM09','DM08',
                    'D08','D09','D17','D23','D22','D19','D07','D10','D11','D05','D21','D20',
                    'FM01','FM02','FM05','FM10','FM09','FM06','FM00','FM03','FM04','FM11','FM08','FM07',
                    'F02','F03','F11','F17','F16','F13','F01','F04','F05','F23','F15','F14',
                    'UM02','UM03','UM06','UM11','UM10','UM07','UM01','UM04','UM05','UM00','UM09','UM08'
                ]]
            ],
            'ML': [
                [['U','BM','B','DM','D','FM','F', 'UM'],[
                    'U08','U09','U17','U23','U22','U19',
                    'BM07','BM08','BM11','BM04','BM03','BM00',
                    'B14','B15','B23','B05','B04','B01',
                    'DM02','DM03','DM06','DM11','DM10','DM07',
                    'D08','D09','D17','D23','D22','D19',
                    'FM01','FM02','FM05','FM10','FM09','FM06',
                    'F02','F03','F11','F17','F16','F13',
                    'UM02','UM03','UM06','UM11','UM10','UM07'
                ]]
            ],
            'MR': [
                [['U','BM','B','DM','D','FM','F', 'UM'],[
                    'U07','U10','U11','U05','U21','U20',
                    'BM06','BM09','BM10','BM05','BM02','BM01',
                    'B13','B16','B17','B11','B03','B02',
                    'DM01','DM04','DM05','DM00','DM09','DM08',
                    'D07','D10','D11','D05','D21','D20',
                    'FM00','FM03','FM04','FM11','FM08','FM07',
                    'F01','F04','F05','F23','F15','F14',
                    'UM01','UM04','UM05','UM00','UM09','UM08'
                ]]
            ],
            'EE':[
                [['ULF','LS','UBL','BM','URB','US','UFR','UM'],[
                    'UM02','UM01','UFR01','UFR00','US01','US00','URB01','URB00',
                    'BM01','BM00','UBL01','UBL00','LS01','LS00','ULF01','ULF00'
                ]],
                [['DLF','DS','DBL','DM','DRB','RS','DFR','FM'],[
                    'FM06','FM07','DFR00','DFR01','RS06','RS07','DRB00','DRB01',
                    'DM01','DM02','DBL00','DBL01','DS06','DS07','DLF00','DLF01'
                ]],
                [['F','LE','L','BE','B','RE','R', 'FE'],[
                    'F19','F22','F23','F17','F09','F08','F20','F21','F05','F11','F10','F07',
                    'LE07','LE10','LE11','LE06','LE03','LE02','LE08','LE09','LE00','LE05','LE04','LE01',
                    'L19','L22','L23','L17','L09','L08','L20','L21','L05','L11','L10','L07',
                    'BE07','BE10','BE11','BE06','BE03','BE02','BE08','BE09','BE00','BE05','BE04','BE01',
                    'B19','B22','B23','B17','B09','B08','B20','B21','B05','B11','B10','B07',
                    'RE07','RE10','RE11','RE06','RE03','RE02','RE08','RE09','RE00','RE05','RE04','RE01',
                    'R19','R22','R23','R17','R09','R08','R20','R21','R05','R11','R10','R07',
                    'FE07','FE10','FE11','FE06','FE03','FE02','FE08','FE09','FE00','FE05','FE04','FE01'
                ]],
            ],
            'EU': [
                [['F','LE','L','BE','B','RE','R', 'FE'],[
                    'F19','F22','F23','F17','F09','F08',
                    'LE07','LE10','LE11','LE06','LE03','LE02',
                    'L19','L22','L23','L17','L09','L08',
                    'BE07','BE10','BE11','BE06','BE03','BE02',
                    'B19','B22','B23','B17','B09','B08',
                    'RE07','RE10','RE11','RE06','RE03','RE02',
                    'R19','R22','R23','R17','R09','R08',
                    'FE07','FE10','FE11','FE06','FE03','FE02'
                ]]
            ],
            'ED': [
                [['F','LE','L','BE','B','RE','R', 'FE'],[
                    'F20','F21','F05','F11','F10','F07',
                    'LE08','LE09','LE00','LE05','LE04','LE01',
                    'L20','L21','L05','L11','L10','L07',
                    'BE08','BE09','BE00','BE05','BE04','BE01',
                    'B20','B21','B05','B11','B10','B07',
                    'RE08','RE09','RE00','RE05','RE04','RE01',
                    'R20','R21','R05','R11','R10','R07',
                    'FE08','FE09','FE00','FE05','FE04','FE01'
                ]]
            ],
            'SS':[
                [['UM','FLU','LE','FDL','FM','FRD','FE','FUR'],[
                    'UM08','UM07','FLU01','FLU00','LE02','LE01','FDL01','FDL00',
                    'FM01','FM00','FRD01','FRD00','FE08','FE07','FUR01','FUR00'
                ]],
                [['BM','BLU','BE','BDL','DM','BRD','RE','BUR'],[
                    'BM07','BM06','BLU01','BLU00','BE08','BE07','BDL01','BDL00',
                    'DM08','DM07','BRD01','BRD00','RE02','RE01','BUR01','BUR00'
                ]],
                [['U','LS','L','DS','D','RS','R', 'US'],[
                    'U02','U03','U11','U17','U16','U13','U01','U04','U05','U23','U15','U14',
                    'LS07','LS08','LS11','LS04','LS03','LS00','LS06','LS09','LS10','LS05','LS02','LS01',
                    'L14','L15','L23','L05','L04','L01','L13','L16','L17','L11','L03','L02',
                    'DS07','DS08','DS11','DS04','DS03','DS00','DS06','DS09','DS10','DS05','DS02','DS01',
                    'D14','D15','D23','D05','D04','D01','D13','D16','D17','D11','D03','D02',
                    'RS01','RS02','RS05','RS10','RS09','RS06','RS00','RS03','RS04','RS11','RS08','RS07',
                    'R02','R03','R11','R17','R16','R13','R01','R04','R05','R23','R15','R14',
                    'US01','US02','US05','US10','US09','US06','US00','US03','US04','US11','US08','US07'
                ]]
            ],
            'SF': [
                [['U','LS','L','DS','D','RS','R', 'US'],[
                    'U02','U03','U11','U17','U16','U13',
                    'LS07','LS08','LS11','LS04','LS03','LS00',
                    'L14','L15','L23','L05','L04','L01',
                    'DS07','DS08','DS11','DS04','DS03','DS00',
                    'D14','D15','D23','D05','D04','D01',
                    'RS01','RS02','RS05','RS10','RS09','RS06',
                    'R02','R03','R11','R17','R16','R13',
                    'US01','US02','US05','US10','US09','US06'
                ]]
            ],
            'SB': [
                [['U','LS','L','DS','D','RS','R', 'US'],[
                    'U01','U04','U05','U23','U15','U14',
                    'LS06','LS09','LS10','LS05','LS02','LS01',
                    'L13','L16','L17','L11','L03','L02',
                    'DS06','DS09','DS10','DS05','DS02','DS01',
                    'D13','D16','D17','D11','D03','D02',
                    'RS00','RS03','RS04','RS11','RS08','RS07',
                    'R01','R04','R05','R23','R15','R14',
                    'US00','US03','US04','US11','US08','US07',
                ]]
            ]
        }};

    var availableTurn = [];
    jQuery.each( turnTable['layer1'], function(i){
        availableTurn.push( i );
    });
//    var availableTurn = ["U","F","L","B","R","D","MM","ML","MR","EE","EU","ED","SS","SF","SB"]; // 回転名を変更するときはturnTableも変更すること.
    var turnAxesAry = [
        {"axis":[" 0,-1, 0"]  ,"offset":[0,0,0] ,"rotate": 90},//U
        {"axis":[" 0, 0, 1"]  ,"offset":[0,0,0] ,"rotate": 90},//F
        {"axis":["-1, 0, 0"]  ,"offset":[0,0,0] ,"rotate": 90},//L
        {"axis":[" 0, 0,-1"]  ,"offset":[0,0,0] ,"rotate": 90},//B
        {"axis":[" 1, 0, 0"]  ,"offset":[0,0,0] ,"rotate": 90},//R
        {"axis":[" 0, 1, 0"]  ,"offset":[0,0,0] ,"rotate": 90},//D
        {"axis":["-1, 0, 0"]  ,"offset":[0,0,0] ,"rotate": 45},//MM
        {"axis":["-1, 0, 0"]  ,"offset":[0,0,0] ,"rotate": 45},//ML
        {"axis":["-1, 0, 0"]  ,"offset":[0,0,0] ,"rotate": 45},//MR
        {"axis":[" 0, 1, 0"]  ,"offset":[0,0,0] ,"rotate": 45},//EE
        {"axis":[" 0, 1, 0"]  ,"offset":[0,0,0] ,"rotate": 45},//EU
        {"axis":[" 0, 1, 0"]  ,"offset":[0,0,0] ,"rotate": 45},//ED
        {"axis":[" 0, 0, 1"]  ,"offset":[0,0,0] ,"rotate": 45},//SS
        {"axis":[" 0, 0, 1"]  ,"offset":[0,0,0] ,"rotate": 45},//SF
        {"axis":[" 0, 0, 1"]  ,"offset":[0,0,0] ,"rotate": 45},//SB
        {"axis":[" 1, 0, 0"]  ,"offset":[0,0,0] ,"rotate": 90},//X
        {"axis":[" 0, 0, 1"]  ,"offset":[0,0,0] ,"rotate": 90},//Y
        {"axis":[" 0,-1, 0"]  ,"offset":[0,0,0] ,"rotate": 90}];//Z
    var turnAxes = {};
    for( var i = 0; i < turnAxesAry.length; i++ )turnAxes[availableTurn[i]] = turnAxesAry[i];

    var currentAnimation = {};
    var currentOperation = "";
    var currentTargetStickers = null;

    var parseTurnOperation = function( turnOperation ){
        var tmp = turnOperation.split(',');
        var operation = {};
        operation["layer"] = 1;
        operation["turn"] = tmp[0];
        operation["isPrime"] = (tmp[1] != undefined );
        return operation;
    }

    var prohibitionAry = {
        'M':turnTable['layer1']['MM'][0][1],
        'E':turnTable['layer1']['EE'][0][1],
        'S':turnTable['layer1']['SS'][0][1]
    };

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
                var faceName = turnLabel[i].slice(0,-2);
                if( targetStickers[pcsIdx][faceName] == undefined )
                    targetStickers[pcsIdx][faceName] = [];
                targetStickers[pcsIdx][faceName].push(turnLabel[i]);
            }
        });

        if( operation["isPrime"] ) { // 逆向きの配列をセットし、回転を逆転させる。
            for( var i = 0; i < order.length; i++ ) {
                if( order[i].length == 1 ){

                }
            }
        }

        return { "stickers":targetStickers, "order":order };
    };

    var setColor = function($target, hex){
        $target
            .attr('fill', hex)
            .attr('stroke','#000000');
        if( hex == '#000000') {
            $target
                .attr('fill-opacity','0')
                .attr('stroke-opacity','0');
        } else {
            $target
                .attr('fill-opacity','1')
                .attr('stroke-opacity','1');
        }
    };

    var turnExecuteEnd = function(shadow){
        var home = shadow.className.animVal.split(" ")[1];
        var $home = $('#faces>svg.face:not(.shadow).' + home);

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
                    var operation = parseTurnOperation( currentOperation );
                    var preLabel = this.className.animVal;
                    var preIndex = stickers[preFace].indexOf( preLabel );
                    var afterIndex = operation['isPrime'] ? (preIndex + 6) % 24 : (preIndex + 18) % 24;
                    var afterLabel = stickers[afterFace][afterIndex];

                    var $pre = $('#faces>svg.face:not(.arrow)>path.' + preLabel);
                    setColor( $pre, currentState[afterLabel]);
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
                    var afterLabel = null;
                    try{
                        afterLabel = stickers[afterFace][index];
                    } catch(e) {
                        console.log(e);
                    }

                    var $pre = $('#faces>svg:not(.arrow)>path.' + preLabel);
                    setColor($pre, currentState[afterLabel]);
                    $home[0].appendChild( this );
                });
            }
        };
        var className = $(shadow).attr("class");
        $(shadow).attr('class', className.replace(" moving", ""));
        that.checkComplete();
    };

    var currentState = {};
    var backUpCurrentState = function(){
        var $target = $('#faces>svg.face:not(.shadow)>path');
        jQuery.each( $target, function(){
            currentState[ this.className.animVal ] = $(this).attr('fill');
        });
    }

    var isEmpty = function (hash) {
        for ( var i in hash ) return false;
        return true;
    }

    // 禁則の回転であればtrueを返却する.
    var prohibitionTarget = ['ML','MR','EU','ED','SF','SB'];
    var checkProhibition = function(turnOperation) {
        var operation = parseTurnOperation( turnOperation );
        var idx = prohibitionTarget.indexOf(operation['turn']);
        if( idx != -1) { // 禁則に関係ない操作の場合
            var chkAry = prohibitionAry[operation['turn'][0]];
            for( var i = 0; i < chkAry.length; i++ ){
                if( $('#faces>svg>path.' + chkAry[i]).attr('fill-opacity') == 1 ) {
                    return true;
                }
            }
        }
        return false;
    };

    var history = [];

    var arrowTable = {
        "U00":'L,P','U01':'ML,P','U02':'MR,P','U03':'R',"U16":"MM,P",
        "F12":"L,P","F13":"ML,P","F14":'MR,P','F15':'R',"F19":"MM,P",
        "D00":'L,P','D01':'ML,P','D02':'MR,P','D03':'R',"D16":"MM,P",
        "B04":"L,P","B05":"ML,P","B06":'MR,P','B07':'R',"B17":"MM,P",

        "U04":'B,P',"U05":'SB',"U06":"SF",'U07':"F","U17":"SS",
        "R04":'B,P',"R05":'SB',"R06":"SF",'R07':"F","R17":"SS",
        "D12":'B,P',"D13":'SB',"D14":"SF",'D15':"F","D19":"SS",
        "L12":'B,P',"L13":'SB',"L14":"SF",'L15':"F","L19":"SS",

        "U08":"R,P","U09":"MR","U10":"ML","U11":"L","U18":"MM",
        "F04":"R,P","F05":"MR","F06":'ML','F07':'L',"F17":"MM",
        "D08":"R,P","D09":"MR","D10":"ML","D11":"L","D18":"MM",
        "B12":"R,P","B13":"MR","B14":"ML","B15":"L","B19":"MM",

        "U12":"F,P","U13":"SF,P","U14":"SB,P","U15":"B","U19":"SS,P",
        "L04":"F,P","L05":"SF,P","L06":"SB,P","L07":"B","L17":"SS,P",
        "D04":"F,P","D05":"SF,P","D06":"SB,P","D07":"B","D17":"SS,P",
        "R12":"F,P","R13":"SF,P","R14":"SB,P","R15":"B","R19":"SS,P",
        
        "F00":"U,P","F01":"EU","F02":'ED','F03':'D',"F16":"EE",
        "L00":"U,P","L01":"EU","L02":'ED','L03':'D',"L16":"EE",
        "B00":"U,P","B01":"EU","B02":'ED','B03':'D',"B16":"EE",
        "R00":"U,P","R01":"EU","R02":'ED','R03':'D',"R16":"EE",
        
        "F08":"D,P","F09":"ED,P","F10":'EU,P','F11':'U',"F18":"EE,P",
        "L08":"D,P","L09":"ED,P","L10":'EU,P','L11':'U',"L18":"EE,P",
        "B08":"D,P","B09":"ED,P","B10":'EU,P','B11':'U',"B18":"EE,P",
        "R08":"D,P","R09":"ED,P","R10":'EU,P','R11':'U',"R18":"EE,P"
    };

    var that = {
        generateArrows: function(){
            for( var faceNum = 0; faceNum < 6; faceNum ++ ){ // 6 = 初期の面の数.
                var $arrows = $('<svg class="arrow ' + faceName[faceNum] + '"></svg>');
                $arrows.css('width',"400px").css('height',"400px");
                var svgData = svgDataArrow;
                for( var i = 0; i < svgData.length; i++ ) {
                    var svgNS = "http://www.w3.org/2000/svg";
                    var c = document.createElementNS(svgNS, "path");
                    var name = "Arrow";
                    c.setAttribute("fill", '#CCCCCC');
                    c.setAttribute("fill-opacity", '0.5');
                    c.setAttribute("d", svgData[i]);
                    c.setAttribute('class', name + faceName[faceNum] + ("00" + i).slice(-2));
                    c.setAttribute("style", "position:absolute;cursor:pointer");
                    //c.setAttribute('onclick','alert("test")');
                    c.addEventListener("click", function(e){
                        if(e.which == 1) {
                            var label = this.className.animVal.replace('Arrow','');
                            that.turnExecute( arrowTable[label]);
                        }
                    }, false);
                    $arrows[0].appendChild( c );
                }
                $faces[0].appendChild( $arrows[0]);
            }
        },
        generateFaces: function(){
            for( var faceNum = 0; faceNum < faceName.length; faceNum ++ ){
            //for( var faceNum = 18; faceNum < faceName.length; faceNum ++ ){
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
                    if( faceColor[name] == '#000000') {
                        c.setAttribute('fill-opacity', '0');
                    }
                    c.setAttribute("d", svgData[i]);
                    c.setAttribute('class', name + ("00" + i).slice(-2));
                    c.setAttribute("style", "position:absolute");
                    $svg[0].appendChild( c );

                }
                $faces[0].appendChild( $svg[0]);
                $faces[0].appendChild( $shadow[0]);
            }
            that.generateArrows();
        },
        getOperation: function(faceName, isArrow){
            var currentPosAry = facePosition[faceName];
            var arrow = (isArrow) ? 1.5 : 1;
            var cssOpe =
                'rotateZ(' + currentPosAry[0] + 'deg)' +
                    'rotateY(' + currentPosAry[1] + 'deg)' +
                    'rotateX(' + currentPosAry[2] + 'deg)' +
                    'translate3d(' +
                    currentPosAry[3][0] + 'px,' +
                    currentPosAry[3][1] + 'px,' +
                    currentPosAry[3][2] * mag * arrow + 'px)' +
                    "scale3d(" + mag / 200 + ',' + mag / 200 + ',' + mag / 200 + ')';
            return cssOpe;
        },
        setPosition: function() {
            var planes = $faces.children();
            for( var i = 0; i < planes.length; i ++ ) {
                var currentFaceName = $(planes[i]).attr('class').split(" ")[1];
                var isArrow = ( $(planes[i]).attr('class').indexOf( 'arrow') != -1 );
                var cssOpe = that.getOperation( currentFaceName, isArrow );
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
        recHistory: function(turnOperation){
            var ope = turnOperation;
            var operation = parseTurnOperation( ope );
            if(operation['isPrime']) {
                ope = ope.replace(',','');
                ope = ope.replace('P','');
            } else {
                ope += ',';
            }
            history.push( ope );
        },
        clearHistory: function(){
            console.log( history );
            history = [];
        },
        undoHistoryChk: function(turnOperation){
            var ope = turnOperation;
            if( ope != "undo" ) {
                that.recHistory(ope);
            } else {
                if( history.length > 0) {
                    ope = history.slice(-1)[0];
                    history = history.slice(0,-1);
                } else {
                    ope = "noHistory";
                }
            }
            return ope;
        },
        turnExecute: function(turnOperation){  //F1P
            turnOperation = that.undoHistoryChk(turnOperation);
            if( turnOperation == "noHistory") return;
            var $shadow = $('.shadow');
            // 回転中に次の回転命令がきた場合。アニメーションを停止して終了処理を実行.
            if( currentOperation != "") {
                try{
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
                } catch (e){
                    // currentOperation はあるが currentAnimationは無いとき。調査中.
                    console.log(currentOperation);
                    console.log(e);
                }
            }
            if( checkProhibition(turnOperation) == true ) return;

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
                        if( $shadow.length == i) {
                            that.checkComplete();
                        }
                        delete currentAnimation[name];
                        if( isEmpty( currentAnimation ) ) {
                            currentOperation = "";
                        }
                    }
                },frameRate);
                currentAnimation[name] = {"time":time,"matrix":matrix};
            });
        },
        setColorTable: function(colorList){
            faceColor = colorList;
        },
        checkComplete: function(){
            var isComplete = true;
            var $planes = $('#faces>svg.face:not(.shadow)');
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
        turnRandom: function(table, repeat, times){
            var queue = [];
            for( var i = 0; i < repeat; i ++ ) {
                var rand = Math.floor(Math.random()*table.length);
                var targetTurn = table[rand];
                var prime =  ((Math.floor(Math.random()*2) % 2) == 0) ? ",P":"";
                for( var j = 0; j < times; j++ ) queue.push( targetTurn + prime );
            }
            return queue;
        },
        scramble: function(){
            if( that.checkComplete() ) {
                var queue = [];
                var subESM = ["ML","MR","EU","ED","SF","SB"];
                var mainESM = ["MM",'EE','SS'];
                var main = ["U","F","L","B","R","D"];
                var tmpQueue = that.turnRandom( subESM, 50, 2 ); // center.
                jQuery.merge( queue, tmpQueue);

                for( var i = 0; i < 10; i++ ) { // inner edge.
                    var rand = Math.floor(Math.random()*mainESM.length);
                    var targetTurn = mainESM[rand];
                    queue.push( targetTurn );
                    jQuery.merge( queue, that.turnRandom( main, 4, 2) );
                    queue.push( targetTurn );
                }
                jQuery.merge( queue, that.turnRandom( availableTurn, 30, 1));
                that.turnExecuteInterval(queue);
            }
        },
        setMagnification: function( magnification ) {
            mag = magnification;
            that.setPosition();
        },
        turnExecuteInterval: function(queue){
            var seek = 0;
            var time = setInterval(function(){
                var turn = queue[seek++];
                that.turnExecute( turn );
                if( queue.length == seek ){
                    clearInterval(time);
                }

            }, 10 );
        },
        turnMacro: function(macro){
            var macroAry = macro.split(' ');
            var queue = [];
            for( var i = 0; i < macroAry.length; i ++ ){
                var turn = macroAry[i];
                var dstTurn = "";
                var ope = turn.match(/^[a-zA-Z]+/);
                if( ope != null) {
                    dstTurn = ope[0];
                }
                var num = turn.match(/\d/);
                if( num != null) {
                    num = parseInt( num[0] );
                } else {
                    num = 1;
                }
                var prime = turn.match(/'/);
                if( prime != null ) {
                    dstTurn += ',P';
                }
                if( dstTurn != "") {
                    for( var j = 0; j < num; j++ ) queue.push( dstTurn);
                }
            }
            that.turnExecuteInterval(queue);
        }
    }
    return that;
}

var Control = function(turns){
    var store = new Persist.Store('state');

    var availableKeys = {
        65:"A",66:"B",67:"C",68:"D",69:"E",70:"F",71:"G",72:"H",73:"I",74:"J",75:"K",76:"L",77:"M",78:"N",79:"O",80:"P",
        81:"Q",82:"R",83:"S",84:"T",85:"U",86:"V",87:"W",88:"X",89:"Y",90:"Z",44:",",190:".",47:"/", 7:"'",187:";",27:"ESC",
        };
    // 色の初期設定.
    var colorList = {
        'U':"#FFFFFF",
        'F':"#FF0000",
        'L':"#00FF00",
        'R':"#FFFF00",
        "B":"#FFAA00",
        "D":"#0000FF",
        'UM':"#000000",
        'FM':"#000000",
        "BM":"#000000",
        "DM":"#000000",
        'LE':"#000000",
        'FE':"#000000",
        "BE":"#000000",
        "RE":"#000000",
        'US':"#000000",
        'LS':"#000000",
        "DS":"#000000",
        "RS":"#000000",
        "UFR":"#000000", //"#000033",
        "DFR":"#000000", //"#000066",
        "URB":"#000000", //"#000099",
        "DRB":"#000000", //"#0000CC",
        "UBL":"#000000", //"#0000FF",
        "DBL":"#000000", //"#003300",
        "ULF":"#000000", //"#006600",
        "DLF":"#000000", //"#009900",
        "RFD":"#000000", //"#00CC00",
        "LFD":"#000000", //"#00FF00",
        "RDB":"#000000", //"#330000",
        "LDB":"#000000", //"#660000",
        "RBU":"#000000", //"#990000",
        "LBU":"#000000", //"#CC0000",
        "RUF":"#000000", //"#FF0000",
        "LUF":"#000000", //"#330033",
        "BUR":"#000000", //"#000066",
        "FUR":"#000000", //"#000099",
        "BRD":"#000000", //"#0000CC",
        "FRD":"#000000", //"#0000FF",
        "BDL":"#000000", //"#333300",
        "FDL":"#000000", //"#006600",
        "BLU":"#000000", //"#009900",
        "FLU":"#000000"  //"#00CC00"
    }
    var keyTable = {  };

    var availableTurns = turns;

    var generateSelection = function($target, name){
        var $button = $('<button/>');
        $button.html(name)
            .attr('type','button');
        $target.append($button);
        var $select = $('<select/>');
        $select.attr('name',name);

        var $option = $('<option/>');
        $option.attr('value',-1).html('none');
        $select.append($option);

        var used = [];
        jQuery.each( availableKeys, function(keyCode,letter){
            var $option = $('<option/>');
            $option.attr('value',keyCode).html(letter);
            if( name[0] == letter && name.indexOf(',') == -1 && used.indexOf(name[0]) == -1) {
                keyTable[name] = name.charCodeAt(0);
                $option.attr('selected','');
                used.push( name );
            }
            $select.append($option);
        });

        $target.append($select);
    }

    var defaultMacro = [
        "R U' U' R' U' R U' U' L' U R' U' L",
        "MM2' U MM2' U MM2' U U MM2 U MM2 U MM2 U U",
        "MM2 EE2' MM2' EE2 F' EE2' MM2 EE2 MM2' F",
        "SS R SS' L' SS R' SS' L",
        "R2 F2 R' B' R F2 R' B R'",
        "U U' F F'",
        "U",
        "U",
        "U",
        "U"
    ];
    var savedMacro = [];

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
                generateSelection( $keys, val + ",P" );
                if( i % 3 == 2 ) $keys.append($('<br/>'));
            });
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
                $('#faces>svg:not(.shadow,.arrow).'+faceType+'>path')
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

            });

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
            });

            // macro.
            for( var i = 0; i < 10; i++ ) {
                var $input = $('<button value="' + (i+1)%10 + '">'+(i+1)%10+'</button>');
                var $text = $('<input type="text" name="'+(i+1)%10+'">');
                if( savedMacro != [] ) {
                    $text.val( savedMacro[i] );
                } else {
                    $text.val( defaultMacro[i] );
                }
                value="'+ defaultMacro[i] +'"
                $('#macro').append($input).append($text);
                if( i % 3 == 2) $('#macro').append($('<br>'));
            }
            $('#macro>button[value="save"]').click(function(){
                var macros = [];
                jQuery.each( $('#macro>input'), function(i,v){
                    macros.push( $(this).val().replace(',',''));
                });
                store.set('macroSetting', macros.join(','));
            });
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
                jQuery.each( colorList, function(name,hex){
                    if( name != "") {
                        var $target;
                        try {
                            $target = $('#faces>svg:not(.arrow).'+name).children();
                        } catch(e){
                            console.log(e);
                        }
                        jQuery.each( $target, function(){
                            $(this).attr('stroke-opacity', "0")
                                .attr('fill', hex);
                            if( hex == "#000000") {
                                $(this).attr('fill-opacity','0');
                            } else {
                                $(this).attr('fill-opacity','1');
                            }
                        });
                    }
                });
                if (ok) {
                    if( val != null) {
                        jQuery.each( val.split(','), function(i,v){
                            var tmp = v.split(':');
                            colorList[tmp[0]] = tmp[1];
                            if( tmp[0] != "") {
                                var $target = $('#faces>svg:not(.arrow).'+tmp[0]).children();
                                jQuery.each( $target, function(){
                                    $(this)
                                        .attr('fill', tmp[1]);
                                        //.attr('stroke', "#000000");
                                })
                            }
                        });
                    }
                }
            });
            // macro設定.
            store.get('macroSetting', function(ok, val) {
                if (ok) {
                    if( val != null && val != "") {
                        try {
                            var tmpAry = val.split(',');
                            for( var i = 0; i < tmpAry.length; i++ ) {
                                savedMacro[i] = tmpAry[i];
                            }
                        } catch (e) {
                            console.log(e);
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
    // 回転時処理---------------------------------------------------
    var lastX =  0 + 270, offsetX = 0; // + 270
    var lastY = -35  - 20, offsetY = 0; // + 20
    $('#cubeWrapper')
        .mousemove(function(e){
            if( e.which == 1 ) { //左クリックであれば
                console.log(e.pageX + e.pageY);
                var y = (e.pageX - offsetX) * 1 + 90,
                    x = (e.pageY - offsetY) * -1 - 90;

                if( $('#rotate').attr('checked') ){
                    rotate(x,y,0);
                    lastX = e.pageX - offsetX;
                    lastY = e.pageY - offsetY;
                }
            }
        })
        .mousedown(function(e){
            if( e.which == 1 ) { //左クリックであれば
                $('#rotate').trigger('click');
                // キューブがクリックされたとき最後のクリック位置情報からoffsetを取得
                offsetX = e.pageX - lastX;
                offsetY = e.pageY - lastY;
                console.log( "mousedown");
            }
        })
        .mouseup(function(e){
            if( e.which == 1 ) { //左クリックであれば
                $('#rotate').trigger('click');
                console.log('mouseup');
            }
        });

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
    var control = Control(cube.getAvailableTurns()); // 可能な操作を登録. U F L ...
    cube.setColorTable( control.getColorTable() ); // カラーテーブルを共有.

    cube.generateFaces();
    cube.setPosition();

    control.generateKeys();
    control.restoreLastSettings();
    control.eventBind();

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
            var prime = "";
            var turn = "";
            var pIdx = turnName.indexOf('P');
            if( pIdx != -1) {
                prime = ",P";
                turn = turnName.slice(0,-1);
            } else {
                turn = turnName;
            }
            prime = (isShift && prime == "") ? ",P" : "";
            cube.turnExecute( turn + prime);
        }
        cube.checkComplete();
    }

    $('body').keyup(function(e){
        console.log(e.which);
        if( !isMacroFocus ) {
            if(e.which == 46) { // deleteキー
                cube.turnExecute('undo');
            } else if(e.which >= 48 && e.which <= 57) { // 数字
                $('#macro>button[value='+(e.which-48)+']').click();
            }
            var isShift = (e.shiftKey) ? true : false;

            var turnName = control.getTurnName(e.which);
            parseTurnName(turnName, isShift);
        }
    });


    $('#keys>button').click(function(){
        parseTurnName( $(this).html() );
    });

    // ウインドウリサイズ時のイベント.
    jQuery.bind("resize",windowCtrl.updateLayout());

    // リセットボタン --------------------------
    $("button[name='reset']").click(function(){
        control.restoreLastSettings();
        $('#hint').removeClass('off');
        cube.clearHistory();
    });
    // scramble --------------------------
    $("button[name='scramble']").click(function(){
        $('#hint').html("now scrambling. wait 5+ sec");
        setTimeout( function(){
            cube.scramble();
            cube.checkComplete();
            $('#hint').html("Now Complete.");
            $('#hint').addClass('off');
        }, 10);
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

    $('#mag').change(function(){
        var mag = parseInt( this.value );
        cube.setMagnification( mag );
    });
    // 暫定対応. svgで描画した矢印のクリックイベントを拾うため.
    $('#mag').val(parseInt($('#mag').val()) + 1).change();

    // macro.
    $('#macro>button').click(function(){
        if( this.value != "save" || this.value != reset) {
            var macro = $('#macro>input[name='+this.value+']').val();
            cube.turnMacro(macro);
        }
    });

    // #macroのinputにフォーカスがあるかの判断.
    var isMacroFocus = false;
    $('#macro>input')
        .focus(function(){
            isMacroFocus = true;
        }).blur(function(){
            isMacroFocus = false;
        });
});