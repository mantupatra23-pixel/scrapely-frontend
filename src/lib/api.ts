const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://scrapely-backend.onrender.com/api/v1";

export const api = {
  get: async (endpoint: string, config?: { params?: Record<string, any> }) => {
    try {
      let url = `${API_BASE_URL}${endpoint}`;
      if (config?.params) {
        const queryParams = new URLSearchParams();
        Object.entries(config.params).forEach(([key, val]) => {
          if (val !== undefined && val !== null) {
            queryParams.append(key, String(val));
          }
        });
        url += `${endpoint.includes("?") ? "&" : "?"}${queryParams.toString()}`;
      }

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      return { data };
    } catch (err) {
      console.error("API Fetch Error:", err);
      return { data: { leads: [], total: 0 } };
    }
  },
};
