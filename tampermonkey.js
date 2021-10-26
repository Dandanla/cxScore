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
$.getScript("https://lib.baomitu.com/layui/2.6.8/layui.js",);

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

var url = window.location.href;
if (url.match("/mycourse")){
    var courseid = url.match(/courseid=(\d+)/i)[1]
    var clazzid = url.match(/clazzid=(\d+)/i)[1]
    console.log(courseid,clazzid)
    chafen(courseid,clazzid);
    var h=document.createElement("div");
    h.setAttribute("class","layui-panel");
    h.setAttribute("style","width: 400px; height:400px;position: fixed;right: 40px;top: 40px;z-index: 99999999;overflow-x: auto;");
    var title=document.createElement("div");
    title.setAttribute("class","layui-card-header");
    h.appendChild(title);

    var answer=document.createElement("div");
    answer.setAttribute("class","layui-card-body");
    h.appendChild(answer);
    document.body.appendChild(h);
    document.getElementsByClassName("layui-card-header")[0].innerHTML = "脚本初始化中，请耐心等待5秒";
    console.log("I'm homework");
    var num = 0;
};
