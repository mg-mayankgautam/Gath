import React, { useState } from 'react';
import { FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm your stock footage assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);

  const faqs = [
    {
      question: "What types of footage do you offer?",
      answer: "We offer a wide variety of high-quality stock footage sourced from filmmakers across India. You can find clips in HD and 4K resolutions, including stunning visuals of landscapes, cultural scenes, urban life, festivals, and much more. Some clips are available for free, while others are available for a low cost starting at Rs 79 for HD and Rs 129 for 4K."
    },
    {
      question: "Can I use your footage for any type of project?",
      answer: "Our footage is licensed for web usage only. This means it can be used in online platforms such as websites, social media, and digital ads. Please note that the license does not cover use in television, cinema, or any other non-web applications."
    },
    {
      question: "Are all your videos royalty-free?",
      answer: "Most of our footage is royalty-free, meaning you can use it without additional payments after the initial purchase. However, some clips are not royalty-free and will be clearly tagged as such on the website. Non-royalty-free footage may come with additional restrictions, so please check the license details carefully before purchasing."
    },
    {
      question: "Can I resell or redistribute the footage I purchase?",
      answer: "No, the license does not grant you the right to resell or redistribute any of our footage. Our clips are only available for use in your projects, and any resale, redistribution, or commercial exploitation of the footage outside of its intended usage is prohibited."
    },
    {
      question: "What is the difference between HD and 4K footage?",
      answer: "HD footage has a resolution of 1920x1080 pixels, while 4K footage has a higher resolution of 3840x2160 pixels. 4K footage offers greater detail and clarity, making it suitable for larger screens, higher-end productions, or projects that require more visual precision."
    },
    {
      question: "Do you offer subscription plans?",
      answer: "Yes, we offer two subscription plans:\nMonthly Plan: Rs 1800/month for unlimited downloads.\nAnnual Plan: Rs 1000/month (billed annually) for unlimited downloads.\nWith both plans, you can download as many clips as you need throughout your subscription period."
    },
    {
      question: "How can I download free footage?",
      answer: "To download free footage, simply browse through our free section on the website. Each free clip will have a download button, and you can access the footage without any payment. However, please note that some free clips may come with usage restrictions, so be sure to check the license terms."
    },
    {
      question: "What does 'Royalty-Free' mean?",
      answer: "Royalty-free means that once you purchase the footage, you can use it without paying additional fees or royalties for each use. However, it is still subject to specific licensing terms (e.g., web use only). Royalty-free footage allows you to use the clip multiple times in your projects without further charges."
    },
    {
      question: "What does 'Non-Royalty-Free' footage mean?",
      answer: "Non-royalty-free footage is subject to additional restrictions and fees. It may have specific usage rights, such as requiring additional payments for extended use, or it may come with more limited terms compared to royalty-free clips. These clips will be clearly marked as 'Non-Royalty-Free' on the website."
    },
    {
      question: "Can I edit or modify the footage I purchase?",
      answer: "Yes, you can edit and modify the footage for use in your projects, such as cropping, color grading, or incorporating it into your own work. However, you are not allowed to resell or redistribute the raw footage in its original or modified form."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "If you are on the monthly plan, you can cancel your subscription anytime. If you're on the annual plan, the payment is non-refundable, but you can still cancel your subscription at any time to avoid future charges."
    },
    {
      question: "What is the payment method for purchasing footage or subscribing?",
      answer: "We accept a variety of payment methods, including credit and debit cards, and popular online payment platforms. The available payment methods will be listed during checkout."
    },
    {
      question: "How do I know if the footage is appropriate for my project?",
      answer: "Each clip on our website comes with a preview, description, and detailed metadata to help you assess whether it fits your needs. You can also filter footage based on categories such as location, theme, and resolution. Always check the licensing terms to make sure the clip's usage aligns with your project requirements."
    },
    {
      question: "Are your clips sourced from professionals?",
      answer: "Yes, all our footage is sourced from talented filmmakers and creators across India. We collaborate with professionals to bring you authentic, high-quality clips that showcase the beauty and diversity of India."
    },
    {
      question: "Can I get a custom quote for specific footage needs?",
      answer: "If you need custom footage or have specific requirements, please reach out to our support team via the contact page. We can discuss your project needs and provide you with a quote for custom footage or licensing."
    },
    {
      question: "How often do you add new footage?",
      answer: "We update our library with fresh clips every 30 days. We're also working hard to expand our collection based on what users are searching for—so let us know what you'd like to see more of!"
    },
    {
      question: "What if I need RAW footage or something specific?",
      answer: "No problem! If you're looking for RAW clips or have a specific request, just reach out through the help section of our app. We'll do our best to assist you."
    },
    {
      question: "I'm having trouble downloading a file—what should I do?",
      answer: "If you run into any download issues, head to the help section in our app and let us know. Our team will sort it out for you as quickly as possible."
    }
  ];

  const quickQuestions = [
    "What types of footage do you offer?",
    "Can I use footage for commercial projects?",
    "What's the difference between HD and 4K?",
    "Do you offer subscription plans?"
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages([...messages, { text: input, sender: 'user' }]);
    
    // Find matching FAQ
    const matchedFaq = faqs.find(faq => 
      faq.question.toLowerCase().includes(input.toLowerCase()) ||
      input.toLowerCase().includes(faq.question.toLowerCase())
    );
    
    // Bot response
    setTimeout(() => {
      if (matchedFaq) {
        setMessages(prev => [...prev, { text: matchedFaq.answer, sender: 'bot' }]);
      } else {
        setMessages(prev => [...prev, { 
          text: "I'm not sure I understand. Could you try asking differently? Here are some common questions:", 
          sender: 'bot' 
        }]);
        setShowQuickQuestions(true);
      }
    }, 500);
    
    setInput('');
    setShowQuickQuestions(false);
  };

  const handleQuickQuestion = (question) => {
    setInput(question);
    handleSend();
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-lg shadow-lg bg-white">
      {/* Chat header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center">
        <FiMessageSquare className="mr-2" />
        <h3 className="font-semibold">Stock Footage Assistant</h3>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-3 rounded-lg ${
              msg.sender === 'user' 
                ? 'bg-blue-100 rounded-tr-none' 
                : 'bg-gray-100 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        
        {/* Quick questions */}
        {showQuickQuestions && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickQuestion(q)}
                  className="text-xs bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-full"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Input area */}
      <div className="p-4 border-t flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your question..."
          className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;