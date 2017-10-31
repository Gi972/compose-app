export default ({ routes, env, dependencies, log }) => {
  const { _ } = dependencies;
  const port = env.port || 8080;
  const app = dependencies.express();
  
  app.use(dependencies.helmet());
  app.use(dependencies.compression());
  
  routes.forEach(route => {
     app[_.lowerCase(route.method)](route.url, route.callback);
     log.info(`Route created ${route.url} for method ${route.method}`);
  });
  
  app.listen(port, () => log.info(`App listening on ${port}`));

  return {
    env,
    dependencies,
    app,
  };
}