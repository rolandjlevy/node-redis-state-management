const redis = require('redis');

// Connect to Redis server
const client = redis.createClient();

client.on('connect', () => {
  console.log('Connected to Redis server');
});

client.on('error', (err) => {
  console.error('Error connecting to Redis:', err);
});

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
  } catch (error) {
    console.error('Error getting state:', error);
  }
};

// Usage
const performOperations = async () => {
  try {
    await setState('name', 'Roland Levy');
    const name = await getState('myKey');
    console.log('########## name:', name)
  } catch (error) {
    console.error('Error performing state operations:', error);
  } finally {
    closeConnection();
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

(async () => {
  await performOperations();
})();
