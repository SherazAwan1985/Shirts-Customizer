import React, { useState } from 'react';

const OptionForm = ({ option, onSave, onBack }) => {
  const [form, setForm] = useState(option);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    setForm(prev => ({ ...prev, image: file }));
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <button onClick={onBack} className="text-blue-500 mb-4">&larr; Back</button>
      <div className="grid grid-cols-2 gap-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 rounded" />
        <input name="price" value={form.price} onChange={handleChange} type="number" placeholder="Price" className="border p-2 rounded" />
        <input name="color" value={form.color} onChange={handleChange} placeholder="Color" className="border p-2 rounded" />
        <input name="size" value={form.size} onChange={handleChange} placeholder="Size" className="border p-2 rounded" />
        <input name="compareAt" value={form.compareAt} onChange={handleChange} placeholder="Compare at price" className="border p-2 rounded" />
        <input name="inventory" value={form.inventory} onChange={handleChange} placeholder="SKU / Barcode" className="border p-2 rounded" />
        <label className="col-span-2 flex items-center gap-2">
          <input type="checkbox" name="tax" checked={form.tax} onChange={handleChange} />
          Charge tax on this variant
        </label>
        <input type="file" onChange={handleFileChange} className="col-span-2" />
      </div>

      <button
        onClick={() => onSave(form)}
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Save Option
      </button>
    </div>
  );
};

export default OptionForm;
