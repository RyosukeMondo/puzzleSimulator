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

    var CubeTypePuzzle = function(){
        var faceName = ['U','F','L','B','R','D'];

        var facePosition = [
            // rotateZ,translateZ,rotateY,rotateX
            [0,0,90,[0,0,r]],
            [0,0,0,[0,0,r]],
            [0,-90,0,[0,0,r]],
            [0,-180,0,[0,0,r]],
            [0,-270,0,[0,0,r]],
            [0,0,-90,[0,0,r]]
        ];

        var svgDataRexCube = [
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
    }
    var faceName = ['U','F','L','B','R','D'];

    var mag = 200; // 拡大率.
    var r = mag; // 半径.
    var facePosition = {
        // rotateZ,translateZ,rotateY,rotateX
        "U":[0,0,90,[0,0,0.82]],
        "F":[90,0,0,[0,0,1]],
        "L":[90,0,-90,[0,0,1]],
        "B":[90,0,-180,[0,0,1]],
        "R":[90,0,-270,[0,0,1]],
        "D":[0,0,-90,[0,0,0.82]]
    };


    var faceColor = {
        'U':"#FFFFFF",
        'F':"#FF0000",
        'L':"#00FF00",
        'R':"#FFFF00",
        "B":"#FFAA00",
        "D":"#0000FF"
    }

    var svgDataBubbloidTop = [
        "M282.254,123.635c-1.049-0.96-2.057-1.923-3.016-2.879c-0.967-0.967-1.918-1.963-2.875-3.0 c20.901-37.42,30.471-69.896,31.396-106.744h81.236v81.237C352.15,93.166,319.674,102.734,282.254,123.635L282.254,123.635z",
        "M379.517,159.708c-25.387-1.971-60.026-8.504-87.182-27.919c33.731-18.216,63.374-26.65,96.662-27.54 v54.701c-2.238,0.104-4.097,0.272-6.603,0.502C381.533,159.529,380.589,159.615,379.517,159.708L379.517,159.708z",
        "M379.581,228.252c-32.04-2.829-63.461-12.555-91.506-28.251c28.045-15.7,59.472-25.422,91.511-28.25 c0.959,0.074,1.813,0.141,2.601,0.203c2.597,0.205,4.518,0.356,6.812,0.45V227.6c-2.294,0.094-4.217,0.244-6.813,0.44 C381.396,228.109,380.537,228.178,379.581,228.252L379.581,228.252z",
        "M388.997,295.752c-33.286-0.891-62.929-9.324-96.662-27.541c27.154-19.415,61.793-25.947,87.175-27.9 c1.075,0.094,2.021,0.18,2.884,0.258c2.506,0.23,4.365,0.398,6.604,0.504V295.752L388.997,295.752z",
        "M388.997,388.998h-81.236c-0.927-36.846-10.495-69.322-31.394-106.744c0.955-1.045,1.918-2.054,2.879-3.01 c0.954-0.951,1.959-1.911,3.008-2.873c37.422,20.902,69.897,30.471,106.743,31.396V388.998L388.997,388.998z",
        "M295.752,388.998h-54.663c-0.122-4.773-0.39-9.619-0.798-14.477c2.588-33.277,11.733-60.289,27.888-82.2 C286.416,326.033,294.859,355.688,295.752,388.998L295.752,388.998z",
        "M227.565,388.998h-55.129c-0.104-4.811-0.335-9.635-0.688-14.406c2.687-30.42,11.481-57.52,28.253-86.64 c16.77,29.133,25.564,56.232,28.251,86.646C227.901,379.357,227.671,384.182,227.565,388.998L227.565,388.998z",
        "M158.91,388.998h-54.663c0.893-33.309,9.336-62.965,27.576-96.72 c16.153,21.961,25.297,48.971,27.885,82.246C159.301,379.377,159.033,384.225,158.91,388.998L158.91,388.998z",
        "M92.239,388.998H11.001v-81.236c36.846-0.928,69.321-10.496,106.744-31.39 c1.049,0.958,2.056,1.918,3.014,2.877c0.954,0.956,1.915,1.961,2.875,3.01C102.734,319.676,93.166,352.152,92.239,388.99 L92.239,388.998z",
        "M11,295.757v-54.704c2.234-0.104,4.091-0.271,6.594-0.502c0.866-0.078,1.814-0.164,2.893-0.25 c25.384,1.974,60.027,8.506,87.179,27.921C73.928,286.43,44.285,294.865,11,295.757L11,295.757z",
        "M20.429,228.252l-2.542-0.197c-2.691-0.213-4.611-0.363-6.886-0.455v-55.2            c2.302-0.091,4.228-0.242,6.833-0.449l2.598-0.201c32.036,2.832,63.453,12.555,91.493,28.251            C83.882,215.695,52.462,225.419,20.429,228.252L20.429,228.252z",
        "M20.477,159.708c-1.064-0.094-2.004-0.178-2.859-0.256c-2.512-0.23-4.372-0.4-6.618-0.503v-54.70 c33.289,0.891,62.928,9.324,96.665,27.542C80.51,151.207,45.861,157.739,20.477,159.708L20.477,159.708z",
        "M117.745,123.635C80.322,102.734,47.847,93.166,11.001,92.242V11.001h81.24 c0.924,36.85,10.492,69.328,31.392,106.746c-0.957,1.045-1.91,2.042-2.875,3.008C119.792,121.722,118.794,122.676,117.745,123.63 L117.745,123.635z",
        "M131.788,107.666C113.571,73.936,105.137,44.291,104.246,11h54.703c0.103,2.244,0.272,4.104,0.503,6.61 c0.077,0.856,0.164,1.794,0.256,2.86C157.739,45.861,151.207,80.51,131.788,107.666L131.788,107.666z",
        "M200,111.927c-15.698-28.044-25.419-59.467-28.251-91.503c0.072-0.957,0.139-1.812,0.201-2.59 c0.207-2.603,0.357-4.526,0.448-6.826h55.202c0.091,2.302,0.242,4.228,0.449,6.833c0.063,0.785,0.129,1.64,0.201,2.59 C225.418,52.464,215.697,83.885,200,111.927L200,111.927z",
        "M268.213,107.665c-19.415-27.147-25.948-61.789-27.921-87.172c0.094-1.08,0.18-2.027,0.259-2.89 c0.228-2.505,0.396-4.362,0.501-6.6h54.705C294.865,44.287,286.432,73.926,268.213,107.665L268.213,107.665z",
        "M232.628,156.522c-9.493-10.153-18.069-21.168-25.567-32.841c12.13-20.278,21.222-42.386,26.944-65.33 c4.899,20.594,13.342,42.332,27.698,60.639C254.489,130.098,239.804,148.268,232.628,156.522L232.628,156.522z",
        "M276.319,192.942c-11.683-7.507-22.695-16.084-32.843-25.573c8.238-7.162,26.419-21.855,37.539-29.07 c18.307,14.356,40.046,22.797,60.641,27.697C318.71,171.72,296.596,180.813,276.319,192.942L276.319,192.942z",
        "M281.012,261.702c-11.109-7.214-29.282-21.899-37.532-29.073c10.146-9.488,21.157-18.064,32.84-25.56 c20.279,12.129,42.385,21.221,65.333,26.944C321.058,238.904,299.322,247.344,281.012,261.702L281.012,261.702z",
        "M234.038,337.923c-5.464-20.614-14.249-40.558-26.975-61.612c7.505-11.68,16.079-22.688,25.567-32.83 c7.157,8.236,21.844,26.408,29.063,37.524C248.763,297.273,239.6,316.098,234.038,337.923L234.038,337.923z",
        "M165.962,337.924c-5.56-21.824-14.724-40.65-27.655-56.924c7.216-11.111,21.896-29.271,29.064-37.52 c9.487,10.145,18.061,21.154,25.564,32.832C180.211,297.363,171.426,317.309,165.962,337.924L165.962,337.924z",
        "M118.986,261.702c-18.309-14.356-40.049-22.796-60.645-27.696c22.948-5.725,45.056-14.814,65.34-26.94 c11.679,7.504,22.692,16.08,32.843,25.571C148.284,239.792,130.107,254.484,118.986,261.702L118.986,261.702z",
        "M123.682,192.941c-20.282-12.132-42.391-21.223-65.34-26.946c20.596-4.899,42.338-13.342,60.643-27.69 c11.118,7.218,29.287,21.903,37.536,29.074C146.376,176.859,135.364,185.436,123.682,192.941L123.682,192.941z",
        "M167.368,156.523c-7.174-8.253-21.857-26.427-29.072-37.538c14.355-18.307,22.8-40.047,27.699-60.64 c5.724,22.951,14.813,45.06,26.945,65.34C185.438,135.36,176.861,146.375,167.368,156.523L167.368,156.523z",
        "M200,265.223c-8.374-12.4-17.907-24.033-28.418-34.676l-2.103-2.10 c-10.673-10.539-22.31-20.073-34.702-28.443c12.4-8.374,24.033-17.905,34.676-28.418l2.104-2.10 c10.534-10.665,20.069-22.302,28.443-34.703c8.368,12.392,17.897,24.025,28.416,34.675l2.098,2.09 c10.673,10.542,22.313,20.078,34.709,28.449c-12.393,8.368-24.024,17.897-34.676,28.416l-2.094,2.09 C217.9,241.193,208.365,252.832,200,265.223L200,265.223z",
    ];

    var svgDataBubbloidSide = [
            "M344.861,226.708c-30.19-2.425-57.581-10.704-85.172-25.845		c29.687-15.695,60.139-24.185,92.664-25.868v51.279C349.864,226.384,347.362,226.528,344.861,226.708L344.861,226.708z",
            "M352.354,294.535c-14.096-0.377-26.771-2.234-42.37-6.134		c-16.688-4.168-32.981-10.497-48.581-18.863c5.958-4.035,12.515-7.676,19.595-10.871c20.088-9.075,40.387-14.138,63.826-15.914		c2.531,0.189,5.048,0.342,7.53,0.455V294.535L352.354,294.535z",
            "M352.354,387.999H333.5h-56.463c-1.215-37.531-11.081-71.594-30.726-106.148		c0.156-0.152,0.309-0.305,0.463-0.454c0.363-0.354,0.73-0.708,1.106-1.061c18.551,10.639,38.109,18.564,58.224,23.59		c16.729,4.18,30.884,6.221,46.25,6.613V387.999L352.354,387.999z",
            "M261.026,387.999h-54.693c0.238-4.205,0.718-9.103,1.618-17.769		c3.776-30.193,13.137-56,27.258-75.399C251.563,325.151,259.877,355.18,261.026,387.999L261.026,387.999z",
            "M193.403,387.999h-55.9c1.189-33.297,9.891-63.702,27.03-94.362		c17.813,24.313,24.824,54.517,27.527,76.681C192.845,377.257,193.24,382.174,193.403,387.999L193.403,387.999z",
            "M121.492,387.999h-60.9H47.647v-77.614c14.506-0.49,27.714-2.398,43.752-6.235		c21.107-5.05,41.663-13.186,61.191-24.207c0.292,0.279,0.582,0.558,0.867,0.837C133.01,315.608,122.743,350.02,121.492,387.999		L121.492,387.999z",
            "M47.646,294.372v-52.213c25.999,0.926,49.174,6.004,70.632,15.455		c7.564,3.33,14.535,7.167,20.833,11.461c-16.537,8.743-33.791,15.29-51.435,19.515C72.962,292.111,60.844,293.887,47.646,294.372		L47.646,294.372z",
            "M246.33,260.685c-11.702-7.495-23.136-16.289-34.12-26.241		c1.729-1.701,3.432-3.415,5.1-5.131c7.651-6.459,15.873-12.514,24.438-17.997c0.653-0.418,1.283-0.819,1.895-1.203		c18.341,10.894,36.898,19.044,55.983,24.553c-8.544,2.535-16.893,5.66-25.213,9.418		C264.028,248.772,254.609,254.345,246.33,260.685L246.33,260.685z",
            "M200.082,330.703c-6.178-20.149-15.176-37.641-26.692-51.753		c7.24-11.095,15.513-21.615,24.648-31.345c0.683-0.594,1.372-1.203,2.073-1.826c9.862,10.504,18.711,21.941,26.405,34.131		C215.153,293.849,206.245,311.011,200.082,330.703L200.082,330.703z",
            "M154.271,260.323c-8.652-6.694-18.564-12.518-29.544-17.351		c-8.877-3.911-18.011-7.134-27.458-9.679c19.893-5.352,39.208-13.409,58.227-24.251c0.857,0.539,1.698,1.074,2.527,1.608		c10.809,6.99,21.054,14.938,30.547,23.693c-0.545,0.566-1.089,1.137-1.63,1.707C176.475,245.127,165.507,253.273,154.271,260.323		L154.271,260.323z",
            "M47.646,224.998v-50.151c32.117,1.258,62.266,9.433,91.587,24.846		C109.914,214.993,79.762,223.319,47.646,224.998L47.646,224.998z",
            "M47.646,157.712v-52.194c15.039,0.327,28.762,2.337,45.007,6.542		c15.83,4.098,31.364,10.186,46.318,18.14c-5.609,3.831-11.75,7.309-18.362,10.392C98.719,150.8,74.779,156.426,47.646,157.712		L47.646,157.712z",
            "M152.446,119.355c-17.877-10.166-36.617-17.822-55.783-22.784		c-17.643-4.566-32.567-6.731-49.018-7.058V12h17.821h59.393c0.873,37.258,10.294,71.163,29.331,105.649		c-0.323,0.325-0.646,0.643-0.966,0.956C152.968,118.855,152.709,119.104,152.446,119.355L152.446,119.355z",
            "M165.342,104.598C149.579,74.392,141.695,44.541,140.865,12h53.079		c-0.188,4.793-0.516,9.135-0.997,13.305l-0.012,0.105l-0.008,0.105C190.101,57.435,181.048,83.432,165.342,104.598L165.342,104.598		z",
            "M235.849,105.658c-15.585-21.305-24.434-47.621-26.978-80.062		c-0.313-3.876-0.647-7.077-0.975-10.173c-0.12-1.153-0.239-2.288-0.354-3.424h54.956C261.316,45.015,252.736,75.2,235.849,105.658		L235.849,105.658z",
            "M247.919,119.769c-0.364-0.358-0.724-0.717-1.079-1.075		C267.092,83.995,277.261,49.757,278.508,12h57.901h15.944v77.616c-14.51,0.488-27.713,2.395-43.755,6.234		C287.676,100.857,267.289,108.893,247.919,119.769L247.919,119.769z",
            "M352.354,158.846c-25.96-1.218-49.057-6.588-70.55-16.397		c-7.491-3.417-14.386-7.331-20.604-11.692c16.435-8.656,33.583-15.15,51.123-19.345c14.714-3.522,26.833-5.298,40.03-5.784V158.846		L352.354,158.846z",
            "M155.531,190.404c-19.005-10.94-38.314-19.003-58.192-24.262		c10.405-2.877,20.392-6.555,30.032-11.049c9.842-4.588,18.799-9.991,26.706-16.098c11.343,7.188,22.419,15.557,32.998,24.926		c0.377,0.417,0.751,0.83,1.123,1.234c-1.866,1.831-3.705,3.678-5.504,5.529c-7.328,6.187-15.197,12.015-23.401,17.33		C157.993,188.854,156.744,189.649,155.531,190.404L155.531,190.404z",
            "M200.055,154.074c-0.57-0.519-1.13-1.022-1.683-1.516		c-9.138-10.185-17.367-21.227-24.513-32.888c11.815-14.431,20.762-31.256,26.776-50.313c5.83,19.392,14.645,36.464,26.385,51.053		c-7.346,11.338-15.754,22.074-25.052,31.978C201.341,152.936,200.704,153.495,200.055,154.074L200.055,154.074z",
            "M243.776,191.373c-0.724-0.467-1.457-0.95-2.208-1.448		c-7.741-5.143-15.27-10.855-22.38-16.978c-2.433-2.603-4.905-5.166-7.396-7.666c0.418-0.438,0.841-0.881,1.268-1.333		c10.586-9.179,21.677-17.404,33.036-24.502c8.5,6.73,18.251,12.625,29.062,17.56c8.675,3.959,17.575,7.251,26.771,9.896		C282.068,172.32,262.787,180.444,243.776,191.373L243.776,191.373z",
            "M200.613,223.407l-0.423-0.411l-0.162,0.153c-9.206-8.55-19.08-16.389-29.468-23.393		c7.947-5.289,15.594-11.036,22.769-17.111c2.158-1.826,4.317-3.725,6.461-5.679c2.794,2.656,5.676,5.268,8.615,7.807		c6.515,5.633,13.38,10.955,20.453,15.858c-7.739,5.181-15.184,10.791-22.186,16.723l-0.301,0.253l-0.274,0.282		C204.304,219.74,202.472,221.583,200.613,223.407L200.613,223.407z"
    ]
    var generateFaceType = {
        "U":svgDataBubbloidTop,
        "F":svgDataBubbloidSide,
        "L":svgDataBubbloidSide,
        "B":svgDataBubbloidSide,
        "R":svgDataBubbloidSide,
        "D":svgDataBubbloidTop
    }

    var availableTurn = ["F","I","L","K","R","J","B","M","X","Y","Z"]; // 回転名を変更するときはturnTableも変更すること.
    var turnAxesAry = [
        {"axis":["1,-1,1"]  ,"offset":[0,34,0]  ,"rotate":120},
        {"axis":["-1,1,-1"] ,"offset":[0,-34,0] ,"rotate":120},
        {"axis":["-1,-1,1"] ,"offset":[0,34,0]  ,"rotate":120},
        {"axis":["1,1,-1"]  ,"offset":[0,-34,0] ,"rotate":120},
        {"axis":["1,-1,-1"] ,"offset":[0,34,0]  ,"rotate":120},
        {"axis":["-1,1,1"]  ,"offset":[0,-34,0] ,"rotate":120},
        {"axis":["-1,-1,-1"],"offset":[0,34,0]  ,"rotate":120},
        {"axis":["1,1,1"]   ,"offset":[0,-34,0] ,"rotate":120},
        {"axis":["1,0,0"]   ,"offset":[0,0,0]   ,"rotate":180},
        {"axis":["0,0,1"]   ,"offset":[0,0,0]   ,"rotate":180},
        {"axis":["0,-1,0"]  ,"offset":[0,0,0]   ,"rotate":90}];
    var turnAxes = {};
    for( var i = 0; i < turnAxesAry.length; i++ )turnAxes[availableTurn[i]] = turnAxesAry[i];


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
    var turnTable = {
        'layer2': {
            'I': [[['D', 'L', 'B'],['DF06', 'DF20', 'DF21', 'DF10', 'LF00', 'LF07', 'LF08', 'LF04', 'BF13', 'BF18', 'BF19', 'BF00']]],
            'F': [[['U', 'F', 'R'],['UF02', 'UF18', 'UF19', 'UF06', 'FF10', 'FF17', 'FF18', 'FF14', 'RF03', 'RF08', 'RF09', 'RF10']]],
            'M': [[['D', 'R', 'F'],['DF14', 'DF16', 'DF17', 'DF02', 'RF00', 'RF07', 'RF08', 'RF04', 'FF13', 'FF18', 'FF19', 'FF00']]],
            'L': [[['U', 'L', 'F'],['UF06', 'UF20', 'UF21', 'UF10', 'LF10', 'LF17', 'LF18', 'LF14', 'FF03', 'FF08', 'FF09', 'FF10']]],
            'J': [[['D', 'F', 'L'],['DF10', 'DF22', 'DF23', 'DF14', 'FF00', 'FF07', 'FF08', 'FF04', 'LF13', 'LF18', 'LF19', 'LF00']]],
            'R': [[['U', 'R', 'B'],['UF14', 'UF16', 'UF17', 'UF02', 'RF10', 'RF17', 'RF18', 'RF14', 'BF03', 'BF08', 'BF09', 'BF10']]],
            'B': [[['U', 'B', 'L'],['UF10', 'UF22', 'UF23', 'UF14', 'BF10', 'BF17', 'BF18', 'BF14', 'LF03', 'LF08', 'LF09', 'LF10']]],
            'K': [[['D', 'B', 'R'],['DF02', 'DF18', 'DF19', 'DF06', 'BF00', 'BF07', 'BF08', 'BF04', 'RF13', 'RF18', 'RF19', 'RF00']]]
        },
        'layer1': {
            'K': [[['D', 'B', 'R'],['DF03', 'DF04', 'DF05', 'BF01', 'BF02', 'BF03', 'RF14', 'RF15', 'RF16']]],
            'L': [[['U', 'L', 'F'],["UF07", "UF08", "UF09", "LF11", "LF12", "LF13", "FF04", "FF05", "FF06"]]],
            'M': [[['D', 'R', 'F'],['DF15', 'DF00', 'DF01', 'RF01', 'RF02', 'RF03', 'FF14', 'FF15', 'FF16']]],
            'F': [[['U', 'F', 'R'],['UF03', 'UF04', 'UF05', 'FF11', 'FF12', 'FF13', 'RF04', 'RF05', 'RF06']]],
            'B': [[['U', 'B', 'L'],['UF11', 'UF12', 'UF13', 'BF11', 'BF12', 'BF13', 'LF04', 'LF05', 'LF06']]],
            'J': [[['D', 'F', 'L'],['DF11', 'DF12', 'DF13', 'FF01', 'FF02', 'FF03', 'LF14', 'LF15', 'LF16']]],
            'R': [[['U', 'R', 'B'],['UF15', 'UF00', 'UF01', 'RF11', 'RF12', 'RF13', 'BF04', 'BF05', 'BF06']]],
            'I': [[['L', 'B', 'D'],['LF01', 'LF02', 'LF03', 'BF14', 'BF15', 'BF16', 'DF07', 'DF08', 'DF09']]],
            'X': [
                [['U', "D"],[
                    "UF00","UF01","UF02","UF03","UF04","UF05","UF06","UF07","UF08","UF09","UF10","UF11",
                    "UF12","UF13","UF14","UF15","UF16","UF17","UF18","UF19","UF20","UF21","UF22","UF23",
                    "UF24",
                    "DF00","DF01","DF02","DF03","DF04","DF05","DF06","DF07","DF08","DF09","DF10","DF11",
                    "DF12","DF13","DF14","DF15","DF16","DF17","DF18","DF19","DF20","DF21","DF22","DF23",
                    "DF24"
                ]],    
                [["F", "B"],[
                    "FF00","FF01","FF02","FF03","FF04","FF05","FF06","FF07","FF08","FF09",
                    "FF10","FF11","FF12","FF13","FF14","FF15","FF16","FF17","FF18","FF19","FF20",
                    "BF10","BF11","BF12","BF13","BF14","BF15","BF16","BF17","BF18","BF19",
                    "BF00","BF01","BF02","BF03","BF04","BF05","BF06","BF07","BF08","BF09","BF20"
                ]],
                [["L"],[
                    "LF00","LF10","LF01","LF11","LF02","LF12","LF03","LF13","LF04","LF14",
                    "LF05","LF15","LF06","LF16","LF07","LF17","LF08","LF18","LF09","LF19","LF20","LF20"
                ]],
                [["R"],[
                    "RF00","RF10","RF01","RF11","RF02","RF12","RF03","RF13","RF04","RF14",
                    "RF05","RF15","RF06","RF16","RF07","RF17","RF08","RF18","RF09","RF19","RF20","RF20"
                ]]],
            'Y': [
                [['U', "D"],[
                    "UF00","UF01","UF02","UF03","UF04","UF05","UF06","UF07","UF08","UF09","UF10","UF11",
                    "UF12","UF13","UF14","UF15","UF16","UF17","UF18","UF19","UF20","UF21","UF22","UF23",
                    "UF24",
                    "DF08","DF09","DF10","DF11","DF12","DF13","DF14","DF15","DF00","DF01","DF02","DF03",
                    "DF04","DF05","DF06","DF07","DF20","DF21","DF22","DF23","DF16","DF17","DF18","DF19",
                    "DF24"


                ]],
                [["L", "R"],[
                    "LF00","LF01","LF02","LF03","LF04","LF05","LF06","LF07","LF08","LF09",
                    "LF10","LF11","LF12","LF13","LF14","LF15","LF16","LF17","LF18","LF19",
                    "LF20",
                    "RF10","RF11","RF12","RF13","RF14","RF15","RF16","RF17","RF18","RF19",
                    "RF00","RF01","RF02","RF03","RF04","RF05","RF06","RF07","RF08","RF09",
                    "RF20"
                ]],
                [["F"],[
                    "FF00","FF10","FF01","FF11","FF02","FF12","FF03","FF13","FF04","FF14",
                    "FF05","FF15","FF06","FF16","FF07","FF17","FF08","FF18","FF09","FF19","FF20","FF20"
                ]],
                [["B"],[
                    "BF00","BF10","BF01","BF11","BF02","BF12","BF03","BF13","BF04","BF14",
                    "BF05","BF15","BF06","BF16","BF07","BF17","BF08","BF18","BF09","BF19","BF20","BF20"
                ]]], 
            'Z': [
                [["U"],[
                    "UF00","UF08","UF01","UF09","UF02","UF10","UF03","UF11","UF04","UF12","UF05","UF13",
                    "UF06","UF14","UF07","UF15","UF16","UF20","UF17","UF21","UF18","UF22","UF19","UF23",
                    "UF24","UF24"]],
                [["D"],[
                    "DF00","DF08","DF01","DF09","DF02","DF10","DF03","DF11","DF04","DF12","DF05","DF13",
                    "DF06","DF14","DF07","DF15","DF16","DF20","DF17","DF21","DF18","DF22","DF19","DF23",
                    "DF24","DF24"]],
                [["R","B","L","F"],[
                    "FF00","FF01","FF02","FF03","FF04","FF05","FF06","FF07","FF08","FF09",
                    "FF10","FF11","FF12","FF13","FF14","FF15","FF16","FF17","FF18","FF19",
                    "FF20",
                    "LF10","LF11","LF12","LF13","LF14","LF15","LF16","LF17","LF18","LF19",
                    "LF00","LF01","LF02","LF03","LF04","LF05","LF06","LF07","LF08","LF09",
                    "LF20",
                    "BF00","BF01","BF02","BF03","BF04","BF05","BF06","BF07","BF08","BF09",
                    "BF10","BF11","BF12","BF13","BF14","BF15","BF16","BF17","BF18","BF19",
                    "BF20",
                    "RF10","RF11","RF12","RF13","RF14","RF15","RF16","RF17","RF18","RF19",
                    "RF00","RF01","RF02","RF03","RF04","RF05","RF06","RF07","RF08","RF09",
                    "RF20"
                ]]]
        }};
    turnTable["layer2"]["x"] = turnTable["layer1"]["x"];
    turnTable["layer2"]["y"] = turnTable["layer1"]["y"];
    turnTable["layer2"]["z"] = turnTable["layer1"]["z"];

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
            if( len == 1 ) {
                afterFace = preFace;
                jQuery.each( $(shadow).children(),function(){
                    var preLabel = this.className.animVal;
                    var preIndex = stickers[preFace].indexOf( preLabel );
                    var afterIndex = (preIndex % 2 == 0) ? preIndex + 1 : preIndex - 1;
                    var afterLabel = stickers[afterFace][afterIndex];

                    var $pre = $('#faces>svg>path.' + preLabel);
                    $pre.attr('fill',currentState[afterLabel]);
                    $home[0].appendChild( this );
                });
                // 1面だけの入れ替え.
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
        $(shadow).addClass('hide');
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
        setPosition: function() {
            var planes = $faces.children();
            for( var i = 0; i < planes.length; i ++ ) {
                var currentFaceName = $(planes[i]).attr('class').split(" ")[1];
                var currentPosAry = facePosition[currentFaceName];

                var cssOpe =
                    'rotateZ(' + currentPosAry[0] + 'deg)' +
                        'rotateY(' + currentPosAry[1] + 'deg)' +
                        'rotateX(' + currentPosAry[2] + 'deg)' +
                        'translate3d(' +
                        currentPosAry[3][0] + 'px,' +
                        currentPosAry[3][1] + 'px,' +
                        currentPosAry[3][2] * mag + 'px)' +
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
                $shadow.addClass('hide');
            }
            $shadow.removeClass('hide');

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
                    var rand = Math.floor(Math.random()*availableTurn.length);
                    var targetTurn = availableTurn[rand];
                    var prime =  ((i % 2) == 0) ? "P":"";
                    that.turnExecute( targetTurn + "1" + prime );
                }
            }
        },
        setMagnification: function( magnification ) {
            mag = magnification;
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
        jQuery.each( availableKeys, function(keyCode,letter){
            var $option = $('<option/>');
            $option.attr('value',keyCode).html(letter);
            $select.append($option);
        });
        var $option = $('<option/>');
        $option.attr('value',-1).html('none').attr('selected',"");
        $select.append($option);
        $target.append($select);
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

    function setOperate(){
        var agent = navigator.userAgent;
        if(agent.search(/iPhone/) != -1){
            $("body").addClass("iphone"); //iPhoneには「body class="iphone"」追加
            window.onorientationchange = setView;
        }else if(agent.search(/iPad/) != -1){
            $("body").addClass("ipad"); //iPadには「body class="ipad"」追加
            window.onorientationchange = setView;
        }else if(agent.search(/Android/) != -1){
            $("body").addClass("android"); //Androidには「body class="android"」追加
            window.onresize = setView;
        }else{
            $("body").addClass("other"); //上記以外には「body class="other"」追加
            window.onorientationchange = setView;
        }
    }

    var barNum = 0;
    $('svg:not(.shadow)>path').mouseover( function(){
        console.log( this.className.animVal + "------------------------------" );
    });
});