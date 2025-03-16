import { Image, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#E0B0FF', dark: '#5D3FD3' }}
      headerImage={
        <Image source={require('@/assets/images/artist-photo.jpg')} style={styles.artistPhoto} />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Вінсент Віллем ван Гог</ThemedText>
      </ThemedView>
      <ThemedView style={styles.bioContainer}>
        <ThemedText type="subtitle">30 березня 1853 — 29 липня 1890) — нідерландський художник-постімпресіоніст, який є однією з найвідоміших і найвпливовіших постатей в історії західного мистецтва.</ThemedText>
        <ThemedText>
        Вінсент Віллем ван Гог народився 30 березня 1853 року в селі Гроот-Зундерт у провінції Північний Брабант на півдні Нідерландів. Його батьками були Теодор ван Гог, пастор Нідерландської реформаторської церкви, та Анна Корнелія Карбентус, дочка палітурника. Новонародженого назвали на честь дідуся Вінсента ван Гога (1789—1874, якому присуджено ступінь з теології у Лейденському університеті у 1811 році) та народженого роком раніше старшого брата, який помер у свій перший день життя.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bioContainer: {
    gap: 8,
    marginBottom: 8,
  },
  artistPhoto: {
    height: 200,
    width: 200,
    borderRadius: 100,
    alignSelf: 'center',
  },
});
