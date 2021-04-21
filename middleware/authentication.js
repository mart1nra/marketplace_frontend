export default function({ store, redirect }) {
  if (!store.state.auth.signedIn) {
    return redirect('/profile/login');
  }
}