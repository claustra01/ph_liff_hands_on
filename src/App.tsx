import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [auth, setAuth] = useState(false);
  const [imageUrl, setImageUrl] = useState("")

  useEffect(() => {
    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID,
      })
      .then(async () => {
        const profile = await liff.getProfile();
        setAuth(true);
        setMessage(`Hello, ${profile.displayName}!`);
        setImageUrl(profile.pictureUrl as string);
      })
      .catch((e: Error) => {
        setMessage('LIFF init failed.');
        setAuth(false);
        setError(`${e}`);
      });
  });

  return (
    <div className="App">
      <h1>create-liff-app</h1>
      {auth ? <img src={imageUrl} /> : <></>}
      {message && <p>{message}</p>}
      {error && (
        <p>
          <code>{error}</code>
        </p>
      )}
      <a
        href="https://developers.line.biz/ja/docs/liff/"
        target="_blank"
        rel="noreferrer"
      >
        LIFF Documentation
      </a>
    </div>
  );
}

export default App;
