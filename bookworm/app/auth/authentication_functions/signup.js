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
    console.log(response);
  } catch (err) {
    console.log("ERROR at signup", err);
  }
};
