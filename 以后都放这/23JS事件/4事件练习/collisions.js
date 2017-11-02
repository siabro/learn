
function move(obj_crash,obj_smashed,rightCall,falseCall) {
	obj_crash.onmousedown = function(ev) {
		var e = ev || window.event;
		var currentX = e.offsetX;
		var currentY = e.offsetY;
		window.onmousemove = function(ev) {
			var offe = ev || window.event;
			var offX = offe.clientX;
			var offY = offe.clientY;
			obj_crash.style.left = offX - currentX + 'px';
			obj_crash.style.top = offY - currentY + 'px';
			
			collisions(obj_crash,obj_smashed,rightCall,falseCall);
		}
		window.onmouseup = function() {
			window.onmousemove = null;
		}
	}
}

function collisions(crash,smashed,rightCall,falseCall) {
	var minX = smashed.offsetLeft - crash.offsetWidth;
	var maxX = smashed.offsetLeft + smashed.offsetWidth;
	var minY = smashed.offsetTop - crash.offsetHeight;
	var maxY = smashed.offsetTop + smashed.offsetHeight;
	if(crash.offsetLeft >= minX && crash.offsetLeft <= maxX && crash.offsetTop >= minY 
		&& crash.offsetTop <= maxY) {
		if(rightCall) {
			rightCall();
		}
	}else{
		if(falseCall) {
			falseCall();
		}
	}
}