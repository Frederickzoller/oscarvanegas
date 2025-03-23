import React from 'react';
import styles from './ContactSection.module.css';

const ContactSection = () => {
  return (
    <section id="contact" className={styles.contact}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Contáctanos</h2>
          <div className={styles.underline}></div>
          <p className={styles.sectionDescription}>
            ¿Tienes preguntas o necesitas comunicarte con nosotros? Contáctanos por teléfono, correo electrónico o visítanos en persona.
          </p>
        </div>
        
        <div className={styles.contactContainer}>
          <div className={styles.contactInfo}>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>📍</div>
              <h3>Ubicación</h3>
              <p>Edificio de Consultorios de Especialistas - 302</p>
              <p>Clinica Medicádiz sede Samaria - (Ibagué, Tolima)</p>
            </div>
            
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>📞</div>
              <h3>Teléfono</h3>
              <p>Principal: </p>
              <p>(+57) 312-5371546</p>
            </div>
            
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>📧</div>
              <h3>Correo Electrónico</h3>
              
              <p>info@drsmithurology.com</p>
            </div>
            
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>🕒</div>
              <h3>Horario de Atención</h3>
              <p>Lunes - Viernes: 9:00 AM - 5:00 PM</p>
              <p>Sábado - Domingo: Cerrado</p>
            </div>
            
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>📱</div>
              <h3>Instagram</h3>
              <p>@dr.vanegas.urologo</p>
              <p>Síguenos para consejos y actualizaciones</p>
            </div>
          </div>
          
          <div className={styles.mapContainer}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.9238590049044!2d-75.18067792470005!3d4.425286695548921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38c5f70b052c9f%3A0x1726946f4a5d2746!2sEdificio%20de%20Consultorios%20de%20Especialistas%20-%20Medic%C3%A1diz!5e0!3m2!1ses!2sco!4v1742605579350!5m2!1ses!2sco" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de la Oficina"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;