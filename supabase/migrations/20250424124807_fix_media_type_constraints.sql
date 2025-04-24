/*
  # Fix media type constraints to allow video type

  1. Alter Table
    - Drop existing constraints
    - Add new constraints that allow all media types
*/

-- Drop existing constraints
ALTER TABLE portfolio
DROP CONSTRAINT IF EXISTS check_media_type;

ALTER TABLE portfolio
DROP CONSTRAINT IF EXISTS check_media_urls;

-- Add new constraints
ALTER TABLE portfolio
ADD CONSTRAINT check_media_type CHECK (media_type IN ('image', 'video', 'instagram'));

ALTER TABLE portfolio
ADD CONSTRAINT check_media_urls CHECK (
  (media_type = 'image' AND image_url IS NOT NULL) OR
  (media_type = 'video' AND video_url IS NOT NULL AND thumbnail_url IS NOT NULL) OR
  (media_type = 'instagram' AND instagram_url IS NOT NULL AND image_url IS NOT NULL)
); 