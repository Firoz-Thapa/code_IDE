// Helper functions that can be used without React
export const toggleClass = (el, className) => {
  let elem = document.querySelector(el);
  if (elem) {
    elem.classList.toggle(className);
  }
};

export const removeClass = (el, className) => {
  let elem = document.querySelector(el);
  if (elem) {
    elem.classList.remove(className);
  }
};

// Base URL for your API - make sure this matches your backend server port
export const api_base_url = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";