import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TABS = ['About me', 'Photos & Videos', 'Reviews'];

const MOCK_REVIEWS = [
  { 
    id: '1', 
    name: 'Laurellee Quintana', 
    rating: 4.5, 
    date: '3 weeks ago', 
    comment: 'Absolutely! This is what I was looking for. I recommend to everyone!',
    likes: 25,
    avatar: 'LQ'
  },
  { 
    id: '2', 
    name: 'Clinton McClure', 
    rating: 4.3, 
    date: '1 week ago', 
    comment: 'I am very satisfied with the results. The results are very satisfying! I like it very much! 🔥🔥🔥',
    likes: 10,
    avatar: 'CM'
  },
  { 
    id: '3', 
    name: 'Chelsi Chubb', 
    rating: 5, 
    date: '1 week ago', 
    comment: 'Thank you. The quality is excellent and the results were amazing! 😍😍',
    likes: 8,
    avatar: 'CC'
  },
];

const MOCK_SERVICES = [
  'Event Planning', 'Wedding decor', 'Hall Decor', 'Ushering', 'Corporate decor',
];

const MOCK_GALLERY = [
  { id: '1', uri: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400' },
  { id: '2', uri: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400' },
  { id: '3', uri: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400' },
  { id: '4', uri: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400' },
  { id: '5', uri: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400' },
  { id: '6', uri: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400' },
];

const RATING_FILTERS = [
  { label: 'All', value: 'all', icon: 'apps' },
  { label: '5', value: '5', icon: 'star' },
  { label: '4', value: '4', icon: 'star' },
  { label: '3', value: '3', icon: 'star' },
  { label: '2', value: '2', icon: 'star' },
];

const MOCK_FAQS = [
  { q: 'What areas do you serve?', a: 'We serve all areas in Queens, NY and surrounding boroughs.' },
  { q: 'Do you provide equipment?', a: 'Yes, we provide all necessary decoration equipment and materials.' },
  { q: 'What is your cancellation policy?', a: 'Cancellations must be made 48 hours in advance for a full refund.' },
];

const StarRow = ({ rating }: { rating: number }) => (
  <View style={{ flexDirection: 'row', gap: 2 }}>
    {[1, 2, 3, 4, 5].map(s => (
      <Ionicons 
        key={s} 
        name={s <= Math.floor(rating) ? 'star' : (s - rating < 1 && s - rating > 0) ? 'star-half' : 'star-outline'} 
        size={11} 
        color="#FFB800" 
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
    price: 20,
    experience: 20,
    verified: true,
    bio: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
  };

  const [activeTab, setActiveTab] = useState('About');
  const [selectedRatingFilter, setSelectedRatingFilter] = useState('all');
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header Image */}
      <View style={styles.heroImageContainer}>
        <Image 
          source={{ uri: provider.image }} 
          style={styles.heroImage}
          resizeMode="cover"
        />
        
        {/* Header Buttons */}
        <View style={[styles.headerOverlay, { paddingTop: 10 + insets.top }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
            <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerBtn}>
              <Ionicons name="share-outline" size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerBtn}>
              <Ionicons name="bookmark-outline" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        
        {/* Service Title & Info */}
        <View style={styles.serviceHeader}>
          <View style={styles.titleRow}>
            <Text style={styles.serviceTitle}>{provider.service}</Text>
            <TouchableOpacity>
              <Ionicons name="bookmark-outline" size={22} color="#7C3AED" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.providerRow}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/100?img=5' }} 
              style={styles.providerAvatar}
            />
            <View style={{ flex: 1 }}>
              <View style={styles.nameRatingRow}>
                <Text style={styles.providerName}>{provider.name}</Text>
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={12} color="#FFB800" />
                  <Text style={styles.ratingText}>{provider.rating}</Text>
                  <Text style={styles.reviewsText}>({provider.reviews} reviews)</Text>
                </View>
              </View>
              <View style={styles.locationRow}>
                <Ionicons name="location" size={14} color="#7C3AED" />
                <Text style={styles.locationText}>{provider.city}</Text>
              </View>
            </View>
          </View>

          {/* Price - REMOVED */}
        </View>

        {/* About Me */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About me</Text>
          <Text style={styles.aboutText}>{provider.bio}</Text>
        </View>

        {/* Photos & Videos */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Photos & Videos</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.galleryGrid}>
            {MOCK_GALLERY.map((img) => (
              <View key={img.id} style={styles.galleryItem}>
                <Image source={{ uri: img.uri }} style={styles.galleryImage} />
              </View>
            ))}
          </View>
        </View>

        {/* Reviews */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.reviewsHeader}>
              <Ionicons name="star" size={18} color="#FFB800" />
              <Text style={styles.reviewsTitle}>{provider.rating} ({provider.reviews} reviews)</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {/* Rating Filters */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}>
            {RATING_FILTERS.map((filter) => (
              <TouchableOpacity
                key={filter.value}
                style={[
                  styles.filterChip,
                  selectedRatingFilter === filter.value && styles.filterChipActive
                ]}
                onPress={() => setSelectedRatingFilter(filter.value)}>
                <Ionicons 
                  name={filter.icon as any} 
                  size={14} 
                  color={selectedRatingFilter === filter.value ? '#7C3AED' : '#888'} 
                />
                <Text style={[
                  styles.filterText,
                  selectedRatingFilter === filter.value && styles.filterTextActive
                ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Review Cards */}
          {MOCK_REVIEWS.map(review => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewAvatar}>
                  <Text style={styles.reviewAvatarText}>{review.avatar}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.reviewName}>{review.name}</Text>
                  <View style={styles.reviewMeta}>
                    <View style={styles.ratingBadgeSmall}>
                      <Ionicons name="star" size={10} color="#FFFFFF" />
                      <Text style={styles.ratingBadgeText}>{review.rating}</Text>
                    </View>
                    <TouchableOpacity style={styles.moreBtn}>
                      <Ionicons name="ellipsis-horizontal-circle-outline" size={16} color="#888" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
              <View style={styles.reviewFooter}>
                <TouchableOpacity style={styles.likeBtn}>
                  <Ionicons name="heart-outline" size={14} color="#888" />
                  <Text style={styles.likeText}>{review.likes}</Text>
                </TouchableOpacity>
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 10 }]}>
        <TouchableOpacity style={styles.messageBtn}>
          <Text style={styles.messageBtnText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.bookBtn}
          onPress={() => navigation.navigate('SendEnquiry', { provider })}>
          <Text style={styles.bookBtnText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  heroImageContainer: {
    width: SCREEN_WIDTH,
    height: 280,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingBottom: 10,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 10,
  },
  scroll: { paddingBottom: 20 },
  serviceHeader: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0D0D0D',
    letterSpacing: -0.3,
  },
  providerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  providerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  nameRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  providerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0D0D0D',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0D0D0D',
  },
  reviewsText: {
    fontSize: 11,
    color: '#888',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#888',
    flex: 1,
  },
  section: {
    paddingHorizontal: 18,
    paddingTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0D0D0D',
    letterSpacing: -0.3,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7C3AED',
  },
  aboutText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  galleryItem: {
    width: '48%',
    aspectRatio: 0.75,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F0F0F0',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  reviewsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  reviewsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0D0D0D',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 16,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterChipActive: {
    backgroundColor: '#F3E8FF',
    borderColor: '#7C3AED',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888',
  },
  filterTextActive: {
    color: '#7C3AED',
  },
  reviewCard: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewAvatarText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#7C3AED',
  },
  reviewName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0D0D0D',
    marginBottom: 4,
  },
  reviewMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingBadgeSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#7C3AED',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  ratingBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  moreBtn: {
    padding: 4,
  },
  reviewComment: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },
  reviewFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  likeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  likeText: {
    fontSize: 12,
    color: '#888',
  },
  reviewDate: {
    fontSize: 11,
    color: '#888',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 18,
    paddingTop: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 5,
  },
  messageBtn: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#7C3AED',
  },
  bookBtn: {
    flex: 1,
    height: 50,
    backgroundColor: '#7C3AED',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
