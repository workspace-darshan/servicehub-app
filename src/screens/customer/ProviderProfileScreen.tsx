import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Image, Dimensions, Modal, Pressable, RefreshControl,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Loading, ErrorState } from '../../components';
import { providerService, userService } from '../../services';
import * as formatters from '../../utils/formatters';
import { useApp } from '../../context/AppContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
  const providerId = route?.params?.id || route?.params?.provider?.id;
  const { isProviderSaved, saveProvider, unsaveProvider } = useApp();
  
  const [provider, setProvider] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRatingFilter, setSelectedRatingFilter] = useState('all');
  const [lightboxUri, setLightboxUri] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (providerId) {
      loadData();
    }
  }, [providerId]);

  useEffect(() => {
    if (provider) {
      setSaved(isProviderSaved(provider.id));
    }
  }, [provider]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [providerRes, reviewsRes] = await Promise.all([
        providerService.getProviderById(providerId),
        providerService.getProviderReviews(providerId, { page: 1, pageSize: 20 }),
      ]);

      if (providerRes.success && providerRes.data) {
        setProvider(providerRes.data);
      }

      if (reviewsRes.success && reviewsRes.data) {
        setReviews(reviewsRes.data);
      }
    } catch (err: any) {
      console.error('Error loading provider:', err);
      setError(err.message || 'Failed to load provider');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleSaveToggle = async () => {
    if (!provider) return;

    try {
      if (saved) {
        await unsaveProvider(provider.id);
        setSaved(false);
      } else {
        await saveProvider({
          id: provider.id,
          businessName: provider.businessName,
          rating: provider.rating,
          city: provider.city,
        });
        setSaved(true);
      }
    } catch (err) {
      console.error('Error toggling save:', err);
    }
  };

  if (loading) {
    return <Loading message="Loading provider..." />;
  }

  if (error || !provider) {
    return <ErrorState message={error || 'Provider not found'} onRetry={loadData} />;
  }

  const gallery = provider.photos || [];
  const filteredReviews = selectedRatingFilter === 'all'
    ? reviews
    : reviews.filter((r: any) => Math.floor(r.rating) === parseInt(selectedRatingFilter));

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Hero Image */}
      <View style={styles.heroContainer}>
        <Image 
          source={{ uri: gallery[0] || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800' }} 
          style={styles.heroImage} 
          resizeMode="cover" 
        />
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
            <TouchableOpacity style={styles.headerBtn} onPress={handleSaveToggle}>
              <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={20} color={saved ? '#FF6B00' : '#fff'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FF6B00"
            colors={['#FF6B00']}
          />
        }>

        {/* Provider Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoTop}>
            <Image source={{ uri: 'https://i.pravatar.cc/100?img=5' }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <View style={styles.nameRow}>
                <Text style={styles.providerName}>{provider.businessName}</Text>
                {provider.verified && (
                  <View style={styles.verifiedBadge}>
                    <Ionicons name="shield-checkmark" size={11} color="#FF6B00" />
                    <Text style={styles.verifiedText}>Verified</Text>
                  </View>
                )}
              </View>
              <Text style={styles.serviceLabel}>
                {provider.services?.[0]?.service?.name || 'Service Provider'}
              </Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={13} color="#FBBF24" />
                <Text style={styles.ratingVal}>{formatters.formatRating(provider.rating)}</Text>
                <Text style={styles.ratingCount}>({provider.totalReviews || 0} reviews)</Text>
              </View>
            </View>
          </View>

          {/* Meta chips */}
          <View style={styles.metaRow}>
            <View style={styles.metaChip}>
              <Ionicons name="location-outline" size={13} color="#FF6B00" />
              <Text style={styles.metaText}>{provider.city}, {provider.state}</Text>
            </View>
            {provider.workDays && provider.workDays.length > 0 && (
              <View style={styles.metaChip}>
                <Ionicons name="calendar-outline" size={13} color="#FF6B00" />
                <Text style={styles.metaText}>{provider.workDays.join(', ')}</Text>
              </View>
            )}
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.card}>
            <Text style={styles.aboutText}>
              {provider.description || 'Professional service provider with years of experience.'}
            </Text>
          </View>
        </View>

        {/* Photos & Videos */}
        {gallery.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Photos & Videos</Text>
              <Text style={styles.countBadge}>{gallery.length} photos</Text>
            </View>
            <View style={styles.galleryGrid}>
              {gallery.slice(0, 6).map((photo: string, index: number) => (
                <TouchableOpacity
                  key={index}
                  style={styles.thumbWrap}
                  onPress={() => setLightboxUri(photo)}
                  activeOpacity={0.8}>
                  <Image source={{ uri: photo }} style={styles.thumb} resizeMode="cover" />
                  {index === 5 && gallery.length > 6 && (
                    <View style={styles.moreOverlay}>
                      <Text style={styles.moreText}>+{gallery.length - 6}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Reviews */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Ionicons name="star" size={16} color="#FBBF24" />
              <Text style={styles.sectionTitle}>
                {formatters.formatRating(provider.rating)} · {provider.totalReviews || 0} Reviews
              </Text>
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
          {filteredReviews.length > 0 ? (
            <View style={styles.reviewsWrap}>
              {filteredReviews.map((review: any, i: number) => {
                const customerName = review.customer?.name || 'Anonymous';
                const initials = formatters.getInitials(customerName);
                const relativeTime = formatters.formatRelativeTime(review.createdAt);

                return (
                  <View key={review.id} style={[styles.reviewCard, i === filteredReviews.length - 1 && { borderBottomWidth: 0 }]}>
                    <View style={styles.reviewTop}>
                      <View style={styles.reviewAvatar}>
                        <Text style={styles.reviewAvatarText}>{initials}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.reviewName}>{customerName}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 }}>
                          <StarRow rating={review.rating} />
                          <Text style={styles.reviewDate}>{relativeTime}</Text>
                        </View>
                      </View>
                    </View>
                    <Text style={styles.reviewComment}>{review.comment}</Text>
                    {review.providerResponse && (
                      <View style={styles.responseBox}>
                        <Text style={styles.responseLabel}>Provider Response:</Text>
                        <Text style={styles.responseText}>{review.providerResponse}</Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          ) : (
            <View style={styles.card}>
              <Text style={styles.aboutText}>No reviews yet</Text>
            </View>
          )}
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
              {gallery.map((photo: string, index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setLightboxUri(photo)}
                  activeOpacity={0.8}>
                  <Image
                    source={{ uri: photo }}
                    style={[
                      styles.stripThumb,
                      lightboxUri === photo && styles.stripThumbActive,
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
  responseBox: {
    backgroundColor: '#F5F4F0',
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#FF6B00',
  },
  responseLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FF6B00',
    marginBottom: 4,
  },
  responseText: {
    fontSize: 11,
    color: '#555',
    lineHeight: 17,
  },
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
