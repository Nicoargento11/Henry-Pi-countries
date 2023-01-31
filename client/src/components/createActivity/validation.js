export const validate = (value) => {
  const errors = {};
  !value.name && (errors.name = "Debes llenar este campo");
  !value.countries.length &&
    (errors.countries = "Debe elegir al menos un pais");
  return errors;
};
