module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Users', [{
      id: 1,
      email: 'admin@admin.com',
      password: '11111QQQ',
      role: 2,
    },
    {
      id: 2,
      email: 'test@test.com',
      password: '11111QQQ',
      role: 1,
    }
    ], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
