import { useQuery } from "@tanstack/react-query";
import axios from "../lib/api";

export function useIsLoggedIn() {
  const { data: isLoggedIn, isPending: isCheckingIfLoggedIn } = useQuery({
    queryKey: ["me"],
    async queryFn() {
      const response = await axios.get("/me");
      return response.data.isLoggedIn;
    },
  });

  return {
    isLoggedIn,
    isCheckingIfLoggedIn,
  };
}
