change_playback_speed
=====================

動態調整聲音的播放速度及聲音Pitch，使用 html5 canvas + phonegap plugin + Dirac3-Mobile

youtube 影片

[![youtube 影片](http://img.youtube.com/vi/qlXAeLMJFF0/0.jpg)](http://www.youtube.com/watch?v=qlXAeLMJFF0)

說明

    主要是試著套入一套可以動態調整聲音的播放速度及聲音Pitch的元件庫 Dirac3-Mobile
    詳細的元件庫說明請參照 https://github.com/gerasim13/Dirac-3-LE
    
    這次也練習使用 phonegap plugin，雖然使用了 LowLatencyAudio 這一個 plugin
    但其實只有拿來當作 javascript 呼叫 objective-c 函式而已

    plugin 的部分有加了 3個函式
        // 載入歌
        - (void) loadSong:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
        
        // 調整播放速率
        - (void) rate:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
        
        // 調整聲音pitch
        - (void) pitch:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options


    另外也練習了一下 html5 canvas 的 drawImage、translate、rotate 等功能
    繪製一個有旋轉轉盤的打碟機

PS:目前的版本只適用於 iPad
