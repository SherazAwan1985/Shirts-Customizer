import React, { useState } from 'react'; // ✅ Add useState
const MAX_DEPTH = 5;
const subOptions = [
{
  id: 1,
  name: 'Sub Option 1',
  type: 'Type A',
  value: 'Value 1',
  description: 'Description for Sub Option 1',
  subOptions: [
  {
  id: 1,
  name: 'Sub Option 1.1',
  type: 'Type A1',
  value: 'Value 1.1',
  description: 'Description for Sub Option 1.1',
    subOptions: [
  {
  id: 1234,
  name: 'Sub Option  1.1.1',
  type: 'Type A1.1',
  value: 'Value 1.1',
  description: 'Description for Sub Option 1.1',
   },
  {
      id: 223342,
      name: 'Sub Option 1.2.1',
      type: 'Type A2.1',
      value: 'Value 1.2.1',
      description: 'Description for Sub Option 1.2',
  }
  ] 
   },
  {
      id: 2,
      name: 'Sub Option 1.2',
      type: 'Type A2',
      value: 'Value 1.2',
      description: 'Description for Sub Option 1.2',
  }
  ] 
},
  {
  id: 2,
  name: 'Sub Option 2',
  type: 'Type B',
  value: 'Value 2',
  description: 'Description for Sub Option 2',
  },
  {
  id: 3,
  name: 'Sub Option 3',
  type: 'Type C',
  value: 'Value 3',
  description: 'Description for Sub Option 3',
  },
  {
  id: 4,
  name: 'Sub Option 4',
  type: 'Type D',
  value: 'Value 4',
  description: 'Description for Sub Option 4',
  }
]
function NestedOptions({ options, depth = 1, onSelect , active = false }) {
  const [activeOption, setActiveOption] = useState(null);
  const [openOption , setOptionOpen] = useState(false);

  if (depth > MAX_DEPTH) return null;

  const handleClick = (option , toggle) => {
    if (toggle) {
      setActiveOption(option);
      setOptionOpen(prev => !prev);
    } else {
      onSelect(option);
    }
  };

  return (
    <ul className="list-none flex flex-col gap-2 cursor-pointer">
      {options.map((option) => (
        <li key={`${depth}-${option.id}`} className="option-details-item">
          <button
            className="p-2 bg-gray-50 rounded-s-sm w-full text-left flex items-start gap-2"
            onClick={() => handleClick(option)}
          >
            <div className="sub_option_image">
              <svg
                className="max-w-[30px] text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
                width="100%"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
            {option.name}
            { /* If this option has subOptions, show the arrow icon */ }
            {option.subOptions && ( 
            <button className='icon_suboption align-middle inline-block self-center ml-auto p-1' onClick={() => handleClick(option, true)}>
           <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              height="14px"
              width="14px"
              version="1.1"
              id="Layer_1"
              viewBox="0 0 407.437 407.437"
            >
              <polygon points="386.258,91.567 203.718,273.512 21.179,91.567 0,112.815 203.718,315.87 407.437,112.815" />
            </svg>

            </button>
            )}
          </button>

          {/* If this option has subOptions and it's the active one, show next level */}
          {activeOption?.id === option.id && option.subOptions && openOption && (
            <div className="ml-4 mt-2 border-l pl-4">
              <NestedOptions
                options={option.subOptions}
                depth={depth + 1}
                onSelect={onSelect}
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
function OptionForm({ option }) {
  const isEmpty = !option;

  return (
    <form className="option-form">
      <input
        type="text"
        className="form-control mb-2 w-full p-4 text-xl rounded-lg border border-gray-300 border-solid"
        placeholder="Option Name"
        value={isEmpty ? '' : option.name}
         />
      <input
        type="text"
        className="form-control mb-2 w-full p-4 text-xl rounded-lg border border-gray-300 border-solid"
        placeholder="Option Type"
        value={isEmpty ? '' : option.type}
         />
      <input
        type="number"
        className="form-control mb-2 w-full p-4 text-xl rounded-lg border border-gray-300 border-solid"
        placeholder="Option Price"
        value={isEmpty ? '' : option.price}
         />
      <input
        type="text"
        className="form-control mb-2 w-full p-4 text-xl rounded-lg border border-gray-300 border-solid"
        placeholder="Option Value"
        value={isEmpty ? '' : option.value}
         />
      <textarea
        className="form-control mb-2 w-full p-4 text-xl rounded-lg border border-gray-300 border-solid"
        placeholder="Option Description"
        value={isEmpty ? '' : option.description}
        readOnly
      ></textarea>
      <button className="px-8 py-2 text-white rounded-lg text-xl bg-black">Save Option</button>
    </form>
  );
}


export default function OptionDetails() {
  const [selectedOption, setSelectedOption] = useState(null); // ✅ state to hold selected option

  return (
    <div className="option-details-container">
      <div className="max-w-[1600px] mx-auto p-8">
        <div className='option-details-wrapper bg-gray-100 h-full min-h-[calc(100vh-4rem)] p-8 rounded-sm shadow-md'>
          <div className='option-details-header mb-6'>
            <h1 className='text-2xl font-bold'>Option Details</h1>  
          </div>
          <div className='option-details-content flex gap-8'>
            <div className='option-details-items w-[300px] gap-4 flex-shrink-0'>
              <div className='option-details-media mb-4'>
                <svg className="max-w-[150px] text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18" width="100%">
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>
              <div className='option-details-items-list'>
                 <NestedOptions options={subOptions} onSelect={setSelectedOption} />
              </div>
            </div>
            <div className='option-details-content-wrapper flex-grow w-[calc(100%-300px)] min-h-[calc(100vh-12rem)]'>
              {/* ✅ Show form for selected option */}
              <OptionForm option={selectedOption} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
