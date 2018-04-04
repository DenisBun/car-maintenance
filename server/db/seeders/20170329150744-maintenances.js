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
    }
    ], {}),

  down: queryInterface => queryInterface.bulkDelete('Maintenances', null, {})
};
