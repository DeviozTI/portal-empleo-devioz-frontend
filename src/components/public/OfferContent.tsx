import React from 'react';

interface OfferContentProps {
  selectedOffer: number;
}

const OfferContent: React.FC<OfferContentProps> = ({ selectedOffer }) => {
  const renderContent = () => {
    switch (selectedOffer) {
      case 0:
        return (
          <>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Creación de productos
            </h2>
            <ul className="list-disc list-inside">
              <li>Video en productos</li>
              <li>Precios al por mayor</li>
              <li>Variantes de producto</li>
              <li>Pasillos por categoría</li>
            </ul>
          </>
        );
      case 1:
        return (
          <>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Herramientas de gestión
            </h2>
            <ul className="list-disc list-inside">
              <li>Gestión de inventario</li>
              <li>Control de ventas</li>
              <li>Informes y análisis</li>
              <li>Automatización de procesos</li>
            </ul>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Configuraciones de tienda
            </h2>
            <ul className="list-disc list-inside">
              <li>Personalización de temas</li>
              <li>Integración de métodos de pago</li>
              <li>Opciones de envío</li>
              <li>Gestión de clientes</li>
            </ul>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Herramientas de promoción
            </h2>
            <ul className="list-disc list-inside">
              <li>Marketing por correo electrónico</li>
              <li>Descuentos y cupones</li>
              <li>Programas de fidelización</li>
              <li>Publicidad en redes sociales</li>
            </ul>
          </>
        );
      case 4:
        return (
          <>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Comunidad de e-commerce
            </h2>
            <ul className="list-disc list-inside">
              <li>Foros de discusión</li>
              <li>Eventos y webinars</li>
              <li>Recursos educativos</li>
              <li>Red de contactos</li>
            </ul>
          </>
        );
      default:
        return null;
    }
  };

  return <div className="p-8 bg-white rounded-lg shadow-lg animate-fade-in">{renderContent()}</div>;
};

export default OfferContent;
