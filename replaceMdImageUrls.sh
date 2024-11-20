#!/bin/bash

# Function to replace image URLs in a Markdown file
replace_image_urls() {
  local file_path="$1"
  local url_prefix="$2"

  # Make a backup of the original file just in case
  cp "$file_path" "$file_path.bak"

  # Use sed to replace image URLs
  sed -i.bak -E "s|\!\[(.*)\]\((.*)\)|\![\1]($url_prefix/\2)|g" "$file_path"

  echo "Image URLs have been replaced in: $file_path. Backup created as $file_path.bak"
}

# Function to process all .md files in a directory
process_directory() {
  local directory="$1"
  local url_prefix="$2"

  # Loop through all .md files in the directory
  for file in "$directory"/*.md; do
    if [[ -f "$file" ]]; then
      replace_image_urls "$file" "$url_prefix"
    fi
  done
}

# Example usage
directory="./src/posts"
url_prefix="http://minifigmaster125.github.io"

# Process all .md files in the specified directory
process_directory "$directory" "$url_prefix"
