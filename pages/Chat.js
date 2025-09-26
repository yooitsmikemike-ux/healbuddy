import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Heart, AlertTriangle } from "lucide-react";
import { InvokeLLM } from "@/integrations/Core";
import { ChatSession } from "@/entities/ChatSession";
import { HealthContent } from "@/entities/HealthContent";
import { User } from "@/entities/User";

import ChatMessage from "../components/chat/ChatMessage";
import LanguageSelector from "../components/chat/LanguageSelector";
import VoiceInput from "../components/chat/VoiceInput";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [language, setLanguage] = useState("english");
  const [currentSession, setCurrentSession] = useState(null);
  const [awaitingFollowUp, setAwaitingFollowUp] = useState(false);
  const [followUpCount, setFollowUpCount] = useState(0);
  const chatEndRef = useRef(null);

  useEffect(() => {
    loadUserProfile();
    initializeChat();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadUserProfile = async () => {
    try {
      const user = await User.me();
      setCurrentUser(user);
      if (user.preferred_language) {
        setLanguage(user.preferred_language);
      }
    } catch (error) {
      console.log("User not logged in");
    }
  };

  const initializeChat = () => {
    const welcomeMessage = `Hi! I'm HealBuddy, your health helper. I can help you with:

• Check your symptoms
• Give health tips  
• Emergency help
• Find doctors

⚠️ **Important**: I give health info only. See a real doctor for treatment.

What health question do you have?`;

    setMessages([
      {
        id: 1,
        text: welcomeMessage,
        isBot: true,
        timestamp: new Date(),
        severity: "low"
      }
    ]);
  };

  const generateHealthResponse = async (userMessage, followUpData = null) => {
    try {
      let prompt = `You are HealBuddy, a professional AI health assistant for Indian users. You provide accurate, evidence-based health information.

USER QUERY: "${userMessage}"
USER LANGUAGE: ${language}
${currentUser ? `USER INFO: Age ${currentUser.age}, Gender ${currentUser.gender}` : ''}
${currentUser?.medical_conditions?.length ? `MEDICAL CONDITIONS: ${currentUser.medical_conditions.join(', ')}` : ''}
${followUpData ? `PREVIOUS CONVERSATION: ${JSON.stringify(followUpData)}` : ''}

INSTRUCTIONS:
1. Give accurate, medically sound advice in simple English (max 60 words)
2. Use current medical knowledge and best practices
3. For serious symptoms, clearly recommend seeing a doctor immediately
4. For emergencies, strongly advise calling 108 (Indian ambulance)
5. Ask ONE relevant follow-up question if needed to assess better
6. Be empathetic but professional
7. Include preventive tips when appropriate
8. Consider Indian healthcare context and common conditions

SAFETY RULES:
- Never diagnose specific diseases
- Always recommend professional medical consultation for concerning symptoms
- Be conservative with severity assessment
- Emphasize emergency care when needed

RESPONSE FORMAT (JSON):
{
  "response": "Your helpful, accurate health advice in simple words",
  "severity": "low/medium/high/emergency",
  "follow_up_question": "One relevant question to help assess better" or null,
  "see_doctor": true/false,
  "emergency_action": "Specific emergency instruction" or null
}`;

      // Use add_context_from_internet for medical accuracy
      const result = await InvokeLLM({
        prompt,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            response: { type: "string" },
            severity: { type: "string", enum: ["low", "medium", "high", "emergency"] },
            follow_up_question: { 
              type: "string",
              nullable: true 
            },
            see_doctor: { type: "boolean" },
            emergency_action: {
              type: "string",
              nullable: true
            }
          },
          required: ["response", "severity", "see_doctor"]
        }
      });

      return result;
    } catch (error) {
      console.error("Error generating response:", error);
      
      // Fallback response with conservative advice
      return {
        response: "I'm having technical issues. For any health concerns, please consult a doctor or call 108 for emergencies.",
        severity: "medium",
        follow_up_question: null,
        see_doctor: true,
        emergency_action: null
      };
    }
  };

  const handleSendMessage = async (messageText = null) => {
    const text = messageText || inputMessage.trim();
    if (!text) return;

    const userMessage = {
      id: messages.length + 1,
      text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      let followUpData = null;
      if (currentSession && awaitingFollowUp) {
        followUpData = currentSession.follow_up_questions || [];
        followUpData.push({ question: "User response", answer: text });
      }

      const aiResponse = await generateHealthResponse(text, followUpData);
      
      let botResponseText = aiResponse.response;
      
      // Add emergency action if present
      if (aiResponse.emergency_action) {
        botResponseText += `\n\n🚨 EMERGENCY ACTION: ${aiResponse.emergency_action}`;
      }
      
      // Add doctor recommendation if needed
      if (aiResponse.see_doctor && aiResponse.severity !== "emergency") {
        botResponseText += "\n\n👨‍⚕️ Please consult a doctor for proper diagnosis and treatment.";
      }

      const botMessage = {
        id: messages.length + 2,
        text: botResponseText,
        isBot: true,
        timestamp: new Date(),
        severity: aiResponse.severity || "low"
      };

      setMessages(prev => [...prev, botMessage]);

      // Handle follow-up question (only one per conversation)
      if (aiResponse.follow_up_question && !awaitingFollowUp && followUpCount < 1) {
        setAwaitingFollowUp(true);
        setFollowUpCount(1);
        
        setTimeout(() => {
          const followUpMessage = {
            id: messages.length + 3,
            text: `To help you better, may I ask: ${aiResponse.follow_up_question}`,
            isBot: true,
            timestamp: new Date(),
            severity: "low"
          };
          setMessages(prev => [...prev, followUpMessage]);
        }, 1500);
      } else {
        setAwaitingFollowUp(false);
        setFollowUpCount(0);
      }

      // Save chat session
      const sessionData = {
        user_message: text,
        bot_response: aiResponse.response,
        language,
        severity_assessment: aiResponse.severity,
        session_type: "symptom_check",
        follow_up_questions: followUpData || []
      };

      const session = await ChatSession.create(sessionData);
      setCurrentSession(session);

    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = {
        id: messages.length + 2,
        text: "I'm having trouble connecting. Please try again or call 108 if this is an emergency.",
        isBot: true,
        timestamp: new Date(),
        severity: "medium"
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleQuickReply = (reply) => {
    handleSendMessage(reply);
  };

  const handleVoiceResult = (transcript) => {
    setInputMessage(transcript);
  };

  const handleLanguageChange = async (newLanguage) => {
    setLanguage(newLanguage);
    // Update user profile
    try {
      await User.updateMyUserData({ preferred_language: newLanguage });
    } catch (error) {
      console.log("Could not save language preference");
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-5xl mx-auto p-4">
      <Card className="flex flex-col h-full bg-white healing-shadow border-0 overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center healing-shadow">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">HealBuddy Chat</h1>
                <p className="text-gray-500 text-sm">AI Health Assistant • Medical Grade Responses</p>
              </div>
            </div>
            
            <LanguageSelector 
              currentLanguage={language} 
              onLanguageChange={handleLanguageChange}
            />
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isBot={message.isBot}
              severity={message.severity}
              onQuickReply={handleQuickReply}
              language={language}
            />
          ))}
          
          {isLoading && (
            <div className="flex justify-start gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-white animate-pulse" />
              </div>
              <Card className="bot-bubble bg-white border border-gray-200 p-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <span className="text-sm text-gray-600 ml-2">Getting medical insights...</span>
                </div>
              </Card>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-gray-100">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-blue-700">
              <p className="font-medium">Medical Disclaimer:</p>
              <p>This AI provides health information only. For emergencies, call 108. Always consult doctors for diagnosis and treatment.</p>
            </div>
          </div>
          
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-3">
            <div className="flex-1 relative">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Describe your symptoms or ask any health question..."
                disabled={isLoading}
                className="pr-14 py-3 h-12 rounded-xl border-gray-200 focus:border-indigo-400 text-base"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <VoiceInput 
                  onVoiceResult={handleVoiceResult} 
                  language={language}
                />
              </div>
            </div>
            <Button 
              type="submit" 
              disabled={isLoading || !inputMessage.trim()}
              className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 h-12 rounded-xl healing-shadow"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
