import React, { useState, useEffect, useRef } from 'react';

// Modal component
function Modal({ open, onClose, children }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-lg p-8 min-w-[350px] max-w-lg relative">
                <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                    onClick={onClose}
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
}

// Recursive Suboption Editor
function SubOptionsEditor({ subOptions, setSubOptions, level = 1 }) {
    const [input, setInput] = useState('');
    const dragInfo = useRef(null);

    const addSub = () => {
        if (!input.trim()) return;
        setSubOptions([...subOptions, { title: input.trim(), subOptions: [] }]);
        setInput('');
    };

    const updateSub = (idx, newSub) => {
        setSubOptions(subOptions.map((s, i) => (i === idx ? newSub : s)));
    };

    const removeSub = (idx) => {
        setSubOptions(subOptions.filter((_, i) => i !== idx));
    };

    // Drag and drop
    const onDragStart = (idx) => {
        dragInfo.current = idx;
    };
    const onDragOver = (e, idx) => {
        e.preventDefault();
        if (dragInfo.current === null || dragInfo.current === idx) return;
        const reordered = [...subOptions];
        const [dragged] = reordered.splice(dragInfo.current, 1);
        reordered.splice(idx, 0, dragged);
        setSubOptions(reordered);
        dragInfo.current = idx;
    };
    const onDragEnd = () => {
        dragInfo.current = null;
    };

    return (
        <div className="ml-4 mt-2">
            <ul>
                {subOptions.map((sub, idx) => (
                    <li
                        key={idx}
                        draggable={level < 5}
                        onDragStart={() => onDragStart(idx)}
                        onDragOver={e => onDragOver(e, idx)}
                        onDragEnd={onDragEnd}
                        className="flex flex-col items-start mb-2 bg-gray-50 rounded px-2 py-1"
                    >
                        <span className="flex-1">{sub.title}</span>
                        <div className='flex items-start space-x-2'>
                        {level < 5 && (
                            <SubOptionsEditor
                                subOptions={sub.subOptions}
                                setSubOptions={subs => updateSub(idx, { ...sub, subOptions: subs })}
                                level={level + 1}
                            />
                        )}
                        <button
                            className="ml-2 text-red-500 hover:text-red-700"
                            onClick={() => removeSub(idx)}
                            title="Remove"
                        >
                            ✕
                        </button>
                        </div>
                    </li>
                ))}
            </ul>
            {level <= 5 && (
                <div className="flex mt-2">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder={`Add suboption (level ${level})`}
                        className="flex-1 px-2 py-1 border rounded mr-2"
                    />
                    <button
                        type="button"
                        className="bg-blue-500 text-white px-3 rounded hover:bg-blue-600"
                        onClick={addSub}
                        disabled={!input.trim()}
                    >
                        Add
                    </button>
                </div>
            )}
        </div>
    );
}

