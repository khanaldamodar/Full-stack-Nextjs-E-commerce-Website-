"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  return (
    <section className="min-h-screen py-20 px-6 md:px-20 text-gray-700">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Privacy <span className="text-[#d86d38]">Policy</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your privacy matters to us. Learn how Set Nepal collects, uses, and protects your data.
        </p>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md shadow-xl rounded-3xl p-8 md:p-12 space-y-10"
      >
        {/* Section 1 */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            1. Information We Collect
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We collect information that you provide directly to us when you make a purchase,
            create an account, subscribe to our newsletter, or contact us for support.
            This may include your name, email address, shipping details, and payment information.
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Your data helps us improve your shopping experience. We use it to:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-1 mt-2">
            <li>Process your orders and payments securely</li>
            <li>Provide personalized product recommendations</li>
            <li>Send order updates, offers, and newsletters (with your consent)</li>
            <li>Enhance our website performance and customer service</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            3. Data Security
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We implement industry-standard measures to safeguard your information.  
            All transactions are encrypted using SSL technology to ensure your personal data is protected from unauthorized access or disclosure.
          </p>
        </div>

        {/* Section 4 */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            4. Sharing of Information
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We do not sell or rent your personal data.  
            We may share limited information with trusted third-party services (such as delivery partners or payment gateways)
            strictly for order fulfillment and platform functionality.
          </p>
        </div>

        {/* Section 5 */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            5. Your Rights
          </h2>
          <p className="text-gray-600 leading-relaxed">
            You have full control over your personal information. You may:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-1 mt-2">
            <li>Request access to your stored data</li>
            <li>Ask for corrections or deletion of inaccurate information</li>
            <li>Opt-out of promotional emails anytime</li>
          </ul>
        </div>

        {/* Section 6 */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            6. Cookies Policy
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our website uses cookies to improve your browsing experience and analyze traffic.
            You can choose to disable cookies through your browser settings,
            but certain features may not function properly without them.
          </p>
        </div>

        {/* Section 7 */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            7. Changes to This Policy
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We may occasionally update our Privacy Policy to reflect changes in our practices or legal requirements.
            Any modifications will be posted on this page with the updated date.
          </p>
        </div>

        {/* Section 8 */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            8. Contact Us
          </h2>
          <p className="text-gray-600 leading-relaxed">
            If you have questions or concerns about our Privacy Policy,
            please reach out to us at{" "}
            <span className="font-medium text-[#d86d38]">privacy@setnepal.com</span>.
          </p>
        </div>
      </motion.div>

      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-36 h-36 bg-[#d86d38]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-300/20 rounded-full blur-3xl animate-pulse"></div>
    </section>
  );
}
