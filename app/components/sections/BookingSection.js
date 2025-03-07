"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { format, addDays, startOfDay, addWeeks } from 'date-fns';
import styles from './BookingSection.module.css';

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
          <h2>Book a Consultation</h2>
          <div className={styles.underline}></div>
          <p className={styles.sectionDescription}>
            Schedule a consultation with Dr. Smith. Please fill out the form below and select your preferred date and time.
          </p>
        </div>
        
        {isSubmitted ? (
          <div className={styles.successMessage}>
            <h3>Thank you for booking!</h3>
            <p>Your appointment request has been received. Our staff will contact you shortly to confirm your appointment.</p>
          </div>
        ) : (
          <div className={styles.bookingContainer}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.bookingForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  {...register("name", { required: "Name is required" })} 
                />
                {errors.name && <span className={styles.error}>{errors.name.message}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address *</label>
                <input 
                  type="email" 
                  id="email" 
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })} 
                />
                {errors.email && <span className={styles.error}>{errors.email.message}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number *</label>
                <input 
                  type="tel" 
                  id="phone" 
                  {...register("phone", { required: "Phone number is required" })} 
                />
                {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="reason">Reason for Visit *</label>
                <select 
                  id="reason" 
                  {...register("reason", { required: "Please select a reason" })}
                >
                  <option value="">Select a reason</option>
                  <option value="General Consultation">General Consultation</option>
                  <option value="Men's Health">Men's Health</option>
                  <option value="Kidney Stones">Kidney Stones</option>
                  <option value="Urologic Cancer">Urologic Cancer</option>
                  <option value="Urinary Incontinence">Urinary Incontinence</option>
                  <option value="Other">Other</option>
                </select>
                {errors.reason && <span className={styles.error}>{errors.reason.message}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="notes">Additional Notes</label>
                <textarea 
                  id="notes" 
                  rows="4" 
                  {...register("notes")}
                ></textarea>
              </div>
              
              <div className={styles.dateTimeSelection}>
                <div className={styles.datePicker}>
                  <h4>Select Date *</h4>
                  <div className={styles.datesContainer}>
                    {availableDates.map((date, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`${styles.dateButton} ${selectedDate && date.getTime() === selectedDate.getTime() ? styles.selectedDate : ''}`}
                        onClick={() => handleDateClick(date)}
                      >
                        {format(date, 'EEE')}<br />
                        <span>{format(date, 'MMM d')}</span>
                      </button>
                    ))}
                  </div>
                  {!selectedDate && <span className={styles.error}>Please select a date</span>}
                </div>
                
                <div className={styles.timePicker}>
                  <h4>Select Time *</h4>
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
                  {selectedDate && !selectedTime && <span className={styles.error}>Please select a time</span>}
                </div>
              </div>
              
              <div className={styles.gdprConsent}>
                <input 
                  type="checkbox" 
                  id="consent" 
                  {...register("consent", { required: "You must consent to proceed" })} 
                />
                <label htmlFor="consent">
                  I consent to the processing of my personal data in accordance with the Privacy Policy
                </label>
                {errors.consent && <span className={styles.error}>{errors.consent.message}</span>}
              </div>
              
              <button 
                type="submit" 
                className={`button button-primary ${styles.submitButton}`}
                disabled={!selectedDate || !selectedTime}
              >
                Book Appointment
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingSection;