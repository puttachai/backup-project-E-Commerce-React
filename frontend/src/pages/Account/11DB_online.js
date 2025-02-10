

// ///////////////

// const mariadb = require('mariadb');
// require('dotenv').config(); // Load environment variables from .env file
// const crypto = require('crypto');

// function hashPassword(password) {
//   const hashedPassword = crypto.createHash('sha512').update(password).digest('hex');
//   return hashedPassword;
// }

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors'); // Import CORS module

// const app = express();
// const port = 5000;

// app.use(bodyParser.json());
// app.use(cors()); // Enable CORS for all origins

// const pool = mariadb.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT || 3310
// });

// // Connect to MariaDB
// pool.getConnection()
//   .then(conn => {
//     console.log('MariaDB Connected...');
//     conn.release(); // Release the connection back to the pool
//   })
//   .catch(err => {
//     console.error('Error connecting to MariaDB:', err);
//     process.exit(1); // Exit the process if unable to connect
//   });

// // API Endpoint to handle signup
// app.post('/api/signup', (req, res) => {
//   const { username, email, password } = req.body;
//   const hashedPassword = hashPassword(password); // Hash the password before storing in the database

//   const INSERT_USER_QUERY = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

//   pool.getConnection()
//     .then(conn => {
//       return conn.query(INSERT_USER_QUERY, [username, email, hashedPassword])
//         .then(result => {
//           console.log('User added to database.');
//           res.status(200).json({ message: 'User added successfully.' });
//           conn.release(); // Release the connection back to the pool
//         })
//         .catch(err => {
//           console.error(err);
//           res.status(500).json({ message: 'Failed to insert user.' });
//           conn.release(); // Release the connection back to the pool
//         });
//     })
//     .catch(err => {
//       console.error('Error connecting to MariaDB:', err);
//       res.status(500).json({ message: 'Failed to insert user.' });
//     });
// });

// // API Endpoint to handle login
// app.post('/api/login', (req, res) => {
//   const { emailOrUsername, password } = req.body;

//   // Hash the password entered by the user before comparison
//   const hashedPassword = hashPassword(password);

//   // Query the database to find a user matching the email/username and hashed password
//   const SELECT_USER_QUERY = `SELECT * FROM users WHERE (email = ? OR username = ?) AND password = ?`;

//   pool.getConnection()
//     .then(conn => {
//       return conn.query(SELECT_USER_QUERY, [emailOrUsername, emailOrUsername, hashedPassword])
//         .then(results => {
//           if (results.length > 0) {
//             console.log('Login successful:', results[0]);
//             res.status(200).json({ message: 'Login successful' });
//           } else {
//             console.log('Login failed: Invalid email/username or password');
//             res.status(401).json({ message: 'Invalid email/username or password' });
//           }
//           conn.release(); // Release the connection back to the pool
//         })
//         .catch(err => {
//           console.error(err);
//           res.status(500).json({ message: 'Login failed' });
//           conn.release(); // Release the connection back to the pool
//         });
//     })
//     .catch(err => {
//       console.error('Error connecting to MariaDB:', err);
//       res.status(500).json({ message: 'Login failed' });
//     });
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });



//////////
// // app.listen(port, '0.0.0.0', () => {
//   console.log(`Server is running on http://0.0.0.0:${port}`);
// });

// /////////////////////////////////////////////////////////////////////////////////////////


const mariadb = require('mariadb');
require('dotenv').config(); // Load environment variables from .env file
const crypto = require('crypto');
const { localAddress, networkAddress } = require('./networkAddress'); // Import the network addresses

function hashPassword(password) {
  const hashedPassword = crypto.createHash('sha512').update(password).digest('hex');
  return hashedPassword;
}

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS module

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all origins

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3310
});

// Connect to MariaDB
pool.getConnection()
  .then(conn => {
    console.log('MariaDB Connected...');
    conn.release(); // Release the connection back to the pool
  })
  .catch(err => {
    console.error('Error connecting to MariaDB:', err);
    process.exit(1); // Exit the process if unable to connect
  });

// API Endpoint to handle signup
app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = hashPassword(password); // Hash the password before storing in the database

  const INSERT_USER_QUERY = `INSERT INTO users ( email, password) VALUES (?, ?, ?)`;

  pool.getConnection()
    .then(conn => {
      return conn.query(INSERT_USER_QUERY, [ email, hashedPassword])
        .then(result => {
          console.log('User added to database.');
          res.status(200).json({ message: 'User added successfully.' });
          conn.release(); // Release the connection back to the pool
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ message: 'Failed to insert user.' });
          conn.release(); // Release the connection back to the pool
        });
    })
    .catch(err => {
      console.error('Error connecting to MariaDB:', err);
      res.status(500).json({ message: 'Failed to insert user.' });
    });
});

