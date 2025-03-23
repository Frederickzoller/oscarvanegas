"use client"

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      // Use scrollIntoView for smoother scrolling
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start', // Align to the top of the section
        inline: 'nearest'
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const sections = ['about', 'services', 'testimonials', 'faq', 'contact', 'booking'];
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          section.style.scrollMarginTop = '70px'; // Set margin to account for fixed header
        }
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once to set initial scroll margins

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Handle any additional scroll-related logic here if needed
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <div className={styles.logo}>
          <Link href="/" onClick={() => scrollToSection('')}>
            <div className={styles.logoContainer}>
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={675} 
                height={675} 
                className={styles.logoImage} 
              />
              <h2>
                UMI <span>Urologia</span>
              </h2>
            </div>
          </Link>
        </div>
        
        <button 
          className={styles.mobileMenuButton} 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          <ul>
            <li><Link href="#about" onClick={() => { scrollToSection('about'); setMenuOpen(false); }}>Acerca de</Link></li>
            <li><Link href="#services" onClick={() => { scrollToSection('services'); setMenuOpen(false); }}>Servicios</Link></li>
            <li><Link href="#testimonials" onClick={() => { scrollToSection('testimonials'); setMenuOpen(false); }}>Testimonios</Link></li>
            <li><Link href="#faq" onClick={() => { scrollToSection('faq'); setMenuOpen(false); }}>FAQ</Link></li>
            <li><Link href="#contact" onClick={() => { scrollToSection('contact'); setMenuOpen(false); }}>Contacto</Link></li>
            <li className={styles.bookBtn}>
              <Link href="#booking" onClick={() => { scrollToSection('booking'); setMenuOpen(false); }}>
                Agendar Cita
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;