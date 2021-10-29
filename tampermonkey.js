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
// @antifeature  ads
// @antifeature  membership
// ==/UserScript==

var conf = {
	title: "超星分数查询（油猴中文网首发）",
    TimeOut:5000,
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
        $(".start").click(function() {
            chafen(courseid,clazzid);
        })
    };
});

var chafen = (courseid,clazzid)=>{
    GM_xmlhttpRequest({
        method: 'GET',
        url: "http://42.192.47.62:8080/cha?courseId="+courseid+"&classId="+clazzid,
        timeout: conf.TimeOut,
        onload: function(xhr) {
            if (xhr.status == 200) {
                var el="";
                var obj = JSON.parse(xhr.responseText) || {};
                document.querySelector("#msg > div").innerHTML = '共获取'+obj.total+'位同学分数';
                var content = document.getElementsByClassName("layui-card-body")[0]
                if (obj.body!=[]) {
                    el = '<tr class="layui-bg">'
                    for(let i=0;i<obj.head.length;i++){
                        el = el + '<td>' + obj.head[i] + '</td>'
                    }
                    el = el + '</td></tr>'
                    $("#content>table>tbody").append($(el));
                    for(let i=0;i<obj.total;i=i+1){
                        el = '<tr class="layui-bg">'
                        for(let k=0;k<obj.head.length;k++){
                            el = el + '<td>' + obj.body[i][k] + '</td>'
                        }
                        el = el + '</td></tr>'
                        $("#content>table>tbody").append($(el));
                    }
                }
                window,open("https://bbs.tampermonkey.net.cn/");
            }
        }
    });
}
var show = ()=>{
	layer.open({
		type: 1,
		area: ['800px', '500px'],
		offset: 'rt',
		id: 'msgt',
		closeBtn: 1,
		title: conf.title,
		shade: 0,
		maxmin: true,
		anim: 2,
		content: '<div id="msg" ><div class="layui-elem-quote" style="margin-left:10px;"><button type="button"  class="layui-btn layui-btn-normal start">点我获取全班成绩<button></div>'+
        '<div class="layui-collapse"><div class="layui-colla-item"><h2 class="layui-colla-title">公告</h2><div class="layui-colla-content layui-show"><div>每位用户只可以凭token查询一次分数<br>插件和谐不再更新</a></div></div></div>'
        +'<div id="content"><ul></ul>		<table class="layui-table"> <colgroup> <col width="100"> <col> <col> </colgroup> <thead> <tr>  </tr> </thead> <tbody>  </tbody> </table></div></div></div>'
	});
}
