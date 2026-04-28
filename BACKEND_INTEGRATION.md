# 🔗 Backend Integration Guide

Complete guide for connecting the React Native app with the backend API.

## ✅ What's Been Done

### 1. **API Services Created** (6 files)
- ✅ `api.ts` - Base API client with authentication
- ✅ `authService.ts` - Authentication (login, register, logout)
- ✅ `serviceService.ts` - Services and categories
- ✅ `providerService.ts` - Provider management
- ✅ `enquiryService.ts` - Enquiry system
- ✅ `userService.ts` - User profile and preferences

### 2. **AuthContext Updated**
- ✅ Now uses real API instead of mock data
- ✅ Automatic token management
- ✅ Error handling
- ✅ User state synchronization

### 3. **API Configuration**
- ✅ Base URL: `http://localhost:5001/api/v1`
- ✅ Automatic token injection
- ✅ Standardized error handling

---

## 🔧 Configuration

### **Update API Base URL**

Edit `servicehub-app/src/services/api.ts`:

```typescript
// For local development (web)
const API_BASE_URL = 'http://localhost:5001/api/v1';

// For Android Emulator
const API_BASE_URL = 'http://10.0.2.2:5001/api/v1';

// For iOS Simulator
const API_BASE_URL = 'http://localhost:5001/api/v1';

// For Physical Device (replace with your PC's IP)
const API_BASE_URL = 'http://192.168.1.100:5001/api/v1';
```

**Find your PC's IP:**
```bash
# Windows
ipconfig
# Look for "IPv4 Address"

# Mac/Linux
ifconfig
# Look for "inet" under your active network
```

---

## 🧪 Testing the Integration

### **1. Test Login**

The app is already configured! Just:

1. Start the backend server:
   ```bash
   cd servicehub-server
   npm run dev
   ```

2. Start the React Native app:
   ```bash
   cd servicehub-app
   npm start
   ```

3. Login with test credentials:
   - Email: `customer@test.com`
   - Password: `Test@123`

### **2. Test Registration**

Register a new user through the app - it will create a real account in the database!

---

## 📱 Screens That Need Updates

Most screens still use mock data. Here's what needs to be updated:

### **Priority 1: Core Functionality**

1. **HomeScreen** ✅ (Auth working)
   - [ ] Load real services from API
   - [ ] Load real providers from API

2. **SearchScreen**
   - [ ] Use real search API
   - [ ] Save search history to backend
   - [ ] Load providers from API

3. **ProviderListingScreen**
   - [ ] Load providers from API
   - [ ] Implement filters (city, service, rating)
   - [ ] Implement pagination

4. **ProviderProfileScreen**
   - [ ] Load provider details from API
   - [ ] Load reviews from API
   - [ ] Implement save/unsave functionality

5. **SendEnquiryScreen**
   - [ ] Submit enquiry to API
   - [ ] Show success/error messages

### **Priority 2: Provider Features**

6. **BecomeProviderScreen**
   - [ ] Submit to API instead of local storage
   - [ ] Handle API validation errors

7. **ProviderEnquiriesScreen**
   - [ ] Load enquiries from API
   - [ ] Implement respond functionality

8. **ProviderEditProfileScreen**
   - [ ] Load profile from API
   - [ ] Update profile via API

### **Priority 3: User Features**

9. **ProfileScreen**
   - [ ] Load profile from API
   - [ ] Update profile via API

10. **SavedProvidersScreen**
    - [ ] Load saved providers from API
    - [ ] Implement unsave functionality

11. **NotificationsScreen**
    - [ ] Load notifications from API
    - [ ] Mark as read functionality

---

## 🔨 How to Update a Screen

### **Example: Update HomeScreen to load real services**

```typescript
import { useEffect, useState } from 'react';
import { serviceService } from '../services';

export const HomeScreen = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const response = await serviceService.getServices({
        page: 1,
        pageSize: 10,
      });
      
      if (response.success && response.data) {
        setServices(response.data);
      }
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  // Rest of component...
};
```

### **Example: Submit Enquiry**

```typescript
import { enquiryService } from '../services';

const handleSubmitEnquiry = async () => {
  try {
    setLoading(true);
    
    const response = await enquiryService.createEnquiry({
      providerId: provider.id,
      serviceId: service.id,
      title: 'Need plumbing service',
      description: description,
      customerName: user.name,
      customerPhone: user.phone,
      customerEmail: user.email,
      preferredDate: selectedDate,
      location: location,
      budget: budget,
    });
    
    if (response.success) {
      Alert.alert('Success', 'Enquiry sent successfully!');
      navigation.goBack();
    }
  } catch (error: any) {
    Alert.alert('Error', error.message || 'Failed to send enquiry');
  } finally {
    setLoading(false);
  }
};
```

