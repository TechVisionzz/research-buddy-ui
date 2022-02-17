#!/bin/bash

# Recreate config file
rm -rf ./env-config.js
touch ./env-config.js

# Add assignment 
echo "window._env_ = {" >> ./env-config.js

  # Append configuration property to JS file
  echo "  STRAPI_URL: \"$STRAPI_URL\"," >> ./env-config.js

echo "}" >> ./env-config.js