<<<<<<< HEAD
import React, { useState } from "react";

const FAQ: React.FC = () => {
  // State to track which FAQ items are open
  const [openItems, setOpenItems] = useState<{[key: string]: boolean}>({});

  // Toggle function for FAQ items
  const toggleItem = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const faqs = [
    {
      category: "General Questions",
      questions: [
        {
          question: "What is Fretszy?",
          answer:
            "Fretszy is an interactive web application designed to help guitarists of all levels master the fretboard. Our note recognition game and visualization tools make learning the fretboard engaging, effective, and fun.",
        },
        {
          question: "Who is Fretszy for?",
          answer:
            "Fretszy is for guitarists of all skill levels, from beginners who are just starting to learn the notes on the fretboard to advanced players looking to improve their speed and accuracy. It's particularly helpful for self-taught guitarists who may have gaps in their fretboard knowledge.",
        },
        {
          question: "Is Fretszy free to use?",
          answer:
            "Yes! The core Fretszy note recognition tool is completely free to use. We may introduce premium features in the future, but our commitment is to always maintain a fully functional free version.",
        },
        {
          question: "Does Fretszy work on mobile devices?",
          answer:
            "Yes, Fretszy is built with a responsive design that works on smartphones, tablets, and desktop computers. The interface automatically adjusts to provide an optimal experience on any screen size.",
        },
      ],
    },
    {
      category: "Using Fretszy",
      questions: [
        {
          question: "How do I use the Note Recognition Game?",
          answer:
            "First, select your desired fret length and string range. Click 'Start Game' and you'll be prompted to identify notes that appear on the fretboard. Click the correct note name from the options provided. The game tracks your score based on correct answers within a 60-second timeframe.",
        },
        {
          question: "Can I customize the difficulty level?",
          answer:
            "Yes! You can adjust the difficulty by changing the fret range and string selection. Beginners might want to start with just 5 frets and focus on one or two strings, while more advanced players can challenge themselves with all strings across 12 or more frets.",
        },
        {
          question: "Does Fretszy work with alternate tunings?",
          answer:
            "Currently, Fretszy is optimized for standard tuning (EADGBE). We plan to add support for alternate tunings in future updates.",
        },
        {
          question: "Can I track my progress over time?",
          answer:
            "Not yet, but we're working on a feature that will allow you to create an account and track your progress, including high scores, improvement over time, and areas that need more practice.",
        },
      ],
    },
    {
      category: "Learning the Fretboard",
      questions: [
        {
          question: "Why is learning the fretboard important?",
          answer:
            "Knowing the fretboard is fundamental to becoming a proficient guitarist. It allows you to find notes quickly, understand chord construction, improvise confidently, communicate effectively with other musicians, and ultimately express yourself more freely on the instrument.",
        },
        {
          question: "How long does it take to learn the fretboard?",
          answer:
            "With consistent practice using Fretszy for just 10-15 minutes daily, most players can develop a solid working knowledge of the fretboard within 4-8 weeks. Complete mastery might take 3-6 months, depending on your practice consistency and previous experience.",
        },
        {
          question: "What's the best strategy for memorizing the fretboard?",
          answer:
            "The most effective approach combines several methods: learning reference points and octave patterns, using frameworks like the CAGED system, regular practice with tools like Fretszy, and applying your knowledge in real musical contexts such as playing songs and improvising.",
        },
        {
          question: "Do I need to know music theory to use Fretszy?",
          answer:
            "No music theory knowledge is required to use Fretszy! However, as you learn the notes on the fretboard, you'll naturally start to understand some music theory concepts, and this can enhance your overall musical development.",
        },
      ],
    },
    {
      category: "Technical Support",
      questions: [
        {
          question:
            "Fretszy isn't loading properly on my device. What should I do?",
          answer:
            "First, try refreshing the page and clearing your browser cache. Make sure you're using an up-to-date browser like Chrome, Firefox, Safari, or Edge. If problems persist, please contact us through our support form with details about your device and the issue you're experiencing.",
        },
        {
          question: "Can I use Fretszy offline?",
          answer:
            "Currently, Fretszy requires an internet connection. However, we're exploring the possibility of developing a progressive web app (PWA) version that would allow for offline use in the future.",
        },
        {
          question: "How do I report a bug or suggest a feature?",
          answer:
            "We welcome your feedback! Please use our contact form to report bugs or suggest features. Be as specific as possible about what you experienced or what you'd like to see added to Fretszy.",
        },
        {
          question: "Is my data secure?",
          answer:
            "Yes, we take data security seriously. Fretszy collects minimal user data, and we do not share any personal information with third parties. You can read more about our data practices in our Privacy Policy.",
        },
      ],
    },
  ];

  return (
    <div className="pt-8 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2 text-center">
          Frequently Asked Questions
        </h1>
        <p className="text-center mb-8 max-w-2xl mx-auto">
          Find answers to common questions about Fretszy and learning the guitar
          fretboard. If you don't see your question here, feel free to contact
          us.
        </p>

        {/* FAQ Accordion by category */}
        <div className="space-y-6">
          {faqs.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="rounded-lg overflow-hidden border border-gray-700"
            >
              <h2 className="text-xl font-bold p-5 bg-gray-800">
                {category.category}
              </h2>
              <div>
                {category.questions.map((faq, faqIndex) => {
                  const isOpen = openItems[`${categoryIndex}-${faqIndex}`];
                  return (
                    <div key={faqIndex} className="border-t border-gray-700">
                      <button
                        onClick={() => toggleItem(categoryIndex, faqIndex)}
                        className="flex justify-between items-center w-full font-medium p-5 text-left hover:bg-gray-800 transition-colors"
                      >
                        <span className="text-lg">{faq.question}</span>
                        <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                          <svg
                            fill="none"
                            height="24"
                            shapeRendering="geometricPrecision"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            width="24"
                          >
                            <path d="M6 9l6 6 6-6"></path>
                          </svg>
                        </span>
                      </button>
                      <div 
                        className={`overflow-hidden transition-all duration-300 ${
                          isOpen ? 'max-h-96 p-5 pl-8' : 'max-h-0'
                        }`}
                      >
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions section */}
        <div className="mt-12 bg-blue-900 bg-opacity-20 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-2">Still Have Questions?</h2>
          <p className="max-w-xl mx-auto mb-6">
            We're here to help! If you couldn't find the answer you were looking
            for, please reach out to us and we'll get back to you as soon as
            possible.
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
=======
import React from 'react';
import Layout from '../components/layout/Layout';

const FAQ: React.FC = () => {
    const faqs = [
        {
            category: "General Questions",
            questions: [
                {
                    question: "What is Fretszy?",
                    answer: "Fretszy is an interactive web application designed to help guitarists of all levels master the fretboard. Our note recognition game and visualization tools make learning the fretboard engaging, effective, and fun."
                },
                {
                    question: "Who is Fretszy for?",
                    answer: "Fretszy is for guitarists of all skill levels, from beginners who are just starting to learn the notes on the fretboard to advanced players looking to improve their speed and accuracy. It's particularly helpful for self-taught guitarists who may have gaps in their fretboard knowledge."
                },
                {
                    question: "Is Fretszy free to use?",
                    answer: "Yes! The core Fretszy note recognition tool is completely free to use. We may introduce premium features in the future, but our commitment is to always maintain a fully functional free version."
                },
                {
                    question: "Does Fretszy work on mobile devices?",
                    answer: "Yes, Fretszy is built with a responsive design that works on smartphones, tablets, and desktop computers. The interface automatically adjusts to provide an optimal experience on any screen size."
                }
            ]
        },
        {
            category: "Using Fretszy",
            questions: [
                {
                    question: "How do I use the Note Recognition Game?",
                    answer: "First, select your desired fret length and string range. Click 'Start Game' and you'll be prompted to identify notes that appear on the fretboard. Click the correct note name from the options provided. The game tracks your score based on correct answers within a 60-second timeframe."
                },
                {
                    question: "Can I customize the difficulty level?",
                    answer: "Yes! You can adjust the difficulty by changing the fret range and string selection. Beginners might want to start with just 5 frets and focus on one or two strings, while more advanced players can challenge themselves with all strings across 12 or more frets."
                },
                {
                    question: "Does Fretszy work with alternate tunings?",
                    answer: "Currently, Fretszy is optimized for standard tuning (EADGBE). We plan to add support for alternate tunings in future updates."
                },
                {
                    question: "Can I track my progress over time?",
                    answer: "Not yet, but we're working on a feature that will allow you to create an account and track your progress, including high scores, improvement over time, and areas that need more practice."
                }
            ]
        },
        {
            category: "Learning the Fretboard",
            questions: [
                {
                    question: "Why is learning the fretboard important?",
                    answer: "Knowing the fretboard is fundamental to becoming a proficient guitarist. It allows you to find notes quickly, understand chord construction, improvise confidently, communicate effectively with other musicians, and ultimately express yourself more freely on the instrument."
                },
                {
                    question: "How long does it take to learn the fretboard?",
                    answer: "With consistent practice using Fretszy for just 10-15 minutes daily, most players can develop a solid working knowledge of the fretboard within 4-8 weeks. Complete mastery might take 3-6 months, depending on your practice consistency and previous experience."
                },
                {
                    question: "What's the best strategy for memorizing the fretboard?",
                    answer: "The most effective approach combines several methods: learning reference points and octave patterns, using frameworks like the CAGED system, regular practice with tools like Fretszy, and applying your knowledge in real musical contexts such as playing songs and improvising."
                },
                {
                    question: "Do I need to know music theory to use Fretszy?",
                    answer: "No music theory knowledge is required to use Fretszy! However, as you learn the notes on the fretboard, you'll naturally start to understand some music theory concepts, and this can enhance your overall musical development."
                }
            ]
        },
        {
            category: "Technical Support",
            questions: [
                {
                    question: "Fretszy isn't loading properly on my device. What should I do?",
                    answer: "First, try refreshing the page and clearing your browser cache. Make sure you're using an up-to-date browser like Chrome, Firefox, Safari, or Edge. If problems persist, please contact us through our support form with details about your device and the issue you're experiencing."
                },
                {
                    question: "Can I use Fretszy offline?",
                    answer: "Currently, Fretszy requires an internet connection. However, we're exploring the possibility of developing a progressive web app (PWA) version that would allow for offline use in the future."
                },
                {
                    question: "How do I report a bug or suggest a feature?",
                    answer: "We welcome your feedback! Please use our contact form to report bugs or suggest features. Be as specific as possible about what you experienced or what you'd like to see added to Fretszy."
                },
                {
                    question: "Is my data secure?",
                    answer: "Yes, we take data security seriously. Fretszy collects minimal user data, and we do not share any personal information with third parties. You can read more about our data practices in our Privacy Policy."
                }
            ]
        }
    ];

    return (
        <Layout>
            <div className="pt-20 pb-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-3xl font-bold mb-2 text-center">Frequently Asked Questions</h1>
                    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                        Find answers to common questions about Fretszy and learning the guitar fretboard.
                        If you don't see your question here, feel free to contact us.
                    </p>

                    {/* FAQ Accordion by category */}
                    <div className="space-y-8">
                        {faqs.map((category, categoryIndex) => (
                            <div key={categoryIndex} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <h2 className="text-xl font-bold bg-gray-50 p-5 border-b">{category.category}</h2>
                                <div className="divide-y">
                                    {category.questions.map((faq, faqIndex) => (
                                        <details key={faqIndex} className="group">
                                            <summary className="flex justify-between items-center font-medium cursor-pointer p-5 hover:bg-gray-50">
                                                <span className="text-lg">{faq.question}</span>
                                                <span className="transition group-open:rotate-180">
                                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                                        <path d="M6 9l6 6 6-6"></path>
                                                    </svg>
                                                </span>
                                            </summary>
                                            <div className="text-gray-700 p-5 pt-0 pl-8">
                                                <p>{faq.answer}</p>
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Still have questions section */}
                    <div className="mt-12 bg-blue-50 p-8 rounded-lg text-center">
                        <h2 className="text-2xl font-bold mb-2">Still Have Questions?</h2>
                        <p className="max-w-xl mx-auto mb-6">
                            We're here to help! If you couldn't find the answer you were looking for,
                            please reach out to us and we'll get back to you as soon as possible.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors duration-300"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
>>>>>>> 9e8b03c4c11e3fee722852612c1ccd6987ae5506
};

export default FAQ;