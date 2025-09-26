import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { MessageCircle, User, Phone, MapPin, Settings, Heart, Shield } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Chat",
    url: createPageUrl("Chat"),
    icon: MessageCircle,
  },
  {
    title: "Profile",
    url: createPageUrl("Profile"),
    icon: User,
  },
  {
    title: "Emergency",
    url: createPageUrl("Emergency"),
    icon: Phone,
  },
  {
    title: "Find Healthcare",
    url: createPageUrl("Healthcare"),
    icon: MapPin,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <style jsx>{`
        :root {
          --healing-primary: #6366f1;
          --healing-secondary: #8b5cf6;
          --healing-accent: #06b6d4;
          --healing-warm: #fefefe;
          --healing-text: #1f2937;
          --healing-light: #f8fafc;
        }
        
        .healing-gradient {
          background: linear-gradient(135deg, #fefefe 0%, #f1f5f9 50%, #e2e8f0 100%);
        }
        
        .healing-shadow {
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
        }
        
        .chat-bubble {
          border-radius: 20px 20px 6px 20px;
        }
        
        .bot-bubble {
          border-radius: 20px 20px 20px 6px;
        }
      `}</style>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar className="border-r border-gray-200 bg-white">
          <SidebarHeader className="border-b border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center healing-shadow">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-gray-800">HealBuddy</h2>
                <p className="text-sm text-gray-500">Health Assistant</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-gray-100 transition-all duration-200 rounded-xl mb-1 ${
                          location.pathname === item.url ? 'bg-indigo-50 text-indigo-700 border-indigo-200 border' : 'text-gray-600'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-8">
              <SidebarGroupLabel className="text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-2">
                Quick Info
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-4 py-2 space-y-3">
                  <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-medium text-red-700">Emergency</span>
                    </div>
                    <p className="text-xs text-red-600">Call 108 for ambulance</p>
                  </div>
                  
                  <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="w-4 h-4 text-indigo-500" />
                      <span className="text-sm font-medium text-indigo-700">Always Available</span>
                    </div>
                    <p className="text-xs text-indigo-600">24/7 health guidance</p>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-100 p-4">
            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-3">
              <p className="text-xs text-yellow-700 font-medium mb-1">⚠️ Medical Disclaimer</p>
              <p className="text-xs text-yellow-600">For awareness only. Always consult doctors.</p>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white border-b border-gray-100 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-semibold text-gray-800">HealBuddy</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto healing-gradient">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
