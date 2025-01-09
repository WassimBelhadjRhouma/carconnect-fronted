import { filters } from "../../constants/FilterConstants";

const FilterElement = ({ register, name, label }) => {
  return (
    <fieldset>
      <legend className="block font-medium">{label}</legend>
      <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
        {filters[name].map((option, optionIdx) => (
          <div
            key={option.value}
            className="flex items-center text-base sm:text-sm"
          >
            <input
              id={`${name}-${optionIdx}`}
              name={name}
              type={option.type}
              value={option.value}
              {...register(name)}
              className="size-4 shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor={`${name}-${optionIdx}`}
              className="ml-3 min-w-0 flex-1 text-gray-600"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default FilterElement;
