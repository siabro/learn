//	封装函数，返回wheel向上或者向下
function wheel(callBack) {
	//	判断当前浏览器是不是火狐
	var str = window.navigator.userAgent;
	//	true向下滚动	   false向上滚动
	var down = false;
	//	值不为-1时证明是火狐浏览器
	if(str.indexOf('Firefox') != -1) {
		window.addEventListener('DOMMouseScroll',function(ev) {
			//	向下滚动detail	是正值
			//	向上滚动detail	是负值
			var e = ev || window.event;
			if(e.detail < 0) {
				down = false;
			}else{
				down = true;
			}
			//	函数回调，将正确的方向结果返回
			if(callBack) {
				callBack(down);	
			}
			
		}, false);
	}else{
		window.onmousewheel = function(ev) {
			//	向下滚动wheelDelta	是负值
			//	向上滚动wheelDelta	是正值
			var e = ev || window.event;
			if(ev.wheelDelta < 0) {
				down = true;
			}else{
				down = false;
			}
			//	函数回调，将正确的方向结果返回
			if(callBack) {
				callBack(down);	
			}
		}
	}
}
