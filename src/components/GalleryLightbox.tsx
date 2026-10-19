'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { GalleryImage } from '@/types';
import { X, ChevronLeft, ChevronRight, Calendar, Tag } from 'lucide-react';

interface GalleryLightboxProps {
  images: GalleryImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < images.length;
  const currentImage = isOpen ? images[currentIndex] : null;

  const handleNext = useCallback(() => {
    if (currentIndex !== null && currentIndex < images.length - 1) {
      onNavigate(currentIndex + 1);
    } else {
      onNavigate(0); // Loop to start
    }
  }, [currentIndex, images.length, onNavigate]);

  const handlePrev = useCallback(() => {
    if (currentIndex !== null && currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else {
      onNavigate(images.length - 1); // Loop to end
    }
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!isOpen || !currentImage) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image preview lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 sm:p-6 md:p-8 animate-in fade-in duration-200"
    >
      {/* Top Bar with counter & close button */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 sm:p-6 text-white bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm tracking-wider text-ecell-beige">
            {currentIndex + 1} / {images.length}
          </span>
          <span className="hidden sm:inline-block h-3 w-px bg-white/30" />
          <span className="hidden sm:inline-block text-sm font-medium text-white/90">
            {currentImage.eventName}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-ecell-blue"
          aria-label="Close lightbox (Esc)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Prev Navigation Button */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ecell-blue"
        aria-label="Previous image (Left arrow)"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next Navigation Button */}
      <button
        type="button"
        onClick={handleNext}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ecell-blue"
        aria-label="Next image (Right arrow)"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Image and Caption Container */}
      <div className="relative flex flex-col items-center justify-center max-w-5xl max-h-[85vh] w-full">
        <div className="relative w-full h-[60vh] sm:h-[70vh] flex items-center justify-center">
          <Image
            src={currentImage.url}
            alt={currentImage.caption}
            fill
            sizes="90vw"
            className="object-contain"
            priority
          />
        </div>

        {/* Caption Box */}
        <div className="mt-4 max-w-2xl text-center px-4">
          <p className="text-sm sm:text-base text-white/90 font-medium">
            {currentImage.caption}
          </p>
          <div className="mt-2 flex items-center justify-center gap-3 text-xs text-ecell-beige/80">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-ecell-blue" />
              <span>{currentImage.academicYear}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Tag className="w-3 h-3 text-ecell-blue" />
              <span>{currentImage.category}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
