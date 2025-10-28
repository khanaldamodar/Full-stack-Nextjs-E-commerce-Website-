"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major debit and credit cards, as well as digital wallets such as eSewa, Khalti, and Fonepay.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Orders within Nepal are typically delivered within 3–5 business days depending on your location.",
  },
  {
    question: "Can I return a product?",
    answer:
      "Yes, we offer a 7-day return policy for unused and undamaged products. Please read our Return Policy for more details.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Currently, we only ship within Nepal. We plan to expand our international shipping options soon!",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "Absolutely! We use end-to-end encryption and do not share your personal data with any third party without your consent.",
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen py-20 px-6 md:px-16 lg:px-32 lg:py-30">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Find quick answers to common questions about shopping, delivery, and our services.
        </p>
      </motion.div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left"
            >
              <span className="text-lg font-semibold text-gray-800">
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="text-gray-600 w-5 h-5" />
              </motion.div>
            </button>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={
                openIndex === index
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.4 }}
              className="overflow-hidden px-6 pb-4"
            >
              <p className="text-gray-600">{faq.answer}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Contact Suggestion */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">
          Still have questions?
        </h3>
        <p className="text-gray-600 mb-6">
          Contact our support team and we’ll be happy to help you.
        </p>
        <a
          href="/contact"
          className="bg-linear-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-xl transition-all duration-300"
        >
          Contact Support
        </a>
      </motion.div>
    </section>
  );
};

export default FAQPage;
