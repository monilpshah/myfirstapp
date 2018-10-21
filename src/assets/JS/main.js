var app = angular.module('myApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'chart.js', 'ui.router', 'ngRoute']);
var data = "SAR01";

var sPublicKey2 = null;
var sPrivateKey2 = null;
var sPubKey3 = null;
var sPubKey4 = null;
var sEncPubKey4 = null;
var strPubKey4 = null;
var inAppBrowserRef = null;

var imageList = [];
var userName = null;

var userData =  {
  'mobileData': {},
  'userName': null,
  'imgSrc': null,
  'questionList': {},
  'appData': {},
  'topKeys': []
};
var topKeys = {"TopKeys":[{"Category":"TRADE_VALUE","Basket":["NSE_OPEN_MARKET","BSE_OPEN_MARKET","MOST_ACTIVE_PUT","MOST_ACTIVE_CALL","FUTURE"]},{"Category":"TRADE_VOLUME","Basket":["NSE_OPEN_MARKET","BSE_OPEN_MARKET","MOST_ACTIVE_PUT","MOST_ACTIVE_CALL","FUTURE"]},{"Category":"OPEN_INTRST_VOLUME","Basket":["MOST_ACTIVE_PUT","MOST_ACTIVE_CALL","FUTURE"]},{"Category":"%CHANGE_PREV_CLOSE","Basket":["NSE_OPEN_MARKET","BSE_OPEN_MARKET","MOST_ACTIVE_PUT","MOST_ACTIVE_CALL","FUTURE"]},{"Category":"OPEN_INTRST_VALUE","Basket":["MOST_ACTIVE_PUT","MOST_ACTIVE_CALL","FUTURE"]}],"stat":"Ok"};
userData.topKeys = topKeys.TopKeys;
var sihlPWD = "SIHL";
var slider = null;
var sliderIndex = null;
var mostActiveDropdownValue = null;
var mdToastTimeSpan = 5000;
var isTabSlide = false;
var isScripAdded = false;
var strExchange = "NSE";
var strGroupCash = "EQ";

var device = {};


app.directive('focusMe', function($timeout) {
  return {
    link: function(scope, element, attrs) {
      scope.$watch(attrs.focusMe, function(value) {
        if(value === true) {
          console.log('value=',value);
          //$timeout(function() {
            element[0].focus();
            scope[attrs.focusMe] = false;
          //});
        }
      });
    }
  };
});

function getDataToSend(data, withkey4, extraParamObj) {
  var encKey = withkey4 ? extraParamObj.strPubKey4 : extraParamObj.strPubKey3;
  var encryptedData = encryptBlock(JSON.stringify(data), encKey, 2048);
  var hashData = "" + CryptoJS.SHA256(encKey);
  return {
    'jData': encryptedData,
    'jKey': hashData
  };

}

function convertToSlug(Text){
  return Text
      .toLowerCase()
      .replace(/[^\w ]+/g,'')
      .replace(/ +/g,'-');
}

function makeAjaxCall(opt) {
  var defOptions = {
    type: 'POST',
    dataType: 'JSON'
  };

  opt = $.extend({}, defOptions, opt);

  $.ajax({
    data: opt.data,
    type: opt.type,
    url: 'http://nest2.sihlnettrade.com/NestHtml5Mobile/rest/' + opt.url,
    dataType: opt.dataType,
    success: function(data) {
      opt.successCallback(data);
      setTimeout(function(){
        handleSessionExpire(data);
      },mdToastTimeSpan);
    },
    error: function(xhr, textStatus, errorThrown) {
      opt.errorCallback(xhr, textStatus, errorThrown);
    }
  });
}

function handleSessionExpire(data){
  data = data || {
    stat: "",
    Emsg: ""
  };
  if(data.Emsg && data.Emsg.toLowerCase() == "session expired"){
    window.location.href = "index.html";
  }
}

function makeSimpleAjaxCall(opt) {
  var defOptions = {
    type: 'POST',
    dataType: ''
  };

  opt = $.extend({}, defOptions, opt);

  $.ajax({
    data: opt.data,
    type: opt.type,
    url:  opt.url,
    dataType: opt.dataType,
    success: function(data) {
      opt.successCallback(data);
      setTimeout(function(){
        handleSessionExpire(data);
      },mdToastTimeSpan);
    },
    error: function(xhr, textStatus, errorThrown) {
      opt.errorCallback(xhr, textStatus, errorThrown);
    }
  });
}

function getIntialKey(callback) {
  makeAjaxCall({
    'url': 'GetInitialKey',
    'successCallback': function(data){
      successGetIntialKeyCallback(data, callback);
    },
    'errorCallback': failedToGetIntialKeyCallback
  });

};


function successGetIntialKeyCallback(data, callback) {
  var publicKey = data.publicKey;
  var tomcatCount = data.tomcatCount;
  console.log(publicKey);
  getPreAuthentificationKey({
    'publicKey': publicKey,
    'tomcatCount': tomcatCount,
    callback: callback
  })
}

function failedToGetIntialKeyCallback(xhr, textStatus, errorThrown) {
  console.log(xhr, textStatus, errorThrown);
}

function getPreAuthentificationKey(opt) {
  var publicKey1 = atob(opt.publicKey);
  var tomcatCount = opt.tomcatCount;

  var encyptData = sample.encrypt(sPublicKey2, publicKey1);
  console.log(sPublicKey2);
  var ePubKey2 = encyptData;
  //var hashPub1 = sample.hash_String(publicKey);
  var hashPub1 = "" + CryptoJS.SHA256(publicKey1);

  var obj = {
    'jData': ePubKey2,
    'jKey': hashPub1
  };

  makeAjaxCall({
    'data': obj,
    'url': 'GetPreAuthenticationKey',
    'successCallback': function(data){
      successGetPreAuthentificationCallback(data, opt.callback);
    },
    'errorCallback': failedToGetIntialKeyCallback
  });
}

function failedToGetPreAuthentificationCallback(xhr, textStatus, errorThrown) {
  console.log(xhr, textStatus, errorThrown);
}

function successGetPreAuthentificationCallback(data, callback) {
  if (data.stat.toLowerCase() == "ok") {
    var publicKey3 = data.publicKey3;
    var privateKey2 = sPrivateKey2;
    sPubKey3 = sample.decryptKey(privateKey2, publicKey3);
    localStorage.setItem("sPubKey3", sPubKey3);
    callback();
  }
}

var landingPageUrl = "/dashboard";
var activeElement = "dashboard";

function initUserSpecificCalls(){
  //debugger;
  //webSocket.connect();
}

function loadMWList(){
  var sEncPubKey4 = sample.encrypt(sPubKey4, sPublicKey2);
  var strPubKey4 = sample.decryptKey(sPrivateKey2, sEncPubKey4);

  var jsonSendObj = {
    "uid": userData.userName
  };

  var uid = encryptBlock(JSON.stringify(jsonSendObj), strPubKey4, 2048);
  var hashData = "" + CryptoJS.SHA256(strPubKey4);

  var obj = {
    'jData': uid,
    'jKey': hashData
  };

  makeAjaxCall({
    'data': obj,
    'url': 'MWList',
    'successCallback': function(data) {
      switch (data.stat) {
        case 'Ok':
          /*if(data.values.length === 1 && data.values[0] === "null"){
            userData.isHaveMarketWatch = false;
          } else if(data.values && data.values.length > 0){
            userData.mwList = data.values;
            userData.isHaveMarketWatch = true;
            //_private._loadMarketWatch();
          }*/

          if(data.values && data.values.length > 0){
            userData.mwList = data.values;
            userData.isHaveMarketWatch = true;
            //_private._loadMarketWatch();
          }
          break;
        case 'Not_Ok':
          switch (data.Emsg) {
            case 'Session Expired':
              //TODO: redirect to login page
              $location.url("/login");
              break;
            case 'No_MarketWatch':
              //TODO: redirect to login page
              userData.isHaveMarketWatch = false;
              break;
            default:
              //alert(data.Emsg);
          }
          break;
      }
    },
    'errorCallback': function(xhr, textStatus, errorThrown) {
      console.log(xhr, textStatus, errorThrown);
    }
  });
}

/**
 * Initializes touch events
 */
var slider = {};
slider.settings = {
  "mode": "fade",
  "slideSelector": "",
  "infiniteLoop": true,
  "hideControlOnEnd": false,
  "speed": 500,
  "easing": "swing",
  "slideMargin": 0,
  "startSlide": 0,
  "randomStart": false,
  "captions": true,
  "ticker": false,
  "tickerHover": false,
  "adaptiveHeight": false,
  "adaptiveHeightSpeed": 500,
  "video": false,
  "useCSS": true,
  "preloadImages": "visible",
  "responsive": true,
  "slideZIndex": 50,
  "wrapperClass": "bx-wrapper",
  "touchEnabled": true,
  "swipeThreshold": 50,
  "oneToOneTouch": true,
  "preventDefaultSwipeX": true,
  "preventDefaultSwipeY": false,
  "pager": true,
  "pagerType": "full",
  "pagerShortSeparator": " / ",
  "pagerSelector": null,
  "buildPager": null,
  "pagerCustom": null,
  "controls": true,
  "nextText": "Next",
  "prevText": "Prev",
  "nextSelector": null,
  "prevSelector": null,
  "autoControls": false,
  "startText": "Start",
  "stopText": "Stop",
  "autoControlsCombine": false,
  "autoControlsSelector": null,
  "auto": false,
  "pause": 4000,
  "autoStart": true,
  "autoDirection": "next",
  "autoHover": false,
  "autoDelay": 0,
  "autoSlideForOnePage": false,
  "minSlides": 1,
  "maxSlides": 1,
  "moveSlides": 0,
  "slideWidth": 0,
  "changeDirection": "none"
}

var initTouch = function(){
	// initialize object to contain all touch values
	slider.touch = {
		start: {x: 0, y: 0},
		end: {x: 0, y: 0}
	}
	slider.viewport.bind('touchstart', onTouchStart);
}

/**
 * Event handler for "touchstart"
 *
 * @param e (event)
 *  - DOM event object
 */
var onTouchStart = function(e){
	if(slider.working){
		e.preventDefault();
	}else{
		var orig = e.originalEvent;
		slider.touch.start.x = orig.changedTouches[0].pageX;
		slider.touch.start.y = orig.changedTouches[0].pageY;
		slider.viewport.bind('touchmove', onTouchMove);
		slider.viewport.bind('touchend', onTouchEnd);
	}
}

/**
 * Event handler for "touchmove"
 *
 * @param e (event)
 *  - DOM event object
 */
var onTouchMove = function(e){
	var orig = e.originalEvent;
	// if scrolling on y axis, do not prevent default
	var xMovement = Math.abs(orig.changedTouches[0].pageX - slider.touch.start.x);
	var yMovement = Math.abs(orig.changedTouches[0].pageY - slider.touch.start.y);
	// x axis swipe
	if((xMovement * 3) > yMovement && slider.settings.preventDefaultSwipeX){
		e.preventDefault();
	// y axis swipe
	}else if((yMovement * 3) > xMovement && slider.settings.preventDefaultSwipeY){
		e.preventDefault();
	}
	if(slider.settings.mode != 'fade' && slider.settings.oneToOneTouch){
		var value = 0;
		// if horizontal, drag along x axis
		if(slider.settings.mode == 'horizontal'){
			var change = orig.changedTouches[0].pageX - slider.touch.start.x;
			value = slider.touch.originalPos.left + change;
		// if vertical, drag along y axis
		}else{
			var change = orig.changedTouches[0].pageY - slider.touch.start.y;
			value = slider.touch.originalPos.top + change;
		}
	}
}

/**
 * Event handler for "touchend"
 *
 * @param e (event)
 *  - DOM event object
 */
var onTouchEnd = function(e){
	slider.viewport.unbind('touchmove', onTouchMove);
	var orig = e.originalEvent;
	var value = 0;
	slider.settings.changeDirection = "none";
	slider.touch.end.x = orig.changedTouches[0].pageX;
	slider.touch.end.y = orig.changedTouches[0].pageY;

	// if fade mode, check if absolute x distance clears the threshold
	if(slider.settings.mode == 'fade'){
		var distance = Math.abs(slider.touch.start.x - slider.touch.end.x);
		if(distance >= slider.settings.swipeThreshold){
			if(slider.touch.start.x > slider.touch.end.x){
				slider.settings.changeDirection = "left";
			} else {
				slider.settings.changeDirection = "right";
			}
		}
		// not fade mode
	}else{
		var distance = 0;
		// calculate distance and el's animate property
		if(slider.settings.mode == 'horizontal'){
			distance = slider.touch.end.x - slider.touch.start.x;
			value = slider.touch.originalPos.left;
		}else{
			distance = slider.touch.end.y - slider.touch.start.y;
			value = slider.touch.originalPos.top;
		}
		// if not infinite loop and first / last slide, do not attempt a slide transition
		if(!slider.settings.infiniteLoop && ((slider.active.index == 0 && distance > 0) || (slider.active.last && distance < 0))){
			//setPositionProperty(value, 'reset', 200);
		}else{
			// check if distance clears threshold
			if(Math.abs(distance) >= slider.settings.swipeThreshold){
				if(distance < 0){
					slider.settings.changeDirection = "left";
				} else {
					slider.settings.changeDirection = "right";
				}
			}else{
				// el.animate(property, 200);
				// setPositionProperty(value, 'reset', 200);
			}
		}
	}
	slider.viewport.unbind('touchend', onTouchEnd);
	if(slider.settings.callback){
		slider.settings.callback(slider.settings);
		slider.settings.changeDirection = "none";
	}
}

String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);
  else
    return string + this;
};

function getMatch(a, b) {
    var matches = [];

    for ( var i = 0; i < a.length; i++ ) {
        for ( var e = 0; e < b.length; e++ ) {
            if ( a[i] === b[e] ) matches.push( a[i] );
        }
    }
    return matches;
}

function setScrollTop(value){
	$(window).scrollTop(value);
}

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

function initInAppBrowser(){

  function loadStartCallBack(event){
    if(event.url.indexOf('paynetz/epi') > -1){
      /*setTimeout(function(){
        inAppBrowserRef.close();
      },2500);*/
    }
    console.log('loadStartCallBack', event);
  }

  function loadStopCallBack(event){
    console.log('loadStopCallBack', event);
  }

  function loadErrorCallBack(event) {
    console.log('loadErrorCallBack', event);
  }

  inAppBrowserRef.addEventListener('loadstart', loadStartCallBack);
  inAppBrowserRef.addEventListener('loadstop', loadStopCallBack);
  inAppBrowserRef.addEventListener('loaderror', loadErrorCallBack);

}

/*inAppBrowserRef = cordova.InAppBrowser.open('http://localhost:8002/material-animation.html' || data, '_blank', 'location=yes');
initInAppBrowser();*/
