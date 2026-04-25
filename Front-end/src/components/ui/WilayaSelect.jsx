import React, { useState, useRef, useEffect } from 'react';
import { WILAYAS } from '../../data/wilayas';
import { MapPin, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './WilayaSelect.css';

export default function WilayaSelect({
  value,
  onChange,
  label = "Wilaya",
  placeholder = "Sélectionner une wilaya...",
  error,
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownDirection, setDropdownDirection] = useState('down');
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    if (!isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      // If less than 300px below, and more space above, open upwards
      if (spaceBelow < 300 && rect.top > spaceBelow) {
        setDropdownDirection('up');
      } else {
        setDropdownDirection('down');
      }
    }
    setIsOpen(!isOpen);
  };

  const selectedWilaya = WILAYAS.find(w => w.id === value);
  const displayValue = selectedWilaya ? `${selectedWilaya.id} - ${selectedWilaya.name}` : placeholder;

  return (
    <div className={`input-group ${error ? 'has-error' : ''} ${className}`} ref={containerRef}>
      {label && <label className="input-label">{label}</label>}
      
      <div 
        className={`select-wrapper custom-select ${isOpen ? 'is-open' : ''}`}
        onClick={toggleDropdown}
      >
        <MapPin className="select-icon-left" size={18} />
        <div className={`select-field-display ${!value ? 'is-placeholder' : ''}`}>
          {displayValue}
        </div>
        <ChevronDown 
          className="select-icon-right" 
          size={16} 
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
        />
        
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className={`select-dropdown ${dropdownDirection === 'up' ? 'opens-up' : ''}`}
              initial={{ opacity: 0, y: dropdownDirection === 'up' ? 10 : -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: dropdownDirection === 'up' ? 10 : -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <ul className="select-options-list custom-scrollbar">
                {WILAYAS.map(w => (
                  <li 
                    key={w.id} 
                    className={`select-option ${value === w.id ? 'is-selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(w.id);
                      setIsOpen(false);
                    }}
                  >
                    <span className="wi-id">{w.id} - </span>
                    <span className="wi-name">{w.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {error && <p className="input-error-msg">{error}</p>}
    </div>
  );
}
