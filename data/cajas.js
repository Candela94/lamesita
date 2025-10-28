

export const extrasGlobales = [
    {
      id: 'chocolate',
      nombre: 'Barra de chocolate artesano',
      precio: 3
    },
    {
      id: 'mermeladas',
      nombre: 'Mermeladas Lorusso',
      precio: 10,
      tipos: [
        'Fresa', 'Mora', 'Arándanos', 'Frutos rojos', 'Frambuesa',
        'Higos', 'Pimiento Dulce', 'Mandarina', 'Naranja', 'Mango', 'Melocotón'
      ]
    }
  ];
  






export const cajas = [
    {
      nombre: 'CAJITA APERITIVO',
      precio: 30,
      imagen: 'https://res.cloudinary.com/dnz96cick/image/upload/v1761638268/vino_uxshac.jpg',
      descripcion: 'Ligera, social y lista para disfrutar con un buen vino.',
      productos: [
        { nombre: 'Jamon serrano 200g' },
        { nombre: 'Queso semicurado García Vaquero' },
        { nombre: 'Fuet (2ud)' },
        { nombre: 'Membrillo' },
        { nombre: 'Aceite de oliva virgen extra 250ml' },
        { nombre: 'Vino Luna Lunera', tipos: ['Blanco', 'Tinto'] },
        { nombre: 'Miel', tipos: ['Romero', 'Azahar'] }
      ],
      color: '#0000EE',
      extrasDisponibles: ['chocolate']
    },
  
    {
      nombre: 'CAJITA PICADA',
      precio: 30,
      descripcion: 'Más completa, con contraste de sabores, ideal para compartir',
      imagen: 'https://res.cloudinary.com/dnz96cick/image/upload/v1761638268/vino_uxshac.jpg',
      productos: [
        { nombre: 'Salchichón ibérico 200g' },
        
        { nombre: 'Lomo de campo ibérico' },
        { nombre: 'Queso Maasdam 150g' },
        { nombre: 'Queso de oveja trufado 150g' },
        { nombre: 'Membrillo 200g' },
        { nombre: 'Miel', tipos: ['De flor', 'De trufa'] },
        { nombre: 'Vino', tipos: ['Blanco', 'Tinto'] }
      ],
      color: '#af2325',
      extrasDisponibles: ['chocolate', 'mermeladas']
    },
  
    {
      nombre: 'CAJITA QUESOS',
      precio: 30,
      imagen: 'https://res.cloudinary.com/dnz96cick/image/upload/v1761638268/vino_uxshac.jpg',
      descripcion: 'Elegante, pensada para los amantes del queso y los maridajes.',
      productos: [
        { nombre: 'Cava' },
        { nombre: 'Queso artesanal de cabra 150g' },
        { nombre: 'Queso de oveja trufado 150g' },
        { nombre: 'Queso Maasdam 150g' },
        { nombre: 'Queso Havarti en lonchas 200g' },
        { nombre: 'Queso curado 200g' },
        { nombre: 'Membrillo 200g' },
        { nombre: 'Miel 500g' }
      ],
      color: '#f7aa32',
      extrasDisponibles: ['chocolate', 'mermeladas']
    },
  
    {
      nombre: 'HAZ TU PROPIA CAJITA',
      precio: 30,
      imagen: 'https://res.cloudinary.com/dnz96cick/image/upload/v1761638268/vino_uxshac.jpg',
      descripcion: 'Crea tu cajita a medida, elige una base y 6 productos a elegir entre los disponibles',
      productos: [
        { nombre: 'Elige una base', tipos: ['Cava', 'Vino'] },
        { nombre: 'Jamón serrano 200g' },
        { nombre: 'Queso semicurado García Vaquero' },
        { nombre: 'Fuet' },
        { nombre: 'Membrillo' },
        { nombre: 'Aceite de oliva virgen extra 250ml' },
     
        { nombre: 'Salchichón ibérico 200g' },
        { nombre: 'Lomo de campo ibérico' },
        { nombre: 'Queso Maasdam 150g' }
      ],
      color: '#046a42',
      extrasDisponibles: ['chocolate']
    }
  ];
  








export const imagenesMercado = [


    'https://i.pinimg.com/1200x/fc/2d/10/fc2d10c76e3eaa6e3c0c8db125bf59bd.jpg',
    'https://i.pinimg.com/736x/56/c5/19/56c519ed60f27956f3ba6a6a6d96f12b.jpg',

    'https://i.pinimg.com/736x/be/2c/b0/be2cb0443a69a4ed0b5459d1f5dbf7fd.jpg',
    'https://i.pinimg.com/736x/56/c5/19/56c519ed60f27956f3ba6a6a6d96f12b.jpg',
    'https://i.pinimg.com/736x/c3/89/89/c38989af6148b6419cd2976219b155d4.jpg',
    'https://i.pinimg.com/1200x/1f/6f/d6/1f6fd6bd4c20b251a03df32d2fc040bd.jpg'


]