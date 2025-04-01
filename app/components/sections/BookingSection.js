"use client"

import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { format, addDays, startOfDay } from 'date-fns';
import styles from './BookingSection.module.css';

// Mapeo de abreviaturas de días en inglés a español
const dayMapping = {
  'Mon': 'Lun',
  'Tue': 'Mar',
  'Wed': 'Mié',
  'Thu': 'Jue',
  'Fri': 'Vie',
  'Sat': 'Sáb',
  'Sun': 'Dom'
};

// Mapeo de abreviaturas de meses en inglés a español
const monthMapping = {
  'Jan': 'Ene',
  'Feb': 'Feb',
  'Mar': 'Mar',
  'Apr': 'Abr',
  'May': 'May',
  'Jun': 'Jun',
  'Jul': 'Jul',
  'Aug': 'Ago',
  'Sep': 'Sep',
  'Oct': 'Oct',
  'Nov': 'Nov',
  'Dec': 'Dic'
};

// Función para formatear la fecha en español
const formatDateToSpanish = (date, formatStr) => {
  const formatted = format(date, formatStr);
  
  if (formatStr === 'EEE') {
    return dayMapping[formatted] || formatted;
  }
  
  if (formatStr === 'MMM d') {
    const parts = formatted.split(' ');
    const month = monthMapping[parts[0]] || parts[0];
    return `${month} ${parts[1]}`;
  }
  
  return formatted;
};

// Add this helper function below the existing formatDateToSpanish function
const scrollDateContainerToSelected = (dateElement) => {
  if (!dateElement) return;
  
  const container = dateElement.parentNode;
  if (!container) return;
  
  // Calculate the scroll position to center the selected date
  const scrollLeft = dateElement.offsetLeft - (container.clientWidth / 2) + (dateElement.clientWidth / 2);
  container.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
};

const availableTimes = [
  '9:00 AM', '10:00 AM', '11:00 AM', 
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
];

