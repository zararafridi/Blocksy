import axios from "axios";


const api = axios.create({
  baseURL: process.env.REACT_APP_INTERNAL_API_PATH,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Track if a refresh request is already in progress
let isRefreshing = false;
let failedQueue = [];

// Function to process queued requests after token refresh
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Add interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Wait until refresh completes
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_INTERNAL_API_PATH}/refresh`,
          { withCredentials: true }
        );

        const newToken = res.data?.accessToken;
        api.defaults.headers.common["Authorization"] = "Bearer " + newToken;
        processQueue(null, newToken);
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// 🧩 API functions



// export const getNews = async () => {
//   try {
//     const response = await axios.get(`${BACKEND_URL}/api/news`);
//     return response.data; // articles come directly from backend
//   } catch (error) {
//     console.error("Error fetching news:", error);
//     return [];
//   }
// };

export const getNews = async () => {
  try {
    const response = await api.get("/news"); // ✅ calls your backend /api/news
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

export const login = async (data) => {
  try {
    return await api.post("/login", data);
  } catch (error) {
    return error;
  }
};

export const signup = async (data) => {
  try {
    return await api.post("/register", data);
  } catch (error) {
    return error;
  }
};

export const signout = async () => {
  try {
    return await api.post("/logout");
  } catch (error) {
    return error;
  }
};

export const getAllBlog = async () => {
  try {
    return await api.get("/blog/all");
  } catch (error) {
    return error;
  }
};

export const submitBlog = async (data) => {
  try {
    return await api.post("/blog", data);
  } catch (error) {
    return error;
  }
};

export const getBlogById = async (id) => {
  try {
    return await api.get(`/blog/${id}`);
  } catch (error) {
    return error;
  }
};

export const getCommentById = async (id) => {
  try {
    return await api.get(`/comment/${id}`, { validateStatus: false });
  } catch (error) {
    return error;
  }
};

export const postComment = async (data) => {
  try {
    return await api.post("/comment", data);
  } catch (error) {
    return error;
  }
};

export const deletBlog = async (id) => {
  try {
    return await api.delete(`/blog/${id}`);
  } catch (error) {
    return error;
  }
};

export const updateBlog = async (data) => {
  try {
    return await api.put("/blog", data);
  } catch (error) {
    return error;
  }
};

export default api;
