import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Package, FileText, MapPin, Upload, ChevronRight, ChevronLeft, Check, ImagePlus, AlertCircle } from 'lucide-react';
import Input from '../components/ui/Input';
import WilayaSelect from '../components/ui/WilayaSelect';
import PremiumButton from '../components/ui/PremiumButton';
import FadeUp from '../components/animations/FadeUp';
import './PublierPage.css';

const CATEGORIES = ['Antibiotiques', 'Cardiovasculaire', 'Diabète', 'Neurologie', 'Oncologie', 'Dermatologie', 'Pédiatrie', 'Ophtalmologie', 'Autre'];

const STEPS = [
  { id: 1, label: 'Type', icon: Package },
  { id: 2, label: 'Détails', icon: FileText },
  { id: 3, label: 'Localisation', icon: MapPin },
  { id: 4, label: 'Confirmation', icon: Check },
];

export default function PublierPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    type: '',
    name: '',
    category: '',
    description: '',
    quantity: '',
    expiryDate: '',
    wilaya: '',
    contact: '',
    image: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) => setForm({ ...form, [key]: e?.target?.value ?? e });

  const canNext = () => {
    if (step === 1) return !!form.type;
    if (step === 2) return form.name && form.category;
    if (step === 3) return !!form.wilaya;
    return true;
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 2000);
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
                <PremiumButton variant="ghost" onClick={() => { setSubmitted(false); setStep(1); setForm({ type: '', name: '', category: '', description: '', quantity: '', expiryDate: '', wilaya: '', contact: '', image: null }); }}>
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
                    onClick={() => setForm({ ...form, type: 'demande' })}
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
                    <Input label="Quantité" id="pub-qty" placeholder="Ex: 2 boîtes" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
                    <Input label="Date d'expiration" id="pub-exp" type="date" value={form.expiryDate} onChange={(e) => setForm({ ...form, expiryDate: e.target.value })} />
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

                  {/* Image upload placeholder */}
                  <div className="image-upload">
                    <ImagePlus size={24} />
                    <span>Ajouter une photo (optionnel)</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3 — Location */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <h2 className="step-title">Localisation & Contact</h2>
                <div className="step-form">
                  <WilayaSelect value={form.wilaya} onChange={(v) => setForm({ ...form, wilaya: v })} label="Votre wilaya *" />
                  <Input label="Moyen de contact" id="pub-contact" placeholder="Téléphone ou email" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
                  <div className="location-note glass">
                    <AlertCircle size={16} />
                    <span>Votre localisation exacte ne sera jamais partagée. Seule la wilaya est visible.</span>
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
                  {form.expiryDate && <div className="recap-row"><span className="recap-label">Expiration</span><span className="recap-value">{form.expiryDate}</span></div>}
                  <div className="recap-row"><span className="recap-label">Wilaya</span><span className="recap-value">{form.wilaya}</span></div>
                  {form.contact && <div className="recap-row"><span className="recap-label">Contact</span><span className="recap-value">{form.contact}</span></div>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="publier-nav">
            {step > 1 && (
              <PremiumButton variant="ghost" icon={ChevronLeft} onClick={() => setStep(step - 1)}>
                Précédent
              </PremiumButton>
            )}
            <div style={{ flex: 1 }} />
            {step < 4 ? (
              <PremiumButton variant="primary" iconRight={ChevronRight} onClick={() => setStep(step + 1)} disabled={!canNext()}>
                Suivant
              </PremiumButton>
            ) : (
              <PremiumButton variant="primary" icon={Check} loading={submitting} onClick={handleSubmit}>
                Publier l'annonce
              </PremiumButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
