import React from "react";
import { Button } from "@/components/ui/button";
import { Phone, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function EmergencyButton() {
  const callEmergency = () => {
    window.open('tel:108', '_self');
  };

  const emergencyContacts = [
    { name: "Ambulance", number: "108", icon: "🚑" },
    { name: "Police", number: "100", icon: "👮" },
    { name: "Fire", number: "101", icon: "🚒" },
    { name: "Women Helpline", number: "1091", icon: "👩" },
    { name: "Child Helpline", number: "1098", icon: "👶" }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl healing-shadow animate-pulse"
          size="lg"
        >
          <AlertTriangle className="w-5 h-5 mr-2" />
          Emergency
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-700 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Emergency Services
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <p className="text-sm text-gray-600 mb-4">
            Tap any number below to call immediately:
          </p>
          {emergencyContacts.map((contact) => (
            <Button
              key={contact.number}
              variant="outline"
              className="w-full justify-start h-auto p-4 hover:bg-red-50 border-red-200"
              onClick={() => window.open(`tel:${contact.number}`, '_self')}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{contact.icon}</span>
                <div className="text-left">
                  <div className="font-semibold text-red-700">{contact.name}</div>
                  <div className="text-sm text-gray-600">{contact.number}</div>
                </div>
              </div>
              <Phone className="w-4 h-4 ml-auto text-red-600" />
            </Button>
          ))}
          
          <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800 font-medium">
              ⚠️ Only call in genuine emergencies. For general health queries, use the chat feature.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
