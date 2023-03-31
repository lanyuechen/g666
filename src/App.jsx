import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Layout from '@/components/Layout';
import pages from '@/pages';
import '@/g6';

import routes from './routes';

const NotFound = pages['404'];

const renderRoutes = (routes) => {
  return routes.map(route => {
    if (route.routes?.length) {
      return (
        <Route key={route.route} path={route.route}>
          {renderRoutes(route.routes)}
        </Route>
      );
    }
    const Page = pages[route.component] || NotFound;
    return (
      <Route key={route.route} path={route.route} element={<Page />} />
    );
  });
}

export default () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout routes={routes} />}>
          <Route key="index" index element={<Navigate to={routes[0].route} replace />} />
          {renderRoutes(routes)}
          <Route key="404" path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
