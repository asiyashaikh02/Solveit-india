/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '@/src/pages/Landing/LandingPage';
import GstRegistrationPage from '@/src/pages/Landing/GstRegistrationPage';
import CsServicesPage from '@/src/pages/Landing/CsServicesPage';
import BusinessSetupPage from '@/src/pages/Landing/BusinessSetupPage';
import AdminOverview from '@/src/pages/Admin/AdminOverview';
import ExpertDashboard from '@/src/pages/Expert/ExpertDashboard';
import ExpertJoinPage from '@/src/pages/Expert/ExpertJoinPage';
import ExpertPublicProfile from '@/src/pages/Expert/ExpertPublicProfile';
import ClientDashboard from '@/src/pages/Client/ClientDashboard';
import UserDashboard from '@/src/pages/Dashboard/UserDashboard';
import FilingTracker from '@/src/pages/Client/FilingTracker';
import ConsultationLanding from '@/src/pages/Consultation/ConsultationLanding';
import PricingPage from '@/src/pages/Pricing/PricingPage';

import ServicesExplorer from '@/src/pages/Services/ServicesExplorer';

import { CampaignProvider } from '@/src/services/CampaignContext';
import { AuthProvider } from '@/src/context/AuthContext';
import ProtectedRoute from '@/src/components/ProtectedRoute';
import SmartPopup from '@/src/components/Campaigns/SmartPopup';
import DynamicBanner from '@/src/components/Campaigns/DynamicBanner';

import CampaignAdmin from '@/src/pages/Admin/CampaignAdmin';

export default function App() {
  return (
    <AuthProvider>
      <CampaignProvider>
        <BrowserRouter>
          <DynamicBanner />
        <Routes>
          {/* Landing Pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/gst" element={<GstRegistrationPage />} />
          <Route path="/cs-services" element={<CsServicesPage />} />
          <Route path="/business-setup" element={<BusinessSetupPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/services" element={<ServicesExplorer />} />
          
          {/* Client Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
          <Route path="/client" element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>} />
          <Route path="/client/filings" element={<ProtectedRoute><FilingTracker /></ProtectedRoute>} />
          <Route path="/client/consult" element={<ProtectedRoute><ConsultationLanding /></ProtectedRoute>} />
          
          {/* Expert Routes */}
          <Route path="/expert" element={<ProtectedRoute><ExpertDashboard /></ProtectedRoute>} />
          <Route path="/expert/join" element={<ExpertJoinPage />} />
          <Route path="/expert/profile/:id" element={<ExpertPublicProfile />} />
          <Route path="/expert/filings" element={<ProtectedRoute><FilingTracker /></ProtectedRoute>} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute><AdminOverview /></ProtectedRoute>} />
          <Route path="/admin/campaigns" element={<ProtectedRoute><CampaignAdmin /></ProtectedRoute>} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <SmartPopup />
      </BrowserRouter>
    </CampaignProvider>
  </AuthProvider>
  );
}
