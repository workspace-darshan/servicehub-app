import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Shadows } from '../constants/theme';

// Auth
import { SplashScreen } from '../screens/auth/SplashScreen';
import { OnboardingScreen } from '../screens/auth/OnboardingScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';

// Customer
import { HomeScreen } from '../screens/customer/HomeScreen';
import { AllServicesScreen } from '../screens/customer/AllServicesScreen';
import { ProviderListingScreen } from '../screens/customer/ProviderListingScreen';
import { ProviderProfileScreen } from '../screens/customer/ProviderProfileScreen';
import { SendEnquiryScreen } from '../screens/customer/SendEnquiryScreen';
import { SavedProvidersScreen } from '../screens/customer/SavedProvidersScreen';
import { ProfileScreen } from '../screens/customer/ProfileScreen';
import { SearchScreen } from '../screens/customer/SearchScreen';
import { EditProfileScreen } from '../screens/customer/EditProfileScreen';
import { BecomeProviderScreen } from '../screens/customer/BecomeProviderScreen';

// Provider
import { ProviderDashboardScreen } from '../screens/provider/ProviderDashboardScreen';
import { ProviderEnquiriesScreen } from '../screens/provider/ProviderEnquiriesScreen';
import { ProviderEditProfileScreen } from '../screens/provider/ProviderEditProfileScreen';

// Shared
import { NotificationsScreen } from '../screens/shared/NotificationsScreen';
import { HowItWorksScreen } from '../screens/shared/HowItWorksScreen';
import { SettingsScreen } from '../screens/shared/SettingsScreen';
import { AboutScreen } from '../screens/shared/AboutScreen';
import { ContactScreen } from '../screens/shared/ContactScreen';

// ─────────────────────────────────────────────
// CUSTOMER TABS
// ─────────────────────────────────────────────
type CustomerTabConfig = {
  name: string;
  label: string;
  icon: any;
  component: React.ComponentType<any>;
};

const CUSTOMER_TABS: CustomerTabConfig[] = [
  { name: 'Home', label: 'Home', icon: 'home', component: HomeScreen },
  { name: 'AllServices', label: 'Services', icon: 'grid', component: AllServicesScreen },
  { name: 'Providers', label: 'Providers', icon: 'people', component: ProviderListingScreen },
  { name: 'Saved', label: 'Saved', icon: 'bookmark', component: SavedProvidersScreen },
  { name: 'Profile', label: 'Profile', icon: 'person', component: ProfileScreen },
];

const CustomerTab = createBottomTabNavigator();

function CustomerTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[tabStyles.bar, { paddingBottom: insets.bottom, height: 68 + insets.bottom }]}>
      {state.routes.map((route: any, index: number) => {
        const isActive = state.index === index;
        const tab = CUSTOMER_TABS[index];
        return (
          <TouchableOpacity
            key={route.key}
            style={tabStyles.tabItem}
            onPress={() => navigation.navigate(route.name)}
            activeOpacity={0.7}>
            <Ionicons
              name={isActive ? tab.icon : `${tab.icon}-outline`}
              size={22}
              color={isActive ? Colors.primary : Colors.slate400}
            />
            <Text style={[tabStyles.tabLabel, isActive && tabStyles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function CustomerTabs() {
  return (
    <CustomerTab.Navigator
      tabBar={(props) => <CustomerTabBar {...props} />}
      screenOptions={{ headerShown: false }}>
      {CUSTOMER_TABS.map(tab => (
        <CustomerTab.Screen key={tab.name} name={tab.name} component={tab.component} />
      ))}
    </CustomerTab.Navigator>
  );
}

// ─────────────────────────────────────────────
// PROVIDER TABS
// ─────────────────────────────────────────────
type ProviderTabConfig = {
  name: string;
  label: string;
  icon: any;
  component: React.ComponentType<any>;
};

const PROVIDER_TABS: ProviderTabConfig[] = [
  { name: 'Dashboard', label: 'Dashboard', icon: 'grid', component: ProviderDashboardScreen },
  { name: 'ProviderEnquiries', label: 'Enquiries', icon: 'mail', component: ProviderEnquiriesScreen },
  { name: 'ProviderEditProfile', label: 'Profile', icon: 'person', component: ProviderEditProfileScreen },
  { name: 'Settings', label: 'Settings', icon: 'settings', component: SettingsScreen },
];

const ProviderTab = createBottomTabNavigator();

function ProviderTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[tabStyles.bar, { paddingBottom: insets.bottom, height: 68 + insets.bottom }]}>
      {state.routes.map((route: any, index: number) => {
        const isActive = state.index === index;
        const tab = PROVIDER_TABS[index];
        return (
          <TouchableOpacity
            key={route.key}
            style={tabStyles.tabItem}
            onPress={() => navigation.navigate(route.name)}
            activeOpacity={0.7}>
            <Ionicons
              name={isActive ? tab.icon : `${tab.icon}-outline`}
              size={22}
              color={isActive ? Colors.primary : Colors.slate400}
            />
            <Text style={[tabStyles.tabLabel, isActive && tabStyles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function ProviderTabs() {
  return (
    <ProviderTab.Navigator
      tabBar={(props) => <ProviderTabBar {...props} />}
      screenOptions={{ headerShown: false }}>
      {PROVIDER_TABS.map(tab => (
        <ProviderTab.Screen key={tab.name} name={tab.name} component={tab.component} />
      ))}
    </ProviderTab.Navigator>
  );
}

// ─────────────────────────────────────────────
// ROOT STACK
// ─────────────────────────────────────────────
const RootStack = createStackNavigator();

export function RootNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Splash">
      {/* Auth */}
      <RootStack.Screen name="Splash" component={SplashScreen} />
      <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="Register" component={RegisterScreen} />
      <RootStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

      {/* Customer Tabs */}
      <RootStack.Screen name="CustomerTabs" component={CustomerTabs} />

      {/* Customer Stack Screens */}
      <RootStack.Screen name="ProviderProfile" component={ProviderProfileScreen} />
      <RootStack.Screen name="SendEnquiry" component={SendEnquiryScreen} />
      <RootStack.Screen name="Search" component={SearchScreen} options={{ presentation: 'modal' }} />
      <RootStack.Screen name="EditProfile" component={EditProfileScreen} />
      <RootStack.Screen name="BecomeProvider" component={BecomeProviderScreen} />

      {/* Provider Tabs */}
      <RootStack.Screen name="ProviderTabs" component={ProviderTabs} />

      {/* Shared */}
      <RootStack.Screen name="Notifications" component={NotificationsScreen} />
      <RootStack.Screen name="HowItWorks" component={HowItWorksScreen} />
      <RootStack.Screen name="Settings" component={SettingsScreen} />
      <RootStack.Screen name="About" component={AboutScreen} />
      <RootStack.Screen name="Contact" component={ContactScreen} />
    </RootStack.Navigator>
  );
}

// ─────────────────────────────────────────────
const tabStyles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    height: 68,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    ...Shadows.nav,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 6,
    gap: 3,
  },
  tabLabel: {
    fontSize: 10,
    color: Colors.slate400,
    fontWeight: FontWeight.medium,
    letterSpacing: 0.3,
  },
  tabLabelActive: {
    color: Colors.primary,
    fontWeight: FontWeight.bold,
  },
});
