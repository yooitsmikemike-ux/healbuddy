import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Volume2, Bot, User as UserIcon, AlertTriangle, Phone } from "lucide-react";

export default function ChatMessage({ message, isBot = false, severity = "low", onQuickReply, language = "english" }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const speakMessage = async (text) => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(text);
      
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
      
      utterance.lang = languageCodes[language] || 'en-IN';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const getSeverityColor = () => {
    switch (severity) {
      case "emergency": return "border-red-200 bg-red-50";
      case "high": return "border-orange-200 bg-orange-50";
      case "medium": return "border-yellow-200 bg-yellow-50";
      default: return "border-gray-200 bg-white";
    }
  };

  const getSeverityIcon = () => {
    if (severity === "emergency") return <Phone className="w-4 h-4 text-red-500" />;
    if (severity === "high") return <AlertTriangle className="w-4 h-4 text-orange-500" />;
    return null;
  };

  return (
    <div className={`flex gap-3 mb-6 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 healing-shadow">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}
      
      <div className={`max-w-[85%] sm:max-w-[70%] ${isBot ? '' : 'order-first'}`}>
        <Card className={`p-4 border ${isBot ? `bot-bubble ${getSeverityColor()}` : 'chat-bubble bg-indigo-500 text-white border-indigo-500'} healing-shadow transition-all duration-300`}>
          {isBot && severity !== "low" && (
            <div className="flex items-center gap-2 mb-2 text-sm font-medium">
              {getSeverityIcon()}
              <span className={severity === "emergency" ? "text-red-600" : severity === "high" ? "text-orange-600" : "text-yellow-600"}>
                {severity === "emergency" ? "Emergency Alert" : severity === "high" ? "Important" : "Advisory"}
              </span>
            </div>
          )}
          
          <p className={`text-sm leading-relaxed ${isBot ? 'text-gray-700' : 'text-white'}`}>
            {message}
          </p>
          
          {isBot && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => speakMessage(message)}
                disabled={isPlaying}
                className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 transition-colors duration-200"
              >
                <Volume2 className={`w-4 h-4 mr-2 ${isPlaying ? 'animate-pulse' : ''}`} />
                {isPlaying ? 'Playing...' : 'Listen'}
              </Button>
            </div>
          )}
        </Card>
        
        {message.includes("may I ask") && isBot && onQuickReply && (
          <div className="flex gap-2 mt-3 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onQuickReply("Yes")}
              className="bg-white hover:bg-green-50 border-green-200 text-green-700"
            >
              Yes
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onQuickReply("No")}
              className="bg-white hover:bg-red-50 border-red-200 text-red-700"
            >
              No
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onQuickReply("Sometimes")}
              className="bg-white hover:bg-yellow-50 border-yellow-200 text-yellow-700"
            >
              Sometimes
            </Button>
          </div>
        )}
      </div>
      
      {!isBot && (
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 healing-shadow">
          <UserIcon className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
}
