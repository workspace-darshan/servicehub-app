import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Image, Dimensions, Modal, Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const MOCK_REVIEWS = [
  {
    id: '1',
    name: 'Laurellee Quintana',
    rating: 4.5,
    date: '3 weeks ago',
    comment: 'Absolutely! This is what I was looking for. I recommend to everyone!',
    likes: 25,
    avatar: 'LQ',
  },
  {
    id: '2',
    name: 'Clinton McClure',
    rating: 4.3,
    date: '1 week ago',
    comment: 'I am very satisfied with the results. The results are very satisfying! I like it very much! 🔥🔥🔥',
    likes: 10,
    avatar: 'CM',
  },
  {
    id: '3',
    name: 'Chelsi Chubb',
    rating: 5,
    date: '1 week ago',
    comment: 'Thank you. The quality is excellent and the results were amazing! 😍😍',
    likes: 8,
    avatar: 'CC',
  },
];

const MOCK_GALLERY = [
  { id: '1', uri: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800' },
  { id: '2', uri: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800' },
  { id: '3', uri: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800' },
  { id: '4', uri: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800' },
  { id: '5', uri: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800' },
  { id: '6', uri: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800' },
];

const RATING_FILTERS = [
  { label: 'All', value: 'all' },
  { label: '5 ★', value: '5' },
  { label: '4 ★', value: '4' },
  { label: '3 ★', value: '3' },
];

const StarRow = ({ rating }: { rating: number }) => (
  <View style={{ flexDirection: 'row', gap: 2 }}>
    {[1, 2, 3, 4, 5].map(s => (
      <Ionicons
        key={s}
        name={
          s <= Math.floor(rating)
            ? 'star'
            : s - rating < 1 && s - rating > 0
            ? 'star-half'
            : 'star-outline'
        }
        size={11}
        color="#FBBF24"
      />
    ))}
  </View>
);

export const ProviderProfileScreen = ({ navigation, route }: any) => {
  const provider = route?.params?.provider || {
    name: 'Jenny Wilson',
    service: 'House Cleaning',
    city: '255 Grand Park Avenue, New York',
    rating: 4.8,
    reviews: 4479,
    experience: 20,
    verified: true,
    bio: 'Professional home cleaning specialist with 20 years of experience. Trusted by hundreds of families across the city for reliable, thorough, and affordable cleaning services.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
  };

  const [selectedRatingFilter, setSelectedRatingFilter] = useState('all');
  const [lightboxUri, setLightboxUri] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Hero Image */}
      <View style={styles.heroContainer}>
        <Image source={{ uri: provider.image }} style={styles.heroImage} resizeMode="cover" />
        {/* Gradient overlay for readability */}
        <View style={styles.heroOverlay} />
        <View style={[styles.headerOverlay, { paddingTop: 10 + insets.top }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerBtn}>
              <Ionicons name="share-outline" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerBtn} onPress={() => setSaved(v => !v)}>
              <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={20} color={saved ? '#FF6B00' : '#fff'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Provider Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoTop}>
            <Image source={{ uri: 'https://i.pravatar.cc/100?img=5' }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <View style={styles.nameRow}>
                <Text style={styles.providerName}>{provider.name}</Text>
                {provider.verified && (
                  <View style={styles.verifiedBadge}>
                    <Ionicons name="shield-checkmark" size={11} color="#FF6B00" />
                    <Text style={styles.verifiedText}>Verified</Text>
                  </View>
                )}
              </View>
              <Text style={styles.serviceLabel}>{provider.service}</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={13} color="#FBBF24" />
                <Text style={styles.ratingVal}>{provider.rating}</Text>
                <Text style={styles.ratingCount}>({provider.reviews} reviews)</Text>
              </View>
            </View>
          </View>

          {/* Meta chips */}
          <View style={styles.metaRow}>
            <View style={styles.metaChip}>
              <Ionicons name="location-outline" size={13} color="#FF6B00" />
              <Text style={styles.metaText}>{provider.city}</Text>
            </View>
            <View style={styles.metaChip}>
              <Ionicons name="briefcase-outline" size={13} color="#FF6B00" />
              <Text style={styles.metaText}>{provider.experience} yrs exp</Text>
            </View>
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.card}>
            <Text style={styles.aboutText}>{provider.bio}</Text>
          </View>
        </View>

        {/* Photos & Videos */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Photos & Videos</Text>
            <Text style={styles.countBadge}>{MOCK_GALLERY.length} photos</Text>
          </View>
          <View style={styles.galleryGrid}>
            {MOCK_GALLERY.map((img, index) => (
              <TouchableOpacity
                key={img.id}
                style={styles.thumbWrap}
                onPress={() => setLightboxUri(img.uri)}
                activeOpacity={0.8}>
                <Image source={{ uri: img.uri }} style={styles.thumb} resizeMode="cover" />
                {/* Show +N overlay on last visible if more exist */}
                {index === 5 && MOCK_GALLERY.length > 6 && (
                  <View style={styles.moreOverlay}>
                    <Text style={styles.moreText}>+{MOCK_GALLERY.length - 6}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Reviews */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Ionicons name="star" size={16} color="#FBBF24" />
              <Text style={styles.sectionTitle}>{provider.rating} · {provider.reviews} Reviews</Text>
            </View>
          </View>

          {/* Rating filter chips */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}>
            {RATING_FILTERS.map(f => (
              <TouchableOpacity
                key={f.value}
                style={[styles.filterChip, selectedRatingFilter === f.value && styles.filterChipActive]}
                onPress={() => setSelectedRatingFilter(f.value)}>
                <Text style={[styles.filterText, selectedRatingFilter === f.value && styles.filterTextActive]}>
                  {f.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Review cards */}
          <View style={styles.reviewsWrap}>
            {MOCK_REVIEWS.map((review, i) => (
              <View key={review.id} style={[styles.reviewCard, i === MOCK_REVIEWS.length - 1 && { borderBottomWidth: 0 }]}>
                <View style={styles.reviewTop}>
                  <View style={styles.reviewAvatar}>
                    <Text style={styles.reviewAvatarText}>{review.avatar}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.reviewName}>{review.name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 }}>
                      <StarRow rating={review.rating} />
                      <Text style={styles.reviewDate}>{review.date}</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
                <TouchableOpacity style={styles.likeBtn}>
                  <Ionicons name="heart-outline" size={13} color="#888" />
                  <Text style={styles.likeText}>Helpful ({review.likes})</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 10 }]}>
        <TouchableOpacity style={styles.messageBtn}>
          <Ionicons name="chatbubble-outline" size={18} color="#FF6B00" />
          <Text style={styles.messageBtnText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() => navigation.navigate('SendEnquiry', { provider })}
          activeOpacity={0.85}>
          <Text style={styles.bookBtnText}>Book Now</Text>
          <Ionicons name="arrow-forward" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Lightbox Modal */}
      <Modal
        visible={!!lightboxUri}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setLightboxUri(null)}>
        <Pressable style={styles.lightboxBg} onPress={() => setLightboxUri(null)}>
          <View style={styles.lightboxContent}>
            {/* Close button */}
            <TouchableOpacity
              style={[styles.lightboxClose, { top: insets.top + 12 }]}
              onPress={() => setLightboxUri(null)}>
              <Ionicons name="close" size={22} color="#fff" />
            </TouchableOpacity>

            {lightboxUri && (
              <Image
                source={{ uri: lightboxUri }}
                style={styles.lightboxImage}
                resizeMode="contain"
              />
            )}

            {/* Thumbnail strip */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.lightboxStrip}
              style={styles.lightboxStripWrap}>
              {MOCK_GALLERY.map(img => (
                <TouchableOpacity
                  key={img.id}
                  onPress={() => setLightboxUri(img.uri)}
                  activeOpacity={0.8}>
                  <Image
                    source={{ uri: img.uri }}
                    style={[
                      styles.stripThumb,
                      lightboxUri === img.uri && styles.stripThumbActive,
                    ]}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F4F0' },
  scrollView: { flex: 1 },
  scroll: { paddingBottom: 120 },

  // Hero
  heroContainer: { width: SCREEN_WIDTH, height: 260, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  headerOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'space-between',
    paddingHorizontal: 18, paddingBottom: 10,
  },
  headerBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center', justifyContent: 'center',
  },
  headerRight: { flexDirection: 'row', gap: 10 },

  // Info card — no negative margin, sits naturally below hero
  infoCard: {
    backgroundColor: '#FFFFFF', marginHorizontal: 18, marginTop: 16,
    borderRadius: 18, padding: 16,
    borderWidth: 1, borderColor: '#ECECEC',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 12, elevation: 5,
  },
  infoTop: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#F0F0F0' },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 3 },
  providerName: { fontSize: 15, fontWeight: '700', color: '#0D0D0D', letterSpacing: -0.2 },
  verifiedBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: '#FFF4ED', paddingHorizontal: 7, paddingVertical: 3,
    borderRadius: 99, borderWidth: 1, borderColor: '#FFD4B3',
  },
  verifiedText: { fontSize: 10, fontWeight: '700', color: '#FF6B00' },
  serviceLabel: { fontSize: 12, color: '#888', marginBottom: 5 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingVal: { fontSize: 13, fontWeight: '700', color: '#0D0D0D' },
  ratingCount: { fontSize: 11, color: '#888' },
  metaRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  metaChip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: '#FFF4ED', paddingHorizontal: 10, paddingVertical: 6,
    borderRadius: 99, borderWidth: 1, borderColor: '#FFD4B3',
  },
  metaText: { fontSize: 11, color: '#0D0D0D', fontWeight: '500' },

  // Sections
  section: { paddingHorizontal: 18, paddingTop: 22 },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 12,
  },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#0D0D0D', letterSpacing: -0.3 },
  countBadge: {
    fontSize: 11, color: '#888', fontWeight: '500',
    backgroundColor: '#F5F4F0', paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 99, borderWidth: 1, borderColor: '#ECECEC',
  },

  // About card
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 14,
    padding: 14, borderWidth: 1, borderColor: '#ECECEC',
  },
  aboutText: { fontSize: 13, color: '#555', lineHeight: 21 },

  // Gallery — 3-col small thumbnails
  galleryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  thumbWrap: {
    width: '31.5%', aspectRatio: 1,
    borderRadius: 12, overflow: 'hidden',
    backgroundColor: '#ECECEC',
  },
  thumb: { width: '100%', height: '100%' },
  moreOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center', justifyContent: 'center',
  },
  moreText: { fontSize: 18, fontWeight: '800', color: '#fff' },

  // Reviews
  filterRow: { gap: 8, paddingBottom: 14 },
  filterChip: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: 99, backgroundColor: '#FFFFFF',
    borderWidth: 1.5, borderColor: '#ECECEC',
  },
  filterChipActive: { borderColor: '#FF6B00', backgroundColor: '#FFF4ED' },
  filterText: { fontSize: 12, fontWeight: '600', color: '#888' },
  filterTextActive: { color: '#FF6B00' },

  reviewsWrap: {
    backgroundColor: '#FFFFFF', borderRadius: 14,
    borderWidth: 1, borderColor: '#ECECEC', overflow: 'hidden',
  },
  reviewCard: {
    padding: 14, borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  reviewTop: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  reviewAvatar: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: '#FFF4ED', borderWidth: 1.5, borderColor: '#FFD4B3',
    alignItems: 'center', justifyContent: 'center',
  },
  reviewAvatarText: { fontSize: 12, fontWeight: '700', color: '#FF6B00' },
  reviewName: { fontSize: 13, fontWeight: '700', color: '#0D0D0D' },
  reviewDate: { fontSize: 10, color: '#AAAAAA' },
  reviewComment: { fontSize: 12, color: '#555', lineHeight: 19, marginBottom: 8 },
  likeBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, alignSelf: 'flex-start' },
  likeText: { fontSize: 11, color: '#888' },

  // Bottom bar
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', gap: 12,
    paddingHorizontal: 18, paddingTop: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1, borderTopColor: '#ECECEC',
    shadowColor: '#000', shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05, shadowRadius: 8, elevation: 5,
  },
  messageBtn: {
    flex: 1, height: 50, borderRadius: 14,
    backgroundColor: '#FFF4ED', borderWidth: 1.5, borderColor: '#FFD4B3',
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7,
  },
  messageBtnText: { fontSize: 14, fontWeight: '700', color: '#FF6B00' },
  bookBtn: {
    flex: 1.6, height: 50, backgroundColor: '#FF6B00', borderRadius: 14,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  bookBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },

  // Lightbox
  lightboxBg: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.92)',
    justifyContent: 'center', alignItems: 'center',
  },
  lightboxContent: { width: '100%', flex: 1, justifyContent: 'center' },
  lightboxClose: {
    position: 'absolute', right: 18, zIndex: 10,
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  lightboxImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 1.1,
  },
  lightboxStripWrap: {
    position: 'absolute', bottom: 40, left: 0, right: 0,
  },
  lightboxStrip: {
    paddingHorizontal: 18, gap: 8,
  },
  stripThumb: {
    width: 60, height: 60, borderRadius: 10,
    borderWidth: 2, borderColor: 'transparent',
  },
  stripThumbActive: {
    borderColor: '#FF6B00',
  },
});
