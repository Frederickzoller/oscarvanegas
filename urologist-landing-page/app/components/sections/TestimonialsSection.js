import React, { useState } from 'react';
import styles from './TestimonialsSection.module.css';

const testimonials = [
  {
    id: 1,
    name: "James Wilson",
    text: "Dr. Smith is exceptional. He took the time to explain my condition thoroughly and presented all treatment options. His expertise and bedside manner made a stressful situation much easier to handle.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Johnson",
    text: "I was extremely nervous about my procedure, but Dr. Smith's calm and professional approach put me at ease. The follow-up care was outstanding, and I've had excellent results.",
    rating: 5,
  },
  {
    id: 3,
    name: "Robert Davis",
    text: "After seeing multiple specialists for my condition without success, Dr. Smith was able to diagnose and treat my issue effectively. His attention to detail and commitment to patient care is remarkable.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Thompson",
    text: "The minimally invasive procedure Dr. Smith performed had me back on my feet in no time. I appreciated his honest and straightforward approach to explaining my treatment options.",
    rating: 4,
  },
  {
    id: 5,
    name: "Thomas Brown",
    text: "Dr. Smith's knowledge and expertise are impressive. He takes the time to listen to concerns and explains everything in an understandable way. Highly recommend his services.",
    rating: 5,
  }
];

const TestimonialsSection = () => {
  const [activeDot, setActiveDot] = useState(0);
  
  const handleDotClick = (index) => {
    setActiveDot(index);
  };
  
  const visibleTestimonials = testimonials.slice(activeDot, activeDot + 3);
  if (visibleTestimonials.length < 3 && testimonials.length > 3) {
    const remaining = 3 - visibleTestimonials.length;
    visibleTestimonials.push(...testimonials.slice(0, remaining));
  }
  
  return (
    <section id="testimonials" className={styles.testimonials}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Patient Testimonials</h2>
          <div className={styles.underline}></div>
          <p className={styles.sectionDescription}>
            Don't just take our word for it. Here's what our patients have to say about Dr. Smith's care.
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
                <p className={styles.authorTitle}>Patient</p>
              </div>
            </div>
          ))}
        </div>
        
        {testimonials.length > 3 && (
          <div className={styles.testimonialDots}>
            {testimonials.map((_, index) => (
              index <= testimonials.length - 3 && (
                <button 
                  key={index}
                  className={`${styles.dot} ${activeDot === index ? styles.activeDot : ''}`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Testimonial page ${index + 1}`}
                />
              )
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;