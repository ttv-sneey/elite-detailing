/*
  # Add video support to portfolio table

  1. Alter Table
    - Add `media_type` column to `portfolio` table
    - Add `video_url` column to `portfolio` table
    - Add `thumbnail_url` column to `portfolio` table
*/

-- Add new columns to portfolio table
ALTER TABLE portfolio
ADD COLUMN IF NOT EXISTS media_type TEXT NOT NULL DEFAULT 'image',
ADD COLUMN IF NOT EXISTS video_url TEXT,
ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

-- Update existing rows to have media_type as 'image'
UPDATE portfolio SET media_type = 'image' WHERE media_type IS NULL;

-- Add check constraint to ensure media_type is either 'image' or 'video'
ALTER TABLE portfolio
ADD CONSTRAINT check_media_type CHECK (media_type IN ('image', 'video'));

-- Add check constraint to ensure either image_url or video_url is present
ALTER TABLE portfolio
ADD CONSTRAINT check_media_urls CHECK (
  (media_type = 'image' AND image_url IS NOT NULL) OR
  (media_type = 'video' AND video_url IS NOT NULL AND thumbnail_url IS NOT NULL)
); 