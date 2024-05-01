import { useUserStore } from "../stores/user";
import { supabase } from "../supabase/supabase";

export const handleLogin = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (!error) {
    useUserStore.setState({ user: true, userData: data.user });
    console.log(`User successfully logged in with this data:`, data.user);
  } else {
    console.error(error);
  }
};

export const handleSignup = async (email, password, name) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        display_name: name,
      },
    },
  });

  if (!error) {
    useUserStore.setState({ user: true, userData: data.user });
    console.log(`User successfully logged in with this data:`, data.user);
  } else {
    console.error(error);
  }
};

export const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
  } else {
    useUserStore.setState({ user: false, userData: null });
    console.log("User successfully logged out");
  }
};

export const handleForgotPassword = async (email) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    console.error(error);
  } else {
    useUserStore.setState({ user: false, userData: null });
    console.log("User successfully logged out");
  }
};
