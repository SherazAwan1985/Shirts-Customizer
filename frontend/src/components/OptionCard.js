const OptionCard = ({ option, onEdit, onAddSub }) => {
  return (
    <div className="bg-white p-4 shadow rounded flex justify-between items-center">
      <div>
        <h2 className="font-semibold">{option.title || 'Untitled Option'}</h2>
        <p className="text-gray-600">Price: Rs {option.price || '0.00'}</p>
      </div>
      <div className="flex gap-4">
        <button onClick={onEdit} className="text-blue-500 hover:underline">Edit</button>
        <button onClick={onAddSub} className="text-green-500 hover:underline">+ Sub Option</button>
      </div>
    </div>
  );
};

export default OptionCard;
