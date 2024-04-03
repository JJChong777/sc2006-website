export const handleSignUp = async (email, password, supabase) => {
  console.log("SIGNING UP", email, password);
  try {
    const response = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    // console.log(`USER: ${response.data}`);
    // console.log(`ERROR: ${response.error}`);
    console.log(response);
    return { user: response.data, error: response.error };
  } catch (err) {
    console.log("ERROR at signup", response.error);
    return { user: response.data, error: response.error };
  }
};
