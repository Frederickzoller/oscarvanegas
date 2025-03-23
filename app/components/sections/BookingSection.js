"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { format, addDays, startOfDay, addWeeks } from 'date-fns';
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

const availableTimes = [
  '9:00 AM', '10:00 AM', '11:00 AM', 
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
];

const BookingSection = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
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
    setSelectedTime(null);
  };
  
  const handleTimeClick = (time) => {
    setSelectedTime(time);
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
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };
  
  return (
    <section id="booking" className={styles.booking}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>Agendar una Consulta</h2>
          <div className={styles.underline}></div>
          <p className={styles.sectionDescription}>
            Programa una consulta con nosotros. Por favor completa el formulario a continuación y selecciona su fecha y hora preferidas.
          </p>
        </div>
        
        {isSubmitted ? (
          <div className={styles.successMessage}>
            <h3>¡Gracias por su reserva!</h3>
            <p>Hemos recibido su solicitud de cita. Nuestro personal se pondrá en contacto con usted en breve para confirmar su cita.</p>
          </div>
        ) : (
          <div className={styles.bookingContainer}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.bookingForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Nombre Completo *</label>
                <input 
                  type="text" 
                  id="name" 
                  {...register("name", { required: "El nombre es obligatorio" })} 
                />
                {errors.name && <span className={styles.error}>{errors.name.message}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email">Correo Electrónico *</label>
                <input 
                  type="email" 
                  id="email" 
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
                  {...register("phone", { required: "El número de teléfono es obligatorio" })} 
                />
                {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="reason">Motivo de la Visita *</label>
                <select 
                  id="reason" 
                  {...register("reason", { required: "Por favor seleccione un motivo" })}
                >
                  <option value="">Selecciona tu motivo de la Visita</option>
                  <option value="General Consultation">Consulta General</option>
                  <option value="Men's Health">Salud Masculina</option>
                  <option value="Kidney Stones">Cálculos Renales</option>
                  <option value="Urologic Cancer">Cáncer Urológico</option>
                  <option value="Urinary Incontinence">Incontinencia Urinaria</option>
                  <option value="Other">Otro</option>
                </select>
                {errors.reason && <span className={styles.error}>{errors.reason.message}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="notes">Notas Adicionales</label>
                <textarea 
                  id="notes" 
                  rows="4" 
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
                      >
                        {formatDateToSpanish(date, 'EEE')}<br />
                        <span>{formatDateToSpanish(date, 'MMM d')}</span>
                      </button>
                    ))}
                  </div>
                  {!selectedDate && <span className={styles.error}>Por favor seleccione una fecha</span>}
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
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  {selectedDate && !selectedTime && <span className={styles.error}>Por favor seleccione una hora</span>}
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
                {errors.consent && <span className={styles.error}>{errors.consent.message}</span>}
              </div>
              
              <button 
                type="submit" 
                className={`button button-primary ${styles.submitButton}`}
                disabled={!selectedDate || !selectedTime}
              >
                Agendar Cita
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingSection;