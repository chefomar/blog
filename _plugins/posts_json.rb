module Jekyll
    require 'json'

    class PageWithoutAFile < Page
        # rubocop:disable Naming/MemoizedInstanceVariableName
        def read_yaml(*)
          @data ||= {}
        end
        # rubocop:enable Naming/MemoizedInstanceVariableName
    end

    class PostsJSONGenerator < Generator
        safe true
        priority :lowest

        MINIFY_REGEX = %r!(?<=>\n|})\s+!.freeze

        def source_path(file = "posts.json")
            File.expand_path "./#{file}", __dir__
        end

        def generate(site)
            postsMap = {
                "posts" => Array.new
            }

            site.posts.docs.each do |post|
                postsMap["posts"] << {
                    "title" => post.title,
                    "summary" => post.excerpt
                }
            end

            postsJSON = PageWithoutAFile.new(site, __dir__, "", "posts.json")
            postsJSON.content = File.read(source_path).gsub(MINIFY_REGEX, "")
            postsJSON.data["posts"] = postsMap.to_json
            site.pages << postsJSON
        end
    end
end