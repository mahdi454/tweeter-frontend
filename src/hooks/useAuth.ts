import { useSelector } from "react-redux";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { selectCurrentToken } from "@/app/features/auth/authSlice";

interface DecodedToken extends JwtPayload {
  userId: string;
}

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  if (token) {
    const decoded = jwtDecode(token) as DecodedToken;
    const { userId } = decoded;
    return { userId };
  }

  return { userId: "" };
};

export default useAuth;
