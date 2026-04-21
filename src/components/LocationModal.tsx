import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface LocationModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectLocation: (location: string) => void;
  currentLocation: string;
}

const RECENT_LOCATIONS = [
  { id: 1, type: 'WORK', address: 'Avdhesh house, 601, Techsture', area: 'Palanpur, Gujarat' },
  { id: 2, type: 'HOME', address: 'Flat 302, Sunrise Apartments', area: 'Palanpur, Gujarat' },
];

const POPULAR_AREAS = [
  'Palanpur City Center',
  'Station Road',
  'College Road',
  'Highway Area',
  'Industrial Area',
];

export const LocationModal: React.FC<LocationModalProps> = ({
  visible,
  onClose,
  onSelectLocation,
  currentLocation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleEnableLocation = () => {
    // In a real app, request location permission here
    alert('Location permission requested');
  };

  const handleSelectManually = () => {
    // Navigate to map screen or address form
    alert('Open map/address form');
  };

  const handleSelectLocation = (location: string) => {
    onSelectLocation(location);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={onClose}
        />
        
        <View style={styles.modalContainer}>
          {/* Handle bar */}
          <View style={styles.handleBar} />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Select Location</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#0D0D0D" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={18} color="#888" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for area, street name..."
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color="#888" />
              </TouchableOpacity>
            )}
          </View>

          <ScrollView 
            style={styles.content}
            showsVerticalScrollIndicator={false}>
            
            {/* Location Permission Card */}
            <View style={styles.permissionCard}>
              <View style={styles.permissionIcon}>
                <Ionicons name="location" size={24} color="#FF6B00" />
              </View>
              <View style={styles.permissionContent}>
                <Text style={styles.permissionTitle}>Enable precise location</Text>
                <Text style={styles.permissionDesc}>
                  Get accurate delivery to your doorstep
                </Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.enableBtn}
              onPress={handleEnableLocation}>
              <Ionicons name="navigate" size={18} color="#fff" />
              <Text style={styles.enableBtnText}>Enable device location</Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity 
              style={styles.manualBtn}
              onPress={handleSelectManually}>
              <Ionicons name="map-outline" size={18} color="#FF6B00" />
              <Text style={styles.manualBtnText}>Select location manually</Text>
              <Ionicons name="chevron-forward" size={18} color="#888" />
            </TouchableOpacity>

            {/* Recent Locations */}
            {RECENT_LOCATIONS.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>RECENT LOCATIONS</Text>
                {RECENT_LOCATIONS.map((loc) => (
                  <TouchableOpacity
                    key={loc.id}
                    style={styles.locationItem}
                    onPress={() => handleSelectLocation(`${loc.type} - ${loc.address}`)}>
                    <View style={styles.locationIcon}>
                      <Ionicons 
                        name={loc.type === 'HOME' ? 'home' : 'briefcase'} 
                        size={18} 
                        color="#FF6B00" 
                      />
                    </View>
                    <View style={styles.locationInfo}>
                      <View style={styles.locationHeader}>
                        <Text style={styles.locationType}>{loc.type}</Text>
                        {loc.address === currentLocation && (
                          <View style={styles.currentBadge}>
                            <Text style={styles.currentBadgeText}>Current</Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.locationAddress}>{loc.address}</Text>
                      <Text style={styles.locationArea}>{loc.area}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color="#888" />
                  </TouchableOpacity>
                ))}
              </>
            )}

            {/* Popular Areas */}
            <Text style={styles.sectionTitle}>POPULAR AREAS</Text>
            {POPULAR_AREAS.map((area, index) => (
              <TouchableOpacity
                key={index}
                style={styles.areaItem}
                onPress={() => handleSelectLocation(area)}>
                <Ionicons name="location-outline" size={18} color="#888" />
                <Text style={styles.areaText}>{area}</Text>
              </TouchableOpacity>
            ))}

            <View style={{ height: 40 }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: '#F5F4F0',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: SCREEN_HEIGHT * 0.85,
    paddingBottom: 20,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#D1D1D1',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0D0D0D',
    letterSpacing: -0.4,
  },
  closeBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 10,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0D0D0D',
    padding: 0,
    outlineStyle: 'none',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  permissionCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF4ED',
    borderRadius: 14,
    padding: 14,
    gap: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#FFD4B3',
  },
  permissionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  permissionContent: {
    flex: 1,
  },
  permissionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0D0D0D',
    marginBottom: 2,
  },
  permissionDesc: {
    fontSize: 12,
    color: '#888',
    lineHeight: 16,
  },
  enableBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B00',
    borderRadius: 14,
    paddingVertical: 14,
    gap: 8,
    marginBottom: 16,
  },
  enableBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ECECEC',
  },
  dividerText: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600',
  },
  manualBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  manualBtnText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#0D0D0D',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#888',
    letterSpacing: 0.8,
    marginBottom: 12,
    marginTop: 8,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    gap: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF4ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationInfo: {
    flex: 1,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  locationType: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0D0D0D',
  },
  currentBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  currentBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#16A34A',
  },
  locationAddress: {
    fontSize: 13,
    color: '#0D0D0D',
    marginBottom: 2,
  },
  locationArea: {
    fontSize: 11,
    color: '#888',
  },
  areaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    gap: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  areaText: {
    fontSize: 13,
    color: '#0D0D0D',
    fontWeight: '500',
  },
});
