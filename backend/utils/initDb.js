import User from '../models/User.js';
import bcrypt from 'bcrypt';

const initializeDatabase = async () => {
  try {
    await User.sync({ force: true });

    const users = [
      {
        name: 'Japhary Juma',
        email: 'japhary.juma@gmail.com',
        password: 'password123',
        location: 'Magari Mabovu',
        stars: 5,
        role: 'mechanic'
      },
      {
        name: 'James Elioth',
        email: 'james.elioth@gmail.com',
        password: 'password123',
        location: 'Uwanja Mpya',
        stars: 4,
        role: 'mechanic'
      },
      {
        name: 'Alice Smith',
        email: 'alice.smith@gmail.com',
        password: 'password123',
        location: 'Downtown',
        stars: 3,
        role: 'user'
      },
      {
        name: 'Bob Johnson',
        email: 'bob.johnson@gmail.com',
        password: 'password123',
        location: 'Suburbs',
        stars: 5,
        role: 'user'
      },
      {
        name: 'Emily Davis',
        email: 'emily.davis@gmail.com',
        password: 'password123',
        location: 'City Center',
        stars: 4,
        role: 'admin'
      },
      {
        name: 'Michael Brown',
        email: 'michael.brown@gmail.com',
        password: 'password123',
        location: 'Industrial Area',
        stars: 5,
        role: 'mechanic'
      }
    ];

    // Hash passwords before creating users
    for (const user of users) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    await User.bulkCreate(users);

    console.log('Database has been initialized with dummy data.');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

initializeDatabase();
