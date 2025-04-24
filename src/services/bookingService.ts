import emailjs from '@emailjs/browser';
import { saveBookingToDatabase, checkTimeSlotAvailability } from '../lib/supabase';

interface BookingData {
  vehicleType: string;
  packageType: string;
  frequency: string;
  date: Date;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

// EmailJS Configuration
// Replace these with your actual EmailJS credentials
const EMAILJS_CONFIG = {
  userID: "YOUR_USER_ID", // Your EmailJS user ID
  serviceID: "YOUR_SERVICE_ID", // Your EmailJS service ID
  customerTemplateID: "YOUR_CUSTOMER_TEMPLATE_ID", // Template for customer confirmation
  businessTemplateID: "YOUR_BUSINESS_TEMPLATE_ID" // Template for business notification
};

// Initialize EmailJS with your user ID
// Uncomment this line when you have your EmailJS user ID
// emailjs.init(EMAILJS_CONFIG.userID);

// Function to get available time slots for a given date
export const getAvailableTimeSlots = async (date: Date): Promise<string[]> => {
  // Customize these time slots based on your business hours
  const businessHours = {
    start: 9, // 9 AM
    end: 17,  // 5 PM
    interval: 60 // 60 minutes per slot
  };
  
  const timeSlots: string[] = [];
  
  for (let hour = businessHours.start; hour < businessHours.end; hour++) {
    const time = new Date(date);
    time.setHours(hour, 0, 0, 0);
    
    // Format time as "9:00 AM", "10:00 AM", etc.
    const formattedTime = time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    
    // Check if this time slot is available
    try {
      const isAvailable = await checkTimeSlotAvailability(date, formattedTime);
      if (isAvailable) {
        timeSlots.push(formattedTime);
      }
    } catch (error) {
      console.error('Error checking time slot availability:', error);
      // If there's an error checking availability, include the slot anyway
      timeSlots.push(formattedTime);
    }
  }
  
  return timeSlots;
};

// Function to check if a date is available for booking
export const isDateAvailable = (date: Date): boolean => {
  // This is a simplified version - you would typically check against your database
  // For now, we'll just check if the date is in the future and not on weekends
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Check if date is in the future
  if (date < today) {
    return false;
  }
  
  // Check if date is on a weekend (0 = Sunday, 6 = Saturday)
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return false;
  }
  
  return true;
};

export const submitBooking = async (bookingData: BookingData) => {
  try {
    // Validate required fields
    if (!bookingData.vehicleType || !bookingData.packageType || !bookingData.frequency) {
      throw new Error('Missing required service information');
    }
    
    if (!bookingData.date || !bookingData.time) {
      throw new Error('Missing appointment date or time');
    }
    
    if (!bookingData.name || !bookingData.email || !bookingData.phone) {
      throw new Error('Missing contact information');
    }
    
    // Format the date for display
    const formattedDate = new Date(bookingData.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Log the booking data (for development)
    console.log('Booking submitted successfully:', {
      ...bookingData,
      formattedDate
    });
    
    // Prepare data for database
    const dbBookingData = {
      ...bookingData,
      date: bookingData.date.toISOString().split('T')[0], // Format as YYYY-MM-DD
      created_at: new Date().toISOString()
    };
    
    // Save to database
    try {
      await saveBookingToDatabase(dbBookingData);
      console.log('Booking saved to database');
    } catch (dbError) {
      console.error('Error saving to database:', dbError);
      // Continue with the booking even if database save fails
    }
    
    // Prepare email template parameters
    const templateParams = {
      to_name: bookingData.name,
      to_email: bookingData.email,
      vehicle_type: bookingData.vehicleType,
      package_type: bookingData.packageType,
      service_date: formattedDate,
      service_time: bookingData.time,
      service_frequency: bookingData.frequency,
      customer_phone: bookingData.phone,
      customer_notes: bookingData.notes
    };

    // Send confirmation email to customer
    try {
      // Uncomment this when you have EmailJS set up
      /*
      await emailjs.send(
        EMAILJS_CONFIG.serviceID,
        EMAILJS_CONFIG.customerTemplateID,
        templateParams
      );
      */
      console.log('Customer confirmation email would be sent here');
    } catch (emailError) {
      console.error('Error sending customer confirmation email:', emailError);
      // Continue with the booking even if email fails
    }

    // Send notification email to business
    try {
      // Uncomment this when you have EmailJS set up
      /*
      await emailjs.send(
        EMAILJS_CONFIG.serviceID,
        EMAILJS_CONFIG.businessTemplateID,
        templateParams
      );
      */
      console.log('Business notification email would be sent here');
    } catch (emailError) {
      console.error('Error sending business notification email:', emailError);
      // Continue with the booking even if email fails
    }

    return { success: true };
  } catch (error) {
    console.error('Error submitting booking:', error);
    // Return a more detailed error message
    if (error instanceof Error) {
      throw new Error(`Booking error: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while submitting your booking');
    }
  }
}; 