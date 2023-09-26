
function LoggedIn({ token }) {
  return (
    <h2 key={token} className="pt-6">The secret code is: <span className="bg-gray-900 text-red-500 p-1 rounded-md">{token}</span>.</h2>
  );
}

export default LoggedIn;