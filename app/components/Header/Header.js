"use client"

import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <div className={styles.logo}>
          <Link href="/">
            <h2>Dr. Oscar Vanegas <span>Urologo</span></h2>
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
            <li><Link href="#about" onClick={() => setMenuOpen(false)}>Acerca de mi</Link></li>
            <li><Link href="#services" onClick={() => setMenuOpen(false)}>Servicios</Link></li>
            <li><Link href="#testimonials" onClick={() => setMenuOpen(false)}>Testimonios</Link></li>
            <li><Link href="#faq" onClick={() => setMenuOpen(false)}>FAQ</Link></li>
            <li><Link href="#contact" onClick={() => setMenuOpen(false)}>Contacto</Link></li>
            <li className={styles.bookBtn}>
              <Link href="#booking" onClick={() => setMenuOpen(false)}>
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