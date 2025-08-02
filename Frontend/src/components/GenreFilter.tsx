import React from 'react';

interface GenreFilterProps {
  genres: string[];
  selectedGenres: string[];
  onGenreSelect: (genres: string[]) => void;
}

export const GenreFilter: React.FC<GenreFilterProps> = ({
  genres,
  selectedGenres,
  onGenreSelect,
}) => {
  const handleGenreToggle = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      onGenreSelect(selectedGenres.filter(g => g !== genre));
    } else {
      onGenreSelect([...selectedGenres, genre]);
    }
  };

  const clearAll = () => {
    onGenreSelect([]);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={clearAll}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedGenres.length === 0
            ? 'bg-red-600 text-white'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
      >
        All Genres
      </button>
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => handleGenreToggle(genre)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedGenres.includes(genre)
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