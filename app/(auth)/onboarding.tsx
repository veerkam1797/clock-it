import {OnboardingSlide} from '@/components/OnboardingSlide';
import {Button} from '@/components/ui/Button';
import {Colors} from '@/constants/colors';
import {Constants} from '@/constants/constants';
import {LinearGradient} from 'expo-linear-gradient';
import {router} from 'expo-router';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, gap: 16}}>
        <LinearGradient
          style={{flex: 1}}
          colors={[Colors.purple[600], Colors.base.white, Colors.base.white]}>
          <FlatList
            contentContainerStyle={{}}
            data={Constants.OnboardingScreens}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <OnboardingSlide {...item} />}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          />
          <View
            style={{
              gap: 16,
              padding: 16,
              justifyContent: 'flex-end',
            }}>
            <Button
              label="Next"
              onPress={() => {}}
              size="lg"
              variant="filled"
              fullWidth
            />
            <Button
              label="Skip"
              onPress={() => {
                router.push('/sign-in');
              }}
              size="lg"
              variant="outlined"
              fullWidth
            />
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
