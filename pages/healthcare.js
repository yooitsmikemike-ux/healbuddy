
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Star, Search, Navigation, Hospital } from "lucide-react";

export default function HealthcarePage() {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchType, setSearchType] = useState("hospital");

  const healthcareFacilities = [
    {
      name: "AIIMS Delhi",
      type: "Government Hospital",
      address: "Ansari Nagar, New Delhi, Delhi 110029",
      phone: "011-26588500",
      rating: 4.5,
      timing: "24/7 Emergency",
      specialties: ["Cardiology", "Neurology", "Oncology", "Emergency"],
      distance: "2.3 km"
    },
    {
      name: "Apollo Hospital",
      type: "Private Hospital",
      address: "Press Enclave Road, Sarita Vihar, Delhi 110076",
      phone: "011-26925858",
      rating: 4.3,
      timing: "24/7",
      specialties: ["Multi-specialty", "Emergency", "ICU"],
      distance: "3.7 km"
    },
    {
      name: "Safdarjung Hospital",
      type: "Government Hospital", 
      address: "Ansari Nagar West, New Delhi, Delhi 110029",
      phone: "011-26165060",
      rating: 4.0,
      timing: "24/7 Emergency",
      specialties: ["General Medicine", "Surgery", "Emergency"],
      distance: "4.1 km"
    },
    {
      name: "Max Super Speciality Hospital",
      type: "Private Hospital",
      address: "1, Press Enclave Road, Sarita Vihar, Delhi 110076",
      phone: "011-26515050",
      rating: 4.4,
      timing: "24/7",
      specialties: ["Cardiac Surgery", "Neurosurgery", "Emergency"],
      distance: "5.2 km"
    },
    {
      name: "Primary Health Center",
      type: "Government Clinic",
      address: "Block A, Sarita Vihar, Delhi 110076",
      phone: "011-26923456",
      rating: 3.8,
      timing: "8:00 AM - 8:00 PM",
      specialties: ["General Medicine", "Vaccination", "Maternal Care"],
      distance: "1.5 km"
    },
    {
      name: "Community Health Centre",
      type: "Government Clinic",
      address: "Sector 19, Dwarka, Delhi 110075",
      phone: "011-28085000",
      rating: 3.9,
      timing: "9:00 AM - 5:00 PM",
      specialties: ["General Medicine", "Pediatrics", "Women Health"],
      distance: "6.8 km"
    }
  ];

  const searchHealthcare = () => {
    // Open Google Maps search
    const query = `${searchType} near ${searchLocation || 'current location'}`;
    window.open(`https://maps.google.com/search/${encodeURIComponent(query)}`, '_blank');
  };

  const callFacility = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  const getDirections = (address) => {
    window.open(`https://maps.google.com/search/${encodeURIComponent(address)}`, '_blank');
  };

  const getTypeColor = (type) => {
    switch(type.toLowerCase()) {
      case 'government hospital': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'private hospital': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'government clinic': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 healing-shadow">
            <Hospital className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Healthcare</h1>
          <p className="text-gray-600">Locate nearby hospitals, clinics and healthcare facilities</p>
        </div>

        {/* Search Section */}
        <Card className="healing-shadow border-0 mb-8 bg-white">
          <CardHeader className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white rounded-t-2xl">
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search Healthcare Facilities
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="Enter your location (area, city, pincode)"
                  className="rounded-xl border-gray-200 focus:border-indigo-400"
                />
              </div>
              <div className="flex gap-2">
                <select 
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-gray-200 focus:border-indigo-400 outline-none"
                >
                  <option value="hospital">Hospital</option>
                  <option value="clinic">Clinic</option>
                  <option value="pharmacy">Pharmacy</option>
                  <option value="diagnostic center">Diagnostic Center</option>
                </select>
                <Button 
                  onClick={searchHealthcare}
                  className="bg-indigo-500 hover:bg-indigo-600 px-6 rounded-xl healing-shadow"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nearby Facilities */}
        <Card className="healing-shadow border-0">
          <CardHeader className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-t-2xl">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Nearby Healthcare Facilities
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-6">
              {healthcareFacilities.map((facility, index) => (
                <Card key={index} className="border-2 border-gray-100 hover:border-indigo-300 transition-all duration-300 healing-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{facility.name}</h3>
                            <Badge className={`${getTypeColor(facility.type)} border font-medium`}>
                              {facility.type}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-yellow-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="font-semibold">{facility.rating}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 mt-0.5 text-gray-400" />
                            <span>{facility.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span>{facility.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{facility.timing}</span>
                          </div>
                        </div>

                        <div className="mt-3">
                          <p className="text-sm text-gray-500 mb-2">Specialties:</p>
                          <div className="flex flex-wrap gap-2">
                            {facility.specialties.map((specialty, idx) => (
                              <Badge key={idx} variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="mt-3 text-sm font-medium text-green-600">
                          📍 {facility.distance} away
                        </div>
                      </div>

                      <div className="flex flex-row lg:flex-col gap-3">
                        <Button
                          onClick={() => callFacility(facility.phone)}
                          className="bg-indigo-500 hover:bg-indigo-600 flex-1 lg:flex-none rounded-xl"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </Button>
                        <Button
                          onClick={() => getDirections(facility.address)}
                          variant="outline"
                          className="flex-1 lg:flex-none border-indigo-300 text-indigo-700 hover:bg-indigo-50 rounded-xl"
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          Directions
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-xl p-4">
              <p className="text-sm text-indigo-800 flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Location Services:</strong> Enable location in your browser for more accurate results. 
                  You can also search for facilities in any specific area using the search box above.
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
