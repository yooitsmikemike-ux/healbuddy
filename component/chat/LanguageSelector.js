import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Languages } from "lucide-react";

const languages = [
  { code: "english", name: "English", native: "English" },
  { code: "hindi", name: "Hindi", native: "हिंदी" },
  { code: "tamil", name: "Tamil", native: "தமிழ்" },
  { code: "telugu", name: "Telugu", native: "తెలుగు" },
  { code: "bengali", name: "Bengali", native: "বাংলা" },
  { code: "marathi", name: "Marathi", native: "मराठी" },
  { code: "gujarati", name: "Gujarati", native: "ગુજરાતી" },
  { code: "kannada", name: "Kannada", native: "ಕನ್ನಡ" },
  { code: "malayalam", name: "Malayalam", native: "മലയാളം" },
  { code: "punjabi", name: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "odia", name: "Odia", native: "ଓଡ଼ିଆ" },
  { code: "assamese", name: "Assamese", native: "অসমীয়া" }
];

export default function LanguageSelector({ currentLanguage, onLanguageChange }) {
  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];
  
  return (
    <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 px-3 py-2 healing-shadow">
      <Languages className="w-4 h-4 text-indigo-500" />
      <Select value={currentLanguage} onValueChange={onLanguageChange}>
        <SelectTrigger className="border-0 focus:ring-0 bg-transparent p-0 h-auto">
          <SelectValue>
            <span className="text-sm font-medium text-gray-700">{currentLang.native}</span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              <div className="flex flex-col">
                <span className="font-medium">{lang.native}</span>
                <span className="text-xs text-gray-500">{lang.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
