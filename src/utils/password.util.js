const hasNumber = (number) => new RegExp(/[0-9]/).test(number);
const hasBothSmallAndCapitalLettersMixed = (number) => new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);
const hasSpecialChars = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

export const strengthIndicator = (number) => {
  let strengths = 0;
  if (number.length > 5) strengths += 1;
  if (number.length > 7) strengths += 1;
  if (hasNumber(number)) strengths += 1;
  if (hasSpecialChars(number)) strengths += 1;
  if (hasBothSmallAndCapitalLettersMixed(number)) strengths += 1;
  return strengths;
};

export const strengthColor = (count) => {
  if (count < 2) return { label: "Pobre", color: "error.main" };
  if (count < 3) return { label: "Debil", color: "warning.main" };
  if (count < 4) return { label: "Normal", color: "warning.dark" };
  if (count < 5) return { label: "Buena", color: "success.main" };
  if (count < 6) return { label: "Fuerte", color: "success.dark" };
  return { label: "Pobre", color: "error.main" };
};
