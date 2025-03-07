import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <Link href="/">
              <h2>Dr. Smith <span>Urology</span></h2>
            </Link>
            <p>Expert urological care with a compassionate approach.</p>
          </div>
          
          <div className={styles.footerLinks}>
            <div className={styles.linkColumn}>
              <h3>Quick Links</h3>
              <ul>
                <li><Link href="#about">About</Link></li>
                <li><Link href="#services">Services</Link></li>
                <li><Link href="#testimonials">Testimonials</Link></li>
                <li><Link href="#faq">FAQ</Link></li>
                <li><Link href="#contact">Contact</Link></li>
              </ul>
            </div>
            
            <div className={styles.linkColumn}>
              <h3>Services</h3>
              <ul>
                <li><Link href="#services">General Urology</Link></li>
                <li><Link href="#services">Men's Health</Link></li>
                <li><Link href="#services">Kidney Stones</Link></li>
                <li><Link href="#services">Urologic Oncology</Link></li>
                <li><Link href="#services">Minimally Invasive Surgery</Link></li>
              </ul>
            </div>
            
            <div className={styles.linkColumn}>
              <h3>Contact</h3>
              <ul>
                <li>123 Medical Plaza, Suite 456</li>
                <li>San Francisco, CA 94123</li>
                <li>(415) 555-1234</li>
                <li>info@drsmithurology.com</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; {currentYear} Dr. Smith Urology. All rights reserved.</p>
          <div className={styles.footerBottomLinks}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/accessibility">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;