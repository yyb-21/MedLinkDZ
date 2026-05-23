import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Package, FileText, MapPin, Upload, ChevronRight, ChevronLeft, Check, ImagePlus, AlertCircle, X } from 'lucide-react';
import Input from '../components/ui/Input';
import WilayaSelect from '../components/ui/WilayaSelect';
import PremiumButton from '../components/ui/PremiumButton';
import FadeUp from '../components/animations/FadeUp';
import { annonceApi, catalogApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './PublierPage.css';

const CATEGORIES = ['Antibiotiques', 'Cardiovasculaire', 'Diabète', 'Neurologie', 'Oncologie', 'Dermatologie', 'Pédiatrie', 'Ophtalmologie', 'Autre'];

const STEPS = [
  { id: 1, label: 'Type', icon: Package },
  { id: 2, label: 'Détails', icon: FileText },
  { id: 3, label: 'Localisation', icon: MapPin },
  { id: 4, label: 'Confirmation', icon: Check },
];

const BLANK_FORM = {
  type: '',
  name: '',
  category: '',
  description: '',
  quantity: '',
  expiryDate: '',
  wilaya: '',
  contact: '',
  image: null,
};

export default function PublierPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ ...BLANK_FORM });
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const fileInputRef = useRef(null);

  // Catalog data for resolving IDs
  const [wilayas, setWilayas] = useState([]);
  const [medicaments, setMedicaments] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    catalogApi.wilayas().then(r => setWilayas(r.wilayas || r)).catch(() => { });
    catalogApi.medicaments().then(r => setMedicaments(r.medicaments || r)).catch(() => { });
    catalogApi.categories().then(r => setCategories(r.categories || r)).catch(() => { });
  }, []);

  const set = (key) => (e) => setForm({ ...form, [key]: e?.target?.value ?? e });

  const canNext = () => {
    if (step === 1) return !!form.type;
    if (step === 2) return form.name && form.category && !!form.quantity && /^\d+$/.test(form.quantity);
    if (step === 3) return !!form.wilaya;
    return true;
  };

  const getWilayaName = (id) => {
    const w = wilayas.find(w => String(w.id) === String(id));
    return w ? (w.nom_fr || w.name) : id;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm(prev => ({ ...prev, image: file }));
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setForm(prev => ({ ...prev, image: null }));
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      // Resolve wilaya_id
      const wilayaObj = wilayas.find(
        w => w.name === form.wilaya || w.nom_fr === form.wilaya || w.nom === form.wilaya || String(w.id) === String(form.wilaya)
      );
      const wilaya_id = wilayaObj ? wilayaObj.id : form.wilaya;

      const quantite = parseInt(form.quantity, 10);
      if (Number.isNaN(quantite) || quantite <= 0) {
        throw new Error('La quantité doit être un nombre entier positif.');
      }

      const fd = new FormData();
      fd.append('type', form.type === 'offre' ? 'DON' : 'DEMANDE');
      fd.append('wilaya_id', wilaya_id);

      // Send the name as medicament_name, backend will find or create it
      fd.append('medicament_name', form.name);

      fd.append('quantite', quantite);
      if (form.description) fd.append('description', form.description);
      if (form.image) fd.append('images', form.image);

      await annonceApi.create(fd);
      setSubmitted(true);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        'Une erreur est survenue. Veuillez réessayer.';
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="publier-page">
        <div className="container">
          <FadeUp>
            <div className="publish-success glass-bright">
              <div className="publish-success__icon-wrap">
                <Check size={36} />
              </div>
              <h2 className="publish-success__title">Annonce publiée ! 🎉</h2>
              <p className="publish-success__desc">
                Votre annonce est maintenant visible par la communauté MedLink DZ.
              </p>
              <div className="publish-success__actions">
                <PremiumButton variant="primary" onClick={() => navigate('/')}>
                  Retour à l'accueil
                </PremiumButton>
                <PremiumButton variant="ghost" onClick={() => { setSubmitted(false); setStep(1); setForm({ ...BLANK_FORM }); setImagePreview(null); }}>
                  Publier une autre
                </PremiumButton>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    );
  }

  return (
    <div className="publier-page">
      <div className="publier-glow-top" />
      <div className="container">
        <FadeUp>
          <div className="publier-header">
            <h1 className="publier-title">
              Publier une <span className="gradient-text">annonce</span>
            </h1>
            <p className="publier-subtitle">
              Offrez ou demandez un médicament en quelques étapes simples.
            </p>
          </div>
        </FadeUp>

        {/* Stepper */}
        <FadeUp delay={0.1}>
          <div className="stepper">
            {STEPS.map((s, i) => {
              const StepIcon = s.icon;
              return (
                <React.Fragment key={s.id}>
                  <div className={`stepper__step ${step >= s.id ? 'active' : ''} ${step === s.id ? 'current' : ''}`}>
                    <div className="stepper__circle">
                      {step > s.id ? <Check size={16} /> : <StepIcon size={16} />}
                    </div>
                    <span className="stepper__label">{s.label}</span>
                  </div>
                  {i < STEPS.length - 1 && <div className={`stepper__line ${step > s.id ? 'active' : ''}`} />}
                </React.Fragment>
              );
            })}
          </div>
        </FadeUp>

        {/* Form Card */}
        <div className="publier-card glass-bright">
          <AnimatePresence mode="wait">
            {/* Step 1 — Type */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <h2 className="step-title">Quel type d'annonce ?</h2>
                <div className="type-cards">
                  <button
                    className={`type-card ${form.type === 'offre' ? 'selected' : ''}`}
                    onClick={() => setForm({ ...form, type: 'offre' })}
                  >
                    <div className="type-card__icon-wrap type-card__icon-wrap--offre">
                      <Upload size={28} />
                    </div>
                    <h3>Offre</h3>
                    <p>Je souhaite offrir un médicament non utilisé</p>
                  </button>
                  <button
                    className={`type-card ${form.type === 'demande' ? 'selected' : ''}`}
                    onClick={() => setForm({ ...form, type: 'demande', expiryDate: '' })}
                  >
                    <div className="type-card__icon-wrap type-card__icon-wrap--demande">
                      <Package size={28} />
                    </div>
                    <h3>Demande</h3>
                    <p>Je recherche un médicament spécifique</p>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2 — Details */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <h2 className="step-title">Détails du médicament</h2>
                <div className="step-form">
                  <Input label="Nom du médicament *" id="pub-name" icon={Package} placeholder="Ex: Doliprane 1000mg" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />

                  <div className="filter-group">
                    <label className="input-label">Catégorie *</label>
                    <div className="cat-pills">
                      {CATEGORIES.map(c => (
                        <button key={c} type="button" className={`cat-pill ${form.category === c ? 'active' : ''}`} onClick={() => setForm({ ...form, category: c })}>
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-row">
                    <Input label="Quantité" id="pub-qty" placeholder="Ex: 2" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
                    {form.type === 'offre' && (
                      <Input label="Date d'expiration" id="pub-exp" type="date" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} />
                    )}
                  </div>

                  <div className="input-group">
                    <label className="input-label">Description (optionnelle)</label>
                    <textarea
                      className="input-field textarea-field"
                      placeholder="Décrivez l'état du médicament, le dosage exact, etc."
                      rows={3}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                  </div>

                  {imagePreview ? (
                    <div className="image-preview-wrap">
                      <img src={imagePreview} alt="Aperçu" className="image-preview-thumb" />
                      <div className="image-preview-info">
                        <span className="image-preview-name">{form.image?.name}</span>
                        <button
                          type="button"
                          className="image-preview-remove"
                          onClick={handleRemoveImage}
                          aria-label="Supprimer la photo"
                        >
                          <X size={14} />
                          Supprimer
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="image-upload" style={{ cursor: 'pointer' }}>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                      />
                      <ImagePlus size={24} />
                      <span>Ajouter une photo <span className="image-upload__optional">(optionnel)</span></span>
                    </label>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 3 — Location */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <h2 className="step-title">Localisation & Contact</h2>
                <div className="step-form">
                  <WilayaSelect options={wilayas} value={form.wilaya} onChange={(v) => setForm({ ...form, wilaya: v })} label="Votre wilaya *" />
                  <div className="location-note glass">
                    <AlertCircle size={16} />
                    <span>Votre localisation exacte ne sera jamais partagée. Seule la wilaya est visible.</span>
                  </div>
                  <div className="location-note glass" style={{ marginTop: '1rem' }}>
                    <AlertCircle size={16} />
                    <span>Les utilisateurs intéressés vous contacteront via le numéro de téléphone associé à votre compte.</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4 — Confirmation */}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <h2 className="step-title">Récapitulatif</h2>
                <div className="recap-card glass">
                  <div className="recap-row"><span className="recap-label">Type</span><span className={`pm-badge pm-badge--${form.type}`}>{form.type === 'offre' ? '↑ Offre' : '↓ Demande'}</span></div>
                  <div className="recap-row"><span className="recap-label">Médicament</span><span className="recap-value">{form.name}</span></div>
                  <div className="recap-row"><span className="recap-label">Catégorie</span><span className="recap-value">{form.category}</span></div>
                  {form.quantity && <div className="recap-row"><span className="recap-label">Quantité</span><span className="recap-value">{form.quantity}</span></div>}
                  {form.type === 'offre' && form.expiryDate && <div className="recap-row"><span className="recap-label">Expiration</span><span className="recap-value">{form.expiryDate}</span></div>}
                  <div className="recap-row"><span className="recap-label">Wilaya</span><span className="recap-value">{getWilayaName(form.wilaya)}</span></div>
                  {user?.phone && <div className="recap-row"><span className="recap-label">Contact</span><span className="recap-value">{user.phone}</span></div>}
                  {imagePreview && (
                    <div className="recap-row recap-row--image">
                      <span className="recap-label">Photo</span>
                      <img src={imagePreview} alt="Aperçu" className="recap-image-thumb" />
                    </div>
                  )}
                </div>
                {submitError && (
                  <div className="submit-error">
                    <AlertCircle size={16} />
                    <span>{submitError}</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className={`publier-nav ${step > 1 ? 'publier-nav--paired' : 'publier-nav--single'}`}>
            {step > 1 && (
              <PremiumButton className="publier-nav__btn publier-nav__btn--back" variant="ghost" icon={ChevronLeft} onClick={() => setStep(step - 1)}>
                Précédent
              </PremiumButton>
            )}
            <div className="publier-nav__spacer" />
            {step < 4 ? (
              <PremiumButton className="publier-nav__btn publier-nav__btn--next" variant="primary" iconRight={ChevronRight} onClick={() => setStep(step + 1)} disabled={!canNext()}>
                Suivant
              </PremiumButton>
            ) : (
              <PremiumButton className="publier-nav__btn publier-nav__btn--next" variant="primary" icon={Check} loading={submitting} onClick={handleSubmit}>
                Publier l'annonce
              </PremiumButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
