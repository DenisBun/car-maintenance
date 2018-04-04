module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Cars', [{
      id: 1,
      carName: 'Porchse GT2RS',
      registrationNumber: '0330-IK3',
      userId: 1,
    },
    {
      id: 2,
      carName: 'Nissan Skyline',
      registrationNumber: '120330-BA2',
      userId: 2,
    },
    {
      id: 3,
      carName: 'Ford Fiesta',
      registrationNumber: '2343-SA3',
      userId: 2,
    }
    ], {}),

  down: queryInterface => queryInterface.bulkDelete('Cars', null, {})
};
