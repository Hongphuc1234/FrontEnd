
 function mochat() {
    var x= document.getElementById("chat");
    if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    var data = '<div style="display:flex;" >'+
	// '<div style ="display:flex;">'+
	'<div class="user-group ">'+
		'<div class="user-chat">'+
			"<div>"+
				'<img src="/image/logo.png" alt="" class="avt-user">' +
			"</div>"+
			"<div>"+
				'<div class="fs-6">Phuc dau moi</div>'+
				"<div>abc</div>"+
			"</div>"+
		"</div>"+
		'<div class="user-chat">'+
			"<div>"+
				'<img src="/image/logo.png" alt="" class="avt-user">'+
			"</div>"+
			"<div>"+
				'<div class="fs-6">Phuc dau moi</div>'+
				"<div>abc</div>"+
			"</div>"+
		"</div>"+
	"</div>"+

	'<div class="screen">'+
		'<div class="close">'+
			'<div class="fs-6 close-user">ten user</div>'+
			'<div class=" fs-4" onclick=dongchat()><i class="fa-solid fa-xmark"></i></div>'+
		"</div>"+
		'<div class="conversation">'+
			'<div class="messages messages--received">'+
				'<div class="message">This codepen is an exemple of</div>'+
				'<div class="message">how to create the Facebook thumb up</div>'+
			"</div>"+
			'<div class="messages messages--sent">'+
				'<div class="message">Try to type</div>'+
				'<div class="message">or click the thumb up!</div>'+
				'<div class="message">;)</div>'+
			"</div>"+
			'<div class="messages messages--received">'+
				'<div class="message">Enjoy!</div>'+
			"</div>"+
		"</div>"+
		'<div class="text-bar">'+
			'<form class="text-bar__field" id="form-message">'+
				'<input type="text" placeholder="Nhap tin nhan di em" />'+
			"</form>"+
			'<div class="text-bar__thumb">'+
				'<div class="thumb"></div>'+
			"</div>"+
		"</div>"+
		// "</div>"+
	"</div>"+
"</div>";
    document.getElementById("chat").innerHTML=data;
    document.getElementById("chat").style.marginRight = "80px";
 }
 function dongchat(){
	var x= document.getElementById("chat");
	x.style.display = "none";

 }
 document.onkeyup = function (e) {
	var x= document.getElementById("chat");
    e = e || window.event;

    // 27 is the ESC key
    if(e.keyCode === 27) x.style.display = "none";
}

function openName(user) {
	var i;
	var y = document.getElementsByClassName("background-change");
	var x = document.getElementsByClassName("tab-user");
	for (i = 0; i < x.length; i++) {
	  x[i].style.display = "none";  
	  y[i].className = y[i].className.replace("background-on");
	}

	document.getElementById(user).style.display = "block";  
	
  }
function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  console.log(dots);
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" opacity-off", "");
  }
  x[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " opacity-off";
}

"use strict";
var conversation = $('.conversation');
var lastSentMessages = $('.messages--sent:last-child');
var textbar = $('.text-bar__field input');
var textForm = $('#form-message');
var thumber = $('.text-bar__thumb');

var scrollTop = $(window).scrollTop();



var Message = {
	currentText: "test",
	init: function(){
		var base = this;
		base.send();
	},
	send: function(){
		var base = this;
		textForm.submit(function( event ) {
		  	event.preventDefault();
			base.createGroup();
			base.saveText();
			if(base.currentText != ''){
				base.createMessage();
				base.scrollDown();
			}
		});
	},
	saveText: function(){
		var base = this;
		base.currentText = textbar.val();
		textbar.val('');
	},
	createMessage: function(){
		var base = this;
		lastSentMessages.append($('<div/>')
								.addClass('message')
								.text(base.currentText));
	},
	createGroup: function(){
		if($('.messages:last-child').hasClass('messages--received')){
			conversation.append($('<div/>')
							.addClass('messages messages--sent'));
			lastSentMessages = $('.messages--sent:last-child');
		}
	},
	scrollDown: function(){
		var base = this;
		//conversation.scrollTop(conversation[0].scrollHeight);
		conversation.stop().animate({
			scrollTop: conversation[0].scrollHeight
		}, 500);
	}
};

var Thumb = {
	init: function(){
		var base = this;
		base.send();
	},
	send: function(){
		var base = this;
		thumber.on("mousedown", function(){
			Message.createGroup();
			base.create();
			base.expand();
		});
	},
	expand: function(){
		var base = this;
		var thisThumb = lastSentMessages.find('.message:last-child');
		var size = 20;
		
		var expandInterval = setInterval(function(){ expandTimer() }, 30);
		
		function stopExpand(){
			base.stopWiggle();
			clearInterval(expandInterval);
		}
		
		var firstExpand = false;
		function expandTimer() {
			
			if(size >= 130){
				stopExpand();
				base.remove();
			}
			else{
				if(size>50){
					size += 2;
					thisThumb.removeClass('anim-wiggle');
					thisThumb.addClass('anim-wiggle-2');
				}
				else{
					size += 1;
					thisThumb.addClass()
				}
				thisThumb.width(size);
				thisThumb.height(size);
				if(firstExpand){
					conversation.scrollTop(conversation[0].scrollHeight);
				}
				else{
					Message.scrollDown();
					firstExpand = true;
				}
			}
		}
		
		thumber.on("mouseup", function(){
			stopExpand();
		});
	},
	create: function(){
		lastSentMessages.append(
			$('<div/>').addClass('message message--thumb thumb anim-wiggle')
		);
	},
	remove: function(){
		lastSentMessages.find('.message:last-child').animate({
			width: 0,
			height: 0
		}, 300);
		setTimeout(function(){
			lastSentMessages.find('.message:last-child').remove();
		}, 300);
	},
	stopWiggle: function(){
		lastSentMessages.find('.message').removeClass('anim-wiggle');
		lastSentMessages.find('.message').removeClass('anim-wiggle-2');
	}
	
}


var newMessage = Object.create(Message);
newMessage.init();

var newThumb = Object.create(Thumb);
newThumb.init();