import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useCallback } from "react";

const API_URL = process.env.REACT_APP_API_URL ;

export const useApi = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const apiCall = useCallback(
    async (endpoint: string, options: any = {}) => {
      try {
        let token: string | undefined;

        if (isAuthenticated) {
          token = await getAccessTokenSilently({
            authorizationParams: {
              audience: process.env.REACT_APP_AUTH0_AUDIENCE,
              scope: "read:contacts write:contacts admin:all", 
            },
          });
        }

          console.log("Access Token:", token); 


        const response = await axios({
          method: options.method || "GET",
          url: `${API_URL}${endpoint}`,
          data: options.data,
          //withCredentials: true,
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(options.headers || {}),
          },
        });

        return response.data;
      } catch (error: any) {
        console.error("API call failed:", {
          endpoint,
          status: error.response?.status,
          error: error.response?.data,
        });
        throw error;
      }
    },
    [getAccessTokenSilently, isAuthenticated]
  );

  const analyseAI = async (formData: any) => {
    return apiCall("/ai/analyse", {
      method: "POST",
      data: formData,
    });
  };

  return { apiCall, analyseAI };
};
