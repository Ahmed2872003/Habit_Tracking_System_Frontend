import { useState } from "react";

export default function Overlay({ className = "" }) {
  return <div className={`fixed inset-0 bg-black opacity-40 ` + className} />;
}
