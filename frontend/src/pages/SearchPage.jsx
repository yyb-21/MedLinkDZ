import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, MapPin, X, ChevronDown, Package, ArrowUpRight } from 'lucide-react';
import AnnonceCard from '../components/annonces/AnnonceCard';
import WilayaSelect from '../components/ui/WilayaSelect';
import PremiumButton from '../components/ui/PremiumButton';
import FadeUp from '../components/animations/FadeUp';
import Skeleton, { CardSkeleton } from '../components/ui/Skeleton';
import { annonceApi, assetUrl } from '../services/api';
import './SearchPage.css';

const CATEGORIES = ['Tous', 'Antibiotiques', 'Cardiovasculaire', 'Diabète', 'Neurologie', 'Oncologie', 'Dermatologie', 'Pédiatrie', 'Ophtalmologie'];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedWilaya, setSelectedWilaya] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [allAnnonces, setAllAnnonces] = useState([]);
  const [error, setError] = useState(null);

  // Fetch annonces on mount
  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await annonceApi.list();
        
        if (response.success && Array.isArray(response.annonces)) {
          const formattedAnnonces = response.annonces.map(annonce => ({
            id: annonce.id,
            type: annonce.type === 'DON' ? 'offre' : 'demande',
            name: annonce.dci || annonce.marque || 'Médicament',
            category: annonce.categorie_nom || 'Autre',
            wilaya: annonce.wilaya_nom || 'N/A',
            date: annonce.created_at || new Date().toISOString(),
            imageUrl: annonce.imageUrl ? assetUrl(annonce.imageUrl) : null,
          }));
          setAllAnnonces(formattedAnnonces);
        } else {
          setAllAnnonces([]);
        }
      } catch (err) {
        console.error('Error fetching annonces:', err);
        setError('Impossible de charger les annonces');
        setAllAnnonces([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnonces();
  }, []);

  const filtered = useMemo(() => {
    return allAnnonces.filter(a => {
      const matchQuery = !query || a.name.toLowerCase().includes(query.toLowerCase());
      const matchType = selectedType === 'all' || a.type === selectedType;
      const matchCat = selectedCategory === 'Tous' || a.category === selectedCategory;
      const matchWilaya = !selectedWilaya || a.wilaya === selectedWilaya;
      return matchQuery && matchType && matchCat && matchWilaya;
    });
  }, [query, selectedType, selectedCategory, selectedWilaya, allAnnonces]);

  const activeFilterCount = [selectedType !== 'all', selectedCategory !== 'Tous', selectedWilaya].filter(Boolean).length;
  const hasPublishedAnnonces = allAnnonces.length > 0;

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
              Parcourez {allAnnonces.length}+ annonces vérifiées à travers les 69 wilayas.
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              className="search-filters__panel"
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
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
            </motion.div>
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
            ) : error ? (
              <FadeUp>
                <div className="search-empty glass">
                  <Search size={48} className="search-empty__icon" />
                  <h3 className="search-empty__title">Impossible de charger les annonces</h3>
                  <p className="search-empty__desc">
                    Vérifiez votre connexion puis réessayez dans un instant.
                  </p>
                </div>
              </FadeUp>
            ) : !hasPublishedAnnonces ? (
              <FadeUp>
                <div className="search-empty glass">
                  <Search size={48} className="search-empty__icon" />
                  <h3 className="search-empty__title">Aucune annonce publiée pour le moment</h3>
                  <p className="search-empty__desc">
                    Dès qu’une annonce sera validée, elle apparaîtra ici.
                  </p>
                </div>
              </FadeUp>
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
