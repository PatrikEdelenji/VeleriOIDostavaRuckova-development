
const routes = [
  {
  path: '/Login',
  component: () => import('layouts/LoginPageLayout.vue'),
  children: [
  { path: '', component: () =>
 import('pages/Login/LoginIndex.vue')}
]}
]

 

  // Always leave this as last one,
  // but you can also remove it
  if (process.env.MODE !== 'ssr') {
    routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
    })
   }
   export default routes
   