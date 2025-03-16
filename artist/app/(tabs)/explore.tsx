import { StyleSheet, Image, ScrollView } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const artworks = [
  { title: 'Картина 1', source: require('@/assets/images/artwork1.jpg') },
  { title: 'Картина 2', source: require('@/assets/images/artwork2.jpg') },
  { title: 'Картина 3', source: require('@/assets/images/artwork3.jpg') },
];

export default function GalleryScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<ThemedText style={styles.headerText}>Галерея</ThemedText>}>
      <ScrollView contentContainerStyle={styles.galleryContainer}>
        {artworks.map((art, index) => (
          <ThemedView key={index} style={styles.artworkContainer}>
            <Image source={art.source} style={styles.artworkImage} />
            <ThemedText type="subtitle">{art.title}</ThemedText>
          </ThemedView>
        ))}
      </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
  },
  galleryContainer: {
    alignItems: 'center',
    padding: 10,
  },
  artworkContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  artworkImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
});
