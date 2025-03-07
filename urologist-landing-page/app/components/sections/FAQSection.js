import React, { useState } from 'react';
import styles from './FAQSection.module.css';

const faqs = [
  {
    id: 1,
    question: "What should I expect during my first consultation?",
    answer: "During your first consultation, Dr. Smith will review your medical history, discuss your symptoms and concerns, and perform any necessary examinations. He'll explain your condition, answer questions, and develop a personalized treatment plan. Please bring your medical records, list of medications, and insurance information."
  },
  {
    id: 2,
    question: "How do I prepare for urological procedures?",
    answer: "Preparation varies depending on the procedure. Dr. Smith's team will provide specific instructions prior to your appointment. Generally, you may need to fast for a certain period, adjust medications, arrange transportation home for certain procedures, and complete any required pre-procedure testing. Always follow the specific guidelines provided for your procedure."
  },
  {
    id: 3,
    question: "What insurance plans do you accept?",
    answer: "We accept most major insurance plans including Medicare, Blue Cross Blue Shield, Aetna, Cigna, and UnitedHealthcare. Our administrative team will verify your coverage before your appointment and discuss any potential out-of-pocket costs. Please bring your insurance card to your appointment."
  },
  {
    id: 4,
    question: "How long is the recovery for minimally invasive procedures?",
    answer: "Recovery time varies by procedure and individual health factors. Most minimally invasive urological procedures have significantly shorter recovery times compared to traditional surgery. Many patients return to normal activities within 1-2 weeks, though complete recovery might take longer. Dr. Smith will provide specific recovery guidelines for your procedure."
  },
  {
    id: 5,
    question: "Do I need a referral to see Dr. Smith?",
    answer: "While some insurance plans require referrals to see specialists, many patients see Dr. Smith without a referral. Check with your insurance provider regarding their referral requirements. Our staff can help guide you through this process if needed."
  },
  {
    id: 6,
    question: "How can I manage urological symptoms at home?",
    answer: "While proper medical care is essential, there are lifestyle measures that can help manage some urological symptoms. These include staying well-hydrated, maintaining a healthy diet, regular exercise, practicing good hygiene, and following medication schedules. Dr. Smith will provide personalized recommendations based on your specific condition."
  }
];

const FAQSection = () => {
  const [openId, setOpenId] = useState(null);
  
  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };
  
  return (
    <section id="faq" className={styles.faq}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Frequently Asked Questions</h2>
          <div className={styles.underline}></div>
          <p className={styles.sectionDescription}>
            Find answers to common questions about urological care and Dr. Smith's practice.
          </p>
        </div>
        
        <div className={styles.faqContainer}>
          {faqs.map((faq) => (
            <div 
              key={faq.id} 
              className={`${styles.faqItem} ${openId === faq.id ? styles.open : ''}`}
            >
              <button 
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(faq.id)}
                aria-expanded={openId === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                {faq.question}
                <span className={styles.faqIcon}>{openId === faq.id ? '−' : '+'}</span>
              </button>
              <div 
                id={`faq-answer-${faq.id}`}
                className={styles.faqAnswer}
                style={{ maxHeight: openId === faq.id ? '1000px' : '0' }}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;