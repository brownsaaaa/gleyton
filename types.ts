
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'it' | 'stationery';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'computadoras' | 'accesorios' | 'tintas' | 'papeleria' | 'servicios';
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}
