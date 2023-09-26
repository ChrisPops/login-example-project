import LoggedOut from './LoggedOut';
import LoggedIn from './LoggedIn';

function Greeting({ token }) {
  return (token.length > 0) ? <LoggedIn token={token} /> : <LoggedOut />;
}

export default Greeting;
