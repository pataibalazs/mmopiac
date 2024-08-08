import React from 'react';

const faqs = [
  {
    question: "What am I getting as a Premium Member?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et ipsum sapien. Vestibulum molestie porttitor augue vitae vulputate. Aliquam nec ex maximus, suscipit diam vel, tristique tellus."
  },
  {
    question: "What are the benefits of using our service?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et ipsum sapien. Vestibulum molestie porttitor augue vitae vulputate. Aliquam nec ex maximus, suscipit diam vel, tristique tellus."
  },
  {
    question: "How can I contact customer support?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et ipsum sapien. Vestibulum molestie porttitor augue vitae vulputate. Aliquam nec ex maximus, suscipit diam vel, tristique tellus."
  },
  {
    question: "Can I upgrade my membership later?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et ipsum sapien. Vestibulum molestie porttitor augue vitae vulputate. Aliquam nec ex maximus, suscipit diam vel, tristique tellus."
  }
];

const Accordion = () => {
  return (
    <ul className="max-w-2xl mx-auto space-y-4 w-full">
      {faqs.map((faq, index) => (
        <li key={index} className="shadow-md">
          <details className="group w-full rounded-md">
            <summary className="flex items-center gap-3 px-6 py-4 font-medium marker:content-none cursor-pointer w-full bg-amber-200">
              <svg className="w-5 h-5 text-gray-500 transition-transform duration-200 group-open:rotate-90" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
              </svg>
              <span className="text-lg font-medium">{faq.question}</span>
            </summary>
            <article className="px-4 pb-4 bg-amber-200">
              <p>{faq.answer}</p>
            </article>
          </details>
        </li>
      ))}
    </ul>
  );
};

export default Accordion;
