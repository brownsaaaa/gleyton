
import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShoppingCart, Menu, X, Phone, Mail, MapPin, 
  Facebook, Instagram, Twitter, ChevronRight, 
  CheckCircle2, MessageSquare, Zap, Monitor, 
  Settings, ShoppingBag 
} from 'lucide-react';
import { IT_SERVICES, STATIONERY_SERVICES, MOCK_PRODUCTS, getIcon, WHATSAPP_NUMBER } from './constants';
import { Product, CartItem } from './types';

// Components
interface NavItemProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ href, children, onClick }) => (
  <a href={href} onClick={onClick} className="text-gray-700 hover:text-emintec-orange font-medium transition-colors duration-200">
    {children}
  </a>
);

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  onContact: (item: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, onContact }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:border-emintec-blue transition-all duration-300 group">
    <div className="bg-blue-50 text-emintec-blue p-4 rounded-lg inline-block mb-4 group-hover:bg-emintec-blue group-hover:text-white transition-colors duration-300">
      {getIcon(icon)}
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600 mb-6 text-sm">{description}</p>
    <button 
      onClick={() => onContact(title)}
      className="flex items-center text-emintec-orange font-semibold hover:gap-2 transition-all duration-200"
    >
      Solicitar por WhatsApp <ChevronRight className="w-4 h-4" />
    </button>
  </div>
);

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
    <div className="relative h-48 overflow-hidden">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute top-2 right-2 bg-emintec-orange text-white px-3 py-1 rounded-full text-xs font-bold">
        RD${product.price.toLocaleString()}
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-bold text-gray-800 mb-1 truncate">{product.name}</h3>
      <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">{product.category}</p>
      <button 
        onClick={() => onAddToCart(product)}
        className="w-full bg-emintec-blue text-white py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <ShoppingCart className="w-4 h-4" /> Agregar al Carrito
      </button>
    </div>
  </div>
);

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filter, setFilter] = useState<string>('todos');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleWhatsAppCheckout = () => {
    const itemList = cart.map(item => `- ${item.name} (${item.quantity}x) - RD$${(item.price * item.quantity).toLocaleString()}`).join('\n');
    const message = `Hola, deseo realizar este pedido con EMINTEC:\n\n${itemList}\n\n*Total:* RD$${total.toLocaleString()}\n\nNombre:\nDirección:\nTeléfono:`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleServiceInquiry = (serviceName: string) => {
    const message = `Hola EMINTEC, me gustaría solicitar más información sobre el servicio de: ${serviceName}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const filteredProducts = filter === 'todos' ? MOCK_PRODUCTS : MOCK_PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emintec-blue flex items-center justify-center rounded-lg">
              <span className="text-white font-black text-xl">E</span>
            </div>
            <span className="text-2xl font-black text-emintec-blue tracking-tighter">EMINTEC</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <NavItem href="#inicio">INICIO</NavItem>
            <NavItem href="#soporte-ti">SOPORTE TI</NavItem>
            <NavItem href="#tienda">TIENDA</NavItem>
            <NavItem href="#papeleria">PAPELERÍA</NavItem>
            <NavItem href="#contacto">CONTACTO</NavItem>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-700 hover:text-emintec-orange transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-emintec-orange text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
            <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white p-8 flex flex-col items-center gap-8 md:hidden">
          <button className="absolute top-6 right-6" onClick={() => setIsMenuOpen(false)}>
            <X className="w-8 h-8" />
          </button>
          <div className="w-16 h-16 bg-emintec-blue flex items-center justify-center rounded-xl mb-4">
            <span className="text-white font-black text-3xl">E</span>
          </div>
          <NavItem href="#inicio" onClick={() => setIsMenuOpen(false)}>INICIO</NavItem>
          <NavItem href="#soporte-ti" onClick={() => setIsMenuOpen(false)}>SOPORTE TI</NavItem>
          <NavItem href="#tienda" onClick={() => setIsMenuOpen(false)}>TIENDA</NavItem>
          <NavItem href="#papeleria" onClick={() => setIsMenuOpen(false)}>PAPELERÍA</NavItem>
          <NavItem href="#contacto" onClick={() => setIsMenuOpen(false)}>CONTACTO</NavItem>
          <div className="mt-auto w-full">
            <button 
              onClick={() => { setIsMenuOpen(false); handleServiceInquiry("General"); }}
              className="w-full bg-emintec-orange text-white py-4 rounded-xl font-bold shadow-lg"
            >
              Hablar con un asesor
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="inicio" className="relative bg-gradient-to-br from-[#2F5D85] to-[#1a3853] text-white pt-32 pb-40 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emintec-orange opacity-10 skew-x-12 translate-x-1/2"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Soluciones tecnológicas y servicios de papelería <span className="text-emintec-orange">en un solo lugar</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed">
              En EMINTEC impulsamos tu productividad con soporte técnico experto, venta de equipos de vanguardia y servicios de papelería integral en Haina.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => document.getElementById('tienda')?.scrollIntoView()}
                className="bg-emintec-orange hover:bg-opacity-90 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl transition-all hover:-translate-y-1"
              >
                <ShoppingCart className="w-5 h-5" /> Comprar por WhatsApp
              </button>
              <button 
                onClick={() => handleServiceInquiry("General")}
                className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
              >
                Solicitar por WhatsApp
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 right-10 hidden lg:block opacity-20">
          <Monitor className="w-64 h-64 text-white" />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "Rapidez", desc: "Entrega y atención en tiempo récord." },
              { icon: CheckCircle2, title: "Confianza", desc: "Años de experiencia respaldada por clientes." },
              { icon: Settings, title: "Soporte Técnico", desc: "Expertos listos para solucionar tus fallos." },
              { icon: MessageSquare, title: "Atención Personal", desc: "Trato humano y asesoría especializada." }
            ].map((benefit, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-blue-50 text-emintec-blue flex items-center justify-center rounded-full mb-4">
                  <benefit.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-500 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Soporte TI Section */}
      <section id="soporte-ti" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Soporte TI</h2>
            <div className="w-20 h-1.5 bg-emintec-blue mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600">Expertos en tecnología para hogares y empresas.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {IT_SERVICES.map(service => (
              <ServiceCard 
                key={service.id} 
                title={service.title} 
                description={service.description} 
                icon={service.icon}
                onContact={handleServiceInquiry}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Shop Section (Moved up) */}
      <section id="tienda" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Nuestra Tienda Online</h2>
              <div className="w-20 h-1.5 bg-emintec-blue rounded-full"></div>
            </div>
            <div className="flex flex-wrap gap-2">
              {['todos', 'computadoras', 'accesorios', 'tintas', 'papeleria'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all ${filter === cat ? 'bg-emintec-blue text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-200 border border-gray-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-gray-100 rounded-3xl">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No hay productos en esta categoría por el momento.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stationery Section (Moved below Shop) */}
      <section id="papeleria" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Servicios de Papelería</h2>
            <div className="w-20 h-1.5 bg-emintec-orange mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600">Todo lo que necesitas para tu oficina y estudios.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {STATIONERY_SERVICES.map(service => (
              <div key={service.id} className="bg-white p-6 rounded-2xl flex items-start gap-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                <div className="bg-orange-50 text-emintec-orange p-3 rounded-xl group-hover:bg-emintec-orange group-hover:text-white transition-colors duration-300">
                  {getIcon(service.icon)}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1 text-gray-800">{service.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{service.description}</p>
                  <button 
                    onClick={() => handleServiceInquiry(service.title)}
                    className="text-emintec-blue font-bold text-sm hover:underline"
                  >
                    Solicitar por WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-8">Hablemos</h2>
              <p className="text-gray-600 mb-12">Estamos ubicados en el corazón de Haina para brindarte el mejor servicio. ¡Visítanos o escríbenos!</p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-blue-50 text-emintec-blue flex items-center justify-center rounded-2xl group-hover:bg-emintec-blue group-hover:text-white transition-all">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Dirección</h4>
                    <p className="text-gray-500">C/ Manolo Tavárez Justo #28, Gringo, Haina, San Cristóbal, R.D.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-orange-50 text-emintec-orange flex items-center justify-center rounded-2xl group-hover:bg-emintec-orange group-hover:text-white transition-all">
                    <Phone className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Teléfonos</h4>
                    <p className="text-gray-500">809-XXX-XXXX / 809-YYY-YYYY</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-blue-50 text-emintec-blue flex items-center justify-center rounded-2xl group-hover:bg-emintec-blue group-hover:text-white transition-all">
                    <Mail className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Correo Electrónico</h4>
                    <p className="text-gray-500">contacto@emintec.com.do</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-lg mb-4">¿Tienes una consulta rápida?</h4>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <input type="text" placeholder="Tu Nombre" className="w-full px-5 py-3 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-emintec-blue transition-all outline-none" />
                  <textarea placeholder="Mensaje" rows={3} className="w-full px-5 py-3 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-emintec-blue transition-all outline-none resize-none"></textarea>
                  <button className="w-full bg-emintec-blue text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all">Enviar Consulta</button>
                </form>
              </div>
            </div>
            
            <div className="h-[600px] rounded-3xl overflow-hidden shadow-2xl relative bg-gray-200 flex items-center justify-center border-4 border-white">
              {/* Updated to a Dominican image as requested */}
              <img src="https://images.unsplash.com/photo-1589310214876-7889e4776e0d?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover" alt="República Dominicana" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="text-emintec-orange w-5 h-5" />
                  <span className="font-bold text-gray-800">Orgullosamente en Haina, RD</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">C/ Manolo Tavárez Justo #28, Gringo, Haina.</p>
                <button className="text-emintec-blue font-black text-sm uppercase tracking-widest hover:underline">Ver ubicación exacta</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-20 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-emintec-blue flex items-center justify-center rounded-lg">
                  <span className="text-white font-black text-lg">E</span>
                </div>
                <span className="text-xl font-black text-white tracking-tighter">EMINTEC</span>
              </div>
              <p className="mb-6 leading-relaxed">Liderando la innovación tecnológica y servicios integrales en Haina y alrededores.</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded-full hover:bg-emintec-blue hover:text-white transition-all"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded-full hover:bg-emintec-orange hover:text-white transition-all"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded-full hover:bg-blue-400 hover:text-white transition-all"><Twitter className="w-5 h-5" /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Enlaces Rápidos</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#inicio" className="hover:text-white transition-colors">Inicio</a></li>
                <li><a href="#soporte-ti" className="hover:text-white transition-colors">Soporte TI</a></li>
                <li><a href="#tienda" className="hover:text-white transition-colors">Tienda Online</a></li>
                <li><a href="#papeleria" className="hover:text-white transition-colors">Papelería</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Horarios de Atención</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex justify-between"><span>Lunes - Viernes:</span> <span className="text-white">8:00 AM - 6:00 PM</span></li>
                <li className="flex justify-between"><span>Sábados:</span> <span className="text-white">9:00 AM - 2:00 PM</span></li>
                <li className="flex justify-between"><span>Domingos:</span> <span className="text-white">Cerrado</span></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Newsletter</h4>
              <p className="text-sm mb-4">Suscríbete para recibir ofertas exclusivas.</p>
              <div className="flex bg-gray-800 p-1.5 rounded-xl border border-gray-700">
                <input type="email" placeholder="Email" className="bg-transparent border-none text-white focus:ring-0 text-sm px-3 flex-grow outline-none" />
                <button className="bg-emintec-blue text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-opacity-90 transition-all">Unirme</button>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6 text-xs uppercase tracking-widest font-bold">
            <p>© 2024 EMINTEC - Soluciones Tecnológicas. Todos los derechos reservados.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Aviso Legal</a>
              <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-emintec-blue" /> Tu Carrito
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                  <ShoppingBag className="w-20 h-20 mb-4 opacity-10" />
                  <p className="font-medium">Tu carrito está vacío.</p>
                  <button onClick={() => setIsCartOpen(false)} className="mt-4 text-emintec-blue font-bold text-sm">Ir a la tienda</button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <img src={item.image} className="w-20 h-20 rounded-xl object-cover" alt={item.name} />
                    <div className="flex-grow">
                      <h4 className="font-bold text-gray-800 text-sm leading-tight mb-1">{item.name}</h4>
                      <p className="text-emintec-blue font-bold text-sm mb-3">RD${item.price.toLocaleString()}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-2">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center font-bold text-gray-500 hover:text-emintec-orange">-</button>
                          <span className="font-bold text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center font-bold text-gray-500 hover:text-emintec-orange">+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="p-8 border-t border-gray-100 bg-gray-50 rounded-t-[2rem]">
                <div className="flex justify-between items-end mb-8">
                  <span className="text-gray-500 uppercase tracking-widest text-xs font-bold">Total estimado</span>
                  <span className="text-3xl font-black text-gray-900 leading-none">RD${total.toLocaleString()}</span>
                </div>
                <button 
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-emintec-orange text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-orange-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  <Phone className="w-6 h-6" /> Solicitar por WhatsApp
                </button>
                <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-widest font-bold">Sin pagos online · Pedido 100% seguro vía WhatsApp</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* WhatsApp Floating Button */}
      <button 
        onClick={() => handleServiceInquiry("General")}
        className="fixed bottom-8 right-8 z-[80] bg-[#25D366] text-white p-4 rounded-full shadow-[0_10px_40px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 group"
      >
        <div className="absolute right-full mr-4 bg-white text-gray-800 px-4 py-2 rounded-xl text-sm font-bold shadow-xl whitespace-nowrap opacity-0 translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
           ¿En qué podemos ayudarte?
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
      </button>
    </div>
  );
};

export default App;
