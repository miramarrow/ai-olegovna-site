const russianPhonePrefix = "7";
const maxRussianPhoneDigits = 11;

export const getRussianPhoneDigits = (value: string) => {
  const digits = value.replace(/\D/g, "");

  if (!digits) {
    return russianPhonePrefix;
  }

  if (digits.startsWith("8")) {
    return `${russianPhonePrefix}${digits.slice(1)}`.slice(0, maxRussianPhoneDigits);
  }

  if (digits.startsWith(russianPhonePrefix)) {
    return digits.slice(0, maxRussianPhoneDigits);
  }

  return `${russianPhonePrefix}${digits}`.slice(0, maxRussianPhoneDigits);
};

export const formatRussianPhoneInput = (value: string) => {
  const digits = getRussianPhoneDigits(value);
  const nationalDigits = digits.slice(1);
  const area = nationalDigits.slice(0, 3);
  const first = nationalDigits.slice(3, 6);
  const second = nationalDigits.slice(6, 8);
  const third = nationalDigits.slice(8, 10);

  let formatted = "+7 ";

  if (area) {
    formatted += `(${area}`;
  }

  if (area.length === 3) {
    formatted += ")";
  }

  if (first) {
    formatted += ` ${first}`;
  }

  if (second) {
    formatted += `-${second}`;
  }

  if (third) {
    formatted += `-${third}`;
  }

  return formatted;
};

export const isCompleteRussianPhone = (value: string) =>
  getRussianPhoneDigits(value).length === maxRussianPhoneDigits;
