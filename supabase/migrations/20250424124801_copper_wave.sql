/*
  # Create contacts table for inquiries

  1. New Tables
    - `contacts`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `email` (text, not null)
      - `message` (text, not null)
      - `created_at` (timestamptz, default now())
      - `status` (text, default 'unread')

  2. Security
    - Enable RLS on `contacts` table
    - Add policies for:
      - Anyone can create contact entries
      - Only admin can read and update contacts
*/

CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'unread'
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create contact entries"
  ON contacts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only admin can read contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@elitedetailing.com');

CREATE POLICY "Only admin can update contacts"
  ON contacts
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@elitedetailing.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'admin@elitedetailing.com');