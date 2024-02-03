const { createClient } = require('redis');

let client;

(async () => {
  client = await createClient();

  client.on('connect', () => {
    console.log('Connected to Redis server');
  });

  client.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
  });

  await performOperations();
})();

// Set state
const setState = async (key, value) => {
  try {
    await client.set(key, value);
    console.log('State set successfully');
  } catch (error) {
    console.error('Error setting state:', error);
  }
};

// Get state
const getState = async (key) => {
  try {
    const reply = await client.get(key);
    console.log('Current state:', reply);
    return reply;
  } catch (error) {
    console.error('Error getting state:', error);
    return null;
  }
};

// Usage
const performOperations = async () => {
  console.log('########### performOperations');
  try {
    await setState('name', 'Roland Levy');
    const name = await getState('name');
    console.log('########### name:', name);
    closeConnection();
  } catch (error) {
    console.error('Error performing state operations:', error);
    closeConnection(); // Ensure connection is closed even in case of errors
  }
};

// Close Redis connection
const closeConnection = () => {
  client.quit((err, reply) => {
    if (err) {
      console.error('Error closing Redis connection:', err);
    } else {
      console.log('Redis connection closed');
    }
  });
};
