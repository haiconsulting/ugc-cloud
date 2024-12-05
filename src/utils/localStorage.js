export const LOCAL_STORAGE_KEYS = {
  RESOURCES: 'resources',
  POSTS: 'posts'
};

// Helper function to download data as JSON file
const downloadJSON = (key, data) => {
  try {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${key}_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error(`Error downloading ${key} as JSON:`, error);
    return false;
  }
};

export const getFromStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return null;
  }
};

export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    return false;
  }
};

// Function to backup data as downloadable JSON
export const backupData = () => {
  Object.entries(LOCAL_STORAGE_KEYS).forEach(([name, key]) => {
    const data = getFromStorage(key);
    if (data) {
      downloadJSON(key, data);
    }
  });
};

// Function to import data from JSON file
export const importData = async (key, file) => {
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    saveToStorage(key, data);
    return true;
  } catch (error) {
    console.error(`Error importing data from JSON:`, error);
    return false;
  }
};

// Function to clear all stored data
export const clearStorage = () => {
  Object.values(LOCAL_STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}; 