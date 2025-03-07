import React from 'react';
import Header from './components/Header/Header';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ServicesSection from './components/sections/ServicesSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import FAQSection from './components/sections/FAQSection';
import BookingSection from './components/sections/BookingSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/Footer/Footer';
import BackgroundAnimation from './components/three/BackgroundAnimation';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <BackgroundAnimation />
      <Header />
      <main className={styles.main}>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
        <FAQSection />
        <BookingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}