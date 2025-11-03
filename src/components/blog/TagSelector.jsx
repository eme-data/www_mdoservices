import React, { useState, useEffect } from 'react'
import { X, Plus, Tag } from 'lucide-react'
import { fetchTags } from '@/lib/api'
import { Button } from '@/components/ui/button'

export function TagSelector({ selectedTags = [], onChange }) {
  const [allTags, setAllTags] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    loadTags()
  }, [])

  const loadTags = async () => {
    try {
      const tags = await fetchTags()
      setAllTags(tags || [])
    } catch (err) {
      console.error('Error loading tags:', err)
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)

    if (value.trim()) {
      const filtered = allTags.filter(tag =>
        tag.name.toLowerCase().includes(value.toLowerCase()) &&
        !selectedTags.find(st => st.id === tag.id)
      )
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const addTag = (tag) => {
    if (!selectedTags.find(t => t.id === tag.id)) {
      onChange && onChange([...selectedTags, tag])
    }
    setInputValue('')
    setSuggestions([])
    setShowSuggestions(false)
  }

  const removeTag = (tagId) => {
    onChange && onChange(selectedTags.filter(t => t.id !== tagId))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() && suggestions.length > 0) {
      e.preventDefault()
      addTag(suggestions[0])
    }
  }

  return (
    <div className="space-y-3">
      {/* Selected tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
            >
              <Tag className="w-3 h-3" />
              {tag.name}
              <button
                type="button"
                onClick={() => removeTag(tag.id)}
                className="ml-1 hover:text-blue-900 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input with autocomplete */}
      <div className="relative">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => inputValue && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Rechercher ou créer un tag..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Autocomplete suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {suggestions.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => addTag(tag)}
                className="w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors flex items-center gap-2 group"
              >
                <Tag className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                <span className="text-gray-700 group-hover:text-blue-700">{tag.name}</span>
                {tag.usage_count > 0 && (
                  <span className="ml-auto text-xs text-gray-500">
                    {tag.usage_count} article{tag.usage_count > 1 ? 's' : ''}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Available tags */}
      {allTags.length > 0 && (
        <div>
          <p className="text-sm text-gray-600 mb-2">Tags disponibles:</p>
          <div className="flex flex-wrap gap-2">
            {allTags
              .filter(tag => !selectedTags.find(st => st.id === tag.id))
              .slice(0, 10)
              .map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => addTag(tag)}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  {tag.name}
                  {tag.usage_count > 0 && (
                    <span className="text-gray-500">({tag.usage_count})</span>
                  )}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
