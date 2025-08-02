import React from 'react';
import { Cookie, Settings, Info, Shield } from 'lucide-react';

const CookiePolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-orange-100 rounded-full">
                <Cookie className="w-12 h-12 text-orange-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
            <p className="text-lg text-gray-600">
              Learn about how we use cookies and similar technologies on SmartSpace.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: August 2, 2025
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
            
            {/* What are Cookies */}
            <section>
              <div className="flex items-center mb-4">
                <Info className="w-6 h-6 text-orange-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">What Are Cookies?</h2>
              </div>
              <div className="text-gray-600 space-y-4">
                <p>
                  Cookies are small text files that are stored on your device when you visit our website. They help us 
                  provide you with a better experience by remembering your preferences and analyzing how you use our service.
                </p>
                <p>
                  We also use similar technologies like web beacons, pixels, and local storage to collect information 
                  about your interactions with our platform.
                </p>
              </div>
            </section>

            {/* Types of Cookies */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Types of Cookies We Use</h2>
              
              <div className="space-y-6">
                {/* Essential Cookies */}
                <div className="border-l-4 border-red-500 pl-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Essential Cookies</h3>
                  <p className="text-gray-600 mb-3">
                    These cookies are necessary for the website to function properly. They cannot be disabled.
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-1">
                    <li>Authentication and security</li>
                    <li>Shopping cart functionality</li>
                    <li>Load balancing</li>
                    <li>Basic website functionality</li>
                  </ul>
                </div>

                {/* Performance Cookies */}
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Performance Cookies</h3>
                  <p className="text-gray-600 mb-3">
                    These cookies help us understand how visitors interact with our website by collecting anonymous information.
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-1">
                    <li>Google Analytics for website traffic analysis</li>
                    <li>Page loading performance monitoring</li>
                    <li>Error tracking and debugging</li>
                    <li>Feature usage statistics</li>
                  </ul>
                </div>

                {/* Functional Cookies */}
                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Functional Cookies</h3>
                  <p className="text-gray-600 mb-3">
                    These cookies enable enhanced functionality and personalization.
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-1">
                    <li>Language preferences</li>
                    <li>User interface customizations</li>
                    <li>Accessibility settings</li>
                    <li>Remember user choices</li>
                  </ul>
                </div>

                {/* Marketing Cookies */}
                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Marketing Cookies</h3>
                  <p className="text-gray-600 mb-3">
                    These cookies are used to deliver relevant advertisements and track the effectiveness of our marketing campaigns.
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-1">
                    <li>Targeted advertising</li>
                    <li>Social media integration</li>
                    <li>Marketing campaign tracking</li>
                    <li>Retargeting advertisements</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Specific Cookies */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Specific Cookies We Use</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Cookie Name</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Purpose</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Duration</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3 text-sm text-gray-600">smartspace_session</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Maintains user session</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Session</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Essential</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 text-sm text-gray-600">auth_token</td>
                      <td className="px-4 py-3 text-sm text-gray-600">User authentication</td>
                      <td className="px-4 py-3 text-sm text-gray-600">30 days</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Essential</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 text-sm text-gray-600">preferences</td>
                      <td className="px-4 py-3 text-sm text-gray-600">User preferences</td>
                      <td className="px-4 py-3 text-sm text-gray-600">1 year</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Functional</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 text-sm text-gray-600">_ga</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Google Analytics tracking</td>
                      <td className="px-4 py-3 text-sm text-gray-600">2 years</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Performance</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 text-sm text-gray-600">marketing_consent</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Marketing preferences</td>
                      <td className="px-4 py-3 text-sm text-gray-600">1 year</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Marketing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Third Party Cookies */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Cookies</h2>
              <div className="text-gray-600 space-y-4">
                <p>We use cookies from the following third-party services:</p>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800">Google Analytics</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Provides website analytics and user behavior insights.
                    </p>
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:underline text-sm">
                      Google Privacy Policy
                    </a>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800">PayPal</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Processes payments and maintains transaction security.
                    </p>
                    <a href="https://www.paypal.com/privacy" target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:underline text-sm">
                      PayPal Privacy Policy
                    </a>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800">Safaricom M-Pesa</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Mobile payment processing for Kenyan users.
                    </p>
                    <a href="https://www.safaricom.co.ke/privacy-policy" target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:underline text-sm">
                      Safaricom Privacy Policy
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Managing Cookies */}
            <section>
              <div className="flex items-center mb-4">
                <Settings className="w-6 h-6 text-orange-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">Managing Your Cookie Preferences</h2>
              </div>
              <div className="text-gray-600 space-y-4">
                <h3 className="text-lg font-medium text-gray-800">Browser Settings</h3>
                <p>You can control cookies through your browser settings:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Preferences → Privacy & Security → Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                  <li><strong>Edge:</strong> Settings → Site permissions → Cookies and site data</li>
                </ul>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                  <div className="flex">
                    <Shield className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Important Note</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Disabling certain cookies may affect the functionality of SmartSpace. Essential cookies 
                        cannot be disabled as they are necessary for the service to work properly.
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-medium text-gray-800 mt-6">Opt-Out Options</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Google Analytics:</strong> Use the{' '}
                    <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:underline">
                      Google Analytics Opt-out Browser Add-on
                    </a>
                  </li>
                  <li>
                    <strong>Marketing Cookies:</strong> Adjust your preferences in your account settings
                  </li>
                  <li>
                    <strong>Do Not Track:</strong> We respect browser Do Not Track signals
                  </li>
                </ul>
              </div>
            </section>

            {/* Mobile Devices */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Mobile Devices</h2>
              <div className="text-gray-600 space-y-4">
                <p>
                  On mobile devices, we may use mobile identifiers and similar technologies to provide 
                  you with personalized experiences.
                </p>
                <h3 className="text-lg font-medium text-gray-800">Managing Mobile Preferences</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>iOS:</strong> Settings → Privacy → Advertising → Limit Ad Tracking</li>
                  <li><strong>Android:</strong> Settings → Google → Ads → Opt out of Ads Personalization</li>
                </ul>
              </div>
            </section>

            {/* Updates */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Updates to This Policy</h2>
              <p className="text-gray-600">
                We may update this Cookie Policy from time to time to reflect changes in our practices or 
                for other operational, legal, or regulatory reasons. We will notify you of any significant 
                changes by posting the updated policy on this page.
              </p>
            </section>

            {/* Contact Information */}
            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Questions About Cookies?</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> privacy@smartspace.co.ke</p>
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

export default CookiePolicyPage;
