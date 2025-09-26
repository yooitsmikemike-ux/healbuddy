import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square } from "lucide-react";

export default function VoiceInput({ onVoiceResult, language = "english" }) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef(null);

  React.useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    const recognition = recognitionRef.current;
    recognition.continuous = false;
    recognition.interimResults = false;

    const languageCodes = {
      english: 'en-IN',
      hindi: 'hi-IN',
      tamil: 'ta-IN',
      telugu: 'te-IN',
      bengali: 'bn-IN',
      marathi: 'mr-IN',
      gujarati: 'gu-IN',
      kannada: 'kn-IN',
      malayalam: 'ml-IN',
      punjabi: 'pa-IN'
    };
    
    recognition.lang = languageCodes[language] || 'en-IN';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onVoiceResult(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [language, onVoiceResult]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <Button
      type="button"
      variant={isListening ? "destructive" : "ghost"}
      size="icon"
      onClick={toggleListening}
      className={`${isListening ? 'animate-pulse bg-red-500 hover:bg-red-600 text-white' : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'} transition-all duration-200`}
    >
      {isListening ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
    </Button>
  );
}
