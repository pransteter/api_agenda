// eslint-disable-next-line no-undef
db.createUser({
  user: 'admin',
  pwd: 'root123',
  roles: [
    {
      role: 'dbOwner',
      db: 'schedule_main',
    },
    {
      role: 'readWrite',
      db: 'schedule_main',
    },
  ],
});
