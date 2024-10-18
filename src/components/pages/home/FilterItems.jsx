import { Range } from "react-range";

import CircleIcon from "../../icons/CircleIcon";

const FilterItems = ({
  handleInput,
  togglePriceSlider,
  isSliderVisible,
  input,
  priceRange,
  setPriceRange
}) => {
  return (
    <section>
      <section className="flex justify-between items-center my-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={handleInput}
          placeholder="What are you looking to buy today?"
          className="w-full p-3 rounded-lg border 
    border-gray-300 shadow-md focus:outline-none focus:ring-2 
    focus:ring-gray-500 transition duration-300 ease-in-out transform 
    hover:scale-105"
        />
        <button
          onClick={togglePriceSlider}
          className="bg-gray-900 text-yellow-200 rounded-md 
         w-40 sm:w-40 h-10 ml-4 flex items-center 
         justify-center sm:justify-between px-4 text-lg 
         transition duration-300 hover:bg-yellow-200 
         hover:text-gray-900 shadow-lg transform 
         hover:scale-105"
        >
          <CircleIcon className="w-3 h-3 hidden sm:inline" />
          Price
          <span className="hidden sm:inline">Slider</span>
        </button>
      </section>
      {isSliderVisible && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </h3>
          <Range
            step={1}
            min={0}
            max={1500}
            values={priceRange}
            onChange={(values) => setPriceRange(values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="h-2 w-full bg-gray-300 rounded-lg"
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                className="h-4 w-4 bg-black rounded-full cursor-pointer"
              />
            )}
          />
        </section>
      )}
    </section>
  );
};
export default FilterItems;
