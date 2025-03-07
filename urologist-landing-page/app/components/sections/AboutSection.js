import React from 'react';
import Image from 'next/image';
import styles from './AboutSection.module.css';

const AboutSection = () => {
  return (
    <section id="about" className={styles.about}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>About Dr. Smith</h2>
          <div className={styles.underline}></div>
        </div>
        
        <div className={styles.aboutContent}>
          <div className={styles.aboutImage}>
            <Image 
              src="/doctor-office.jpg" 
              alt="Dr. Smith in his office" 
              width={500} 
              height={400}
              className={styles.doctorOfficeImage}
            />
          </div>
          
          <div className={styles.aboutText}>
            <h3>Experienced Urological Care</h3>
            <p>
              Dr. John Smith is a board-certified urologist with over 15 years of experience in diagnosing and treating urological conditions. After graduating with honors from Harvard Medical School, he completed his residency at Johns Hopkins Hospital and fellowship training in minimally invasive urological surgery.
            </p>
            
            <div className={styles.credentials}>
              <div className={styles.credential}>
                <span className={styles.credentialNumber}>15+</span>
                <span className={styles.credentialText}>Years Experience</span>
              </div>
              <div className={styles.credential}>
                <span className={styles.credentialNumber}>5000+</span>
                <span className={styles.credentialText}>Patients Treated</span>
              </div>
              <div className={styles.credential}>
                <span className={styles.credentialNumber}>200+</span>
                <span className={styles.credentialText}>Research Papers</span>
              </div>
            </div>
            
            <p>
              Dr. Smith specializes in minimally invasive procedures, men's health, urologic oncology, and kidney stone management. He is committed to providing personalized care using the latest evidence-based techniques to ensure optimal outcomes for his patients.
            </p>
            
            <div className={styles.affiliations}>
              <p><strong>Professional Affiliations:</strong></p>
              <ul>
                <li>American Urological Association</li>
                <li>Society of Urologic Oncology</li>
                <li>Endourological Society</li>
                <li>American Medical Association</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;