// RouterComponent.tsx
import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { ParentRoutes, routes } from './routesStructure';
import RouteProtection from './RouteProtection';
import NotFound404 from '../pages/redirections/NotFound404';
function RouterComponent() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      {routes.map((route, i) => {
          if (
            RouteProtection({
              requiredActions: route.requiredActions,
              requiredPermissions: route.requiredPermissions,
              requiredUserType: route.requiredUserType,
            })
          ) {
            return (
              <React.Fragment key={i}>
                {route.parent ? (
                  ParentRoutes.map((parentRoute, i) => (
                    <Route key={i} path={parentRoute.path} element={parentRoute.component && <parentRoute.component />}>
                      {route.parent === parentRoute.path && (
                        <Route key={i} path={route.path} element={<route.component />} />
                      )}
                    </Route>
                  ))
                ) : (
                  <Route key={i} path={route.path} element={<route.component />} />
                )}
              </React.Fragment>
            );
          }
        })}
        <Route path="*" element={<NotFound404 />} />
        </>
    )
  );
  return router;
}
export default RouterComponent;