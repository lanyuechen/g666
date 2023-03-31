import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Layout from '@/components/Layout';
import pages from '@/pages';

import routes from './routes';

const NotFound = pages['404'];

export default () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout routes={routes} />}>
          <Route key="index" index element={<Navigate to={routes[0].path} replace />} />
          {routes.map(route => {
            const Page = pages[route.component] || NotFound;
            return (
              <Route key={route.path} path={route.path} element={<Page />} />
            );
          })}
          <Route key="404" path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
