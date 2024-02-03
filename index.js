const { createClient } = require('redis');

(async () => {
  const client = await createClient();

  client.on('connect', async () => {
    console.log('Connected to Redis server');
  });

  client.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
  });
  await performOperations(client);
})();

// Set state
const setState = async (client, key, value) => {
  console.log('######## client:', client);
  try {
    await client.set(key, value);
    console.log('State set successfully');
  } catch (error) {
    console.error('Error setting state:', error);
  }
};

// Get state
const getState = async (client, key) => {
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
const performOperations = async (client) => {
  try {
    await setState(client, 'name', 'Roland Levy');
    const name = await getState(client, 'name');
    console.log('Name:', name);
    // closeConnection(client);
  } catch (error) {
    console.error('Error performing state operations:', error);
    closeConnection(client);
  }
};

// Close Redis connection
const closeConnection = (client) => {
  setTimeout(() => {
    // wait for current operations to finish
    client.quit((err, reply) => {
      if (err) {
        console.error('Error closing Redis connection:', err);
      } else {
        console.log('Redis connection closed');
      }
    });
  }, 1000);
};
