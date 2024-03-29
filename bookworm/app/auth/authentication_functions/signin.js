export const handleSignIn = async (email, password, supabase, { onSuccess, onError, onSetEmail, onSetPassword }) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    onSetEmail('');
    onSetPassword('');
    onSuccess();
  } catch (error) {
    console.error('Error signing in:', error.message);
    onError(error.message);
  }
};
