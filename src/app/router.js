import Router from 'minimal-router'
import {
  render as renderHome
} from './home'

const navbar = require("../templates/navbar.hbs");

const router = new Router();
router.setPrefix('#');

router.add('home', '/', ({
  query,
  params
}) => {
  console.log("qp", query, params)
  document.getElementById('navbar').innerHTML = navbar();
  document.getElementById('content').innerHTML = renderHome()
});

router.add('map', '/map', () => {
  document.getElementById('navbar').innerHTML = navbar();
  document.getElementById('content').innerHTML = 'Map TODO'
});

router.add('about', '/about', () => {
  document.getElementById('navbar').innerHTML = navbar();
  document.getElementById('content').innerHTML = 'About TODO'
});

// Listen browser event for back navigation
window.onpopstate = function (event) {
  // dispatch current url to route
  var path = document.location.hash;
  this.console.log("onpopstate", path)
  if (document.location.search.length) {
    path += '?' + document.location.search;
  }
  router.dispatch(path);
};

// Navigate to other routes
const navigate = function (routeName, query, params) {
  const url = router.formatUrl(routeName, query, params);
  history.pushState(null, null, url);
  router.dispatch(url);
};

export {
  router,
  navigate
}