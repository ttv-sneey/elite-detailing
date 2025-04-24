/*
  # Create bookings table

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `vehicle_type` (text, not null)
      - `package_type` (text, not null)
      - `frequency` (text, not null)
      - `booking_date` (timestamptz, not null)
      - `booking_time` (text, not null)
      - `customer_name` (text, not null)
      - `customer_email` (text, not null)
      - `customer_phone` (text, not null)
      - `notes` (text)
      - `created_at` (timestamptz, default now())
      - `status` (text, default 'pending')

  2. Security
    - Enable RLS on `bookings` table
    - Add policies for:
      - Authenticated users can read their own bookings
      - Authenticated users can create bookings
      - Only admin can update booking status
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_type text NOT NULL,
  package_type text NOT NULL,
  frequency text NOT NULL,
  booking_date timestamptz NOT NULL,
  booking_time text NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending'
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = customer_email);

CREATE POLICY "Users can create bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only admin can update booking status"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@elitedetailing.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'admin@elitedetailing.com');