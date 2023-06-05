// require.config.js
require.config({
  baseUrl: "public_html/js",
  paths: {
    // Define the paths to your modules
    "firebase-app": "node_modules/firebase/app",
    "firebase-auth": "node_modules/firebase/auth",
    // Add other module paths as needed
  },
  shim: {
    // Shim any non-AMD libraries or dependencies
    "firebase-app": {
      exports: "firebase", // Adjust the export name based on the module
    },
    "firebase-auth": {
      deps: ["firebase-app"], // Add any dependencies
      exports: "firebase.auth", // Adjust the export name based on the module
    },
  },
});
