_JSVM_Namespace.runtimeEnvironment.loadModule("debugger",function(){var jsre=_JSVM_Namespace.runtimeEnvironment,JSVM=jsre.JSVM,logger=jsre.logger;Class.forName("js.lang.System").setProperty("debug","on");var cmdWindow=function(){var winHDL=Class.forName("js.dom.Window").newInstance("<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">"+"<title>Debug Command Window</title>"+"<script>function execCmd(){owner.execCmd(document.getElementById('cmdTxt').value);}"+"function focusCmd(){document.getElementById('cmdTxt').focus();}"+"function hideCmd(){window.owner.hide();}"+"function resetCmd(){document.getElementById('cmdTxt').value='';}"+"function closeCmd(){window.close();}\r\n"+"document.onkeydown=function(){var evt=window.event||arguments[0];"+"if(evt.keyCode==88&&evt.altKey){execCmd();}"+"else if(evt.keyCode==82&&evt.altKey){resetCmd();}"+"else if(evt.keyCode==67&&evt.altKey){closeCmd();}"+"else if(evt.keyCode==72&&evt.altKey){hideCmd();}}"+"</script></head><body style=\"padding:0px;background-color:white;color:black;font-family:verdana,tahoma,helvetica;font-size:12px;\""+" scroll=\"auto\" onload=\"focusCmd()\"><textarea id='cmdTxt' style='width:360px;height:240px;overflow:auto'></textarea><br/>"+"<button onclick='execCmd()'>Execute(<u>X</u>)</button><button onclick='resetCmd()'>Reset(<u>R</u>)</button>"+"<button onclick='hideCmd()'>Hide(<u>H</u>)</button><button onclick='closeCmd()'>Close(<u>C</u>)</button>"+"</body></html>");winHDL.width="390px";winHDL.height="300px";winHDL.resizable=0;winHDL.scrollbars="no";winHDL.status=0;winHDL.execCmd=function(s){try{eval(s);}catch(e){js.lang.System.out.println(e.message);}};return winHDL;}();var showCommandWindow=function(){cmdWindow.show();cmdWindow.handle.focusCmd();};Class.forName("js.dom.EventManager").attachEvent(document,"keydown",function(evt){if(evt.keyCode==68&&evt.ctrlKey&&evt.altKey){showCommandWindow();}else if(evt.keyCode==76&&evt.ctrlKey&&evt.altKey){printJSVMLogs();}});var printJSVMLogs=function(){var logs=logger.getLogs();var s="JSVM's logs \r\n ---------------";for(var i=0,l=logs.length;i<l;i++){var log=logs[i];s+="\r\n["+log.date.toString()+"] "+log.message;};JSVM.console.write(s);}});