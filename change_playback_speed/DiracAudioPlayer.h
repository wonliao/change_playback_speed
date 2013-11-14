//
//  DiracAudioPlayer.h
//  DiracAudioPlayer
//
//  Created by Stephan M. Bernsee on 12-03-2012.
//  Copyright 2011-2012 The DSP Dimension. All rights reserved.
//
//	DiracAudioPlayer distro version 1.0.1 - 06.06.2012
//

#import "DiracAudioPlayerBase.h"
#import "EAFRead.h"



@interface DiracAudioPlayer : DiracAudioPlayerBase 
{

}

-(void)changeDuration:(float)duration;
-(void)changePitch:(float)pitch;
-(void)processAudioThread:(id)param;

@end

