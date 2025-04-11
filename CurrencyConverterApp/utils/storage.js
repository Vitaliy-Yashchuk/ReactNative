import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = 'conversionHistory';

export const saveHistory = async (entry) => {
  const history = await getHistory();
  history.unshift(entry);
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
};

export const getHistory = async () => {
  const json = await AsyncStorage.getItem(HISTORY_KEY);
  return json ? JSON.parse(json) : [];
};
