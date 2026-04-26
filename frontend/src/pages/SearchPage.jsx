import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, MapPin, X, ChevronDown, Package, ArrowUpRight } from 'lucide-react';
import AnnonceCard from '../components/annonces/AnnonceCard';
import WilayaSelect from '../components/ui/WilayaSelect';
import PremiumButton from '../components/ui/PremiumButton';
import FadeUp from '../components/animations/FadeUp';
import Skeleton, { CardSkeleton } from '../components/ui/Skeleton';
import './SearchPage.css';

const CATEGORIES = ['Tous', 'Antibiotiques', 'Cardiovasculaire', 'Diabète', 'Neurologie', 'Oncologie', 'Dermatologie', 'Pédiatrie', 'Ophtalmologie'];

const MOCK_ANNONCES = [
  { id: 1, type: 'offre', name: 'Doliprane 1000mg', category: 'Antibiotiques', wilaya: 'Alger', date: '2026-04-04', imageUrl: '' },
  { id: 2, type: 'demande', name: 'Insuline NovoMix 30', category: 'Diabète', wilaya: 'Oran', date: '2026-04-03', imageUrl: '' },
  { id: 3, type: 'offre', name: 'Amoxicilline 500mg', category: 'Antibiotiques', wilaya: 'Constantine', date: '2026-04-02', imageUrl: '' },
  { id: 4, type: 'demande', name: 'Losartan 50mg', category: 'Cardiovasculaire', wilaya: 'Tizi Ouzou', date: '2026-04-01', imageUrl: '' },
  { id: 5, type: 'offre', name: 'Metformine 850mg', category: 'Diabète', wilaya: 'Blida', date: '2026-03-31', imageUrl: '' },
  { id: 6, type: 'offre', name: 'Ventoline 100µg', category: 'Pédiatrie', wilaya: 'Sétif', date: '2026-03-30', imageUrl: '' },
  { id: 7, type: 'demande', name: 'Lévothyrox 50µg', category: 'Neurologie', wilaya: 'Annaba', date: '2026-03-29', imageUrl: '' },
  { id: 8, type: 'offre', name: 'Augmentin 1g', category: 'Antibiotiques', wilaya: 'Béjaïa', date: '2026-03-28', imageUrl: '' },
  { id: 9, type: 'demande', name: 'Sérum Physiologique NaCl', category: 'Pédiatrie', wilaya: 'Batna', date: '2026-03-27', imageUrl: '' },
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedWilaya, setSelectedWilaya] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    return MOCK_ANNONCES.filter(a => {
      const matchQuery = !query || a.name.toLowerCase().includes(query.toLowerCase());
      const matchType = selectedType === 'all' || a.type === selectedType;
      const matchCat = selectedCategory === 'Tous' || a.category === selectedCategory;
      const matchWilaya = !selectedWilaya || a.wilaya === selectedWilaya;
      return matchQuery && matchType && matchCat && matchWilaya;
    });
  }, [query, selectedType, selectedCategory, selectedWilaya]);

  const activeFilterCount = [selectedType !== 'all', selectedCategory !== 'Tous', selectedWilaya].filter(Boolean).length;

  return (
    <div className="search-page">
      {/* Hero Mini */}
      <section className="search-hero">
        <div className="search-hero__glow" />
        <div className="container">
          <FadeUp>
            <h1 className="search-hero__title">
              Rechercher un <span className="gradient-text">médicament</span>
            </h1>
            <p className="search-hero__sub">
              Parcourez {MOCK_ANNONCES.length}+ annonces vérifiées à travers les 69 wilayas.
            </p>
          </FadeUp>

          {/* Search Bar */}
          <FadeUp delay={0.1}>
            <div className="search-bar glass-bright">
              <Search size={20} className="search-bar__icon" />
              <input
                type="text"
                className="search-bar__input"
                placeholder="Médicament, DCI, marque..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                id="search-input"
              />
              {query && (
                <button className="search-bar__clear" onClick={() => setQuery('')} aria-label="Effacer">
                  <X size={16} />
                </button>
              )}
              <button
                className={`search-bar__filter-btn ${showFilters ? 'active' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
                aria-label="Filtres"
              >
                <SlidersHorizontal size={18} />
                {activeFilterCount > 0 && <span className="filter-count">{activeFilterCount}</span>}
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.section
            className="search-filters"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="container search-filters__inner">
              {/* Type Toggle */}
              <div className="filter-group">
                <label className="filter-label">Type</label>
                <div className="type-toggle">
                  {[{ val: 'all', lbl: 'Tous' }, { val: 'offre', lbl: '↑ Offres' }, { val: 'demande', lbl: '↓ Demandes' }].map(t => (
                    <button
                      key={t.val}
                      className={`type-toggle__btn ${selectedType === t.val ? 'active' : ''}`}
                      onClick={() => setSelectedType(t.val)}
                    >
                      {t.lbl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Pills */}
              <div className="filter-group">
                <label className="filter-label">Catégorie</label>
                <div className="cat-pills">
                  {CATEGORIES.map(c => (
                    <button
                      key={c}
                      className={`cat-pill ${selectedCategory === c ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wilaya */}
              <div className="filter-group filter-group--wilaya">
                <WilayaSelect
                  value={selectedWilaya}
                  onChange={setSelectedWilaya}
                  label="Wilaya"
                  placeholder="Toutes les wilayas"
                />
              </div>

              {/* Clear */}
              {activeFilterCount > 0 && (
                <button className="clear-filters-btn" onClick={() => {
                  setSelectedType('all');
                  setSelectedCategory('Tous');
                  setSelectedWilaya('');
                }}>
                  <X size={14} /> Réinitialiser les filtres
                </button>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Results */}
      <section className="search-results">
        <div className="container">
          <div className="search-results__header">
            <span className="search-results__count">
              <Package size={16} />
              {filtered.length} résultat{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="search-results-content">
            {isLoading ? (
              <div className="search-results__grid">
                {[...Array(6)].map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : filtered.length > 0 ? (
              <div className="search-results__grid">
                {filtered.map((a, i) => (
                  <AnnonceCard key={a.id} annonce={a} index={i} />
                ))}
              </div>
            ) : (
              <FadeUp>
                <div className="search-empty glass">
                  <Search size={48} className="search-empty__icon" />
                  <h3 className="search-empty__title">Aucun résultat trouvé</h3>
                  <p className="search-empty__desc">
                    Essayez de modifier vos filtres ou votre recherche.
                  </p>
                </div>
              </FadeUp>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
