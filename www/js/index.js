/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
		$.mobile.allowCrossDomainPages = true;
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    	document.addEventListener("touchmove", function (e) { e.preventDefault(); return false; }, false);
        //document.addEventListener("touchstart", function (e) { e.preventDefault(); return false; }, false);    	
	},
    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function() {
		app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        console.log('Received Event: ' + id);

		switch( id ) {
			case "deviceready":	this.init();	break;
		}
    },
	init: function() {

		console.log('init');
		
		// 播歌
		LowLatencyAudio.loadSong( "audio_001" );
		
		// 設定畫布
		canvas = document.getElementById("canvas1");
		cx = canvas.getContext("2d");
		cx.font = '16px monospace';
		//cx.globalAlpha = 0.1;

		// 轉盤
		dial_img = new Image();
		dial_img.onload = function() {
			cx.save();
			cx.translate(380,640);//平移  
			cx.rotate(0 * Math.PI / 180); 
			cx.drawImage( dial_img, -270, -270);		
			cx.restore();
		};
		dial_img.src = "img/dial.png";
		
		// 轉盤2
		dial2_img = new Image();
		dial2_img.onload = function() {
			cx.save();
			cx.translate(380,640);//平移  
			cx.rotate(0 * Math.PI / 180); 
			cx.drawImage( dial2_img, -67, -67);		
			cx.restore();
		};
		dial2_img.src = "img/dial2.png";
		

		// 按鈕
		btn_img = new Image();
		btn_img.onload = function() {

			cx.drawImage( btn_img,693,755);		
		};
		btn_img.src = "img/btn.png";

		onTouched = false;
		currentAngle = 0;
		playAngle = 0;
		

		setInterval( function() {
		
			if( onTouched == false ) {

				var diff = 0;
				if( currentAngle < 180 ) {
	
					diff = currentAngle * 1/180 * 30 + 10;
					playAngle+=diff;
				} else {
					
					diff = currentAngle - 180;
					diff = diff * 1/180 * 30;
					playAngle+=diff;
				}
				//console.log( "diff(" + diff + ") playAngle(" + playAngle + ")" );
		
				//playAngle += 10;
				cx.save();
				cx.clearRect(311, 571, 140, 140);
				cx.translate(380,640);//平移  
				cx.rotate(playAngle * Math.PI / 180);
				cx.drawImage( dial2_img, -66, -66);
				cx.restore();
				
				if( playAngle > 360 ) playAngle -= 360;
			}
		}, 50 );

		// 設定手指在時鐘上移動
		app.onTouchMove();

		app.onTouchEnd();
	},
	onTouchMove: function() {

		canvas.addEventListener("touchmove", function(evt) {

			evt.preventDefault();

			for( var i=0; i<evt.touches.length; i++ ) {

				var x = evt.touches[i].pageX;
				var y = evt.touches[i].pageY;
				//console.log( x + "," + y );
			
				// 轉盤
				var sP={x:380,y:640};
				var tP={x:x,y:y};
				var angle = Math.floor( app.convertPositionAngel(sP,tP) );
				var dis = Math.floor( app.getDistance(sP,tP) );
				if( dis < 270 )	{
					//console.log( "x(" + x + ") angle(" + angle + ") dis(" + dis + ")" );

					onTouched = true;
					currentAngle = angle;
					
					cx.save();
					cx.clearRect(100, 360, 560, 564);
					cx.translate(380,640);//平移  
					cx.rotate(angle * Math.PI / 180);
					cx.drawImage( dial_img, -270, -270);
					cx.restore();
					
					LowLatencyAudio.rate( angle );
				}

				// 按鈕
				if( x >= 693 && x <= 741 && y >= 655 && y <= 917 ) {
					
					onTouched = true;

					var sP={x:719,y:655};
					var tP={x:x,y:y};
					var dis = Math.floor( app.getDistance(sP,tP) );
					//console.log( "dis(" + dis + ") y(" + y + ")" );

					cx.save();
					cx.clearRect(693, 600, 50, 320);
					cx.drawImage( btn_img, 693, y - 30);
					cx.restore();

					LowLatencyAudio.pitch( 260 - dis );
				}
			}
		}, false);
	},
	onTouchEnd: function() {
		
		canvas.addEventListener("touchend", function(evt) {
			
			onTouched = false;
		}, false);
	},
	// 目標與原點的角度
	convertPositionAngel: function(soucePoint,targetPoint) {

		var res=(Math.atan2(targetPoint.y-soucePoint.y,targetPoint.x-soucePoint.x)) / Math.PI * 180.0;
		return (res>=0 && res <=180)?res+=90:((res<0 && res>=-90)? res+=90: res+=450);
	},
	// 2點間距離
	getDistance: function(soucePoint,targetPoint) {

		var x1 = soucePoint.x;
		var y1 = soucePoint.y;
		var x2 = targetPoint.x;
		var y2 = targetPoint.y;
		var xdiff = x2 - x1;
		var ydiff = y2 - y1;
		return Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
	}

};
