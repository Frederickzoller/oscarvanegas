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
    question: "¿Cuánto dura la recuperación de los procedimientos mínimamente invasivos?",
    answer: "El tiempo de recuperación varía según el procedimiento y los factores de salud individuales. La mayoría de los procedimientos urológicos mínimamente invasivos tienen tiempos de recuperación significativamente más cortos en comparación con la cirugía tradicional. Muchos pacientes pueden retomar sus actividades normales en un plazo de 1 a 2 semanas, aunque la recuperación total puede tomar más tiempo. El Dr. Vanegas le proporcionará pautas específicas para su recuperación."
  },
  {
    id: 5,
    question: "¿Necesito una referencia para ver al Dr. Vanegas?",
    answer: "Algunos planes de seguro requieren una referencia para consultar a un especialista, pero muchos pacientes pueden ver al Dr. Vanegas sin necesidad de una. Verifique con su proveedor de seguro si se requiere una referencia. Nuestro equipo puede ayudarle con este proceso si es necesario."
  },
  {
    id: 6,
    question: "¿Cómo puedo manejar los síntomas urológicos en casa?",
    answer: "Si bien la atención médica adecuada es esencial, existen medidas en el estilo de vida que pueden ayudar a controlar algunos síntomas urológicos. Estas incluyen mantenerse bien hidratado, llevar una alimentación saludable, realizar ejercicio regularmente, mantener una buena higiene y seguir el tratamiento médico indicado. El Dr. Vanegas le proporcionará recomendaciones personalizadas según su condición específica."
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