"use client";

import BookLoader from "@/constant/BookLoader";
import { persistor, store } from "@/store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

// 🔄 Layout wrapper component that wraps your entire app with necessary providers
export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode; // Children components passed into this layout
}) {
  return (
    // ✅ Provides Redux store to all child components
    <Provider store={store}>
      {/* 🔒 Handles rehydration of persisted Redux state before showing the UI */}
      <PersistGate loading={<BookLoader />} persistor={persistor}>
        {/* 🔔 Toast notification container (can trigger from anywhere) */}
        <Toaster />

        {/* 📦 Renders the actual page content once state is ready */}
        {children}
      </PersistGate>
    </Provider>
  );
}
