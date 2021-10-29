// ==UserScript==
// @name         超星分数查询(全班)
// @namespace    dandanmuaa@gmail.com
// @version      1.0
// @description  超星分数查询(全班)
// @author       dandanla
// @match        *://*.chaoxing.com/*
// @run-at       document-end
// @connect      42.192.47.62
// @grant        GM_xmlhttpRequest
// @require      https://lib.baomitu.com/jquery/3.6.0/jquery.min.js
// @require      https://unpkg.com/sweetalert/dist/sweetalert.min.js
// @antifeature  ads
// @antifeature  membership
// ==/UserScript==

var conf = {
	title: "MOOC助手",
	time: 100, //平均时间
	learn: 1, //自动答题
	auto: 1, //自动提交
	random: 0, //无匹配答案随机选择
    doTimeOut:5000,
};

$('head').append('<link href="https://lib.baomitu.com/layui/2.6.8/css/layui.css" rel="stylesheet" type="text/css" />');
$.getScript("https://lib.baomitu.com/layui/2.6.8/layui.js", function(data, status, jqxhr) {
    layui.use('element', function(){
        var element = layui.element;
    });
    var url = window.location.href;
    if (url.match("/mycourse")){
        var courseid = url.match(/courseid=(\d+)/i)[1]
        var clazzid = url.match(/clazzid=(\d+)/i)[1]
        console.log(courseid,clazzid)
        layer.closeAll();
        show();
    };
});

function chafen(courseid,clazzid){
    GM_xmlhttpRequest({
        method: 'GET',
        url: "http://42.192.47.62:8080/cha?courseId="+courseid+"&classId="+clazzid,
        timeout: conf.doTimeOut,
        onload: function(xhr) {
            if (xhr.status == 200) {
                var obj = JSON.parse(xhr.responseText) || {};
                document.getElementsByClassName("layui-card-header")[0].innerHTML = "油猴中文网首发";
                var content = document.getElementsByClassName("layui-card-body")[0]
                if (obj.score!=[]) {
                    var count = obj.count.length;
                    console.log(obj.score.length);
                    for(let i=0;i<obj.score.length;i=i+(count-4)/2+2){
                        for(let k=0;k<=(count-4)/2+1;k++){
                            content.innerHTML += obj.score[k+i] + "　";
                        }
                        content.innerHTML += "<br>";
                    }
                }
                setTimeout(function(){
                    swal({
                        title: "油猴中文网首发",
                        text: "油猴中文网首发",
                        icon: "success",
                        button: "收到",
                    });},1000);
            }
        }
    });
}
var show = ()=>{
	layer.open({
		type: 1,
		area: ['500px', '300px'],
		offset: 'rb',
		id: 'msgt',
		closeBtn: 0,
		title: conf.title,
		shade: 0,
		maxmin: true,
		anim: 2,
		content: '<div id="msg" ><blockquote class="layui-elem-quote layui-quote-nm"><button type="button"  class="layui-btn layui-btn-normal start">点我获取题库-请确保在试卷页面点击<button></blockquote>'+
        '<div class="layui-collapse"><div class="layui-colla-item"><h2 class="layui-colla-title">公告</h2><div class="layui-colla-content layui-show"><div>扫描二维码下载APP搜题,题库更全哦~<img src="https://www.chitus.com/ewm/create?config=%7B%22content%22%3A%22https%3A%2F%2Fwww.fenbi.com%2Fdepot%2Ffenbi-search-question%2Findex.html%3Fapp%3Dsouti%26signVendor%3D8DFD180AC8706F9A519739C0F9F42CA6%22%7D" width="100px" /><br>&nbsp;&nbsp;反馈/建议+群:<a href="https://qm.qq.com/cgi-bin/qm/qr?k=kYJMBiYDBazG97Z_L3Nq9ppEexQtXh00&jump_from=webapi=">740894629</a></div></div></div>'
        +'<div id="content"><ul></ul>		<table class="layui-table"> <colgroup> <col width="50"> <col> <col> </colgroup> <thead> <tr> <th>序号</th> <th>题目</th> <th>答案</th> </tr> </thead> <tbody>  </tbody> </table></div></div></div>'
	});
}
