"use client"

import React, { useState } from 'react';
import styles from './FAQSection.module.css';

const faqs = [
  {
    id: 1,
    question: "¿Cómo será mi primera consulta?",
    answer: "En tu primera visita, el Dr. Vanegas analizará tu historial médico, evaluará tus síntomas y atenderá tus inquietudes. También hará los exámenes necesarios según tu caso. Te explicará en detalle tu condición, responderá todas tus dudas y diseñará un plan de tratamiento personalizado para ti. Te recomendamos traer tus expedientes médicos, una lista de los medicamentos que tomas actualmente y la información de tu seguro."
  },
  {
    id: 2,
    question: "¿Cómo debo prepararme para los procedimientos quirúrgicos?",
    answer: "La preparación varía según el procedimiento. El equipo del Dr. Vanegas te dará instrucciones específicas antes de tu cita. Normalmente, es posible que debas ayunar durante un tiempo determinado, ajustar tus medicamentos y completar cualquier prueba previa que se requiera. Siempre sigue las indicaciones que te den para tu procedimiento específico."
  },
  {
    id: 3,
    question: "What insurance plans do you accept?",
    answer: "We accept most major insurance plans including Medicare, Blue Cross Blue Shield, Aetna, Cigna, and UnitedHealthcare. Our administrative team will verify your coverage before your appointment and discuss any potential out-of-pocket costs. Please bring your insurance card to your appointment."
  },
  {
    id: 4,
    question: "¿Cuánto dura la recuperación de los procedimientos mínimamente invasivos?",
    answer: "El tiempo de recuperación depende del procedimiento y de tu estado de salud. La mayoría de los procedimientos urológicos mínimamente invasivos tienen tiempos de recuperación mucho más cortos que la cirugía tradicional. Muchos pacientes pueden volver a sus actividades normales en 1 o 2 semanas, aunque la recuperación completa puede tomar más tiempo. El Dr. Vanegas te dará instrucciones específicas para tu recuperación."
  },
  {
    id: 5,
    question: "¿Necesito una referencia para ver al Dr. Vanegas?",
    answer: "Algunos seguros requieren una referencia para ver a un especialista, pero muchos pacientes pueden consultar al Dr. Vanegas sin necesitarla. Verifica con tu seguro si necesitas una referencia. Nuestro equipo puede ayudarte con este proceso si lo necesitas."
  },
  {
    id: 6,
    question: "¿Cómo puedo manejar los síntomas urológicos en casa?",
    answer: "Aunque es esencial recibir atención médica adecuada, hay cosas que puedes hacer en casa para controlar algunos síntomas urológicos. Por ejemplo: tomar suficiente agua, seguir una dieta saludable, hacer ejercicio regularmente, mantener una buena higiene y seguir el tratamiento que te indicó el médico. El Dr. Vanegas te dará recomendaciones personalizadas según tu caso específico."
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