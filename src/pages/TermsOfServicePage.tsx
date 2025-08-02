import React from 'react';
import { FileText, AlertTriangle, Scale, CheckCircle } from 'lucide-react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-green-100 rounded-full">
                <FileText className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600">
              Please read these terms carefully before using SmartSpace services.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: August 2, 2025
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
            
            {/* Agreement */}
            <section>
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">Agreement to Terms</h2>
              </div>
              <p className="text-gray-600">
                By accessing and using SmartSpace ("the Service"), you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            {/* Service Description */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Service Description</h2>
              <div className="text-gray-600 space-y-4">
                <p>SmartSpace provides an online platform that allows users to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Browse and search available meeting rooms, conference halls, and workspaces</li>
                  <li>Book spaces for specified dates and durations (per day basis)</li>
                  <li>Manage bookings and account information</li>
                  <li>Communicate with space providers</li>
                  <li>Process payments for bookings</li>
                </ul>
              </div>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Accounts</h2>
              <div className="text-gray-600 space-y-4">
                <h3 className="text-lg font-medium text-gray-800">Account Creation</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You must provide accurate and complete information when creating an account</li>
                  <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                  <li>You must be at least 18 years old to create an account</li>
                  <li>One person may not maintain more than one account</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 mt-6">Account Responsibilities</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You are responsible for all activities that occur under your account</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Keep your contact information up to date</li>
                </ul>
              </div>
            </section>

            {/* Booking Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Booking Terms</h2>
              <div className="text-gray-600 space-y-4">
                <h3 className="text-lg font-medium text-gray-800">Booking Process</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All bookings are charged on a per-day basis</li>
                  <li>Bookings are subject to availability and space owner approval</li>
                  <li>Payment is required at the time of booking</li>
                  <li>Booking confirmations will be sent via email</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 mt-6">Cancellation Policy</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cancellations made 48+ hours before the booking: Full refund</li>
                  <li>Cancellations made 24-48 hours before: 50% refund</li>
                  <li>Cancellations made less than 24 hours before: No refund</li>
                  <li>Emergency cancellations may be considered on a case-by-case basis</li>
                </ul>

                <h3 className="text-lg font-medium text-gray-800 mt-6">No-Show Policy</h3>
                <p>Failure to show up for a confirmed booking without prior cancellation will result in forfeiture of the full payment.</p>
              </div>
            </section>

            {/* Payment Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payment Terms</h2>
              <div className="text-gray-600 space-y-4">
                <ul className="list-disc pl-6 space-y-2">
                  <li>All prices are displayed in Kenyan Shillings (KSH)</li>
                  <li>Payment is processed securely through our approved payment partners (M-Pesa, PayPal)</li>
                  <li>Service fees may apply to certain transactions</li>
                  <li>Refunds will be processed to the original payment method within 5-10 business days</li>
                  <li>You are responsible for any applicable taxes</li>
                </ul>
              </div>
            </section>

            {/* User Conduct */}
            <section>
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">User Conduct</h2>
              </div>
              <div className="text-gray-600 space-y-4">
                <p>You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the service for any illegal or unauthorized purpose</li>
                  <li>Violate any laws in your jurisdiction</li>
                  <li>Transmit any worms, viruses, or malicious code</li>
                  <li>Interfere with or disrupt the service or servers</li>
                  <li>Create false accounts or impersonate others</li>
                  <li>Harass, abuse, or harm other users or space providers</li>
                  <li>Use the service for commercial purposes without authorization</li>
                  <li>Attempt to gain unauthorized access to the system</li>
                </ul>
              </div>
            </section>

            {/* Space Provider Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Space Provider Terms</h2>
              <div className="text-gray-600 space-y-4">
                <p>If you list spaces on our platform, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate descriptions and pricing information</li>
                  <li>Maintain your spaces in good condition</li>
                  <li>Honor confirmed bookings</li>
                  <li>Respond promptly to booking requests</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Pay applicable service fees</li>
                </ul>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
              <div className="text-gray-600 space-y-4">
                <p>
                  The SmartSpace platform, including its design, functionality, and content, is owned by SmartSpace Ltd 
                  and protected by copyright and other intellectual property laws.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You may not copy, modify, or distribute our content without permission</li>
                  <li>User-generated content remains your property, but you grant us license to use it</li>
                  <li>Respect the intellectual property rights of others</li>
                </ul>
              </div>
            </section>

            {/* Liability */}
            <section>
              <div className="flex items-center mb-4">
                <Scale className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">Limitation of Liability</h2>
              </div>
              <div className="text-gray-600 space-y-4">
                <p>
                  SmartSpace acts as an intermediary between users and space providers. We are not responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The quality, safety, or legality of spaces listed</li>
                  <li>The accuracy of space descriptions or amenities</li>
                  <li>Disputes between users and space providers</li>
                  <li>Damages or losses incurred during space usage</li>
                  <li>Interruptions to the service</li>
                </ul>
                <p className="mt-4">
                  Our total liability shall not exceed the amount paid for the specific booking in question.
                </p>
              </div>
            </section>

            {/* Indemnification */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Indemnification</h2>
              <p className="text-gray-600">
                You agree to indemnify and hold SmartSpace harmless from any claims, losses, damages, or expenses 
                arising from your use of the service, your violation of these terms, or your violation of any rights of others.
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Termination</h2>
              <div className="text-gray-600 space-y-4">
                <p>We may terminate or suspend your account at any time for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Violation of these terms</li>
                  <li>Fraudulent or illegal activity</li>
                  <li>Extended periods of inactivity</li>
                  <li>At our sole discretion</li>
                </ul>
                <p>
                  Upon termination, your right to use the service ceases immediately, but these terms will remain in effect.
                </p>
              </div>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-600">
                These terms are governed by the laws of Kenya. Any disputes arising from these terms or your use of 
                the service will be resolved in the courts of Kenya.
              </p>
            </section>

            {/* Modifications */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Modifications to Terms</h2>
              <p className="text-gray-600">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon 
                posting. Your continued use of the service constitutes acceptance of the modified terms.
              </p>
            </section>

            {/* Contact Information */}
            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> legal@smartspace.co.ke</p>
                <p><strong>Phone:</strong> +254 700 123 456</p>
                <p><strong>Address:</strong> SmartSpace Ltd, Nairobi, Kenya</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