const BookingSection = () => {
  // Create a ref for mobile detection state initialization
  const didInitialize = useRef(false);
  
  // Initialize with null instead of false
  const [isMobile, setIsMobile] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Add a ref for the booking section
  const bookingSectionRef = useRef(null);
  
  const { register, handleSubmit, formState: { errors }, reset, trigger, getValues } = useForm({
    mode: 'onChange'
  });
  
  // First effect: Run once to determine initial mobile state
  useEffect(() => {
    // Skip server-side rendering
    if (typeof window === 'undefined') return;
    
    const checkIfMobile = () => {
      const mobile = window.innerWidth <= 767;
      setIsMobile(mobile);
      didInitialize.current = true;
    };
    
    // Initial check
    checkIfMobile();
  }, []); // Empty dependency array - run once on mount
  
  // Second effect: Handle resize events after initialization
  useEffect(() => {
    // Skip if not initialized or during server-side rendering
    if (!didInitialize.current || typeof window === 'undefined') return;
    
    const handleResize = () => {
      const mobile = window.innerWidth <= 767;
      
      // Only update and reset if the state is actually changing
      if (mobile !== isMobile) {
        setIsMobile(mobile);
        setCurrentStep(1);
      }
    };
    
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]); // Only re-run when isMobile changes
  
  // Generate available dates (Next 2 weeks excluding weekends)
  const generateAvailableDates = () => {
    const dates = [];
    const startDate = startOfDay(new Date());
    
    // Add 14 days
    for (let i = 1; i <= 14; i++) {
      const currentDate = addDays(startDate, i);
      const day = currentDate.getDay();
      
      // Exclude weekends (0 = Sunday, 6 = Saturday)
      if (day !== 0 && day !== 6) {
        dates.push(currentDate);
      }
    }
    
    return dates;
  };
  
  const availableDates = generateAvailableDates();
  
  const handleDateClick = (date) => {
    setSelectedDate(date);
    if (isMobile) {
      goToNextStep();
    } else {
      setSelectedTime(null);
    }
  };
  
  const handleTimeClick = (time) => {
    setSelectedTime(time);
    if (isMobile) {
      goToNextStep();
    }
  };
  
  const goToNextStep = async () => {
    if (isAnimating) return;
    
    // Validate current step fields before proceeding
    let isValid = true;
    
    if (currentStep === 1) {
      isValid = await trigger(['name', 'email', 'phone', 'reason']);
    } else if (currentStep === 2) {
      isValid = !!selectedDate;
    } else if (currentStep === 3) {
      isValid = !!selectedTime;
    }
    
    if (!isValid) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(prev => Math.min(prev + 1, 4));
      setIsAnimating(false);
      
      // Scroll to the booking section instead of the top of the page
      if (bookingSectionRef.current) {
        bookingSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };
  
  const goToPrevStep = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(prev => Math.max(prev - 1, 1));
      setIsAnimating(false);
      
      // Scroll to the booking section instead of the top of the page
      if (bookingSectionRef.current) {
        bookingSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };
  
  const onSubmit = (data) => {
    // In a real application, you would send this data to your backend
    console.log({
      ...data,
      appointmentDate: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null,
      appointmentTime: selectedTime
    });
    
    // Show success message
    setIsSubmitted(true);
    
    // Reset form
    reset();
    setSelectedDate(null);
    setSelectedTime(null);
    setCurrentStep(1);
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };
  
  // Mobile step renderer
  const renderCurrentStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className={`${styles.formStep} ${styles.active}`}>
            <h3 className={styles.stepTitle}>Información Personal</h3>
            
            <div className={styles.formGroup}>
              <label htmlFor="name">Nombre Completo *</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Ingresa tu nombre completo"
                {...register("name", { required: "El nombre es obligatorio" })} 
              />
              {errors.name && <span className={styles.error}>{errors.name.message}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="email">Correo Electrónico *</label>
              <input 
                type="email" 
                id="email" 
                placeholder="tu@correo.com"
                {...register("email", { 
                  required: "El correo electrónico es obligatorio",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Dirección de correo electrónico inválida"
                  }
                })} 
              />
              {errors.email && <span className={styles.error}>{errors.email.message}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="phone">Número de Teléfono *</label>
              <input 
                type="tel" 
                id="phone" 
                placeholder="Ej: +34 612 345 678"
                {...register("phone", { required: "El número de teléfono es obligatorio" })} 
              />
              {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="reason">Motivo de tu Visita *</label>
              <select 
                id="reason" 
                {...register("reason", { required: "Por favor seleccione un motivo" })}
              >
                <option value="">Selecciona el motivo de tu visita</option>
                <option value="Urologia General">Urologia General</option>
                <option value="Terapias Intravesicales">Terapias Intravesicales</option>
                <option value="Tratamiento Cálculos Urinarios">Tratamiento Cálculos Urinarios</option>
                <option value="Cirugía Urológica General">Cirugía Urológica General</option>
                <option value="Cirugías Reconstructivas">Cirugías Reconstructivas y Funcionales</option>
                <option value="Cirugía Oncológica">Cirugía Oncológica y Tumores Urológicos</option>
                <option value="Otro">Otro</option>
              </select>
              {errors.reason && <span className={styles.error}>{errors.reason.message}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="notes">Notas Adicionales</label>
              <textarea 
                id="notes" 
                rows="3" 
                placeholder="Cualquier información adicional que quieras compartir"
                {...register("notes")}
              ></textarea>
            </div>
            
            <div className={styles.navButtons}>
              <button 
                type="button" 
                className={`button button-primary ${styles.nextButton}`}
                onClick={goToNextStep}
              >
                Siguiente: Seleccionar Fecha
              </button>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className={`${styles.formStep} ${styles.active}`}>
            <h3 className={styles.stepTitle}>Seleccionar Fecha</h3>
            
            <div className={styles.mobileCalendar}>
              {availableDates.map((date, index) => (
                <button
                  key={index}
                  type="button"
                  className={`${styles.dateOption} ${selectedDate && date.getTime() === selectedDate.getTime() ? styles.selectedDate : ''}`}
                  onClick={() => handleDateClick(date)}
                >
                  <div className={styles.dateDay}>{formatDateToSpanish(date, 'EEE')}</div>
                  <div className={styles.dateNumber}>{format(date, 'd')}</div>
                  <div className={styles.dateMonth}>{formatDateToSpanish(date, 'MMM')}</div>
                </button>
              ))}
            </div>
            
            <div className={styles.navButtons}>
              <button 
                type="button" 
                className={`button button-secondary ${styles.prevButton}`}
                onClick={goToPrevStep}
              >
                Atrás
              </button>
              
              <button 
                type="button" 
                className={`button button-primary ${styles.nextButton}`}
                onClick={goToNextStep}
                disabled={!selectedDate}
              >
                Siguiente: Seleccionar Hora
              </button>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className={`${styles.formStep} ${styles.active}`}>
            <h3 className={styles.stepTitle}>Seleccionar Hora</h3>
            <p className={styles.stepDescription}>
              Fecha seleccionada: <strong>{selectedDate ? formatDateToSpanish(selectedDate, 'EEE') + ', ' + formatDateToSpanish(selectedDate, 'MMM d') : ''}</strong>
            </p>
            
            <div className={styles.mobileTimeSlots}>
              {availableTimes.map((time, index) => (
                <button
                  key={index}
                  type="button"
                  className={`${styles.timeOption} ${selectedTime === time ? styles.selectedTime : ''}`}
                  onClick={() => handleTimeClick(time)}
                >
                  {time}
                </button>
              ))}
            </div>
            
            <div className={styles.navButtons}>
              <button 
                type="button" 
                className={`button button-secondary ${styles.prevButton}`}
                onClick={goToPrevStep}
              >
                Atrás
              </button>
              
              <button 
                type="button" 
                className={`button button-primary ${styles.nextButton}`}
                onClick={goToNextStep}
                disabled={!selectedTime}
              >
                Siguiente: Confirmar
              </button>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className={`${styles.formStep} ${styles.active}`}>
            <h3 className={styles.stepTitle}>Confirmar Cita</h3>
            
            <div className={styles.summaryCard}>
              <div className={styles.summaryItem}>
                <span>Nombre:</span>
                <strong>{getValues("name")}</strong>
              </div>
              <div className={styles.summaryItem}>
                <span>Email:</span>
                <strong>{getValues("email")}</strong>
              </div>
              <div className={styles.summaryItem}>
                <span>Teléfono:</span>
                <strong>{getValues("phone")}</strong>
              </div>
              <div className={styles.summaryItem}>
                <span>Motivo:</span>
                <strong>{getValues("reason")}</strong>
              </div>
              <div className={styles.summaryItem}>
                <span>Fecha:</span>
                <strong>{selectedDate ? formatDateToSpanish(selectedDate, 'EEE') + ', ' + formatDateToSpanish(selectedDate, 'MMM d') : ''}</strong>
              </div>
              <div className={styles.summaryItem}>
                <span>Hora:</span>
                <strong>{selectedTime}</strong>
              </div>
              {getValues("notes") && (
                <div className={styles.summaryItem}>
                  <span>Notas:</span>
                  <strong>{getValues("notes")}</strong>
                </div>
              )}
            </div>
            
            <div className={styles.gdprConsent}>
              <input 
                type="checkbox" 
                id="consent" 
                {...register("consent", { required: "Debe dar su consentimiento para continuar" })} 
              />
              <label htmlFor="consent">
                Doy mi consentimiento para el procesamiento de mis datos personales de acuerdo con la Política de Privacidad
              </label>
            </div>
            {errors.consent && <span className={styles.error}>{errors.consent.message}</span>}
            
            <div className={styles.navButtons}>
              <button 
                type="button" 
                className={`button button-secondary ${styles.prevButton}`}
                onClick={goToPrevStep}
              >
                Atrás
              </button>
              
              <button 
                type="submit" 
                className={`button button-primary ${styles.submitButton}`}
              >
                Confirmar Cita
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  // Render desktop or mobile view based on screen size
  const renderForm = () => {
    // Show a loading state if isMobile is null (still determining)
    if (isMobile === null) {
      return <div className={styles.loadingState}>Loading form...</div>;
    }
    
    if (isMobile) {
      // Mobile step-by-step form
      return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.mobileForm}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
          <div className={styles.stepIndicator}>
            Paso {currentStep} de 4
          </div>
          
          {renderCurrentStep()}
        </form>
      );
    } else {
      // Desktop form (original layout)
      return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.bookingForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nombre Completo *</label>
            <input 
              type="text" 
              id="name" 
              placeholder="Ingresa tu nombre completo"
              {...register("name", { required: "El nombre es obligatorio" })} 
            />
            {errors.name && <span className={styles.error}>{errors.name.message}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email">Correo Electrónico *</label>
            <input 
              type="email" 
              id="email" 
              placeholder="tu@correo.com"
              {...register("email", { 
                required: "El correo electrónico es obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Dirección de correo electrónico inválida"
                }
              })} 
            />
            {errors.email && <span className={styles.error}>{errors.email.message}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="phone">Número de Teléfono *</label>
            <input 
              type="tel" 
              id="phone" 
              placeholder="Ej: +34 612 345 678"
              {...register("phone", { required: "El número de teléfono es obligatorio" })} 
            />
            {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="reason">Motivo de tu Visita *</label>
            <select 
              id="reason" 
              {...register("reason", { required: "Por favor seleccione un motivo" })}
            >
              <option value="">Selecciona el motivo de tu visita</option>
              <option value="Urologia General">Urologia General</option>
              <option value="Terapias Intravesicales">Terapias Intravesicales</option>
              <option value="Tratamiento Cálculos Urinarios">Tratamiento Cálculos Urinarios</option>
              <option value="Cirugía Urológica General">Cirugía Urológica General</option>
              <option value="Cirugías Reconstructivas">Cirugías Reconstructivas y Funcionales</option>
              <option value="Cirugía Oncológica">Cirugía Oncológica y Tumores Urológicos</option>
              <option value="Otro">Otro</option>
            </select>
            {errors.reason && <span className={styles.error}>{errors.reason.message}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="notes">Notas Adicionales</label>
            <textarea 
              id="notes" 
              rows="4" 
              placeholder="Cualquier información adicional que quieras compartir"
              {...register("notes")}
            ></textarea>
          </div>
          
          <div className={styles.dateTimeSelection}>
            <div className={styles.datePicker}>
              <h4>Seleccionar Fecha *</h4>
              <div className={styles.datesContainer}>
                {availableDates.map((date, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`${styles.dateButton} ${selectedDate && date.getTime() === selectedDate.getTime() ? styles.selectedDate : ''}`}
                    onClick={() => handleDateClick(date)}
                    aria-label={`Seleccionar fecha ${formatDateToSpanish(date, 'EEE')} ${formatDateToSpanish(date, 'MMM d')}`}
                  >
                    {formatDateToSpanish(date, 'EEE')}<br />
                    <span>{formatDateToSpanish(date, 'MMM d')}</span>
                  </button>
                ))}
              </div>
              {!selectedDate && errors.appointmentTime && <span className={styles.error}>Por favor seleccione una fecha</span>}
            </div>
            
            <div className={styles.timePicker}>
              <h4>Seleccionar Hora *</h4>
              <div className={styles.timesContainer}>
                {availableTimes.map((time, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`${styles.timeButton} ${selectedTime === time ? styles.selectedTime : ''}`}
                    onClick={() => handleTimeClick(time)}
                    disabled={!selectedDate}
                    aria-label={`Seleccionar hora ${time}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
              {selectedDate && !selectedTime && errors.appointmentTime && <span className={styles.error}>Por favor seleccione una hora</span>}
            </div>
          </div>
          
          <div className={styles.gdprConsent}>
            <input 
              type="checkbox" 
              id="consent" 
              {...register("consent", { required: "Debe dar su consentimiento para continuar" })} 
            />
            <label htmlFor="consent">
              Doy mi consentimiento para el procesamiento de mis datos personales de acuerdo con la Política de Privacidad
            </label>
          </div>
          {errors.consent && <span className={styles.error}>{errors.consent.message}</span>}
          
          <button 
            type="submit" 
            className={`button button-primary ${styles.submitButton}`}
            disabled={!selectedDate || !selectedTime}
          >
            Agendar Cita
          </button>
        </form>
      );
    }
  };
  
  return (
    <section id="booking" className={styles.booking} ref={bookingSectionRef}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Agendar una Consulta</h2>
          <div className={styles.underline}></div>
          <p className={styles.sectionDescription}>
            Programa una consulta con nosotros. Por favor completa el formulario a continuación y selecciona tu fecha y hora preferidas.
          </p>
        </div>
        
        {isSubmitted ? (
          <div className={styles.successMessage}>
            <h3>¡Gracias por tu reserva!</h3>
            <p>Hemos recibido tu solicitud de cita. Nuestro personal se pondrá en contacto contigo en breve para confirmar tu cita.</p>
          </div>
        ) : (
          <div className={`${styles.bookingContainer} ${isMobile ? styles.mobileContainer : ''}`}>
            {renderForm()}
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingSection;