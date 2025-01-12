import { inputStyles } from "../../utils/style/validationFormStyles";

const CustomInput = ({
  disabled,
  labelText,
  register,
  label,
  name,
  error,
  type,
  autoComplete = "",
  defaultValue = "",
}) => {
  return (
    <>
      <label
        htmlFor={label}
        className="block text-sm/6 font-medium text-gray-900"
      >
        {labelText}
      </label>
      <div className="mt-2">
        <input
          disabled={disabled}
          id={label}
          name={name}
          defaultValue={defaultValue}
          type={type}
          autoComplete={autoComplete}
          {...register(name)}
          className={`${error ? inputStyles.error : inputStyles.correct} ${
            inputStyles.base
          } `}
        />
        {error && (
          <p id="email-error" className="mt-2 text-sm text-red-600">
            {error.message}
          </p>
        )}
      </div>
    </>
  );
};

export default CustomInput;
