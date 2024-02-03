export const setBeerColor = (ebc: number): string => {
  if (ebc <= 4) {
    return '#F8F262';
  } else if (ebc <= 6) {
    return '#F5EF3C';
  } else if (ebc <= 8) {
    return '#EAE13C';
  } else if (ebc <= 12) {
    return '#CFBA3C';
  } else if (ebc <= 16) {
    return '#B49346';
  } else if (ebc <= 20) {
    return '#B18445';
  } else if (ebc <= 26) {
    return '#AB6F3F';
  } else if (ebc <= 33) {
    return '#805238';
  } else if (ebc <= 39) {
    return '#54371F';
  } else if (ebc <= 47) {
    return '#231817';
  } else if (ebc <= 57) {
    return '#0E0B0A';
  } else if (ebc <= 69) {
    return '#080707';
  } else if (ebc <= 79) {
    return '#030403';
  } else {
    return '#000000';
  }
};
