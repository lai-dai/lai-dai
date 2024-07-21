"use client";

import { useState } from "react";

export function Button({ text }: { text: string }) {
  const [toggle, setToggle] = useState(false);

  return (
    <button
      className="bg-slate-700 rounded-md px-4 py-2"
      onClick={() => setToggle(!toggle)}
    >
      {toggle ? text : "Click Me"}
    </button>
  );
}
