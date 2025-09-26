import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MapPin, AlertTriangle, Heart, Shield, Clock } from "lucide-react";

export default function EmergencyPage() {
  const emergencyNumbers = [
    { 
      name: "National Emergency Number", 
      number: "112", 
      icon: "🚨",
      description: "All-in-one emergency services",
      color: "bg-red-500 hover:bg-red-600"
    },
    { 
      name: "Ambulance", 
      number: "108", 
      icon: "🚑",
      description: "Medical emergency & ambulance",
      color: "bg-indigo-500 hover:bg-indigo-600"
    },
    { 
      name: "Police", 
      number: "100", 
      icon: "👮",
      description: "Police emergency services",
      color: "bg-purple-500 hover:bg-purple-600"
    },
    { 
      name: "Fire Services", 
      number: "101", 
      icon: "🚒",
      description: "Fire emergency & rescue",
      color: "bg-orange-500 hover:bg-orange-600"
    },
    { 
      name: "Women Helpline", 
      number: "1091", 
      icon: "👩",
      description: "24x7 helpline for women",
      color: "bg-pink-500 hover:bg-pink-600"
    },
    { 
      name: "Child Helpline", 
      number: "1098", 
      icon: "👶",
      description: "Child protection services",
      color: "bg-cyan-500 hover:bg-cyan-600"
    }
  ];

  const firstAidTips = [
    {
      title: "Heart Attack",
      icon: "💓",
      steps: [
        "Call 108 immediately",
        "Help person sit comfortably",
        "Loosen tight clothing",
        "Give aspirin if available",
        "Stay with the person until help arrives"
      ]
    },
    {
      title: "Choking",
      icon: "😰",
      steps: [
        "Encourage coughing",
        "5 back blows between shoulder blades",
        "5 abdominal thrusts (Heimlich)",
        "Alternate until object clears",
        "Call 108 if unsuccessful"
      ]
    },
    {
      title: "Severe Bleeding",
      icon: "🩸",
      steps: [
        "Apply direct pressure to wound",
        "Elevate injured area above heart",
        "Use clean cloth or bandage",
        "Don't remove embedded objects",
        "Call 108 for serious injuries"
      ]
    },
    {
      title: "Poisoning",
      icon: "☠️",
      steps: [
        "Call 108 immediately",
        "Don't induce vomiting",
        "Keep poison container/label",
        "If conscious, give water/milk",
        "Monitor breathing until help arrives"
      ]
    }
  ];

  const callEmergency = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 healing-shadow animate-pulse">
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Emergency Services</h1>
          <p className="text-gray-600">Quick access to emergency numbers and first aid guidance</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Emergency Numbers */}
          <div>
            <Card className="healing-shadow border-0 mb-6 bg-white">
              <CardHeader className="bg-gradient-to-r from-red-400 to-red-500 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Emergency Contact Numbers
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-4">
                  {emergencyNumbers.map((emergency) => (
                    <div key={emergency.number} className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{emergency.icon}</span>
                          <div>
                            <h3 className="font-semibold text-gray-900">{emergency.name}</h3>
                            <p className="text-sm text-gray-600">{emergency.description}</p>
                            <p className="text-2xl font-bold text-gray-800 mt-1">{emergency.number}</p>
                          </div>
                        </div>
                        <Button
                          onClick={() => callEmergency(emergency.number)}
                          className={`${emergency.color} text-white px-6 py-3 rounded-xl healing-shadow`}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="healing-shadow border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Quick Emergency Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Button 
                  onClick={() => callEmergency("108")}
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-4 rounded-xl healing-shadow text-lg"
                >
                  <Heart className="w-6 h-6 mr-3" />
                  Call Ambulance (108)
                </Button>
                
                <Button 
                  onClick={() => window.open('https://maps.google.com/search/hospital+near+me', '_blank')}
                  variant="outline"
                  className="w-full py-4 rounded-xl border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                >
                  <MapPin className="w-5 h-5 mr-3" />
                  Find Nearest Hospital
                </Button>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="text-sm text-yellow-800 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>In serious emergency, call 108 or 112 immediately. These numbers work from any phone.</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* First Aid Guide */}
          <div>
            <Card className="healing-shadow border-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Emergency First Aid Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {firstAidTips.map((tip, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-2xl p-4 healing-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{tip.icon}</span>
                        <h3 className="font-bold text-gray-900">{tip.title}</h3>
                      </div>
                      <ol className="space-y-1">
                        {tip.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="bg-indigo-100 text-indigo-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                              {stepIndex + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-4">
                  <p className="text-sm text-red-800 font-semibold mb-2">⚠️ Important Disclaimer</p>
                  <p className="text-xs text-red-700">
                    These are basic first aid guidelines only. In any emergency, call professional medical services immediately. 
                    Do not attempt procedures you are not trained for.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
