-- Create a table for portfolio items
CREATE TABLE IF NOT EXISTS portfolio (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  package_type TEXT NOT NULL,
  vehicle_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on package_type for faster filtering
CREATE INDEX IF NOT EXISTS idx_portfolio_package_type ON portfolio(package_type);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_portfolio_updated_at
BEFORE UPDATE ON portfolio
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data (you can replace these with your actual portfolio items)
INSERT INTO portfolio (title, description, image_url, package_type, vehicle_type)
VALUES
  ('Luxury Car Interior Detailing', 'Complete interior transformation with premium products and attention to detail.', 'https://placehold.co/600x400/940cff/ffffff?text=Interior+Detailing', 'gold', 'car'),
  ('SUV Exterior Protection', 'Full exterior detailing with ceramic coating for long-lasting protection.', 'https://placehold.co/600x400/940cff/ffffff?text=Exterior+Detailing', 'gold', 'suv'),
  ('Express Car Wash & Detail', 'Quick and efficient detailing service for busy professionals.', 'https://placehold.co/600x400/940cff/ffffff?text=Express+Package', 'express', 'car'),
  ('SUV Interior Refresh', 'Complete interior cleaning and sanitization for family vehicles.', 'https://placehold.co/600x400/940cff/ffffff?text=Interior+Refresh', 'express', 'suv'),
  ('Always Fresh Program - Monthly', 'Regular maintenance to keep your vehicle looking its best.', 'https://placehold.co/600x400/940cff/ffffff?text=Always+Fresh', 'always-fresh', 'car'),
  ('Glass Coating Application', 'Premium glass coating for maximum visibility and protection.', 'https://placehold.co/600x400/940cff/ffffff?text=Glass+Coating', 'glass', 'car'); 