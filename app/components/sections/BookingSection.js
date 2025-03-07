"use client";

import React, { useState, useEffect } from 'react';
// Remove react-hook-form completely
import { format, addDays, startOfDay } from 'date-fns';
import styles from './BookingSection.module.css';

const BookingSection = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
    notes: '',
    consent: false
  });
  
  // Form validation
  const [errors, setErrors] = useState({});
  
  // Booking state
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);
  
  // Available time slots
  const availableTimes = [
    '9:00 AM', '10:00 AM', '11:00 AM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];
  
  // Generate available dates (Next 2 weeks excluding weekends)
  useEffect(() => {
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
    
    setAvailableDates(dates);
  }, []);
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Handle date selection
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };
  
  // Handle time selection
  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.reason) newErrors.reason = "Please select a reason";
    if (!selectedDate) newErrors.date = "Please select a date";
    if (!selectedTime) newErrors.time = "Please select a time";
    if (!formData.consent) newErrors.consent = "You must consent to proceed";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Form is valid, process submission
      console.log({
        ...formData,
        appointmentDate: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null,
        appointmentTime: selectedTime
      });
      
      // Show success message
      setIsSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        reason: '',
        notes: '',
        consent: false
      });
      setSelectedDate(null);
      setSelectedTime(null);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
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
            <form onSubmit={handleSubmit} className={styles.bookingForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && <span className={styles.error}>{errors.name}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number *</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && <span className={styles.error}>{errors.phone}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="reason">Reason for Visit *</label>
                <select 
                  id="reason" 
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                >
                  <option value="">Select a reason</option>
                  <option value="General Consultation">General Consultation</option>
                  <option value="Men's Health">Men's Health</option>
                  <option value="Kidney Stones">Kidney Stones</option>
                  <option value="Urologic Cancer">Urologic Cancer</option>
                  <option value="Urinary Incontinence">Urinary Incontinence</option>
                  <option value="Other">Other</option>
                </select>
                {errors.reason && <span className={styles.error}>{errors.reason}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="notes">Additional Notes</label>
                <textarea 
                  id="notes" 
                  name="notes"
                  rows="4" 
                  value={formData.notes}
                  onChange={handleInputChange}
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
                  {errors.date && <span className={styles.error}>{errors.date}</span>}
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
                  {errors.time && <span className={styles.error}>{errors.time}</span>}
                </div>
              </div>
              
              <div className={styles.gdprConsent}>
                <input 
                  type="checkbox" 
                  id="consent" 
                  name="consent"
                  checked={formData.consent}
                  onChange={handleInputChange}
                />
                <label htmlFor="consent">
                  I consent to the processing of my personal data in accordance with the Privacy Policy
                </label>
                {errors.consent && <span className={styles.error}>{errors.consent}</span>}
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