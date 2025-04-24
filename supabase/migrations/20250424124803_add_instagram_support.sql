/*
  # Add Instagram support to portfolio table

  1. Alter Table
    - Modify `media_type` to include 'instagram'
    - Add `instagram_url` column
    - Update constraints
*/

-- First, update existing rows to have valid media_type
UPDATE portfolio 
SET media_type = 'image' 
WHERE media_type NOT IN ('image', 'instagram');

-- Add instagram_url column if it doesn't exist
ALTER TABLE portfolio
ADD COLUMN IF NOT EXISTS instagram_url TEXT;

-- Drop existing constraints if they exist
ALTER TABLE portfolio
DROP CONSTRAINT IF EXISTS check_media_type;

ALTER TABLE portfolio
DROP CONSTRAINT IF EXISTS check_media_urls;

-- Add new constraints
ALTER TABLE portfolio
ADD CONSTRAINT check_media_type CHECK (media_type IN ('image', 'instagram'));

ALTER TABLE portfolio
ADD CONSTRAINT check_media_urls CHECK (
  (media_type = 'image' AND image_url IS NOT NULL) OR
  (media_type = 'instagram' AND instagram_url IS NOT NULL AND image_url IS NOT NULL)
); 