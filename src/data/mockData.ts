export const SERVICES = [
  { id: '1', name: 'Plumbing', tagline: 'Leakage, Pipes & Taps', category: 'Repair' },
  { id: '2', name: 'Electrical', tagline: 'Wiring & Appliances', category: 'Repair' },
  { id: '3', name: 'Cleaning', tagline: 'Full Home Deep Clean', category: 'Cleaning' },
  { id: '4', name: 'Carpentry', tagline: 'Furniture & Fixtures', category: 'Repair' },
  { id: '5', name: 'Painting', tagline: 'Interior & Exterior', category: 'Other' },
  { id: '6', name: 'AC Repair', tagline: 'Service & Gas Refill', category: 'Repair' },
  { id: '7', name: 'Refrigerator Repair', tagline: 'All Brands Covered', category: 'Repair' },
  { id: '8', name: 'Washing Machine', tagline: 'Repair & Service', category: 'Repair' },
  { id: '9', name: 'TV Repair', tagline: 'LED, LCD & Smart TV', category: 'Repair' },
  { id: '10', name: 'CCTV Installation', tagline: 'Home & Office Security', category: 'Installation' },
  { id: '11', name: 'Inverter Repair', tagline: 'Battery & UPS Service', category: 'Repair' },
  { id: '12', name: 'RO/Water Purifier', tagline: 'Filter & Maintenance', category: 'Repair' },
  { id: '13', name: 'Geyser Repair', tagline: 'All Models Serviced', category: 'Repair' },
  { id: '14', name: 'Bathroom Cleaning', tagline: 'Deep Scrub & Polish', category: 'Cleaning' },
  { id: '15', name: 'Kitchen Cleaning', tagline: 'Chimney & Stove Clean', category: 'Cleaning' },
  { id: '16', name: 'Sofa Cleaning', tagline: 'Foam & Fabric Care', category: 'Cleaning' },
  { id: '17', name: 'Pest Control', tagline: 'Home & Garden', category: 'Other' },
  { id: '18', name: 'Laptop Repair', tagline: 'Hardware & Software', category: 'Repair' },
  { id: '19', name: 'Mobile Repair', tagline: 'Screen & Battery Fix', category: 'Repair' },
  { id: '20', name: 'Locksmith', tagline: 'Lock, Key & Safe', category: 'Other' },
];

export const PROVIDERS = [
  {
    id: '1', name: 'Rajesh Kumar', service: 'Plumber', city: 'Palanpur',
    rating: 4.9, reviews: 47, experience: 8, verified: true, initials: 'RK',
    bio: 'Expert in residential and commercial plumbing. Specializes in pipeline installation, leak repair, and bathroom fittings.',
  },
  {
    id: '2', name: 'Suresh Patel', service: 'Electrician', city: 'Ahmedabad',
    rating: 4.7, reviews: 89, experience: 12, verified: true, initials: 'SP',
    bio: 'Certified electrician with expertise in wiring, panel installation, and appliance repair. Available 24/7.',
  },
  {
    id: '3', name: 'Amit Sharma', service: 'AC Repair', city: 'Surat',
    rating: 4.5, reviews: 32, experience: 5, verified: true, initials: 'AS',
    bio: 'Trained AC technician for all major brands — installation, gas refill, and repair.',
  },
  {
    id: '4', name: 'Vikram Jha', service: 'Carpenter', city: 'Palanpur',
    rating: 4.6, reviews: 28, experience: 10, verified: false, initials: 'VJ',
    bio: 'Skilled carpenter for furniture making, repair, and custom woodwork. Modular kitchen specialist.',
  },
  {
    id: '5', name: 'Priya Mehta', service: 'Cleaning', city: 'Gandhinagar',
    rating: 4.8, reviews: 63, experience: 3, verified: true, initials: 'PM',
    bio: 'Professional deep cleaning services for homes and offices. Eco-friendly products used.',
  },
];

export const ENQUIRIES = [
  {
    id: '1', service: 'Plumbing', provider: 'Rajesh Kumar',
    date: 'Mar 20, 2026', status: 'Responded', hasReply: true,
    description: 'Kitchen sink is leaking and needs replacement urgently.',
  },
  {
    id: '2', service: 'AC Repair', provider: 'Amit Sharma',
    date: 'Mar 18, 2026', status: 'Pending', hasReply: false,
    description: 'AC not cooling properly. Need gas refill and service check.',
  },
  {
    id: '3', service: 'Electrical', provider: 'Suresh Patel',
    date: 'Mar 10, 2026', status: 'Completed', hasReply: true,
    description: 'Wiring issue in living room. Lights flickering.',
  },
  {
    id: '4', service: 'Cleaning', provider: 'Priya Mehta',
    date: 'Mar 05, 2026', status: 'Cancelled', hasReply: false,
    description: 'Full home deep cleaning required before moving in.',
  },
];

export const NOTIFICATIONS = [
  {
    id: '1',
    type: 'enquiry',
    title: 'New enquiry from Amit Kumar',
    body: 'Requested home plumbing service for kitchen sink repair',
    time: '2 min ago',
    read: false,
  },
  {
    id: '2',
    type: 'reply',
    title: 'Rajesh Kumar responded to your enquiry',
    body: 'I can visit tomorrow between 10 AM - 12 PM. Please confirm.',
    time: '1 hr ago',
    read: false,
  },
  {
    id: '3',
    type: 'review',
    title: 'Rate your recent service',
    body: 'How was your experience with Suresh Patel for electrical work?',
    time: 'Yesterday',
    read: true,
  },
  {
    id: '4',
    type: 'system',
    title: 'Your profile was viewed 12 times',
    body: 'Your ServiceHub profile got 12 views this week. Keep it updated!',
    time: '2 days ago',
    read: true,
  },
];

export const HOW_IT_WORKS_CUSTOMER = [
  { step: 'Step 1', title: 'Sign Up', desc: 'Create your free customer account in under 2 minutes.' },
  { step: 'Step 2', title: 'Browse Services', desc: 'Explore 20+ verified service categories near you.' },
  { step: 'Step 3', title: 'Find Provider', desc: 'Compare profiles, ratings, and experience levels.' },
  { step: 'Step 4', title: 'Send Enquiry', desc: 'Describe your requirement and pick a time slot.' },
  { step: 'Step 5', title: 'Rate Provider', desc: 'Share feedback to help the community.' },
];

export const HOW_IT_WORKS_PROVIDER = [
  { step: 'Step 1', title: 'Register as Provider', desc: 'Fill your business profile in 4 easy steps.' },
  { step: 'Step 2', title: 'Set Up Profile', desc: 'Add services, locations, and business details.' },
  { step: 'Step 3', title: 'Get Discovered', desc: 'Your profile goes live immediately on ServiceHub.' },
  { step: 'Step 4', title: 'Receive Enquiry', desc: 'Customers send you direct service requests.' },
  { step: 'Step 5', title: 'Respond & Serve', desc: 'Reply to enquiries, complete the job, earn reviews.' },
];
