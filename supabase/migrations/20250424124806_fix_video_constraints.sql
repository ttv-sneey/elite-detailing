/*
  # Fix video constraints in portfolio table

  1. Alter Table
    - Drop existing constraints
    - Add new constraints that allow image_url to be null for video media type
*/

-- Drop existing constraints
ALTER TABLE portfolio
DROP CONSTRAINT IF EXISTS check_media_urls;

-- Add new constraint that allows image_url to be null for video media type
ALTER TABLE portfolio
ADD CONSTRAINT check_media_urls CHECK (
  (media_type = 'image' AND image_url IS NOT NULL) OR
  (media_type = 'video' AND video_url IS NOT NULL AND thumbnail_url IS NOT NULL) OR
  (media_type = 'instagram' AND instagram_url IS NOT NULL AND image_url IS NOT NULL)
); 