import {View, Text} from 'react-native';
import {useLocalSearchParams} from 'expo-router';

export default function TaskDetail() {
  const {id} = useLocalSearchParams();
  return (
    <View style={{flex: 1}}>
      <Text>Task {id}</Text>
    </View>
  );
}
