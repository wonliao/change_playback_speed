/*
 *  Utilities.h
 *
 *  Created by Stephan on 21.03.11.
 *  Copyright 2011-2012 The DSP Dimension. All rights reserved.
 *	Version 3.5.4
 *
 */

void checkStatus(int status);
long wrappedDiff(long in1, long in2, long wrap);
void DeallocateAudioBuffer(SInt16 **audio, int numChannels);
void DeallocateAudioBuffer(float **audio, int numChannels);
float **AllocateAudioBuffer(int numChannels, int numFrames);
SInt16 **AllocateAudioBufferSInt16(int numChannels, int numFrames);
void ClearAudioBuffer(float **audio, long numChannels, long numFrames);
void ClearAudioBuffer(SInt16 **audio, long numChannels, long numFrames);

