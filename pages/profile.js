
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { User as UserIcon, Heart, Save, Plus, X } from "lucide-react";
import { User } from "@/entities/User";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    age: "",
    gender: "",
    preferred_language: "english",
    location_state: "",
    medical_conditions: [],
    emergency_contact: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [newCondition, setNewCondition] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const user = await User.me();
      setProfile({
        age: user.age || "",
        gender: user.gender || "",
        preferred_language: user.preferred_language || "english",
        location_state: user.location_state || "",
        medical_conditions: user.medical_conditions || [],
        emergency_contact: user.emergency_contact || ""
      });
    } catch (error) {
      console.log("User not found");
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await User.updateMyUserData({
        ...profile,
        age: profile.age ? parseInt(profile.age) : null
      });
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Error updating profile. Please try again.");
    }
    setIsLoading(false);
  };

  const addMedicalCondition = () => {
    if (newCondition.trim() && !profile.medical_conditions.includes(newCondition.trim())) {
      setProfile(prev => ({
        ...prev,
        medical_conditions: [...prev.medical_conditions, newCondition.trim()]
      }));
      setNewCondition("");
    }
  };

  const removeMedicalCondition = (condition) => {
    setProfile(prev => ({
      ...prev,
      medical_conditions: prev.medical_conditions.filter(c => c !== condition)
    }));
  };

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli",
    "Daman and Diu", "Delhi", "Lakshadweep", "Puducherry"
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 healing-shadow">
            <UserIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Health Profile</h1>
          <p className="text-gray-600">Help us provide personalized health tips</p>
        </div>

        <Card className="healing-shadow border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white rounded-t-2xl">
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={profile.age}
                  onChange={(e) => setProfile(prev => ({...prev, age: e.target.value}))}
                  placeholder="Enter your age"
                  className="rounded-xl border-gray-200 focus:border-indigo-400"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select 
                  value={profile.gender} 
                  onValueChange={(value) => setProfile(prev => ({...prev, gender: value}))}
                >
                  <SelectTrigger className="rounded-xl border-gray-200 focus:border-indigo-400">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="language">Preferred Language</Label>
                <Select 
                  value={profile.preferred_language} 
                  onValueChange={(value) => setProfile(prev => ({...prev, preferred_language: value}))}
                >
                  <SelectTrigger className="rounded-xl border-gray-200 focus:border-indigo-400">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                    <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
                    <SelectItem value="telugu">తెలుగు (Telugu)</SelectItem>
                    <SelectItem value="bengali">বাংলা (Bengali)</SelectItem>
                    <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
                    <SelectItem value="gujarati">ગુજરાતી (Gujarati)</SelectItem>
                    <SelectItem value="kannada">ಕನ್ನಡ (Kannada)</SelectItem>
                    <SelectItem value="malayalam">മലയാളം (Malayalam)</SelectItem>
                    <SelectItem value="punjabi">ਪੰਜਾਬੀ (Punjabi)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State/UT</Label>
                <Select 
                  value={profile.location_state} 
                  onValueChange={(value) => setProfile(prev => ({...prev, location_state: value}))}
                >
                  <SelectTrigger className="rounded-xl border-gray-200 focus:border-indigo-400">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergency">Emergency Contact Number</Label>
              <Input
                id="emergency"
                type="tel"
                value={profile.emergency_contact}
                onChange={(e) => setProfile(prev => ({...prev, emergency_contact: e.target.value}))}
                placeholder="Enter emergency contact number"
                className="rounded-xl border-gray-200 focus:border-indigo-400"
              />
            </div>

            <div className="space-y-4">
              <Label>Medical Conditions (Optional)</Label>
              <div className="flex gap-2">
                <Input
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                  placeholder="Add medical condition"
                  className="rounded-xl border-gray-200 focus:border-indigo-400"
                  onKeyPress={(e) => e.key === 'Enter' && addMedicalCondition()}
                />
                <Button 
                  type="button" 
                  onClick={addMedicalCondition}
                  className="bg-indigo-500 hover:bg-indigo-600 rounded-xl px-4"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {profile.medical_conditions.map((condition, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="bg-indigo-50 border-indigo-200 text-indigo-700 px-3 py-1 rounded-full"
                  >
                    {condition}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMedicalCondition(condition)}
                      className="ml-2 p-0 h-4 w-4"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-700">
                💡 <strong>Privacy Note:</strong> Your information helps us give better health advice and is kept completely private.
              </p>
            </div>

            <Button 
              onClick={handleSave} 
              disabled={isLoading}
              className="w-full bg-indigo-500 hover:bg-indigo-600 py-3 rounded-xl healing-shadow text-lg"
            >
              <Save className="w-5 h-5 mr-2" />
              {isLoading ? 'Saving...' : 'Save Profile'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
