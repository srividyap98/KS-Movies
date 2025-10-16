const fs = require('fs');
const path = require('/Users/srividyapanchagnula/Downloads/ksmovies/db');

// Define the path to your JSON database file
const dbFilePath = path.join(__dirname, 'your-database.json');

// Helper function to read data from the JSON file
function readDatabase() {
  try {
    const data = fs.readFileSync(dbFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading the database:', error);
    return {};
  }
}

// Helper function to write data to the JSON file
function writeDatabase(data) {
  try {
    const json = JSON.stringify(data, null, 2);
    fs.writeFileSync(dbFilePath, json, 'utf8');
  } catch (error) {
    console.error('Error writing to the database:', error);
  }
}

// Initialize the database by reading the data from the JSON file
let db = readDatabase();

// Export functions to interact with the database
module.exports = {
  // Retrieve all data from the database
  getAllData: () => db,

  // Add data to the database
  addData: (newData) => {
    db.push(newData);
    writeDatabase(db);
  },

  // Update data in the database
  updateData: (updatedData) => {
    const index = db.findIndex((item) => item.id === updatedData.id);
    if (index !== -1) {
      db[index] = updatedData;
      writeDatabase(db);
    }
  },

  // Delete data from the database
  deleteData: (id) => {
    db = db.filter((item) => item.id !== id);
    writeDatabase(db);
  },
};