---

## 🎯 Quick Integration Checklist

### **Step 1: Update API URL**
- [ ] Edit `src/services/api.ts`
- [ ] Set correct base URL for your environment

### **Step 2: Test Authentication**
- [ ] Login with test account
- [ ] Register new account
- [ ] Logout and login again

### **Step 3: Update Screens (One by One)**
- [ ] HomeScreen - Load services
- [ ] SearchScreen - Search functionality
- [ ] ProviderListingScreen - Load providers
- [ ] ProviderProfileScreen - Load details
- [ ] SendEnquiryScreen - Submit enquiry
- [ ] BecomeProviderScreen - Register provider
- [ ] ProviderEnquiriesScreen - Load enquiries
- [ ] ProfileScreen - Load/update profile

### **Step 4: Test Each Feature**
- [ ] Login/Register
- [ ] Browse services
- [ ] Search providers
- [ ] View provider profile
- [ ] Send enquiry
- [ ] Become provider
- [ ] View enquiries (provider)
- [ ] Update profile

---

## 🐛 Common Issues & Solutions

### **Issue 1: Network Request Failed**

**Problem:** Can't connect to backend

**Solutions:**
1. Make sure backend is running (`npm run dev`)
2. Check API URL in `api.ts`
3. For Android emulator, use `10.0.2.2` instead of `localhost`
4. For physical device, use your PC's IP address
5. Make sure firewall allows connections

### **Issue 2: 401 Unauthorized**

**Problem:** API returns 401 error

**Solutions:**
1. Token might be expired - logout and login again
2. Check if token is being saved correctly
3. Check AsyncStorage for `@auth_token`

### **Issue 3: CORS Error (Web)**

**Problem:** CORS policy blocking requests

**Solution:**
Backend already configured for CORS. Make sure your frontend URL is in the allowed origins in backend `.env`:
```env
ALLOWED_ORIGINS=http://localhost:8081,http://localhost:19006
```

### **Issue 4: Data Not Showing**

**Problem:** API call succeeds but data doesn't show

**Solutions:**
1. Check response structure matches your component
2. Add console.log to see actual response
3. Check if data is in `response.data` not `response`

---

## 📚 API Service Usage Examples

### **Authentication**
```typescript
import { authService } from '../services';

// Login
const response = await authService.login(email, password);

// Register
const response = await authService.register({
  email, password, name, phone, location
});

// Logout
await authService.logout();

// Get current user
const response = await authService.getMe();
```

### **Services**
```typescript
import { serviceService } from '../services';

// Get categories
const response = await serviceService.getCategories();

// Get services
const response = await serviceService.getServices({
  page: 1,
  pageSize: 20,
  categoryId: 'category-id',
  search: 'plumbing'
});

// Search services
const response = await serviceService.searchServices('plumber');
```

### **Providers**
```typescript
import { providerService } from '../services';

// Get providers
const response = await providerService.getProviders({
  city: 'Mumbai',
  serviceId: 'service-id',
  verified: true,
  minRating: 4
});

// Get provider details
const response = await providerService.getProviderById(providerId);

// Register as provider
const response = await providerService.registerProvider({
  businessName: 'ABC Services',
  description: 'Professional services',
  city: 'Mumbai',
  state: 'Maharashtra',
  serviceArea: 'Mumbai Central',
  // ... other fields
});
```

### **Enquiries**
```typescript
import { enquiryService } from '../services';

// Create enquiry
const response = await enquiryService.createEnquiry({
  providerId: 'provider-id',
  serviceId: 'service-id',
  title: 'Need service',
  description: 'Description here',
  customerName: 'John Doe',
  customerPhone: '+919876543210',
  // ... other fields
});

// Get enquiries
const response = await enquiryService.getEnquiries({
  type: 'sent', // or 'received'
  status: 'PENDING'
});

// Respond to enquiry (Provider)
const response = await enquiryService.respondToEnquiry(
  enquiryId,
  'Thank you for your enquiry...'
);
```

---

## 🎉 Next Steps

1. **Update API URL** in `api.ts` for your environment
2. **Test authentication** - login/register should work immediately
3. **Update screens one by one** - start with HomeScreen
4. **Test each feature** as you implement it
5. **Handle errors gracefully** - show user-friendly messages

---

## 📞 Need Help?

- Check backend logs: `servicehub-server/logs/`
- Check API documentation: `servicehub-server/API_ENDPOINTS.md`
- Test API with cURL or Postman first
- Use console.log to debug API responses

---

**The foundation is ready! Now just update the screens to use real data.** 🚀
