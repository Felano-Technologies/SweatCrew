import { useState } from "react";

const faqs = [
  {
    question: "What is SweatCrew?",
    answer:
      "SweatCrew is a platform that connects you with expert coaches, personalized challenges, and a community to support your fitness journey.",
  },
  {
    question: "Is SweatCrew free to use?",
    answer:
      "You can join for free and explore many features. Premium coaching and challenge plans are available for a fee.",
  },
  {
    question: "How do I find a coach?",
    answer:
      "Simply click on 'Get a Coach' in the navbar or explore our expert section to connect with top fitness professionals.",
  },
  {
    question: "Can I track my progress?",
    answer:
      "Yes! SweatCrew offers built-in tools to track workouts, diet, and overall health progress.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-16" id="faq">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 text-left">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full text-left flex justify-between items-center"
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                <span className="text-gray-400 text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
