import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HeaderSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();
  const debounceTimerRef = useRef(null);
  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const fetchSuggestions = async (searchQuery) => {
    if (searchQuery.trim().length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);
    const url = `https://pets.xn--80ahdri7a.site/api/search?query=${encodeURIComponent(searchQuery)}`;
    try {
      const response = await fetch(url);

      if (response.status === 200) {
        const data = await response.json();
        const orders = data.data.orders || [];
        setSuggestions(orders.slice(0, 5));
        setShowSuggestions(orders.length > 0);
      } else if (response.status === 204) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.log("Ошибка сервера");
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (value.trim().length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    debounceTimerRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.description);
    setShowSuggestions(false);
    navigate(`/search/${encodeURIComponent(suggestion.description)}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    navigate(`/search/${encodeURIComponent(query.trim())}`);
  };

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="position-relative" ref={suggestionsRef}>
      <form onSubmit={handleSearchSubmit} className="d-flex">
        <div className="input-group">
          <input
            ref={searchInputRef}
            type="text"
            className="form-control"
            placeholder="Поиск по описанию..."
            value={query}
            onChange={handleInputChange}
            style={{ width: "250px" }}
          />
          <button
            className="btn btn-outline-success"
            type="submit"
          >
            Найти
          </button>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div
          id="search-suggestions"
          className="position-absolute top-100 start-0 end-0 mt-1 bg-white border rounded shadow"
          style={{
            zIndex: 1050,
            maxHeight: "350px",
            overflowY: "auto",
            minWidth: "300px"
          }}
        >
          <div className="list-group list-group-flush">
            {suggestions.map((suggestion, index) => (
              <button
                key={suggestion.id}
                type="button"
                className={`list-group-item list-group-item-action text-start border-0`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="d-flex align-items-start">
                  <div className="flex-grow-1">
                    <p
                      className="mb-1 small text-truncate"
                      style={{ maxWidth: "250px" }}
                    >
                      {suggestion.description}
                    </p>

                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {query.length > 0 && query.length < 3 && (
        <div
          className="position-absolute top-100 start-0 mt-1 bg-white border rounded shadow p-2 small"
          style={{ zIndex: 1050, width: "250px" }}
        >
          <div className="d-flex align-items-center">
            <span>Введите минимум 3 символа для поиска</span>
          </div>
        </div>
      )}

      {query.length >= 3 && loading && (
        <div
          className="position-absolute top-100 start-0 mt-1 bg-white border rounded shadow p-2 small"
          style={{ zIndex: 1050, width: "250px" }}
        >
          <div className="d-flex align-items-center">
            <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
            </div>
            <span>Ищем подсказки...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderSearch;