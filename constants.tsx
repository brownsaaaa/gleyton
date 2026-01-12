
import { Monitor, HardDrive, Settings, Network, Camera, Code, Globe, Share2, GraduationCap, Laptop, Printer, Copy, FileText, Scan, CreditCard, ShoppingBag, Zap } from 'lucide-react';
import React from 'react';
import { ServiceItem, Product } from './types';

export const WHATSAPP_NUMBER = "18090000000"; // Reemplazar con número real

export const IT_SERVICES: ServiceItem[] = [
  { id: 'it1', title: 'Venta de Computadoras', description: 'Equipos nuevos y usados de alta calidad.', icon: 'Laptop', category: 'it' },
  { id: 'it2', title: 'Reparación de PCs/Laptops', description: 'Diagnóstico y solución técnica avanzada.', icon: 'HardDrive', category: 'it' },
  { id: 'it3', title: 'Mantenimiento Preventivo', description: 'Limpieza y optimización de hardware.', icon: 'Settings', category: 'it' },
  { id: 'it4', title: 'Instalación de Redes', description: 'Configuración LAN, WLAN y estructurado.', icon: 'Network', category: 'it' },
  { id: 'it5', title: 'Cámaras de Seguridad', description: 'Sistemas de vigilancia CCTV y monitoreo.', icon: 'Camera', category: 'it' },
  { id: 'it6', title: 'Desarrollo de Apps', description: 'Software a medida para tu negocio.', icon: 'Code', category: 'it' },
  { id: 'it7', title: 'Diseño de Páginas Web', description: 'Sitios modernos, rápidos y optimizados.', icon: 'Globe', category: 'it' },
  { id: 'it8', title: 'Publicidad y RRSS', description: 'Gestión de marketing digital integral.', icon: 'Share2', category: 'it' },
  { id: 'it9', title: 'Entrenamientos IT', description: 'Capacitación tecnológica personalizada.', icon: 'GraduationCap', category: 'it' },
  { id: 'it11', title: 'Automatizaciones de Redes Sociales', description: 'Optimiza tu presencia digital con bots y flujos.', icon: 'Zap', category: 'it' },
];

export const STATIONERY_SERVICES: ServiceItem[] = [
  { id: 'st1', title: 'Impresiones B/N y Color', description: 'Alta calidad en cualquier formato.', icon: 'Printer', category: 'stationery' },
  { id: 'st2', title: 'Copias', description: 'Duplicado de documentos rápido.', icon: 'Copy', category: 'stationery' },
  { id: 'st3', title: 'Transcripción de Docs', description: 'Pasamos tus textos a digital.', icon: 'FileText', category: 'stationery' },
  { id: 'st4', title: 'Escaneos y Laminados', description: 'Protección y digitalización de archivos.', icon: 'Scan', category: 'stationery' },
  { id: 'st5', title: 'Creación de Carnets', description: 'Diseño e impresión de identificación.', icon: 'CreditCard', category: 'stationery' },
  { id: 'st6', title: 'Artículos de Papelería', description: 'Cuadernos, lápices, carpetas y más.', icon: 'ShoppingBag', category: 'stationery' },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Laptop Dell Inspiron 15', price: 35000, category: 'computadoras', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=400&auto=format&fit=crop' },
  { id: 'p2', name: 'Mouse Inalámbrico Logitech', price: 850, category: 'accesorios', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=400&auto=format&fit=crop' },
  { id: 'p3', name: 'Tinta HP 667 XL Negro', price: 1200, category: 'tintas', image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=400&auto=format&fit=crop' },
  { id: 'p4', name: 'Cuaderno Profesional 100 Hojas', price: 150, category: 'papeleria', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=400&auto=format&fit=crop' },
  { id: 'p5', name: 'Teclado Mecánico RGB', price: 2500, category: 'accesorios', image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=400&auto=format&fit=crop' },
  { id: 'p6', name: 'Servicio de Mantenimiento', price: 1500, category: 'servicios', image: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?q=80&w=400&auto=format&fit=crop' },
];

export const getIcon = (name: string) => {
  const icons: any = { Monitor, HardDrive, Settings, Network, Camera, Code, Globe, Share2, GraduationCap, Laptop, Printer, Copy, FileText, Scan, CreditCard, ShoppingBag, Zap };
  const Icon = icons[name] || Monitor;
  return <Icon className="w-8 h-8" />;
};
