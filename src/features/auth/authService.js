import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase";

const register = async ({ email, password }) => {
  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = {
      email: userCredential.user.email,
      _id: userCredential.user.uid,
      accessToken: userCredential.user.accessToken,
    };

    localStorage.setItem("courseUser", JSON.stringify(user));

    return user;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

const login = async ({ email, password }) => {
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = {
      email: userCredential.user.email,
      _id: userCredential.user.uid,
      accessToken: userCredential.user.accessToken,
    };
    localStorage.setItem("courseUser", JSON.stringify(user));

    return user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

const logout = async () => {
  try {
    await auth.signOut();
    localStorage.removeItem("courseUser");
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

const authService = { register, login, logout };

export default authService;
