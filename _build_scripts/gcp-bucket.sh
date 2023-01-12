# unpack secrets
openssl aes-256-cbc -K $encrypted_617a65259523_key -iv $encrypted_617a65259523_iv -in key.master.json.enc -out key.master.json -d

# Install gcloud
gcloud version || true
if [ ! -d "$HOME/google-cloud-sdk/bin" ]; then rm -rf $HOME/google-cloud-sdk; export CLOUDSDK_CORE_DISABLE_PROMPTS=1; curl https://sdk.cloud.google.com | bash; fi
echo "LOAD SOURCE"
source /home/travis/google-cloud-sdk/path.bash.inc
gcloud version
gcloud auth activate-service-account --key-file key.master.json
rm key.master.json

# set project
gcloud config set project "$GS_PROJECT"

# rm everything
gsutil -m rm -r gs://$GS_BUCKET_WEAVIATE_IO/**

# cd into assets dir
cd build/

# copy stuff
gsutil -m cp -r ./ gs://$GS_BUCKET_WEAVIATE_IO/

# Invalidate the CDN
gcloud compute url-maps invalidate-cdn-cache "weaviate-io" --path "/*" --async

# Send sitemap to Google
curl https://www.google.com/ping?sitemap=https://weaviate.io/sitemap.xml

# back to root
cd ..