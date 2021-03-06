function ATE_Playback(ate) {
    var mSelf = this;
    var mATE = ate;
    
    this.ctx = mATE.ctx;
    
    var mIsPlaying = false;
    var mWasStopped = false;
    var mFPS = 0;
    var mCurrentTime = 0;
    var mAnimationSecondsToPlay = 0;
    var mPlayingSpeed = 1 / ATE_Styles.Playback.DefaultTime;
    var mInputCurrentTimeSelector = mATE.GetInputCurrentTimeSelector();
    
    // variables: not playing
    var mIsMouseDown = false;
    var mMousePos = false;
    
    this.GetIsPlaying = function() { return mIsPlaying; }
    this.GetWasStopped = function() { return mWasStopped; }
    this.GetCurrentTime = function() { return mCurrentTime; }
    this.GetFPS = function() { return mFPS; }
    
    this.Initialize = function() {
        
    }
    
    this.ConfigureFPS = function(fps, noChange) {
        mFPS = fps;
        
        var deltaTime = 1000.0 / fps;
        mPlayingSpeed = (1 / ATE_Styles.Playback.DefaultTime) / deltaTime;
        
        if (noChange === undefined) {
            // change
            if (mATE.GetOnChangeCallback()) { mATE.GetOnChangeCallback()(); }
        }
    }
    
    this.OnMouseOut = function(mousePos) {
        if (!mIsPlaying) {
            mIsMouseDown = false;
        }
    }
    
    this.OnMouseMove = function(mousePos) {
        mMousePos = mousePos;
    }
    
    this.OnMouseUp = function(mousePos) {
        if (!mIsPlaying) {
            mIsMouseDown = false;
        }
    }
    
    this.OnMouseDown = function(mousePos) {
        if (!mIsPlaying) {
            var scrollX = mATE.GetScrollX();
            var offsetX = ATE_Styles.Timeline.OffsetX;
            var animationSeconds = mATE.GetAnimationSeconds();
            var segmentWidth = mATE.GetGUI_RealSegmentWidth();
            
            var x = offsetX;
            var y = 0;
            var width = (segmentWidth * animationSeconds);
            var height = mATE.GetHeight() + ATE_Styles.AC_TimelineHeight;
            
            var isHitted = ATE_Util.HitTestByPoint(x, y, width, height, 
                mousePos.x, mousePos.y);
        
            if (isHitted) {
                mIsMouseDown = true;
            }
        }
    }
    
    this.PlayOrPause = function() {
        mIsPlaying = !mIsPlaying;
        mWasStopped = false;
        
        var lastKeyframe = ATE_PlaybackEngine.GetLastKeyframeInAnimation(mATE.GetLayers());
        mAnimationSecondsToPlay = lastKeyframe.Time === 0 ? mATE.GetAnimationSeconds() : lastKeyframe.Time;
        
        // Layers: OnPlayOrPause
        var layers = mATE.GetLayers();
        for (var i = 0; i < layers.length; i++) { layers[i].OnPlayOrPause(mIsPlaying); }
    }
    
    this.Stop = function() {
        mIsPlaying = false;
        mWasStopped = true;
        mCurrentTime = 0;
        
        // Layers: OnPlayOrPause
        var layers = mATE.GetLayers();
        for (var i = 0; i < layers.length; i++) { layers[i].OnStop(); }
        //Update
        mInputCurrentTimeSelector.val(ATE_Util.FormatTimeAsSeconds(mCurrentTime * 1000));
    }
    
    this.Update = function(dt) {
        var changedTime = false;
        
        if (mIsPlaying) {
            if (mCurrentTime >= mAnimationSecondsToPlay) { mCurrentTime = 0; }
            else {
                mCurrentTime += mPlayingSpeed * dt;
                mCurrentTime = mCurrentTime < 0 ? 0 : mCurrentTime;
                mCurrentTime = mCurrentTime > mAnimationSecondsToPlay ? mAnimationSecondsToPlay : mCurrentTime;
            }
            
            changedTime = true;
        }
        else {
            if (mIsMouseDown) {
                var scrollX = mATE.GetScrollX();
                var inSegment = ATE_Engine.GetSegment(mATE, mMousePos.x - scrollX, mMousePos.y);
                var newTime = inSegment / ATE_Styles.Default_SubSegments;
                var animationSeconds = mATE.GetAnimationSeconds();
                
                if (mCurrentTime !== newTime) {
                    mCurrentTime = newTime;
                    mCurrentTime = mCurrentTime < 0 ? 0 : mCurrentTime;
                    mCurrentTime = mCurrentTime > animationSeconds ? animationSeconds : mCurrentTime;
                    
                    changedTime = true;
                }
            }
        }
        
        var layers = mATE.GetLayers();
        var isEditable = !mIsPlaying && mIsMouseDown;
            
        if (mIsPlaying || mIsMouseDown) {
            for (var i = 0; i < layers.length; i++) {
                layers[i].UpdateFromPlayback(mCurrentTime, dt, isEditable);
            }
        }
        
        mSelf.Draw(dt, changedTime);
    }
    
    this.Draw = function(dt, changedTime) {
        var ctx = mSelf.ctx;
        
        var scrollX = mATE.GetScrollX();
        var segmentWidth = mATE.GetGUI_RealSegmentWidth();
        var subSegmentWidth = mATE.GetGUI_RealSubSegmentWidth();
        var x = ((ATE_Styles.Timeline.OffsetX + (mCurrentTime * segmentWidth)) - 
            subSegmentWidth - (ATE_Styles.Playback.GUI_Width / 4) + 1) + scrollX;
        var y = ATE_Styles.Timeline.OffsetY;
        var xCenter = x + (ATE_Styles.Playback.GUI_Width * 0.5) + 1;
        
        // Draw box
        ctx.beginPath();
        ctx.fillStyle = ATE_Styles.Playback.GUI_BackgroundColor;
        ctx.fillRect(x + ATE_Styles.Playback.GUI_TextTimeOffset.X, y, 
            ATE_Styles.Playback.GUI_Width, ATE_Styles.Playback.GUI_Height);
        ctx.closePath();
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(xCenter, y);
        ctx.lineTo(xCenter, mATE.GetHeight());
        ctx.lineWidth = 1;
        ctx.strokeStyle = ATE_Styles.Playback.GUI_LineColor;
        ctx.stroke();
        ctx.closePath();
        
        // Draw time
        ctx.font = ATE_Styles.Playback.GUI_TextStyle;
        ctx.fillStyle = ATE_Styles.Playback.GUI_TextColor;
        ctx.textAlign = "center";
        ctx.fillText(
            ATE_Util.FormatTime((mCurrentTime + ATE_PlaybackEngine.EPSILON) * 1000, 2, true), 
            xCenter,
            y + ATE_Styles.Playback.GUI_Height + ATE_Styles.Playback.GUI_TextTimeOffset.Y);
            
        if (changedTime) {
            // set the GUI current time 
            mInputCurrentTimeSelector.val(ATE_Util.FormatTimeAsSeconds((mCurrentTime + ATE_PlaybackEngine.EPSILON) * 1000));
        }
    }
}