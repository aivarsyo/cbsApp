import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      // saving error
      alert(e)
    }
  }

 export const removeData = async (key) => {
    await AsyncStorage.removeItem(key);
}