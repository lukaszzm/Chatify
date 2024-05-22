import React, { useState } from "react";
import { Button } from "@repo/ui";

function App(): JSX.Element {
  const [count, setCount] = useState(0);

  function handleClick(): void {
    setCount((prev) => prev + 1);
  }

  return (
    <main className="min-h-screen w-full flex justify-center items-center bg-gray-50">
      <div className="flex flex-col gap-3 backdrop-blur-md bg-gray-100 py-6 px-12 rounded-xl">
        <h1 className="text-2xl">
          Hello from{" "}
          <span className="font-semibold text-indigo-700">Chatify</span>
        </h1>
        <Button onClick={handleClick}>Count: {count}</Button>
      </div>
    </main>
  );
}

export default App;
