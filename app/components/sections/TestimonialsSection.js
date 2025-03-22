"use client"

import React, { useState } from 'react';
import styles from './TestimonialsSection.module.css';

const testimonials = [
  {
    id: 1,
    name: "Ricardo Fernández",
    text: "El Dr. Vanegas es un profesional excepcional. Se tomó el tiempo de explicarme mi condición con detalle y me presentó todas las opciones de tratamiento. Su experiencia y trato cálido hicieron que una situación estresante fuera mucho más fácil de sobrellevar.",
    rating: 5,
  },
  {
    id: 2,
    name: "Andrés Herrera",
    text: "Me diagnosticaron un problema prostático y estaba muy preocupado. El Dr. Palacios no solo me explicó cada paso del tratamiento, sino que también me dio confianza y tranquilidad. Su experiencia y calidez hacen que sea un médico en quien se puede confiar completamente",
    rating: 5,
  },
  {
    id: 3,
    name: "Mariana Sánchez",
    text: "Desde la primera consulta, el Dr. Vanegas me brindó una atención excepcional. Me explicó todo con claridad y respondió cada una de mis preguntas con paciencia. Gracias a su tratamiento, mi problema se resolvió y hoy me siento mucho mejor. Lo recomiendo totalmente.",
    rating: 5,
  },
  {
    id: 4,
    name: "Javier Muñoz",
    text: "Tenía muchas dudas y preocupaciones sobre mi salud, pero el Dr. Palacios me hizo sentir seguro desde el primer momento. Su profesionalismo y trato humano marcaron la diferencia. Estoy muy agradecido por su ayuda.",
    rating: 4,
  },
  {
    id: 5,
    name: "Fernando Gutiérrez",
    text: "El Dr. Vanegas es un especialista excepcional que realmente se preocupa por sus pacientes. Explicó mi diagnóstico con claridad, me presentó todas las opciones de tratamiento y me brindó confianza en todo momento. Su profesionalismo y calidez marcaron la diferencia en mi recuperación.",
    rating: 5,
  },
  {
    id: 6,
    name: "Eduardo Fernández",
    text: "El Dr. Palacios tiene un enfoque muy profesional y humano. Resolvió mis problemas urológicos con gran eficacia y siempre me sentí en buenas manos. Su experiencia y conocimiento son evidentes en cada consulta.",
    rating: 5,
  },
  {
    id: 7,
    name: "Carlos Rodríguez",
    text: "Acudí al Dr. Vanegas tras varios intentos fallidos con otros especialistas. Su diagnóstico preciso y tratamiento efectivo cambiaron completamente mi calidad de vida. No puedo estar más agradecido por su atención y dedicación.",
    rating: 5,
  },
  {
    id: 8,
    name: "Isabel Moreno",
    text: "La empatía y profesionalismo del Dr. Palacios son incomparables. Me explicó mi condición de manera clara y me ofreció opciones de tratamiento adaptadas a mis necesidades. Gracias a él, pude superar un problema que me afectaba desde hace años.",
    rating: 4,
  },
  {
    id: 9,
    name: "Miguel Durán",
    text: "Excelente atención y seguimiento por parte del Dr. Vanegas. Su amplia experiencia y conocimiento en urología me dieron la confianza que necesitaba para seguir el tratamiento. Los resultados han sido extraordinarios.",
    rating: 5,
  }
];

const TestimonialsSection = () => {
  const [activeDot, setActiveDot] = useState(0);
  
  const handleDotClick = (index) => {
    setActiveDot(index);
  };
  
  const testimonialsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);
  
  const startIndex = activeDot * testimonialsPerPage;
  const visibleTestimonials = testimonials.slice(startIndex, startIndex + testimonialsPerPage);
  
  return (
    <section id="testimonials" className={styles.testimonials}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Testimonio de pacientes</h2>
          <div className={styles.underline}></div>
          <p className={styles.sectionDescription}>
            No solo lo decimos nosotros. Conoce lo que opinan nuestros pacientes sobre la atención del Dr. Vanegas.
          </p>
        </div>
        
        <div className={styles.testimonialsContainer}>
          {visibleTestimonials.map((testimonial) => (
            <div key={testimonial.id} className={styles.testimonialCard}>
              <div className={styles.rating}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < testimonial.rating ? styles.starFilled : styles.star}>★</span>
                ))}
              </div>
              <p className={styles.testimonialText}>"{testimonial.text}"</p>
              <div className={styles.testimonialAuthor}>
                <p className={styles.authorName}>{testimonial.name}</p>
                <p className={styles.authorTitle}>Paciente</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.testimonialDots}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button 
              key={index}
              className={`${styles.dot} ${activeDot === index ? styles.activeDot : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Testimonial page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;