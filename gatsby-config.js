'use strict'

const siteConfig = require("./config")
const siteUrl = `https://blog.tomosia.com`
module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    url: siteConfig.url,
    title: siteConfig.title,
    tagline: siteConfig.tagline,
    description: `A blog template for web developers that's ready to go out of the box. Feel free to modify it to your liking.`,
    author: siteConfig.author.name,
    contacts: {
      linkedin: siteConfig.author.contacts.linkedin,
      github: siteConfig.author.contacts.github,
      stackoverflow: siteConfig.author.contacts.stackoverflow,
      freecodecamp: siteConfig.author.contacts.freecodecamp,
      twitter: siteConfig.author.contacts.twitter,
      facebook: siteConfig.author.contacts.facebook
    },
    labels: siteConfig.labels,
    siteUrl: siteUrl,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-cname`,
    {
      "resolve": "gatsby-plugin-excerpts",
      "options": {
        "sources": {
          "snippetBlocks": {
            "type": "htmlQuery",
            "sourceField": "html",
            "excerptSelector": ".custom-block.snippet .custom-block-body",
            "stripSelector": "a",
            "elementReplacements": [
              {
                "selector": "h6",
                "replaceWith": "strong"
              },
              {
                "selector": "h5",
                "replaceWith": "h6"
              },
              {
                "selector": "h4",
                "replaceWith": "h5"
              },
              {
                "selector": "h3",
                "replaceWith": "h4"
              },
              {
                "selector": "h2",
                "replaceWith": "h3"
              },
            ],
          },
          "default": {
            "type": "htmlQuery",
            "sourceField": "html",
            "excerptSelector": "html > *",
            "ignoreSelector": "img, .gatsby-highlight",
            "stripSelector": "a",
            "elementReplacements": [
              {
                "selector": "h6",
                "replaceWith": "strong"
              },
              {
                "selector": "h5",
                "replaceWith": "h6"
              },
              {
                "selector": "h4",
                "replaceWith": "h5"
              },
              {
                "selector": "h3",
                "replaceWith": "h4"
              },
              {
                "selector": "h2",
                "replaceWith": "h3"
              },
            ],
            "truncate": {
              "length": 50, // unit: words
              "byWords": true,
              "ellipsis": "…"
            },
          }
        },
        "sourceSets": {
          "markdownHtml": [
            "snippetBlocks",
            "default"
          ]
        },
        "excerpts": {
          "snippet": {
            "type": "html",
            "nodeTypeSourceSet": {
              "MarkdownRemark": "markdownHtml"
            }
          }
        }
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        includePaths: ['stylesheets'],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/posts`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        commonmark: true,
        footnotes: true,
        pedantic: true,
        gfm: true,
        plugins: [
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`
            }
          },
          {
            resolve: `gatsby-remark-custom-blocks`,
            options: {
              blocks: {
                snippet: {
                  classes: "snippet"
                },
                image_caption: {
                  classes: "image-caption",
                  title: "optional"
                },
                author: {
                  classes: "author",
                  title: "required"
                }
              },
            },
          },
          `gatsby-remark-mermaid`,
          `gatsby-remark-reading-time`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: false,
            }
          }, `gatsby-remark-responsive-iframe`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 700,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          'Quicksand\:500,600,700',
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-gitalk`,
      options: {
        config: {
          clientID: siteConfig.gitalk.clientID,
          clientSecret: siteConfig.gitalk.clientSecret,
          repo: 'tomoblo',
          owner: 'TOMOSIA-VIETNAM',
          admin: ['anhnguyen1tomosia'],
          distractionFreeMode: true
        }
      }
    },
    {
      resolve: `gatsby-plugin-json-output`,
      options: {
        siteUrl: siteUrl,
        graphQLQuery: `
          {
            allMarkdownRemark(
              limit: 10
              sort: { fields: [frontmatter___date], order: DESC }
            ) {
              edges {
                node {
                  excerpt
                  html
                  fields { slug }
                  frontmatter {
                    title
                    date(formatString: "YYYY.MM.DD")
                  }
                }
              }
            }
          }
        `,
        serializeFeed: results => results.data.allMarkdownRemark.edges.map(({ node }) => ({
          id: node.fields.slug,
          url: siteUrl + node.fields.slug,
          title: node.frontmatter.title,
          date_published: node.frontmatter.date,
          excerpt: node.excerpt
        }))
      }
    }
  ]
}
