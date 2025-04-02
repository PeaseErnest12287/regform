import React, { useState } from "react";
import SignInForm from "./components/SignInForm";
import Download from "./components/Download";

const App = () => {
  const [showDownload, setShowDownload] = useState(false); // Whether the download page is shown or not

  return (
    <div className="App">
      {!showDownload ? (
        // If Download page is not shown, show the SignInForm with the Download button
        <SignInForm setShowDownload={setShowDownload} />
      ) : (
        // When Download is clicked, show the Download page
        <Download />
      )}
    </div>
  );
};

export default App;
