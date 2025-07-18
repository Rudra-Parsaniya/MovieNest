import React from 'react';

interface GenreFilterProps {
  genres: string[];
  selectedGenre: string | null;
  onGenreSelect: (genre: string | null) => void;
}

export const GenreFilter: React.FC<GenreFilterProps> = ({
  genres,
  selectedGenre,
  onGenreSelect,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onGenreSelect(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedGenre === null
            ? 'bg-red-600 text-white'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
      >
        All Genres
      </button>
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => onGenreSelect(genre)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedGenre === genre
              ? 'bg-red-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};