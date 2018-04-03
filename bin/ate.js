function ATE_Resources(){}function ATE_Styles(){}function ATE_Button(e){var t=e;this.ctx=t.ctx,this.Initialize=function(){},this.Update=function(e){}}function ATE_HtmlButton(e){var t=this,n=e;this.ctx=n.ctx;var i,a,s,r,l=!1;this.GetButtonSelector=function(){return s},this.Initialize=function(e,n){i=e,a=n,(s=$("<img src='"+i+"' width='20' />")).on("click",t.OnClick)},this.Reset=function(){l=!1,s.attr("src",i)},this.SetClickCallback=function(e){r=e},this.AddMargin=function(){s.css("margin-left","4px")},this.OnClick=function(e){l=!l,a&&s.attr("src",l?a:i),r&&r(e)},this.Update=function(e){}}function ATE_Util(){}function ATE_PlaybackEngine(){var e,t,n=this,i=void 0,a=0,s=0,r=!1;this.Animations={},this.GetIsPlaying=function(){return r},this.GetCurrentTime=function(){return s},this.GetAnimationSeconds=function(){return t},this.GetFPS=function(){return e},this.Initialize=function(e){i=e,t=e.AnimationSeconds,n.ConfigureFPS(e.FPS);for(var a=0;a<i.LayerCount;a++){var r=i.Layers[a],l=r.Name,o=ATE_PlaybackEngine.ByLayer(r.Data,s);this.Animations[l]=o}},this.ConfigureFPS=function(t){e=t;var n=1e3/t;a=1/ATE_PlaybackEngine.DefaultTime/n},this.Play=function(){r||(r=!0)},this.Stop=function(){r&&(r=!1,s=0)},this.Update=function(e){if(r){s=s>=t?0:(s=(s+=a*e)<0?0:s)>t?t:s;for(var n=0;n<i.LayerCount;n++){var l=i.Layers[n],o=l.Name,c=ATE_PlaybackEngine.ByLayer(l.Data,s);this.Animations[o]=c}}}}function ATE_Engine(){var e,t,n,i,a,s,r,l,o=this,c=0,u=0,T=0,E=0,y=0;this.ctx=void 0;var f,_,h,d,g,m,S,A,p,b,v,P=ATE_Styles.Default_SubSegments,k=[],C=[];this.GetCanvasContext=function(){return mCanvasContext},this.GetAnimationSeconds=function(){return f},this.GetSubSegments=function(){return P},this.GetParentSelector=function(){return t},this.GetParentGUISelector=function(){return i},this.GetControlsUI_Selector=function(){return r},this.GetLayersUI_Selector=function(){return l},this.GetInputCurrentTimeSelector=function(){return s},this.GetWidth=function(){return c},this.GetHeight=function(){return u},this.GetScrollX=function(){return E},this.GetScrollY=function(){return y},this.GetGUI_RealSegmentWidth=function(){return h},this.GetGUI_RealSubSegmentWidth=function(){return d},this.GetLayers=function(){return C},this.GetSegments=function(){return k},this.GetPlaybackController=function(){return _},this.GetCurrentFocusSegment=function(){return-1},this.GetAnimationData=function(){for(var e={AnimationSeconds:f,FPS:_.GetFPS(),Layers:[],LayerCount:C.length},t=0;t<C.length;t++){var n=C[t].GetLayerName(),i=C[t].GetLayerData();e.Layers.push({Data:i,Name:n})}return e},this.Initialize=function(n){e=n,(t=$(e)).css("height","100%"),c=t.width(),u=ATE_Styles.GUIHeight,T=u-ATE_Styles.ScrollbarHeight;var i=$("<img id='"+ATE_Resources.Diamond.Id+"' src='"+ATE_Resources.Diamond.Path+"' />");i.css("display","none");var a=$("<img id='"+ATE_Resources.DiamondSelected.Id+"' src='"+ATE_Resources.DiamondSelected.Path+"' />");a.css("display","none"),t.append(i),t.append(a),o.CreateGUI(),o.CreateMouseEvents(),o.ChangeAnimationSeconds(ATE_Styles.Default_Seconds),(_=new ATE_Playback(o)).Initialize(),_.ConfigureFPS(ATE_Styles.Playback.DefaultTime)},this.InvalidateLayers=function(){for(var e=0;e<C.length;e++)C[e].Invalidate()},this.CreateMouseEvents=function(){function e(e,t){var n=e.getBoundingClientRect();return{x:t.clientX-n.left,y:t.clientY-n.top}}mParentCanvasSelector.on("mousemove",function(t){var n=e(mParentCanvasSelector[0],t);_.OnMouseMove(n)}),mParentCanvasSelector.on("mouseup",function(t){var n=e(mParentCanvasSelector[0],t);_.OnMouseUp(n)}),mParentCanvasSelector.on("mousedown",function(t){var n=e(mParentCanvasSelector[0],t);_.OnMouseDown(n)}),mParentCanvasSelector.on("click",function(e){}),mParentCanvasSelector.on("dblclick",function(e){}),mParentCanvasSelector.on("mouseout",function(t){var n=e(mParentCanvasSelector[0],t);_.OnMouseOut(n)})},this.CreateGUI=function(){a="gui-"+e.substring(1),(i=$("<div id='"+a+"'></div>")).css("width",ATE_Styles.AC_Width+"px"),i.css("height",u+"px"),i.css("float","left"),i.css("background-color",ATE_Styles.BackgroundColor),t.append(i),n="canvas-"+e.substring(1),mParentCanvasSelector=$("<canvas id='"+n+"' width='"+(c-ATE_Styles.AC_Width)+"' height='"+T+"'></canvas>"),mParentCanvasSelector.css("float","left"),t.append(mParentCanvasSelector),b=$("<div style='height:"+T+"px;width:"+ATE_Styles.ScrollbarHeight+"px;float: right;overflow-y: auto;'></div>"),v=$("<div style='height:"+T+"px'></div>"),b.append(v),t.append(b),A=$("<div style='height:"+(u-T)+"px;width: 0px;float: left;overflow-X: auto;'></div>"),p=$("<div style='width:0px;height:1px'></div>"),A.append(p),t.append(A),o.ctx=mParentCanvasSelector[0].getContext("2d"),function(){var e=$("<hr style='border-color:"+ATE_Styles.CStroke_Color+";border-width: 0.5px;margin: 0;padding: 0;-webkit-margin-before: 0;-webkit-margin-after: 0;-webkit-margin-start: 0;-webkit-margin-end: 0;transform: translateY(1px);' />");(r=$("<div><div>")).css("height",ATE_Styles.AC_TimelineHeight-1);var t=$("<div><div>");t.css("padding-top","4px"),t.css("padding-left","4px"),r.append(t),(m=new ATE_HtmlButton(o)).Initialize("res/spRecord.png","res/spStopRecording.png"),(g=new ATE_HtmlButton(o)).Initialize("res/spPlay.png","res/spPause.png"),g.AddMargin(),g.SetClickCallback(function(){_.PlayOrPause()}),(S=new ATE_HtmlButton(o)).Initialize("res/spStop.png"),S.AddMargin(),S.SetClickCallback(function(){g.Reset(),_.Stop()});var n=$("<label style='font-size:12px;color:white;margin-left:5px'>Time:<label/>");s=$("<input type='text' value='0.00' />");var a=$("<input type='text' value='"+ATE_Util.GetDigitsByValue(ATE_Styles.Default_Seconds,2)+".00'/>");a.on("change",function(){var e=Math.floor(parseFloat($(this).val()));e=ATE_Util.GetDigitsByValue(e,2),$(this).val(e+".00"),o.ChangeAnimationSeconds(parseInt(e))}),ATE_Engine.SetStylesInput_Time(s,!0),ATE_Engine.SetStylesInput_Time(a),t.append(m.GetButtonSelector()),t.append(g.GetButtonSelector()),t.append(S.GetButtonSelector()),t.append(n),t.append(s),t.append($("<label style='color:white'>/<label/>")),t.append(a),i.append(r),i.append(e)}(),(l=$("<div><div>")).css("height",T-ATE_Styles.AC_TimelineHeight-1+"px"),l.css("overflow-y","hidden"),i.append(l),l.append($("<div style='height:"+ATE_Styles.Timeline.OffsetY+"px'></div>"))},this.ChangeAnimationSeconds=function(e){f=e,o.CreateSegments(f)},this.GetLayer=function(e){for(var t={Exists:!1,Layer:void 0},n=0;n<C.length;n++)if(C[n].GetLayerName()===e){t.Exists=!0,t.Layer=C[n];break}return t},this.AddLayer=function(e,t,n){var i={Layer:void 0,Keyframe:void 0},a=o.GetLayer(e);if(a.Exists)i.Layer=a.Layer,i.Keyframe=a.Layer.SetKeyframe(t,n);else{var s=new ATE_Layer(o);s.Initialize(e),i.Layer=s,i.Keyframe=s.SetKeyframe(t,n),C.push(s)}return i},this.CreateSegments=function(e){function t(t,n){for(var i=t=void 0===t?0:t;i<n;i++){var a=new ATE_Segment(o);a.Initialize(i),a.FirstSegment=0===i,a.LastSegment=i===e-1,k.push(a)}}if(0===k.length)t(0,e);else{var n=e-k.length;if(n>0)t(k.length,e);else{for(var i=k.length,a=i-1;a>=i+n;a--)k[a].Destroy();k.splice(i+n,Math.abs(n));for(a=0;a<C.length;a++)C[a].RemoveKeyframesBetween(e+ATE_PlaybackEngine.EPSILON,Number.MAX_VALUE)}!function(){for(var t=0;t<k.length;t++){var n=k[t];n.FirstSegment=0===t,n.LastSegment=t===e-1}}()}},this.DrawGUI=function(e){var t=o.ctx;t.clearRect(0,0,c,u),t.fillStyle=ATE_Styles.BackgroundColor,t.fillRect(0,0,c,u),t.translate(.5,.5),t.beginPath(),t.moveTo(0,0),t.lineTo(0,T),t.lineWidth=1,t.strokeStyle=ATE_Styles.CStroke_Color,t.stroke(),t.closePath(),t.beginPath(),t.moveTo(0,ATE_Styles.AC_TimelineHeight+ATE_Styles.Timeline.OffsetY),t.lineTo(c,ATE_Styles.AC_TimelineHeight+ATE_Styles.Timeline.OffsetY),t.lineWidth=1,t.strokeStyle=ATE_Styles.CStroke_Color,t.stroke(),t.closePath()},this.DrawSegments=function(e){var t=o.ctx,n=o.GetGUI_RealSegmentWidth()*f+ATE_Styles.Timeline.OffsetX,i=ATE_Styles.AC_TimelineHeight;t.fillStyle=ATE_Styles.BackgroundColor,t.fillRect(0,0,n,i);for(var a=0;a<f;a++)k[a].Update(e)},this.DrawLayers=function(e){for(var t=0;t<C.length;t++)C[t].Update(t,e)},this.DrawLayersGUI=function(e){for(var t=0;t<C.length;t++)C[t].DrawGUI(t,e)},this.ComputeVariables=function(){d=ATE_Styles.AC_TimelineSegmentWidth/(P+1);var e=(h=ATE_Styles.AC_TimelineSegmentWidth-d)*f+ATE_Styles.AC_TimelineHeight;A.css("width",c-ATE_Styles.AC_Width),p.css("width",e),E=-A[0].scrollLeft;var t=(C.length+2)*ATE_Styles.AC_TimelineLayerHeight;v.css("height",t),y=-b[0].scrollTop,l[0].scrollTop=-y,mParentCanvasSelector.attr("width",c-ATE_Styles.AC_Width-20),mParentCanvasSelector.attr("height",T),i.css("height",u+"px"),b.css("height",T+"px"),A.css("height",u-T+"px"),l.css("height",T-ATE_Styles.AC_TimelineHeight-1+"px")},this.Update=function(e){c=t.width(),T=u-ATE_Styles.ScrollbarHeight,o.ComputeVariables(),o.DrawGUI(e),o.DrawLayersGUI(e),o.DrawLayers(e),o.DrawSegments(e),m.Update(e),g.Update(e),S.Update(e),_.Update(e)}}function ATE_Layer(e){var t=this,n=e,i=$("#"+ATE_Resources.Diamond.Id)[0],a=$("#"+ATE_Resources.DiamondSelected.Id)[0];this.ctx=n.ctx;var s,r,l,o,c,u,T,E=[],y=ATE_Resources.Diamond.TimelineWidth,f=ATE_Resources.Diamond.TimelineHeight,_=.5*-y,h=.5*ATE_Styles.AC_TimelineLayerHeight+.5*-y;this.GetLayerName=function(){return s},this.GetLayerData=function(){return E},this.Initialize=function(e){s=e;var t=n.GetLayersUI_Selector();(l=$("<div data-layer-name='"+e+"'></div>")).css("height",ATE_Styles.AC_TimelineLayerHeight);var i=$("<div></div>");i.css("height",ATE_Styles.AC_TimelineLayerHeight),o=$("<div style='float:left;'>"+s+"</div>");var a=$("<div style='float:right;padding-top: 5px;'></div>");c=$("<input type='text'></input>"),u=ATE_Layer.CreateTweenSelect(ATE_PlaybackEngine.TweenType),T=ATE_Layer.CreateKeyframeAddButton(),a.append(u),a.append(T),a.append(c),ATE_Layer.SetLabelCSS_LayerName(o),ATE_Layer.SetLabelCSS_LayerValue(c),i.append(o),i.append(a),l.append(i),l.append(ATE_Layer.CreateHR()),t.append(l)},this.OnPlayOrPause=function(e){e&&(c.off(),u.off(),T.off(),c.css("display","block"),c.attr("disabled",!0),u.css("display","none"),T.css("display","none"))},this.OnStop=function(){t.Invalidate()},this.Invalidate=function(){t.UpdateFromPlayback(n.GetPlaybackController().GetCurrentTime(),33,!0)},this.OnMouseClick_Keyframe=function(e){n.GetPlaybackController().GetIsPlaying()||c.val(e.Value.toFixed(3))},this.SetKeyframe=function(e,t){var n={Name:s,Time:e,DataType:ATE_PlaybackEngine.DataTypes.Numeric,Value:t,TweenType:ATE_PlaybackEngine.TweenType.None,__Img:i,__ImgSelected:a,__Selected:!1};return E.push(n),E.sort(function(e,t){return e.Time-t.Time}),n},this.RemoveKeyframe=function(e){for(var t=0;t<E.length;t++){var n=E[t];if(n&&n.Time===e){E.splice(t,1);break}}E.sort(function(e,t){return e.Time-t.Time})},this.RemoveKeyframesBetween=function(e,t){for(var n=0;n<E.length;n++){var i=E[n];i&&i.Time>=e&&i.Time<=t&&(E.splice(n,1),n--)}},this.GetKeyframeByPosition=function(e,t){for(var i=void 0,a=ATE_Styles.AC_TimelineLayerHeight,s=n.GetGUI_RealSegmentWidth(),l=.5*a+0,o=0;o<E.length;o++){var c=E[o];if(c){var u=c.Time*s+0+ATE_Styles.Timeline.OffsetX,T=r*a+ATE_Styles.AC_TimelineHeight+l+ATE_Styles.Timeline.OffsetY;if(ATE_Util.HitTestCenterByPoint(u,T,y,f,e,t)){i=c;break}}}return i},this.GetKeyFrameRenderData=function(e){var t=ATE_Styles.AC_TimelineLayerHeight,i=n.GetGUI_RealSegmentWidth(),a=e.Time*i+_+ATE_Styles.Timeline.OffsetX,s=r*t+ATE_Styles.AC_TimelineHeight+h+ATE_Styles.Timeline.OffsetY,l=e.__Selected?e.__ImgSelected:e.__Img;return{X:a,Y:s,Width:y,Height:f,Img:l,Keyframe:e}},this.Update=function(e,n){t.ctx;for(var i=0;i<E.length;i++){var a=E[i],s=E[i+1];a&&t.DrawKeyframe(a,s,e,n)}},this.ShowEditControls=function(e){if(!n.GetPlaybackController().GetIsPlaying()){var t=n.GetPlaybackController().GetCurrentTime(),i=ATE_PlaybackEngine.GetKeyframeByTime(E,t);switch(e){case ATE_Layer.EditControls.Value_Editable:c.css("display","block"),c.removeAttr("disabled"),c.off().on("change paste keyup",m),u.css("display","none"),u.off(),T.css("display","block"),T.off().on("click",g);break;case ATE_Layer.EditControls.Keyframe:c.css("display","none"),c.attr("disabled","true"),c.off(),u.css("display","none"),u.off(),T.css("display","block"),T.off().on("click",d);break;case ATE_Layer.EditControls.Tween:c.css("display","block"),c.removeAttr("disabled"),c.off().on("change paste keyup",m),u.val(i.TweenType),u.css("display","block"),u.off().on("change",S),T.css("display","block"),T.off().on("click",g)}}};var d=function(e){var i=n.GetPlaybackController().GetCurrentTime(),a=n.AddLayer(s,i,0);t.OnMouseClick_Keyframe(a.Keyframe),t.Invalidate()},g=function(e){var i=n.GetPlaybackController().GetCurrentTime();t.RemoveKeyframe(i),t.Invalidate()},m=function(e){if(!n.GetPlaybackController().GetIsPlaying()){var t=n.GetPlaybackController().GetCurrentTime(),i=ATE_PlaybackEngine.GetKeyframeByTime(E,t);if(i){var a=$(this).val();switch(i.DataType){case ATE_PlaybackEngine.DataTypes.Numeric:i.Value=parseFloat(a)}}}},S=function(e){var t=parseInt($(this).val()),i=n.GetPlaybackController().GetCurrentTime(),a=ATE_PlaybackEngine.GetKeyframeByTime(E,i);a&&(a.TweenType=t)};this.UpdateFromPlayback=function(e,n,i){i=void 0!==i&&i;var a=ATE_PlaybackEngine.GetKeyframeByTime(E,e),s=ATE_PlaybackEngine.GetKeyframesBetween(E,e);if(s.NoData)t.ShowEditControls(ATE_Layer.EditControls.Keyframe),T.attr("src",ATE_Resources.Diamond.Path);else{if(i){if(a){var r=s.KFi&&s.KFe,l=r&&s.KFe.Time===e&&s.KFe_IsLast;r=r&&!l,t.ShowEditControls(r?ATE_Layer.EditControls.Tween:ATE_Layer.EditControls.Value_Editable)}else t.ShowEditControls(ATE_Layer.EditControls.Keyframe);T.attr("src",a?ATE_Resources.DiamondSelected.Path:ATE_Resources.Diamond.Path)}resultValue=ATE_PlaybackEngine.ByLayer(E,e),c.val(resultValue.toFixed(3))}},this.DrawGUI=function(e,i){var a=t.ctx,s=ATE_Styles.AC_TimelineLayerHeight,r=n.GetScrollX(),l=n.GetScrollY()+(e+1)*s+ATE_Styles.AC_TimelineHeight+ATE_Styles.Timeline.OffsetY,o=n.GetAnimationSeconds()*n.GetGUI_RealSegmentWidth()+ATE_Styles.Timeline.OffsetX;a.beginPath(),a.moveTo(r,l),a.lineTo(o,l),a.lineWidth=1,a.lineHeight=1,a.strokeStyle=ATE_Styles.CStroke_Color,a.stroke(),a.closePath()},this.DrawKeyframe=function(e,i,a,s){r=a;var l=t.ctx,o=n.GetScrollX(),c=n.GetScrollY(),u=t.GetKeyFrameRenderData(e);if(i)switch(e.TweenType){case ATE_PlaybackEngine.TweenType.EaseLinear:case ATE_PlaybackEngine.TweenType.EaseInQuad:case ATE_PlaybackEngine.TweenType.EaseOutQuad:case ATE_PlaybackEngine.TweenType.EaseInOutQuad:case ATE_PlaybackEngine.TweenType.EaseInCubic:case ATE_PlaybackEngine.TweenType.EaseOutCubic:case ATE_PlaybackEngine.TweenType.EaseInOutCubic:case ATE_PlaybackEngine.TweenType.EaseInSine:case ATE_PlaybackEngine.TweenType.EaseOutSine:case ATE_PlaybackEngine.TweenType.EaseInOutSine:case ATE_PlaybackEngine.TweenType.EaseInExpo:case ATE_PlaybackEngine.TweenType.EaseOutExpo:case ATE_PlaybackEngine.TweenType.EaseInOutExpo:case ATE_PlaybackEngine.TweenType.EaseInElastic:case ATE_PlaybackEngine.TweenType.EaseOutElastic:case ATE_PlaybackEngine.TweenType.EaseInOutElastic:var T=t.GetKeyFrameRenderData(i),E=u.X+.5*ATE_Resources.Diamond.TimelineWidth+o,y=u.Y-h+c,f=T.X-u.X,_=ATE_Styles.AC_TimelineLayerHeight;l.beginPath(),l.fillStyle="#0000FF55",l.fillRect(E,y,f,_),l.closePath()}l.drawImage(u.Img,u.X+o,u.Y+c,u.Width,u.Height)},this.Destroy=function(){n.GetLayersUI_Selector().remove(l),E=void 0,t.ctx=void 0,n=void 0,t=void 0,l=void 0,o=void 0,c=void 0,u=void 0,T=void 0,i=void 0,a=void 0}}function ATE_Playback(e){var t=this,n=e;this.ctx=n.ctx;var i=!1,a=0,s=0,r=1/ATE_Styles.Playback.DefaultTime,l=n.GetInputCurrentTimeSelector(),o=!1,c=!1;this.GetIsPlaying=function(){return i},this.GetCurrentTime=function(){return s},this.GetFPS=function(){return a},this.Initialize=function(){},this.ConfigureFPS=function(e){a=e;var t=1e3/e;r=1/ATE_Styles.Playback.DefaultTime/t},this.OnMouseOut=function(e){i||(o=!1)},this.OnMouseMove=function(e){c=e},this.OnMouseUp=function(e){i||(o=!1)},this.OnMouseDown=function(e){if(!i){n.GetScrollX();var t=ATE_Styles.Timeline.OffsetX,a=n.GetAnimationSeconds(),s=t,r=n.GetGUI_RealSegmentWidth()*a,l=n.GetHeight()+ATE_Styles.AC_TimelineHeight;ATE_Util.HitTestByPoint(s,0,r,l,e.x,e.y)&&(o=!0)}},this.PlayOrPause=function(){i=!i;for(var e=n.GetLayers(),t=0;t<e.length;t++)e[t].OnPlayOrPause(i)},this.Stop=function(){i=!1,s=0;for(var e=n.GetLayers(),t=0;t<e.length;t++)e[t].OnStop()},this.Update=function(e){var a=n.GetAnimationSeconds();if(i)s=s>=a?0:(s=(s+=r*e)<0?0:s)>a?a:s;else if(o){var l=n.GetScrollX(),u=ATE_Engine.GetSegment(n,c.x-l,c.y)/ATE_Styles.Default_SubSegments;s!==u&&(s=(s=(s=u)<0?0:s)>a?a:s)}var T=n.GetLayers(),E=!i&&o;if(i||o)for(var y=0;y<T.length;y++)T[y].UpdateFromPlayback(s,e,E);t.Draw(e)},this.Draw=function(e){var i=t.ctx,a=n.GetScrollX(),r=n.GetGUI_RealSegmentWidth(),o=n.GetGUI_RealSubSegmentWidth(),c=ATE_Styles.Timeline.OffsetX+s*r-o-ATE_Styles.Playback.GUI_Width/4+1+a,u=ATE_Styles.Timeline.OffsetY,T=c+.5*ATE_Styles.Playback.GUI_Width+1;i.beginPath(),i.fillStyle=ATE_Styles.Playback.GUI_BackgroundColor,i.fillRect(c+ATE_Styles.Playback.GUI_TextTimeOffset.X,u,ATE_Styles.Playback.GUI_Width,ATE_Styles.Playback.GUI_Height),i.closePath(),i.beginPath(),i.moveTo(T,u),i.lineTo(T,n.GetHeight()),i.lineWidth=1,i.strokeStyle=ATE_Styles.Playback.GUI_LineColor,i.stroke(),i.closePath(),i.font=ATE_Styles.Playback.GUI_TextStyle,i.fillStyle=ATE_Styles.Playback.GUI_TextColor,i.textAlign="center",i.fillText(ATE_Util.FormatTime(1e3*(s+ATE_PlaybackEngine.EPSILON),2,!0),T,u+ATE_Styles.Playback.GUI_Height+ATE_Styles.Playback.GUI_TextTimeOffset.Y),l.val(ATE_Util.FormatTimeAsSeconds(1e3*(s+ATE_PlaybackEngine.EPSILON)))}}function ATE_Segment(e){var t=this,n=e;this.ctx=n.ctx,this.FirstSegment=!1,this.LastSegment=!1;var i=0,a="",s="";this.Initialize=function(e){i=e,a=ATE_Util.FormatTime(1e3*i,2),s=ATE_Util.FormatTime(1e3*(i+1),2)},this.Update=function(e){t.Draw(e)},this.Draw=function(e){for(var r=t.ctx,l=ATE_Styles.AC_TimelineSegmentWidth,o=n.GetSubSegments()+1,c=l/o,u=n.GetScrollX(),T=i*l-(0!==i?c*i:0),E=ATE_Styles.AC_TimelineHeight,y=0;y<o;y++){var f=Math.round(T+y*c)+ATE_Styles.Timeline.OffsetX+u,_=Math.round(E)+ATE_Styles.Timeline.OffsetY,h=0===y||y===o-1,d=h?ATE_Styles.AC_TimelineSubSegmentLimitsHeight:ATE_Styles.AC_TimelineSubSegmentHeight,g=0===y||y===o-1&&t.LastSegment;if(r.beginPath(),r.moveTo(f,_),r.lineTo(f,_-d),r.lineWidth=1,r.strokeStyle=ATE_Styles.AC_TimelineSubSegment_Color,r.stroke(),r.closePath(),r.beginPath(),r.moveTo(f,_),r.lineTo(f,n.GetHeight()-ATE_Styles.ScrollbarHeight),r.lineWidth=1,r.strokeStyle=h?ATE_Styles.AC_TimelineSubSegment_Color:ATE_Styles.CStroke_Color,r.stroke(),r.closePath(),g){var m=y===o-1&&t.LastSegment?s:a;r.font=ATE_Styles.AC_TimelineSubSegment_TextStyle,r.fillStyle=ATE_Styles.Font_Color,r.textAlign="center",r.fillText(m,f,_-ATE_Styles.AC_TimelineSubSegmentLimitsHeight-10)}}},this.Destroy=function(){t.ctx=void 0,t=void 0,n=void 0}}function Easing(){}ATE_Resources.Diamond={Id:"ate-img-diamond",Path:"res/spATE_diamond.png",TimelineWidth:10,TimelineHeight:10},ATE_Resources.DiamondSelected={Id:"ate-img-diamond-selected",Path:"res/spATE_diamond_selected.png",TimelineWidth:10,TimelineHeight:10},ATE_Styles.Default_Seconds=10,ATE_Styles.Default_SubSegments=10,ATE_Styles.ScrollbarHeight=16,ATE_Styles.GUIHeight=140,ATE_Styles.CanvasHeight=ATE_Styles.GUIHeight-ATE_Styles.ScrollbarHeight,ATE_Styles.BackgroundColor="#4e4e4e",ATE_Styles.CStroke_Color="#6e6e6e",ATE_Styles.Font_Color="#f9f9f9",ATE_Styles.AC_Width=200,ATE_Styles.AC_TimelineHeight=60,ATE_Styles.AC_TimelineSegmentWidth=160,ATE_Styles.AC_TimelineSubSegmentHeight=6,ATE_Styles.AC_TimelineSubSegmentLimitsHeight=20,ATE_Styles.AC_TimelineSubSegment_Color="#f9f9f9",ATE_Styles.AC_TimelineSubSegment_TextStyle="bold 9px Arial",ATE_Styles.AC_TimelineLayerHeight=30,ATE_Styles.Timeline={OffsetX:22,OffsetY:0},ATE_Styles.Playback={DefaultTime:60,GUI_Width:52,GUI_Height:15,GUI_TextStyle:"bold 12px Arial",GUI_TextColor:"white",GUI_BackgroundColor:"red",GUI_LineColor:"#FF000066",GUI_TextTimeOffset:{X:2,Y:-4}},ATE_Styles.Scrollbar={HorizontalSize:14,VerticalSize:30},ATE_Util.GetDigitsByValue=function(e,t){for(var n=String(e),i=t-n.length,a=0;a<i;a++)n="0"+n;return n},ATE_Util.FormatTime=function(e,t,n){t=t<=1?2:t;var i=e/1e3/60,a=Math.floor(i),s=i-a,r=0,l="",o=void 0!==n&&n;if(2!==t||o){var c=Math.pow(10,t-2);r=60*s,l=Math.floor(100*(r-Math.floor(r)*c)),r=Math.floor(60*s)}else r=Math.floor(60*s);return ATE_Util.GetDigitsByValue(a,a>9?1:2)+":"+ATE_Util.GetDigitsByValue(r,2)+(o?"."+ATE_Util.GetDigitsByValue(l,2):"")},ATE_Util.FormatTimeAsSeconds=function(e){var t=e/1e3,n="";return n=Math.floor(100*(t-Math.floor(t))),t=Math.floor(t),ATE_Util.GetDigitsByValue(t,2)+"."+ATE_Util.GetDigitsByValue(n,2)},ATE_Util.HitTestCenterByPoint=function(e,t,n,i,a,s){var r=.5*n,l=.5*i;return e-r<a&&e+r>a&&t-l<s&&t+l>s},ATE_Util.HitTestByPoint=function(e,t,n,i,a,s){return e<a&&e+n>a&&t<s&&t+i>s},ATE_PlaybackEngine.EasingEquations=Easing.Equations,ATE_PlaybackEngine.DefaultTime=60,ATE_PlaybackEngine.ByLayer=function(e,t){var n=void 0,i=ATE_PlaybackEngine.GetKeyframeByTime(e,t),a=ATE_PlaybackEngine.GetKeyframesBetween(e,t);if(!a.NoData){var s=a.KFi.Value;if(n=i?i.Value:s,a.KFe){var r=a.KFi.Time,l=a.KFe.Time,o=a.KFe.Value,c=1-(l-t)/(l-r),u=void 0;switch(a.KFi.TweenType){case ATE_PlaybackEngine.TweenType.EaseLinear:u=ATE_PlaybackEngine.EasingEquations.easeLinear;break;case ATE_PlaybackEngine.TweenType.EaseInQuad:u=ATE_PlaybackEngine.EasingEquations.easeInQuad;break;case ATE_PlaybackEngine.TweenType.EaseOutQuad:u=ATE_PlaybackEngine.EasingEquations.easeOutQuad;break;case ATE_PlaybackEngine.TweenType.EaseInOutQuad:u=ATE_PlaybackEngine.EasingEquations.easeInOutQuad;break;case ATE_PlaybackEngine.TweenType.EaseInCubic:u=ATE_PlaybackEngine.EasingEquations.easeInCubic;break;case ATE_PlaybackEngine.TweenType.EaseOutCubic:u=ATE_PlaybackEngine.EasingEquations.easeOutCubic;break;case ATE_PlaybackEngine.TweenType.EaseInOutCubic:u=ATE_PlaybackEngine.EasingEquations.easeInOutCubic;break;case ATE_PlaybackEngine.TweenType.EaseInSine:u=ATE_PlaybackEngine.EasingEquations.easeInSine;break;case ATE_PlaybackEngine.TweenType.EaseOutSine:u=ATE_PlaybackEngine.EasingEquations.easeOutSine;break;case ATE_PlaybackEngine.TweenType.EaseInOutSine:u=ATE_PlaybackEngine.EasingEquations.easeInOutSine;break;case ATE_PlaybackEngine.TweenType.EaseInExpo:u=ATE_PlaybackEngine.EasingEquations.easeInExpo;break;case ATE_PlaybackEngine.TweenType.EaseOutExpo:u=ATE_PlaybackEngine.EasingEquations.easeOutExpo;break;case ATE_PlaybackEngine.TweenType.EaseInOutExpo:u=ATE_PlaybackEngine.EasingEquations.easeInOutExpo;break;case ATE_PlaybackEngine.TweenType.EaseInElastic:u=ATE_PlaybackEngine.EasingEquations.easeInElastic;break;case ATE_PlaybackEngine.TweenType.EaseOutElastic:u=ATE_PlaybackEngine.EasingEquations.easeOutElastic;break;case ATE_PlaybackEngine.TweenType.EaseInOutElastic:u=ATE_PlaybackEngine.EasingEquations.easeInOutElastic}u&&(n=u(c,s,o-s,1))}}return n},ATE_PlaybackEngine.GetKeyframeByTime=function(e,t){for(var n=void 0,i=0;i<e.length;i++){var a=e[i];if(a&&a.Time>=t-ATE_PlaybackEngine.EPSILON&&a.Time<=t+ATE_PlaybackEngine.EPSILON){n=a;break}}return n},ATE_PlaybackEngine.GetKeyframesBetween=function(e,t){var n={KFi:void 0,KFe:void 0,NoData:!0,KFi_IsFirst:!1,KFe_IsLast:!1},i=e.length;if(i>1)for(var a=0;a<i;a++){var s=e[a],r=e[a+1];if(s.Time<=t){if(r&&r.Time>=t){n.KFi=s,n.KFe=r,n.NoData=!1,n.KFi_IsFirst=0===a,n.KFe_IsLast=a+1===i-1;break}void 0===r&&(n.KFe_IsLast=!0,n.KFi=s,n.NoData=!1)}}else 1===i&&(n.KFi=e[0],n.NoData=!1,n.KFi_IsFirst=!0);return n},ATE_PlaybackEngine.EPSILON=.001,ATE_PlaybackEngine.DataTypes={Numeric:1},ATE_PlaybackEngine.TweenType={None:0,EaseLinear:1,EaseInQuad:2,EaseOutQuad:3,EaseInOutQuad:4,EaseInCubic:5,EaseOutCubic:6,EaseInOutCubic:7,EaseInSine:8,EaseOutSine:9,EaseInOutSine:10,EaseInExpo:11,EaseOutExpo:12,EaseInOutExpo:13,EaseInElastic:14,EaseOutElastic:15,EaseInOutElastic:16},ATE_Engine.GetLayerByPosition=function(e,t,n){var i=e.GetLayers(),a={};a.LayerIndex=-1,a.LayerOnFocus=void 0;for(var s=ATE_Styles.Timeline.OffsetX,r=ATE_Styles.AC_TimelineHeight+ATE_Styles.Timeline.OffsetY,l=ATE_Styles.AC_TimelineLayerHeight,o=e.GetGUI_RealSegmentWidth()*e.GetAnimationSeconds(),c=l,u=0;u<i.length;u++){var T=s,E=u*l+r;if(ATE_Util.HitTestByPoint(T,E,o,c,t,n)){a.LayerIndex=u,a.LayerOnFocus=i[u];break}}return a},ATE_Engine.GetKeyframeByPosition=function(e,t,n){var i=e.GetLayers(),a={};a.LayerOnFocus=void 0,a.KeyframeOnFocus=void 0;for(var s=0;s<i.length;s++){var r=i[s].GetKeyframeByPosition(t,n);if(r){a.LayerOnFocus=i[s],a.KeyframeOnFocus=r;break}}return a},ATE_Engine.GetSegment=function(e,t,n){var i=e.GetAnimationSeconds(),a=e.GetGUI_RealSegmentWidth(),s=e.GetGUI_RealSubSegmentWidth(),r=ATE_Styles.Timeline.OffsetX+0*a-s-ATE_Styles.Playback.GUI_Width/4+1+.5*ATE_Styles.Playback.GUI_Width+1,l=t+(s=e.GetGUI_RealSubSegmentWidth())/2-r,o=(e.GetGUI_RealSegmentWidth(),i*ATE_Styles.Default_SubSegments),c=Math.floor(l/s);return c=c<0?0:c,c=c>o?o:c},ATE_Engine.SetStylesInput_Time=function(e,t){e.css("text-align","center"),e.css("font-size","12px"),e.css("padding","1px"),e.css("width","36px"),e.css("margin","5px 0px 0px"),e.css("outline","none"),e.css("border-width","0px 0px 1px"),e.css("border-top-style","initial"),e.css("border-right-style","initial"),e.css("border-bottom-style","dotted"),e.css("border-left-style","initial"),e.css("border-top-color","initial"),e.css("border-right-color","initial"),e.css("border-bottom-color","rgb(184, 184, 184)"),e.css("border-left-color","initial"),e.css("border-image","initial"),e.css("background","none"),e.css("color","rgb(184, 184, 184)"),void 0!==t&&e.attr("disabled",t)},ATE_Layer.EditControls={None:0,Value_Editable:1,Keyframe:2,Tween:3},ATE_Layer.SetLabelCSS_LayerName=function(e){e.css("height",ATE_Styles.AC_TimelineLayerHeight),e.css("font-size","13px"),e.css("color",ATE_Styles.AC_TimelineSubSegment_Color),e.css("font-family","arial"),e.css("margin-left","4px"),e.css("white-space","nowrap"),e.css("overflow","hidden"),e.css("text-overflow","ellipsis"),e.css("max-width","90px"),e.css("padding-top","8px"),e.css("max-height","20px")},ATE_Layer.SetLabelCSS_LayerValue=function(e){e.css("font-size","11px"),e.css("font-family","arial"),e.css("margin-right","2px"),e.css("width","40px"),e.css("float","right"),e.attr("disabled",!0)},ATE_Layer.CreateTweenSelect=function(e){var t="";t+="<select style='display:none;margin-right:2px;float:left;width:55px'>";for(var n in e)t+="   <option value='"+e[n]+"'>"+n+"</option>";return t+="</select>",$(t)},ATE_Layer.CreateKeyframeAddButton=function(){var e="";return e+="<img src='"+ATE_Resources.Diamond.Path+"' width='"+ATE_Resources.Diamond.TimelineWidth+"' height='"+ATE_Resources.Diamond.TimelineHeight+"' style='display:none;margin-right:2px;float:right;margin-top: 5px;'/>",$(e)},ATE_Layer.CreateHR=function(){var e=$("<hr />");return e.css("border-color",ATE_Styles.CStroke_Color),e.css("border-width","0.5px"),e.css("margin","0"),e.css("padding","0"),e.css("-webkit-margin-before","0"),e.css("-webkit-margin-before","0"),e.css("-webkit-margin-start","0"),e.css("-webkit-margin-end","0"),e},Easing.Equations={easeLinear:function(e,t,n,i){return n*e/i+t},easeInQuad:function(e,t,n,i){return n*(e/=i)*e+t},easeOutQuad:function(e,t,n,i){return-n*(e/=i)*(e-2)+t},easeInOutQuad:function(e,t,n,i){return(e/=i/2)<1?n/2*e*e+t:-n/2*(--e*(e-2)-1)+t},easeInCubic:function(e,t,n,i){return n*(e/=i)*e*e+t},easeOutCubic:function(e,t,n,i){return n*((e=e/i-1)*e*e+1)+t},easeInOutCubic:function(e,t,n,i){return(e/=i/2)<1?n/2*e*e*e+t:n/2*((e-=2)*e*e+2)+t},easeInQuart:function(e,t,n,i){return n*(e/=i)*e*e*e+t},easeOutQuart:function(e,t,n,i){return-n*((e=e/i-1)*e*e*e-1)+t},easeInOutQuart:function(e,t,n,i){return(e/=i/2)<1?n/2*e*e*e*e+t:-n/2*((e-=2)*e*e*e-2)+t},easeInQuint:function(e,t,n,i){return n*(e/=i)*e*e*e*e+t},easeOutQuint:function(e,t,n,i){return n*((e=e/i-1)*e*e*e*e+1)+t},easeInOutQuint:function(e,t,n,i){return(e/=i/2)<1?n/2*e*e*e*e*e+t:n/2*((e-=2)*e*e*e*e+2)+t},easeInSine:function(e,t,n,i){return-n*Math.cos(e/i*(Math.PI/2))+n+t},easeOutSine:function(e,t,n,i){return n*Math.sin(e/i*(Math.PI/2))+t},easeInOutSine:function(e,t,n,i){return-n/2*(Math.cos(Math.PI*e/i)-1)+t},easeInExpo:function(e,t,n,i){return 0==e?t:n*Math.pow(2,10*(e/i-1))+t},easeOutExpo:function(e,t,n,i){return e==i?t+n:n*(1-Math.pow(2,-10*e/i))+t},easeInOutExpo:function(e,t,n,i){return 0==e?t:e==i?t+n:(e/=i/2)<1?n/2*Math.pow(2,10*(e-1))+t:n/2*(2-Math.pow(2,-10*--e))+t},easeInCirc:function(e,t,n,i){return-n*(Math.sqrt(1-(e/=i)*e)-1)+t},easeOutCirc:function(e,t,n,i){return n*Math.sqrt(1-(e=e/i-1)*e)+t},easeInOutCirc:function(e,t,n,i){return(e/=i/2)<1?-n/2*(Math.sqrt(1-e*e)-1)+t:n/2*(Math.sqrt(1-(e-=2)*e)+1)+t},easeInElastic:function(e,t,n,i){var a=1.70158,s=0,r=n;if(0==e)return t;if(1==(e/=i))return t+n;if(s||(s=.3*i),r<Math.abs(n)){r=n;a=s/4}else a=s/(2*Math.PI)*Math.asin(n/r);return-r*Math.pow(2,10*(e-=1))*Math.sin((e*i-a)*(2*Math.PI)/s)+t},easeOutElastic:function(e,t,n,i){var a=1.70158,s=0,r=n;if(0==e)return t;if(1==(e/=i))return t+n;if(s||(s=.3*i),r<Math.abs(n)){r=n;a=s/4}else a=s/(2*Math.PI)*Math.asin(n/r);return r*Math.pow(2,-10*e)*Math.sin((e*i-a)*(2*Math.PI)/s)+n+t},easeInOutElastic:function(e,t,n,i){var a=1.70158,s=0,r=n;if(0==e)return t;if(2==(e/=i/2))return t+n;if(s||(s=i*(.3*1.5)),r<Math.abs(n)){r=n;a=s/4}else a=s/(2*Math.PI)*Math.asin(n/r);return e<1?r*Math.pow(2,10*(e-=1))*Math.sin((e*i-a)*(2*Math.PI)/s)*-.5+t:r*Math.pow(2,-10*(e-=1))*Math.sin((e*i-a)*(2*Math.PI)/s)*.5+n+t},easeOutBounce:function(e,t,n,i){return(e/=i)<1/2.75?n*(7.5625*e*e)+t:e<2/2.75?n*(7.5625*(e-=1.5/2.75)*e+.75)+t:e<2.5/2.75?n*(7.5625*(e-=2.25/2.75)*e+.9375)+t:n*(7.5625*(e-=2.625/2.75)*e+.984375)+t}};