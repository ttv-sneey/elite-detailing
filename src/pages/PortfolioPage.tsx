import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Car, Star, Clock, Shield, RotateCcw, X, ChevronLeft, ChevronRight, Play, AlertCircle, Instagram } from 'lucide-react';
import { fetchPortfolioItems, fetchPortfolioItemsByPackage, PortfolioItem, getInstagramEmbedUrl, fixVideoUrls } from '../services/portfolioService';
import VideoPlayer from '../components/VideoPlayer';

const PortfolioPage = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [instagramEmbedHtml, setInstagramEmbedHtml] = useState<string>('');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const loadPortfolioItems = async () => {
      try {
        setLoading(true);
        let items: PortfolioItem[];
        
        if (activeFilter === 'all') {
          items = await fetchPortfolioItems();
        } else {
          items = await fetchPortfolioItemsByPackage(activeFilter);
        }
        
        setPortfolioItems(items);
        setLoading(false);
      } catch (err) {
        setError('Failed to load portfolio items. Please try again later.');
        setLoading(false);
      }
    };
    
    loadPortfolioItems();
  }, [activeFilter]);

  const getPackageName = (packageType: string) => {
    switch(packageType) {
      case 'express': return 'Express Package';
      case 'gold': return 'Gold Package';
      case 'always-fresh': return 'Always Fresh Program';
      case 'interior': return 'Interior Detail';
      case 'exterior': return 'Exterior Detail';
      case 'glass': return 'Glass Coating';
      default: return packageType;
    }
  };

  const getPackageIcon = (packageType: string) => {
    switch(packageType) {
      case 'express': return <Clock className="text-blue-600" />;
      case 'gold': return <Star className="text-yellow-500" />;
      case 'always-fresh': return <RotateCcw className="text-green-500" />;
      case 'interior': return <Package className="text-purple-500" />;
      case 'exterior': return <Car className="text-red-500" />;
      case 'glass': return <Shield className="text-blue-400" />;
      default: return <Package className="text-gray-500" />;
    }
  };

  const handleItemClick = (item: PortfolioItem) => {
    setSelectedItem(item);
    setCurrentMediaIndex(0);
    setVideoError(null);
    setIsVideoLoading(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setCurrentMediaIndex(0);
  };

  const handlePrevious = () => {
    setCurrentMediaIndex((prev) => (prev > 0 ? prev - 1 : portfolioItems.length - 1));
  };

  const handleNext = () => {
    setCurrentMediaIndex((prev) => (prev < portfolioItems.length - 1 ? prev + 1 : 0));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedItem) {
      if (e.key === 'Escape') handleCloseModal();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    }
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.target as HTMLVideoElement;
    let errorMessage = 'Failed to load video. ';
    
    if (video.error) {
      switch (video.error.code) {
        case MediaError.MEDIA_ERR_ABORTED:
          errorMessage += 'Playback was aborted.';
          break;
        case MediaError.MEDIA_ERR_NETWORK:
          errorMessage += 'A network error occurred. Please check your internet connection.';
          break;
        case MediaError.MEDIA_ERR_DECODE:
          errorMessage += 'Video format is not supported. Please try a different format (MP4 recommended).';
          break;
        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
          errorMessage += 'Video source is not supported or not accessible.';
          break;
        default:
          errorMessage += 'An unknown error occurred.';
      }
    }
    
    setVideoError(errorMessage);
    setIsVideoLoading(false);
  };

  const handleVideoLoad = () => {
    setIsVideoLoading(false);
    setVideoError(null);
  };

  const handleVideoLoadStart = () => {
    setIsVideoLoading(true);
    setVideoError(null);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem]);

  const getInstagramEmbed = async (url: string) => {
    try {
      setIsVideoLoading(true);
      setVideoError(null);
      
      const cleanUrl = url.split('?')[0];
      const response = await fetch(`https://api.instagram.com/oembed?url=${encodeURIComponent(cleanUrl)}`);
      
      if (!response.ok) {
        throw new Error('Failed to load Instagram embed');
      }
      
      const data = await response.json();
      setInstagramEmbedHtml(data.html);
      setIsVideoLoading(false);
    } catch (error) {
      setVideoError('Failed to load Instagram post. Please make sure the post is public.');
      setIsVideoLoading(false);
    }
  };

  useEffect(() => {
    if (selectedItem?.media_type === 'instagram' && selectedItem.instagram_url) {
      getInstagramEmbed(selectedItem.instagram_url);
    }
  }, [selectedItem]);

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
  };

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-center mb-2">Our Portfolio</h1>
          <p className="text-gray-600 text-center mb-8">Check out some of our best work for each service package</p>
          
          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveFilter('all')}
              type="button"
              aria-label="Show all packages"
            >
              All Packages
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'express' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveFilter('express')}
              type="button"
              aria-label="Show express package"
            >
              Express Package
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'gold' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveFilter('gold')}
              type="button"
              aria-label="Show gold package"
            >
              Gold Package
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'always-fresh' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveFilter('always-fresh')}
              type="button"
              aria-label="Show always fresh program"
            >
              Always Fresh Program
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'interior' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveFilter('interior')}
              type="button"
              aria-label="Show interior detail"
            >
              Interior Detail
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'exterior' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveFilter('exterior')}
              type="button"
              aria-label="Show exterior detail"
            >
              Exterior Detail
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'glass' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveFilter('glass')}
              type="button"
              aria-label="Show glass coating"
            >
              Glass Coating
            </button>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md mb-8 text-center">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.map((item) => (
                <motion.div 
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleItemClick(item)}
                >
                  <div className="relative h-48 overflow-hidden">
                    {item.media_type === 'instagram' ? (
                      <>
                        <img 
                          src={item.image_url} 
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                          <Instagram className="w-12 h-12 text-white" />
                        </div>
                      </>
                    ) : item.media_type === 'video' ? (
                      <>
                        <img 
                          src={item.thumbnail_url || 'https://placehold.co/600x400/940cff/ffffff?text=Video+Thumbnail'} 
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.src = 'https://placehold.co/600x400/940cff/ffffff?text=Video+Thumbnail';
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                      </>
                    ) : (
                      <img 
                        src={item.image_url} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    )}
                    <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                      {getPackageIcon(item.package_type)}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{getPackageName(item.package_type)} • {item.vehicle_type === 'car' ? 'Car' : 'SUV'}</p>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {/* Modal Gallery */}
          <AnimatePresence>
            {selectedItem && (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <button
                  className="absolute top-4 right-4 text-white hover:text-blue-400"
                  onClick={handleCloseModal}
                >
                  <X size={24} />
                </button>
                
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-blue-400"
                  onClick={handlePrevious}
                >
                  <ChevronLeft size={32} />
                </button>
                
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-blue-400"
                  onClick={handleNext}
                >
                  <ChevronRight size={32} />
                </button>
                
                <div className="max-w-4xl w-full mx-4">
                  {selectedItem.media_type === 'video' && selectedItem.video_url ? (
                    <VideoPlayer
                      videoUrl={selectedItem.video_url}
                      title={selectedItem.title}
                    />
                  ) : (
                    <img
                      src={selectedItem.image_url}
                      alt={selectedItem.title}
                      className="w-full rounded-lg"
                    />
                  )}
                  
                  <div className="mt-4 text-white text-center">
                    <h3 className="text-xl font-semibold mb-2">{selectedItem.title}</h3>
                    <p className="text-gray-300">{selectedItem.description}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {!loading && portfolioItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No portfolio items found for this package.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioPage; 