import { motion } from 'framer-motion';
import { Package, ImagePlus, X } from 'lucide-react';
import Input from '../../components/ui/Input';

const CATEGORIES = ['Antibiotiques', 'Cardiovasculaire', 'Diabète', 'Neurologie', 'Oncologie', 'Dermatologie', 'Pédiatrie', 'Ophtalmologie', 'Autre'];
const TRANS = { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, transition: { duration: 0.3 } };

export default function StepDetails({ form, setForm }) {
  return (
    <motion.div key="step2" {...TRANS}>
      <h2 className="step-title">Détails du médicament</h2>
      <div className="step-form">
        <Input label="Nom du médicament *" id="pub-name" icon={Package} placeholder="Ex: Doliprane 1000mg" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />

        <div className="filter-group">
          <label className="input-label">Catégorie *</label>
          <div className="cat-pills">
            {CATEGORIES.map((c) => (
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

        <div className="input-group">
          <label className="input-label">Photo (optionnel)</label>
          {form.image ? (
            <div className="image-preview" style={{ position: 'relative', display: 'inline-block', marginTop: '0.5rem', width: '100%' }}>
              <img src={URL.createObjectURL(form.image)} alt="Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: 'var(--r-md)', border: '1px solid var(--c-border)', background: 'rgba(0,0,0,0.2)' }} />
              <button 
                type="button" 
                onClick={() => setForm({ ...form, image: null })}
                style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', color: 'white', borderRadius: '50%', padding: '6px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <label className="image-upload" style={{ margin: 0 }}>
              <input 
                type="file" 
                accept="image/*" 
                style={{ display: 'none' }} 
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setForm({ ...form, image: e.target.files[0] });
                  }
                }} 
              />
              <ImagePlus size={24} />
              <span>Ajouter une photo</span>
            </label>
          )}
        </div>
      </div>
    </motion.div>
  );
}
