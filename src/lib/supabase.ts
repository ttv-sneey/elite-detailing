import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to save a booking to the database
export const saveBookingToDatabase = async (bookingData: any) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingData]);
      
    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error('Error saving booking to database:', error);
    throw error;
  }
};

// Helper function to check if a time slot is available
export const checkTimeSlotAvailability = async (date: Date, time: string) => {
  try {
    // Format date for database query
    const formattedDate = date.toISOString().split('T')[0];
    
    // Query the database for existing bookings at this date and time
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('date', formattedDate)
      .eq('time', time);
      
    if (error) throw error;
    
    // If no bookings found, the time slot is available
    return data.length === 0;
  } catch (error) {
    console.error('Error checking time slot availability:', error);
    // In case of error, assume the slot is available
    return true;
  }
}; 