import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { practitionersApi, PractitionerProfile } from '../../lib/api';
import { useAuth } from '../../hooks/useAuth';

export default function TabOneScreen() {
  const { user, role, isLoading: isAuthLoading } = useAuth();
  const [practitioners, setPractitioners] = useState<PractitionerProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role === 'user') {
      fetchPractitioners();
    } else {
      setLoading(false);
    }
  }, [role]);

  const fetchPractitioners = async () => {
    try {
      const res = await practitionersApi.list();
      if (res.success && res.data) {
        setPractitioners(res.data.practitioners);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderPractitioner = ({ item }: { item: PractitionerProfile }) => (
    <TouchableOpacity className="bg-white p-4 rounded-2xl mb-4 shadow-sm border border-yellow-100 flex-row items-center">
      <View className="w-16 h-16 rounded-full bg-amber-100 mr-4 overflow-hidden">
        {item.photoUrl ? (
          <Image source={{ uri: item.photoUrl }} className="w-full h-full" />
        ) : (
          <View className="w-full h-full items-center justify-center bg-amber-200">
            <Text className="text-amber-800 text-lg font-bold">{item.name.charAt(0)}</Text>
          </View>
        )}
      </View>
      <View className="flex-1">
        <Text className="text-[#1a1a1a] font-bold text-lg">{item.name}</Text>
        <Text className="text-gray-500 text-sm">{item.specialties?.slice(0, 2).join(', ') || 'Wellness Expert'}</Text>
        <Text className="text-amber-600 font-semibold mt-1">₹{item.perMinuteRate}/min</Text>
      </View>
    </TouchableOpacity>
  );

  if (isAuthLoading || loading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#fffbf0]">
        <ActivityIndicator size="large" color="#f59e0b" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#fffbf0]">
      <View className="px-6 pt-6 pb-2">
        <Text className="text-3xl font-black text-[#1a1a1a]">
          Hello, {user?.name?.split(' ')[0] || 'Friend'} 👋
        </Text>
        <Text className="text-gray-500 font-medium mt-1">
          {role === 'user' ? 'Find your perfect expert today.' : 'Welcome to your expert dashboard.'}
        </Text>
      </View>

      {role === 'user' ? (
        <FlatList
          data={practitioners}
          keyExtractor={(item) => item.id}
          renderItem={renderPractitioner}
          contentContainerStyle={{ padding: 24 }}
          ListEmptyComponent={
            <Text className="text-center text-gray-400 mt-10">No experts found at the moment.</Text>
          }
        />
      ) : (
        <View className="flex-1 items-center justify-center p-6">
          <View className="bg-white p-6 rounded-3xl border border-yellow-100 w-full shadow-sm items-center">
            <Text className="text-xl font-bold text-[#1a1a1a] mb-2">Expert Dashboard</Text>
            <Text className="text-center text-gray-500">Your upcoming sessions and requests will appear here soon.</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
