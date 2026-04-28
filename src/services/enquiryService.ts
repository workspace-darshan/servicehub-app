/**
 * Enquiry Service
 * Handles enquiry-related API calls
 */

import { api } from './api';

export interface Enquiry {
  id: string;
  customerId: string;
  providerId: string;
  serviceId: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  preferredDate?: string;
  location?: string;
  budget?: number;
  providerResponse?: string;
  respondedAt?: string;
  createdAt: string;
  updatedAt: string;
  viewedAt?: string;
  completedAt?: string;
  service?: any;
  customer?: any;
  provider?: any;
  providerProfile?: any;
}

export interface CreateEnquiryData {
  providerId: string;
  serviceId: string;
  title: string;
  description: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  preferredDate?: string;
  location?: string;
  budget?: number;
}

class EnquiryService {
  /**
   * Create new enquiry
   */
  async createEnquiry(data: CreateEnquiryData) {
    return await api.post<Enquiry>('/enquiries', data);
  }

  /**
   * Get enquiries
   */
  async getEnquiries(params?: {
    page?: number;
    pageSize?: number;
    status?: string;
    type?: 'sent' | 'received';
  }) {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.type) queryParams.append('type', params.type);
    
    const query = queryParams.toString();
    return await api.get<Enquiry[]>(`/enquiries${query ? `?${query}` : ''}`);
  }

  /**
   * Get enquiry by ID
   */
  async getEnquiryById(id: string) {
    return await api.get<Enquiry>(`/enquiries/${id}`);
  }

  /**
   * Update enquiry
   */
  async updateEnquiry(id: string, data: {
    title?: string;
    description?: string;
    preferredDate?: string;
    location?: string;
    budget?: number;
  }) {
    return await api.put<Enquiry>(`/enquiries/${id}`, data);
  }

  /**
   * Cancel enquiry
   */
  async cancelEnquiry(id: string) {
    return await api.delete(`/enquiries/${id}`);
  }

  /**
   * Respond to enquiry (Provider)
   */
  async respondToEnquiry(id: string, response: string) {
    return await api.post<Enquiry>(`/enquiries/${id}/respond`, { response });
  }

  /**
   * Update enquiry status
   */
  async updateEnquiryStatus(id: string, status: string) {
    return await api.put<Enquiry>(`/enquiries/${id}/status`, { status });
  }
}

export const enquiryService = new EnquiryService();
