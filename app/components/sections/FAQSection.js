"use client"

import React, { useState } from 'react';
import styles from './FAQSection.module.css';

const faqs = [
  {
    id: 1,
    question: "¿Cómo será mi primera consulta?",
    answer: "En su primera visita, el Dr. Vanegas analizará su historial médico, evaluará sus síntomas y atenderá sus inquietudes. También llevará a cabo los exámenes pertinentes según sea necesario. Le proporcionará una explicación detallada de su condición, responderá sus dudas y diseñará un plan de tratamiento adaptado a sus necesidades. Le recomendamos traer sus expedientes médicos, una lista de sus medicamentos actuales y la información de su seguro."
  },
  {
    id: 2,
    question: "¿Cómo debo prepararme para los procedimientos quirúrgicos?",
    answer: "La preparación varía según el procedimiento. El equipo del Dr. Vanegas le proporcionará instrucciones específicas antes de su cita. Generalmente, es posible que deba ayunar durante un período determinado, ajustar su medicación y completar cualquier prueba previa requerida. Siga siempre las indicaciones específicas proporcionadas para su procedimiento."
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
          <h2>Preguntas Frecuentes</h2>
          <div className={styles.underline}></div>
          <p className={styles.sectionDescription}>
          Resuelve tus dudas sobre la atención urológica y la práctica del Dr. Vanegas.
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