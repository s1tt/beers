interface Volume {
  value: number;
  unit: string;
}

interface Method {
  mash_temp: {
    temp: {
      value: number;
      unit: string;
    };
    duration: number;
  }[];
  fermentation: {
    temp: {
      value: number;
      unit: string;
    };
  };
  twist: null | string;
}

interface Malt {
  name: string;
  amount: {
    value: number;
    unit: string;
  };
}

interface Hop {
  name: string;
  amount: {
    value: number;
    unit: string;
  };
  add: string;
  attribute: string;
}

interface Ingredients {
  malt: Malt[];
  hops: Hop[];
  yeast: string;
}

export interface Beer {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volume: Volume;
  boil_volume: Volume;
  method: Method;
  ingredients: Ingredients;
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
}
