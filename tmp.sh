# Find and replace @import with @use
find ./src -name "*.scss" -type f -exec sed -i '' \
  's/@import \x27\(.*\)\x27;/@use \x27\1\x27 as *;/g' {} +

# For darken() - this needs manual review
grep -r "darken(" ./src --include="*.scss"