import { supabase } from '../lib/supabase';

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  media_type: 'image' | 'video' | 'instagram';
  image_url?: string;
  video_url?: string;
  thumbnail_url?: string;
  instagram_url?: string;
  package_type: string;
  vehicle_type: 'car' | 'suv';
  created_at: string;
  updated_at: string;
}

/**
 * Fetch all portfolio items from Supabase
 */
export const fetchPortfolioItems = async (): Promise<PortfolioItem[]> => {
  try {
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    throw error;
  }
};

/**
 * Fetch portfolio items by package type
 */
export const fetchPortfolioItemsByPackage = async (packageType: string): Promise<PortfolioItem[]> => {
  try {
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .eq('package_type', packageType)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    throw error;
  }
};

/**
 * Validate Instagram URL
 */
export const validateInstagramUrl = (url: string): boolean => {
  try {
    const instagramRegex = /^https?:\/\/(www\.)?instagram\.com\/(p|reel)\/([^/?#&]+)/;
    return instagramRegex.test(url);
  } catch (error) {
    return false;
  }
};

/**
 * Get Instagram embed URL
 */
export const getInstagramEmbedUrl = (url: string): string => {
  const cleanUrl = url.split('?')[0];
  return `https://api.instagram.com/oembed?url=${encodeURIComponent(cleanUrl)}`;
};

/**
 * Upload a new portfolio item
 */
export const uploadPortfolioItem = async (item: Omit<PortfolioItem, 'id' | 'created_at' | 'updated_at'>): Promise<PortfolioItem> => {
  try {
    if (item.media_type === 'instagram' && item.instagram_url) {
      if (!validateInstagramUrl(item.instagram_url)) {
        throw new Error('Invalid Instagram URL');
      }
    }

    const { data, error } = await supabase
      .from('portfolio')
      .insert([item])
      .select()
      .single();
      
    if (error) throw error;
    
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Update an existing portfolio item
 */
export const updatePortfolioItem = async (id: string, updates: Partial<PortfolioItem>): Promise<PortfolioItem> => {
  try {
    const { data, error } = await supabase
      .from('portfolio')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a portfolio item
 */
export const deletePortfolioItem = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('portfolio')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  } catch (error) {
    throw error;
  }
};

/**
 * Upload an image to Supabase Storage
 */
export const uploadPortfolioImage = async (file: File): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `portfolio/${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);
      
    if (uploadError) throw uploadError;
    
    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);
      
    return data.publicUrl;
  } catch (error) {
    throw error;
  }
};

/**
 * Validate video URL
 */
export const validateVideoUrl = async (url: string): Promise<boolean> => {
  try {
    if (!url || typeof url !== 'string') {
      return false;
    }

    if (!url.includes('teyteheoxguupdkapsgm.supabase.co')) {
      return false;
    }

    const response = await fetch(url, { 
      method: 'HEAD',
      headers: {
        'Range': 'bytes=0-0'
      }
    });

    if (!response.ok) {
      return false;
    }

    const contentType = response.headers.get('content-type');
    if (!contentType?.startsWith('video/')) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

/**
 * List files in a bucket
 */
const listBucketFiles = async (bucket: string): Promise<string[]> => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list();
      
    if (error) {
      console.error('Error listing bucket:', error);
      return [];
    }
    
    console.log('Bucket contents:', data);
    return data.map(item => item.name);
  } catch (error) {
    console.error('Error listing bucket:', error);
    return [];
  }
};

/**
 * Get the public URL for a file in Supabase storage
 */
const getPublicUrl = (bucket: string, path: string): string => {
  const cleanPath = path
    .replace(/^\/+/, '')
    .replace(/\/+/g, '/')
    .replace(/\/+$/, '');
  
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(cleanPath);
  
  let url = data.publicUrl
    .replace(/^\/+/, '')
    .replace(/\/+/g, '/')
    .replace(/\/+$/, '');
  
  if (url.startsWith('https:/') && !url.startsWith('https://')) {
    url = url.replace('https:/', 'https://');
  }
  
  const urlObj = new URL(url);
  urlObj.searchParams.set('autoplay', '0');
  urlObj.searchParams.set('controls', '1');
  urlObj.searchParams.set('rel', '0');
  
  console.log('Supabase storage URL:', {
    bucket,
    originalPath: path,
    cleanPath,
    publicUrl: urlObj.toString()
  });
  
  return urlObj.toString();
};

/**
 * Upload a video to Supabase Storage
 */
export const uploadPortfolioVideo = async (file: File): Promise<{ videoUrl: string, thumbnailUrl: string }> => {
  try {
    // Validate file type
    if (!file.type.startsWith('video/')) {
      throw new Error('Invalid file type. Please upload a video file.');
    }

    // Validate file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      throw new Error('Video file is too large. Maximum size is 100MB.');
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase();
    if (!['mp4', 'webm', 'mov'].includes(fileExt || '')) {
      throw new Error('Unsupported video format. Please upload MP4, WebM, or MOV files.');
    }

    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `portfolio/videos/${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from('elitevideos')
      .upload(filePath, file, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      });
      
    if (uploadError) {
      console.error('Error uploading video:', uploadError);
      throw uploadError;
    }
    
    // Get the public URL for the video
    const videoUrl = getPublicUrl('elitevideos', filePath);
    
    // Generate a thumbnail URL
    const thumbnailUrl = videoUrl.replace(`.${fileExt}`, '_thumb.jpg');
    
    // Validate the video URL
    const isValid = await validateVideoUrl(videoUrl);
    if (!isValid) {
      throw new Error('Failed to validate video URL');
    }
    
    return {
      videoUrl,
      thumbnailUrl
    };
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
};

/**
 * Check if a video URL is accessible and has the correct content type
 */
const checkVideoAccess = async (url: string): Promise<boolean> => {
  try {
    // Fix protocol if needed
    let testUrl = url;
    if (testUrl.startsWith('https:/') && !testUrl.startsWith('https://')) {
      testUrl = testUrl.replace('https:/', 'https://');
    }
    
    const response = await fetch(testUrl, { method: 'HEAD' });
    if (!response.ok) {
      console.error('Video not accessible:', response.status, response.statusText);
      return false;
    }

    const contentType = response.headers.get('content-type');
    console.log('Video content type:', contentType);

    if (!contentType?.startsWith('video/')) {
      console.error('Invalid content type:', contentType);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error checking video access:', error);
    return false;
  }
};

/**
 * Try different path formats to find the correct video URL
 */
const findWorkingVideoUrl = async (fileName: string): Promise<string | null> => {
  const possiblePaths = [
    fileName,
    `videos/${fileName}`,
    `portfolio/videos/${fileName}`,
    `portfolio/${fileName}`,
    `public/${fileName}`,
    `public/videos/${fileName}`,
    `public/portfolio/videos/${fileName}`
  ];

  for (const path of possiblePaths) {
    try {
      const url = getPublicUrl('elitevideos', path);
      console.log('Trying path:', path, 'URL:', url);
      
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        console.log('Found working URL:', url);
        return url;
      }
    } catch (error) {
      console.error('Error checking path:', path, error);
    }
  }
  
  // If no working URL is found, try the direct URL that works in the browser
  const directUrl = `https://teyteheoxguupdkapsgm.supabase.co/storage/v1/object/public/elitevideos/${fileName}`;
  try {
    const response = await fetch(directUrl, { method: 'HEAD' });
    if (response.ok) {
      console.log('Found working direct URL:', directUrl);
      return directUrl;
    }
  } catch (error) {
    console.error('Error checking direct URL:', error);
  }
  
  return null;
};

/**
 * Fix video URLs in the database by removing double slashes and ensuring correct format
 */
export const fixVideoUrls = async (): Promise<void> => {
  try {
    // Get all video items
    const { data: items, error: fetchError } = await supabase
      .from('portfolio')
      .select('*')
      .eq('media_type', 'video');
      
    if (fetchError) throw fetchError;
    
    console.log('Found video items:', items);
    
    // Update each item with fixed URLs
    for (const item of items) {
      if (item.video_url) {
        try {
          // Extract the file name from the URL
          const urlParts = item.video_url.split('/');
          const fileName = urlParts[urlParts.length - 1];
          
          // Try to find a working URL
          const fixedVideoUrl = await findWorkingVideoUrl(fileName);
          if (!fixedVideoUrl) {
            console.error('Could not find working URL for:', fileName);
            continue;
          }
          
          // Generate a thumbnail URL
          const videoExt = fileName.split('.').pop();
          const fixedThumbnailUrl = fixedVideoUrl.replace(`.${videoExt}`, '_thumb.jpg');
          
          console.log('Updating item:', {
            id: item.id,
            oldVideoUrl: item.video_url,
            newVideoUrl: fixedVideoUrl,
            oldThumbnailUrl: item.thumbnail_url,
            newThumbnailUrl: fixedThumbnailUrl
          });
          
          const { error: updateError } = await supabase
            .from('portfolio')
            .update({
              video_url: fixedVideoUrl,
              thumbnail_url: fixedThumbnailUrl
            })
            .eq('id', item.id);
            
          if (updateError) {
            console.error(`Error updating item ${item.id}:`, updateError);
          }
        } catch (error) {
          console.error(`Error fixing URL for item ${item.id}:`, error);
        }
      }
    }
  } catch (error) {
    console.error('Error fixing video URLs:', error);
    throw error;
  }
}; 