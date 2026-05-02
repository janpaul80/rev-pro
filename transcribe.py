#!/usr/bin/env python3
"""
Faster-Whisper transcription service for Rev-Pro
Usage: python3 transcribe.py /path/to/audio.mp3
Returns JSON: {"transcript": "...", "segments": [{"start": 0.0, "end": 5.2, "text": "..."}]}
"""

import sys
import json
import os
from pathlib import Path
from faster_whisper import WhisperModel
import argparse

def transcribe_audio(audio_path: str, model_size: str = "small", beam_size: int = 5, language: str = None) -> dict:
    """Transcribe audio file using faster-whisper."""
    if not os.path.exists(audio_path):
        raise FileNotFoundError(f"Audio file not found: {audio_path}")
    
    print(f"Transcribing {audio_path} with model {model_size}...")
    
    # Load model (downloads on first run)
    model = WhisperModel(model_size, device="cpu", compute_type="int8")
    
    segments, info = model.transcribe(
        audio_path,
        beam_size=beam_size,
        language=language,
        vad_filter=True,
        vad_parameters=dict(min_silence_duration_ms=500),
    )
    
    transcript = ""
    segments_list = []
    
    for segment in segments:
        segments_list.append({
            "start": segment.start,
            "end": segment.end,
            "text": segment.text.strip()
        })
        transcript += segment.text.strip() + " "
    
    print(f"Transcription complete. Language: {info.language} (confidence: {info.language_probability:.2f})")
    
    return {
        "transcript": transcript.strip(),
        "segments": segments_list,
        "language": info.language,
        "language_prob": info.language_probability,
        "duration": info.duration
    }

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Faster-Whisper transcription service")
    parser.add_argument("audio_file", help="Path to audio file (mp3/m4a/wav)")
    parser.add_argument("--model", default="small", help="Model size: tiny/small/medium/large")
    parser.add_argument("--language", help="Language code (auto-detect if not specified)")
    parser.add_argument("--beam-size", type=int, default=5, help="Beam size for accuracy")
    
    args = parser.parse_args()
    
    try:
        result = transcribe_audio(args.audio_file, args.model, args.beam_size, args.language)
        print(json.dumps(result, indent=2))
        sys.exit(0)
    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        sys.exit(1)
