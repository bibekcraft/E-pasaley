import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-screen-xl p-4 mx-auto sm:p-8">
      <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">Privacy Policy</h1>
      <p className="mb-4 text-center text-gray-600">Last updated: 2081/06/21</p>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 font-semibold text-left text-gray-700 border-b">Section</th>
            <th className="px-6 py-3 font-semibold text-left text-gray-700 border-b">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-gray-600 border-b">1. Information We Collect</td>
            <td className="px-6 py-4 text-gray-600 border-b">
              We collect information you provide directly to us, such as your name, email address, phone number, and shipping address.
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-gray-600 border-b">2. How We Use Your Information</td>
            <td className="px-6 py-4 text-gray-600 border-b">
              We use your information to process orders, communicate with you about your account, and improve our services.
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-gray-600 border-b">3. Sharing Your Information</td>
            <td className="px-6 py-4 text-gray-600 border-b">
              We do not sell or rent your personal information. We may share your information with trusted third parties to assist with order fulfillment and payment processing.
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-gray-600 border-b">4. Data Security</td>
            <td className="px-6 py-4 text-gray-600 border-b">
              We implement reasonable security measures to protect your information from unauthorized access and disclosure.
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-gray-600 border-b">5. Your Rights</td>
            <td className="px-6 py-4 text-gray-600 border-b">
              You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us.
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-gray-600 border-b">6. Cookies</td>
            <td className="px-6 py-4 text-gray-600 border-b">
              We use cookies and similar technologies to enhance your experience on our website. You can manage cookie preferences in your browser settings.
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-gray-600 border-b">7. Third-Party Links</td>
            <td className="px-6 py-4 text-gray-600 border-b">
              Our website may contain links to third-party sites. We are not responsible for the privacy practices of those sites.
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-gray-600 border-b">8. Changes to This Privacy Policy</td>
            <td className="px-6 py-4 text-gray-600 border-b">
              We may update our privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-gray-600 border-b">9. Contact Us</td>
            <td className="px-6 py-4 text-gray-600 border-b">
            For any questions ,please contact us at shopwithepasale@gmail.com or 9705970545.
            </td>

          </tr>
        </tbody>
      </table>
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          By using our services, you acknowledge that you have read and understood this privacy policy.
        </p>
      </div>
    </div>
  );
}
