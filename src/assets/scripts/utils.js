const downloadApp = ()=>{
  var ua = window.navigator.userAgent;
	if(/MicroMessenger/.test(ua)) {

		location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.fasthand.patiread"
	} else {
	
		if (/iPhone|iPad|iPod/.test(ua)) {
			location.href = "https://itunes.apple.com/us/app/pa-ti-lang-du-xiao-xue-sheng/id1159657306?l=zh&ls=1&mt=8"
		} else if (/Android/.test(ua)) {

			location.href = "http://pubstatic.edu-china.com/PatiRead1.5.6_kjs_01_002%2540Family_Education.apk"
		} else {
			alert("请在手机上打开");
		}
	}

}
module.exports =  { downloadApp}