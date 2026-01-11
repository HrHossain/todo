export function setItemLocalStorage(key,value){
     try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("Failed to save to localStorage", err);
  }
}

export function getItemLocalStorage(key){
    try {
    const item = localStorage.getItem(key);
    if (!item) return null;
    return JSON.parse(item);
  } catch (err) {
    console.error("Failed to read from localStorage", err);
    return null;
  }
}