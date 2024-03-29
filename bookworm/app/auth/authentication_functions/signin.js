export const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password
    })
    router.refresh();
    setEmail('');
    setPassword('');
  }