// Create/Edit Option Modal
function OptionModal({ open, onClose, onSave, initial }) {
    const [title, setTitle] = useState(initial?.title || '');
    const [price, setPrice] = useState(initial?.price || '');
    const [extraInfo, setExtraInfo] = useState(initial?.extraInfo || '');
    const [subOptions, setSubOptions] = useState(initial?.subOptions || []);
    const [image, setImage] = useState(initial?.image || '');

    useEffect(() => {
        if (open) {
            setTitle(initial?.title || '');
            setPrice(initial?.price || '');
            setExtraInfo(initial?.extraInfo || '');
            setSubOptions(initial?.subOptions || []);
            setImage(initial?.image || '');
        }
    }, [open, initial]);

    const handleSave = () => {
        if (!title.trim() || !price) return;
        onSave({
            title: title.trim(),
            price: parseFloat(price),
            extraInfo: extraInfo.trim(),
            subOptions,
            image: image.trim(),
        });
    };

    return (
        <Modal open={open} onClose={onClose}>
            <h2 className="text-xl font-bold mb-4">{initial ? 'Edit Option' : 'Create Option'}</h2>
            <div className="space-y-3">
                <input
                    type="text"
                    placeholder="Title"
                    className="w-full px-3 py-2 border rounded"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    className="w-full px-3 py-2 border rounded"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    step="0.01"
                    required
                />
                <input
                    type="text"
                    placeholder="Extra Info"
                    className="w-full px-3 py-2 border rounded"
                    value={extraInfo}
                    onChange={e => setExtraInfo(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Image URL (optional)"
                    className="w-full px-3 py-2 border rounded"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                />
                <div>
                    <label className="font-semibold">Suboptions (up to 5 levels):</label>
                    <SubOptionsEditor subOptions={subOptions} setSubOptions={setSubOptions} />
                </div>
            </div>
            <div className="flex justify-end mt-6 space-x-2">
                <button
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    onClick={handleSave}
                    disabled={!title.trim() || !price}
                >
                    {initial ? 'Save' : 'Create'}
                </button>
            </div>
        </Modal>
    );
}

export default function AdminDashboard() {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // UI state
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('title');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingOption, setEditingOption] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    // Fetch options
    useEffect(() => {
        setError(null);
        setLoading(true);
        fetch('http://localhost:3000/admin/options')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch options');
                return res.json();
            })
            .then(data => {
                setOptions(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Create or Edit Option
    const handleSaveOption = async (option) => {
        setError(null);
        setLoading(true);
        try {
            let res, saved;
            if (editingOption) {
                res = await fetch(`http://localhost:3000/admin/options/${editingOption.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(option),
                });
                if (!res.ok) throw new Error('Failed to update option');
                saved = await res.json();
                setOptions(options.map(o => (o.id === editingOption.id ? saved : o)));
            } else {
                res = await fetch('http://localhost:3000/admin/options/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(option),
                });
                if (!res.ok) throw new Error('Failed to create option');
                saved = await res.json();
                setOptions([...options, saved]);
            }
            setModalOpen(false);
            setEditingOption(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete Option
    const deleteOption = async (id) => {
        setDeletingId(id);
        setError(null);
        try {
            const res = await fetch(`http://localhost:3000/admin/delete/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete option');
            setOptions(options.filter(opt => opt.id !== id));
        } catch (err) {
            setError(err.message);
        } finally {
            setDeletingId(null);
        }
    };

    // Filter and sort
    const filtered = options
        .filter(o =>
            o.title.toLowerCase().includes(search.toLowerCase()) ||
            (o.extraInfo && o.extraInfo.toLowerCase().includes(search.toLowerCase()))
        )
        .sort((a, b) => {
            if (sort === 'title') return a.title.localeCompare(b.title);
            if (sort === 'price') return a.price - b.price;
            return 0;
        });

    if (loading) return <p className="text-center mt-20">Loading options...</p>;
    if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Bar */}
            <div className="bg-white shadow sticky top-0 z-40">
                <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-4">
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Search options..."
                            className="px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <select
                            className="px-2 py-2 border rounded"
                            value={sort}
                            onChange={e => setSort(e.target.value)}
                        >
                            <option value="title">Sort by Title</option>
                            <option value="price">Sort by Price</option>
                        </select>
                    </div>
                    <button
                        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition font-semibold"
                        onClick={() => { setModalOpen(true); setEditingOption(null); }}
                    >
                        + Create Option
                    </button>
                </div>
            </div>

            {/* Options List */}
            <div className="max-w-5xl mx-auto mt-8">
                <div className="grid grid-cols-1 gap-6">
                    {filtered.length === 0 && (
                        <div className="text-center text-gray-500 py-10">No options found.</div>
                    )}
                    {filtered.map(option => (
                        <div
                            key={option.id}
                            className="flex items-center bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
                        >
                            <div className="flex items-center flex-1">
                                {option.image && (
                                    <img
                                        src={option.image}
                                        alt={option.title}
                                        className="w-16 h-16 object-cover rounded mr-4 border"
                                    />
                                )}
                                <div>
                                    <div className="text-lg font-semibold">{option.title}</div>
                                    <div className="text-gray-600">${option.price?.toFixed(2)}</div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    className="px-4 py-1 rounded bg-green-500 text-white hover:bg-green-600"
                                    onClick={() => { setEditingOption(option); setModalOpen(true); }}
                                >
                                    Edit
                                </button>
                                <button
                                    className={`px-4 py-1 rounded bg-red-600 text-white hover:bg-red-700 ${deletingId === option.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={() => deleteOption(option.id)}
                                    disabled={deletingId === option.id}
                                >
                                    {deletingId === option.id ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Create/Edit Modal */}
            <OptionModal
                open={modalOpen}
                onClose={() => { setModalOpen(false); setEditingOption(null); }}
                onSave={handleSaveOption}
                initial={editingOption}
            />
        </div>
    );
}
