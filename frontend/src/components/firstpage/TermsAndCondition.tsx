import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="max-w-screen-xl p-4 mx-auto sm:p-8">
      <h1 className="mb-6 text-3xl font-bold text-center text-green-800">Terms and Conditions</h1>
      <p className="mb-4 text-center text-green-800">Last updated: 2081/06/21</p>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 font-semibold text-left text-gray-700 border-b">Section</th>
            <th className="px-6 py-3 font-semibold text-left text-gray-700 border-b">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-gray-600 border-b">1. Acceptance of Terms</td>
            <td className="px-6 py-4 text-gray-600 border-b">
              By using our website, you agree to these terms and conditions.
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-gray-600 border-b">2. Changes to Terms</td>
            <td className="px-6 py-4 text-gray-600 border-b">
              We may modify these terms at any time. Changes will be posted on this page.
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-gray-600 border-b">3. User Accounts</td>
            <td className="px-6 py-4 text-gray-600 border-b">
              Users are responsible for maintaining the confidentiality of their account information.
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-gray-600 border-b">4. Product Information</td>
            <td className="px-6 py-4 text-gray-600 border-b">
              We strive to ensure that product information is accurate. However, errors may occur.
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-gray-600 border-b">5. Order Processing</td>
            <td className="px-6 py-4 text-gray-600 border-b">
              Orders are processed within 7 business days. You will receive a confirmation email upon shipment.
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-gray-600 border-b">6. Manufacturing Defects</td>
            <td className="px-6 py-4 text-gray-600 border-b">
              If a product has a manufacturing defect, you must contact us and return the product within 3 days. 
              To validate the return, you must provide a video of the product being opened.
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-gray-600 border-b">7. Returns and Refunds</td>
            <td className="px-6 py-4 text-gray-600 border-b">
              Returns are accepted within 3 days of receiving the product. Items must be in original condition.
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-gray-600 border-b">8. Shipping Policy</td>
            <td className="px-6 py-4 text-gray-600 border-b">
              We offer shipping to Nepal. Shipping costs are calculated at checkout.
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-gray-600 border-b">9. Privacy Policy</td>
            <td className="px-6 py-4 text-gray-600 border-b">
              Your privacy is important to us. Please review our Privacy Policy for details on how we collect, use, and protect your information.
            </td>
          </tr>
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 text-gray-600 border-b">10. Contact Us</td>
            <td className="px-6 py-4 text-gray-600 border-b">
              For any questions about these terms, please contact us at shopwithepasale@gmail.com or 9705970545.
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          By using our services, you acknowledge that you have read and understood these terms.
        </p>
      </div>
    </div>
  );
}
