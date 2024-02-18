export const DB_ERROR_CODES_MESSAGES: Record<string, string> = {
  P2002: 'The {field} field must be unique',
  P2016: 'The {field} field is required',
  P2017: 'The {field} field is too long',
  P2018: 'The {field} field is too short',
  P2019: 'The {field} field must be a valid email',
  P2020: 'The {field} field must be unique',
  P2021: 'The {field} field must be a valid URL',
  P2022: 'The {field} field must be a valid enum value',
  P2023: 'The {field} field must be a valid date',
  P2024: 'The {field} field must be a valid number',
  P2025: 'The {field} field must be a valid boolean',
  P2026: 'The {field} field must be a valid JSON',
  P2027: 'The {field} field must be a valid UUID',
  P2028: 'The {field} field must be a valid phone number',
  P2029: 'The {field} field must be a valid credit card number',
  P2030: 'The {field} field must be a valid hexadecimal value',
  P2031: 'The {field} field must be a valid IPv4 address',
};

export const getDBErrorMessage = (code: string, field: string) => {
  const message = DB_ERROR_CODES_MESSAGES[code]?.replace('{field}', field);

  if (!message) {
    return 'An unexpected error occurred';
  }

  return message;
};
