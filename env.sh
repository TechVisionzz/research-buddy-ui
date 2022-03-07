#!/bin/bash

# Recreate config file
rm -rf ./init.js
touch ./init.js

# Add assignment 
echo "window._env_ = {" >> ./init.js

  # Append configuration property to JS file
  echo "  STRAPI_URL: \"$STRAPI_URL\"," >> ./init.js

echo "}" >> ./init.js