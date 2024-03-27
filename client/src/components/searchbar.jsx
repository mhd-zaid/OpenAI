import { Icon } from '@iconify/react';
import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';

const Searchbar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    handleSearch();
  }, [debouncedSearch]);

  const handleSearch = async () => {
    if (debouncedSearch.length < 3) return;
    setIsLoading(true);
    await fetch(import.meta.env.VITE_BACKEND_URL + '/search', {
      method: 'POST',
      body: JSON.stringify({ message: debouncedSearch }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        setSearchResults(JSON.parse(data.content));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="lg:col-span-7 md:col-span-6 hidden md:block">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Icon
            icon="line-md:search"
            fontSize={20}
            style={{ color: '#facc15' }}
          />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Une recette, un ingrédient, de l'aide..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          required
        />
      </div>
    </div>
  );
};

export default Searchbar;
