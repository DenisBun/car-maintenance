module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Maintenances', [{
      id: 1,
      title: 'Oli exchange',
      type: 'REPAIR',
      price: 20,
    },
    {
      id: 2,
      title: 'Tiers exchange',
      type: 'UPGRADE',
      price: 120,
    },
    {
      id: 3,
      title: 'Autodiagnostics',
      type: 'UPGRADE',
      price: 45,
    },
    {
      id: 4,
      title: 'Repaint',
      type: 'UPGRADE',
      price: 48,
    },
    {
      id: 5,
      title: 'Wheels balancing',
      type: 'UPGRADE',
      price: 78,
    },
    {
      id: 6,
      title: 'Engine upgrade',
      type: 'UPGRADE',
      price: 450,
    },
    {
      id: 7,
      title: 'Nitrous Oxide System (NOS)',
      type: 'UPGRADE',
      price: 5000,
    },
    ], {}),

  down: queryInterface => queryInterface.bulkDelete('Maintenances', null, {})
};
