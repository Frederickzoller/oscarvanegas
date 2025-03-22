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
              <h2>Dr. Vanegas <span>Urólogo</span></h2>
            </Link>
            <p>Atención urológica especializada con un enfoque compasivo.</p>
          </div>
          
          <div className={styles.footerLinks}>
            <div className={styles.linkColumn}>
              <h3>Accesos Rápidos</h3>
              <ul>
                <li><Link href="#about">Sobre Mí</Link></li>
                <li><Link href="#services">Servicios</Link></li>
                <li><Link href="#testimonials">Testimonios</Link></li>
                <li><Link href="#faq">Preguntas Frecuentes</Link></li>
                <li><Link href="#contact">Contacto</Link></li>
              </ul>
            </div>
            
            <div className={styles.linkColumn}>
              <h3>Especialidades</h3>
              <ul>
                <li><Link href="#services">Urología General</Link></li>
                <li><Link href="#services">Salud Masculina</Link></li>
                <li><Link href="#services">Cálculos Renales</Link></li>
                <li><Link href="#services">Oncología Urológica</Link></li>
                <li><Link href="#services">Cirugía Mínimamente Invasiva</Link></li>
              </ul>
            </div>
            
            <div className={styles.linkColumn}>
              <h3>Contacto</h3>
              <ul>
                <li>Plaza Médica 123, Consultorio 456</li>
                <li>San Francisco, CA 94123</li>
                <li>(415) 555-1234</li>
                <li>contacto@drvanegas.com</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; {currentYear} Dr. Vanegas Urología. Todos los derechos reservados.</p>
          <div className={styles.footerBottomLinks}>
            <Link href="/privacy">Política de Privacidad</Link>
            <Link href="/terms">Términos de Servicio</Link>
            <Link href="/accessibility">Accesibilidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;