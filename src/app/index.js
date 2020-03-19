import {
  navigate,
  router
} from './router'


let currentRoute = router.getCurrentRoute(window.location.hash)

if (!currentRoute) {
  navigate('home')
} else {
  navigate(currentRoute.name)
}