// API Endpoint to handle login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Hash the password entered by the user before comparison
  const hashedPassword = hashPassword(password);

  // Query the database to find a user matching the email/username and hashed password
  const SELECT_USER_QUERY = `SELECT * FROM users WHERE (email = ? OR username = ?) AND password = ?`;

  pool.getConnection()
    .then(conn => {
      return conn.query(SELECT_USER_QUERY, [email, email, hashedPassword])
        .then(results => {
          if (results.length > 0) {
            console.log('Login successful:', results[0]);
            res.status(200).json({ message: 'Login successful' });
          } else {
            console.log('Login failed: Invalid email/username or password');
            res.status(401).json({ message: 'Invalid email/username or password' });
          }
          conn.release(); // Release the connection back to the pool
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ message: 'Login failed' });
          conn.release(); // Release the connection back to the pool
        });
    })
    .catch(err => {
      console.error('Error connecting to MariaDB:', err);
      res.status(500).json({ message: 'Login failed' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://${localAddress}:${port}`);
  console.log(`Server is running on http://${networkAddress}:${port}`);
});

////////////////////////////////


// const mariadb = require('mariadb');
// require('dotenv').config(); // Load environment variables from .env file
// const crypto = require('crypto');
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors'); // Import CORS module
// const axios = require('axios');

// function hashPassword(password) {
//   const hashedPassword = crypto.createHash('sha512').update(password).digest('hex');
//   return hashedPassword;
// }

// const app = express();
// const port = 5000;

// app.use(bodyParser.json());
// app.use(cors()); // Enable CORS for all origins

// const pool = mariadb.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT || 3310
// });

// // Connect to MariaDB
// pool.getConnection()
//   .then(conn => {
//     console.log('MariaDB Connected...');
//     conn.release(); // Release the connection back to the pool
//   })
//   .catch(err => {
//     console.error('Error connecting to MariaDB:', err);
//     process.exit(1); // Exit the process if unable to connect
//   });

// // API Endpoint to handle signup
// app.post('/api/signup', (req, res) => {
//   const { username, email, password } = req.body;
//   const hashedPassword = hashPassword(password); // Hash the password before storing in the database

//   const INSERT_USER_QUERY = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

//   pool.getConnection()
//     .then(conn => {
//       return conn.query(INSERT_USER_QUERY, [username, email, hashedPassword])
//         .then(result => {
//           console.log('User added to database.');
//           res.status(200).json({ message: 'User added successfully.' });
//           conn.release(); // Release the connection back to the pool
//         })
//         .catch(err => {
//           console.error(err);
//           res.status(500).json({ message: 'Failed to insert user.' });
//           conn.release(); // Release the connection back to the pool
//         });
//     })
//     .catch(err => {
//       console.error('Error connecting to MariaDB:', err);
//       res.status(500).json({ message: 'Failed to insert user.' });
//     });
// });

// // API Endpoint to handle login
// app.post('/api/login', (req, res) => {
//   const { emailOrUsername, password } = req.body;

//   // Hash the password entered by the user before comparison
//   const hashedPassword = hashPassword(password);

//   // Define SQL query to check if the email or username exists and the password matches
//   const SELECT_USER_QUERY = `SELECT * FROM users WHERE (email = ? OR username = ?) AND password = ?`;

//   pool.getConnection()
//     .then(conn => {
//       return conn.query(SELECT_USER_QUERY, [emailOrUsername, emailOrUsername, hashedPassword])
//         .then(result => {
//           if (result.length > 0) {
//             console.log('Login successful.');
//             res.status(200).json({ message: 'Login successful.' });
//           } else {
//             console.log('Invalid email/username or password.');
//             res.status(401).json({ message: 'Invalid email/username or password.' });
//           }
//           conn.release(); // Release the connection back to the pool
//         })
//         .catch(err => {
//           console.error(err);
//           res.status(500).json({ message: 'Failed to login.' });
//           conn.release(); // Release the connection back to the pool
//         });
//     })
//     .catch(err => {
//       console.error('Error connecting to MariaDB:', err);
//       res.status(500).json({ message: 'Failed to login.' });
//     });
// });

// // Listen on all network interfaces
// app.listen(port, '0.0.0.0', () => {
//   console.log(`Server running on http://0.0.0.0:${port}`);
// });
