import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, Settings, Bell, CircleUserRound, ShieldCheck } from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, role, logout } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-[#fffbf0]">
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
        <Text className="text-3xl font-black text-[#1a1a1a] mb-6">Profile</Text>

        {/* Profile Card */}
        <View className="bg-white rounded-3xl p-6 border border-yellow-100 shadow-sm items-center mb-8">
          <View className="w-24 h-24 rounded-full bg-amber-100 mb-4 items-center justify-center overflow-hidden border-4 border-white shadow-sm">
            {user?.photoUrl ? (
              <Image source={{ uri: user.photoUrl }} className="w-full h-full" />
            ) : (
              <CircleUserRound size={48} color="#d97706" />
            )}
          </View>
          <Text className="text-2xl font-bold text-[#1a1a1a]">{user?.name || 'Anonymous'}</Text>
          <Text className="text-gray-500 font-medium">{user?.email || 'No email provided'}</Text>
          
          <View className="mt-4 bg-amber-50 px-4 py-2 rounded-full border border-amber-200 flex-row items-center">
            <ShieldCheck size={16} color="#d97706" />
            <Text className="text-amber-700 font-bold text-xs ml-1.5 uppercase">
              {role === 'practitioner' ? 'Verified Expert' : 'Member'}
            </Text>
          </View>
        </View>

        {/* Settings Links */}
        <View className="bg-white rounded-3xl border border-yellow-100 shadow-sm overflow-hidden mb-8">
          <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-100">
            <View className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center mr-4">
              <Settings size={20} color="#6b7280" />
            </View>
            <Text className="flex-1 font-semibold text-[#1a1a1a] text-base">Account Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-100">
            <View className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center mr-4">
              <Bell size={20} color="#6b7280" />
            </View>
            <Text className="flex-1 font-semibold text-[#1a1a1a] text-base">Notifications</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          onPress={logout}
          className="bg-red-50 py-4 rounded-full border border-red-100 shadow-sm flex-row items-center justify-center"
        >
          <LogOut size={20} color="#dc2626" />
          <Text className="text-red-600 font-bold text-base ml-2">Log Out</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
}
