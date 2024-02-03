const redis = require('redis');

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
    console.log('State set successfully for:', { key, value });
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
setState('firstName', 'Roland');
setState('lastName', 'Levy');

const firstName = getState('firstName');
const lastName = getState('lastName');

// Close Redis connection
const closeConnection = async () => {
  try {
    await client.quit();
    console.log('Redis connection closed');
  } catch (error) {
    console.error('Error closing Redis connection:', error);
  }
};

closeConnection();
