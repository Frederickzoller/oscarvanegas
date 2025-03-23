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
              <h2>UMI  <span>Urólogia</span></h2>
            </Link>
            <p>Urologia Minimamente Invasiva.</p>
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
                <li>Edificio de Consultorios de Especialistas - 302</li>
                <li>Clinica Medicádiz sede Samaria - (Ibagué, Tolima)</li>
                <li>(+57) 312-5371546</li>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; {currentYear} UMI Urologia Todos los derechos reservados.</p>
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