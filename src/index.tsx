import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from './components/common/MainLayout';
import { store } from './reducers/Store';
import { TodoDialog } from './components/todoDialog/TodoDialog';
import './i18n';
import './globals/global.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TodoDialog />,
  },
]);

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MainLayout>
        <RouterProvider router={router} />
      </MainLayout>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
