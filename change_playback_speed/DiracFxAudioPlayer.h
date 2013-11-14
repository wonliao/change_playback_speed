//
//  DiracAudioPlayer.h
//  DiracAudioPlayer
//
//  Created by Stephan M. Bernsee on 12-03-2012.
//  Copyright 2011-2012 The DSP Dimension. All rights reserved.
//
//	DiracAudioPlayer distro version 1.0.1 - 06.06.2012
//

#import <Foundation/Foundation.h>
#import <AudioToolbox/AudioToolbox.h>

#import "EAFRead.h"
#import "DiracAudioPlayerBase.h"


@interface DiracFxAudioPlayer : DiracAudioPlayerBase
{
}

-(void)processAudioThread:(id)param;

@end


