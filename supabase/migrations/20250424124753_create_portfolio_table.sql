/*
  # Create initial portfolio table

  1. Create Table
    - Create `portfolio` table with basic fields
    - Add `image_url` column for images
    - Add timestamps and metadata
*/

-- Create portfolio table
CREATE TABLE IF NOT EXISTS portfolio (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_portfolio_updated_at
    BEFORE UPDATE ON portfolio
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 