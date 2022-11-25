import Select from "react-select";

export const MultiSelect = ({ className, placeholder, field, form, options, isMulti = false }) => {
  const onChange = (option) => {
    form.setFieldValue(field.name, isMulti ? option.map((item) => item.id) : option.id);
  };

  const getValue = () => {
    if (options) {
      return isMulti ? options.filter((option) => field.value.indexOf(option.id) >= 0) : options.find((option) => option.id === field.value);
    } else {
      return isMulti ? [] : "";
    }
  };

  return <Select className={className} name={field.name} value={getValue()} onChange={onChange} placeholder={placeholder} options={options} isMulti={isMulti} getOptionLabel={(option) => `${option.description}`} getOptionValue={(option) => `${option.id}`} />;
};

export default MultiSelect;
