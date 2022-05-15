require 'html-proofer'

task :test do
    options = {
        :ignore_status_codes => [429],
        :allow_hash_href => true,
        :assume_extension => true,
        :empty_alt_ignore => ['/.*/'],
        :internal_domains => ['weaviate.io'],
        # codepen is behind a browser detection screen so cURL will not work
        :url_ignore => [/codepen.io/, /linkedin.com/, /twitter.com/, /t.co/, /arxiv.org/, /semi-technologies\/weaviate-io\/tree/],
        :typhoeus => {
          :connecttimeout => 20,
          :timeout => 60,
          # avoid strange SSL errors: https://github.com/gjtorikian/html-proofer/issues/376
          :ssl_verifypeer => false,
          :ssl_verifyhost => 0
        }
    }
    HTMLProofer.check_directory("./_site", options).run
end