import React from "react";
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import 'animate.css';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import "./Helpers/prototypeHelpers.js";

createInertiaApp({
    title: title => `${title} - TeacherOn`,
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    return pages[`./Pages/${name}.jsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <>
        <>
          <App {...props} />
          <ToastContainer
            position="bottom-center"
            autoClose="5000"
            closeOnClick="true"
            newestOnTop="true"
          />
        </>
      </>
    )
  },
})
