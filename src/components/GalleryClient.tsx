'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { GalleryAlbum, GalleryImage } from '@/types';
import { GalleryLightbox } from '@/components/GalleryLightbox';
import { Filter, Calendar, FolderArchive, Sparkles, ZoomIn } from 'lucide-react';

interface GalleryClientProps {
  albums: GalleryAlbum[];
}

export const GalleryClient: React.FC<GalleryClientProps> = ({ albums }) => {
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Lightbox state
  const [activeImages, setActiveImages] = useState<GalleryImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredAlbums = useMemo(() => {
    return albums.filter((album) => {
      if (selectedYear !== 'all' && album.academicYear !== selectedYear) return false;
      if (selectedCategory !== 'all' && album.category !== selectedCategory) return false;
      return true;
    });
  }, [albums, selectedYear, selectedCategory]);

  const openLightboxForAlbum = (albumImages: GalleryImage[], index: number) => {
    setActiveImages(albumImages);
    setLightboxIndex(index);
  };

  return (
    <div className="space-y-12">
      {/* Notice regarding sample photos */}
      <div className="p-4 rounded-xl bg-ecell-beige/50 border border-ecell-border flex items-center justify-between text-xs text-ecell-navy">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-ecell-blue shrink-0" />
          <span>
            <strong>Editorial Archive Note:</strong> Photographs currently displayed illustrate typical conclave environments and will be populated with certified E-Cell MITAOE media coverage.
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-ecell-border p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-ecell-navy flex items-center gap-1.5 mr-1">
            <Filter className="w-3.5 h-3.5 text-ecell-blue" />
            <span>Category:</span>
          </span>
          {['all', 'Flagship', 'Hackathon', 'Workshop'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-ecell-blue text-white font-bold'
                  : 'bg-ecell-offwhite hover:bg-ecell-beige text-ecell-navy border border-ecell-border'
              }`}
            >
              {cat === 'all' ? 'All Event Types' : cat}
            </button>
          ))}
        </div>

        {/* Academic Year Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-ecell-navy flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-ecell-blue" />
            <span>Academic Year:</span>
          </span>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-ecell-border bg-ecell-offwhite text-ecell-navy text-xs font-medium focus:border-ecell-blue"
          >
            <option value="all">All Academic Years</option>
            <option value="2024-25">2024-25</option>
            <option value="2023-24">2023-24</option>
          </select>
        </div>
      </div>

      {/* Album-Organized Grids */}
      <div className="space-y-16">
        {filteredAlbums.map((album) => (
          <section key={album.id} className="space-y-6">
            
            {/* Album Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-ecell-border pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-ecell-blue">
                    {album.category} Album
                  </span>
                  <span className="text-xs text-ecell-muted">•</span>
                  <span className="text-xs font-mono text-ecell-muted">{album.academicYear}</span>
                </div>
                <h2 className="text-2xl font-bold text-ecell-navy flex items-center gap-2">
                  <FolderArchive className="w-5 h-5 text-ecell-blue" />
                  <span>{album.title}</span>
                </h2>
                <p className="text-sm text-ecell-muted mt-1 max-w-2xl">
                  {album.description}
                </p>
              </div>

              <div className="text-xs text-ecell-muted font-medium">
                {album.images.length} Photographs
              </div>
            </div>

            {/* Editorial Image Grid for this album */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {album.images.map((image, idx) => (
                <div
                  key={image.id}
                  onClick={() => openLightboxForAlbum(album.images, idx)}
                  className="group relative aspect-4/3 rounded-xl overflow-hidden border border-ecell-border bg-ecell-beige/30 cursor-pointer shadow-xs hover:border-ecell-blue hover:shadow-md transition-all duration-300"
                >
                  <Image
                    src={image.url}
                    alt={image.caption}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Subtle Gradient & Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Zoom indicator on hover */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>

                  {/* Caption & Metadata at bottom */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-medium text-white/95 line-clamp-2 leading-snug">
                      {image.caption}
                    </p>
                    <span className="text-[10px] text-ecell-beige/80 font-mono block mt-1">
                      {image.eventName}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </section>
        ))}

        {filteredAlbums.length === 0 && (
          <div className="p-12 text-center bg-white rounded-2xl border border-ecell-border space-y-3">
            <h3 className="text-lg font-bold text-ecell-navy">No Albums Found</h3>
            <p className="text-sm text-ecell-muted">No photo collections match the current filters.</p>
          </div>
        )}
      </div>

      {/* Accessible Lightbox Modal */}
      <GalleryLightbox
        images={activeImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIndex) => setLightboxIndex(newIndex)}
      />
    </div>
  );
};
