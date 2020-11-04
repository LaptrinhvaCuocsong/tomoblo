import React from "react";
import { Link, graphql } from "gatsby";
import "../stylesheets/application.scss";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Sidebar from "../components/sidebar/Sidebar";
import TechTag from "../components/tags/TechTag";
import { excerpt } from '../utils/common.js';

const PostList = props => {
  const posts = props.data.allMarkdownRemark.edges;
  const labels = props.data.site.siteMetadata.labels;
  const { currentPage, numPages } = props.pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? "/" : `/${currentPage - 1}`;
  const nextPage = `/${currentPage + 1}`;

  const getTechTags = tags => {
    const techTags = [];
    tags.forEach((tag, i) => {
      labels.forEach(label => {
        if (tag === label.tag) {
          techTags.push(
            <TechTag
              key={i}
              tag={label.tag}
              tech={label.tech}
              name={label.name}
              size={label.size}
              color={label.color}
            />
          );
        }
      });
    });
    return techTags;
  };

  return (
    <Layout>
      <SEO
        title="Home"
        keywords={[
          `gatsby`,
          `javascript`,
          `react`,
          `web development`,
          `blog`,
          `graphql`
        ]}
      />
      <div className="index-main">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="post-list-main">
          {posts.map(post => {
            const tags = post.node.frontmatter.tags;
            return (
              <div key={post.node.id} className="container mt-5">
                <Link to={post.node.fields.slug} className="text-dark">
                  <h2 className="title">{post.node.frontmatter.title}</h2>
                </Link>

                <small className="d-block text-muted reading-time">
                  {post.node.frontmatter.date} <span className="dot">●</span> {post.node.fields.readingTime.text}
                </small>

                <div className="snippet mt-3 d-inline" dangerouslySetInnerHTML={{ __html: excerpt(post) }} />

                <div className="d-block">{getTechTags(tags)}</div>
              </div>
            );
          })}
          <div className="text-center mt-4">
            {!isFirst && (
              <Link to={prevPage} rel="prev" style={{ textDecoration: `none` }}>
                <span className="text-dark">← Trang trước</span>
              </Link>
            )}
            {!isLast && (
              <Link to={nextPage} rel="next" style={{ textDecoration: `none` }}>
                <span className="text-dark ml-5">Trang tiếp theo →</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const listQuery = graphql`
  query paginateQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        author
        labels {
          tag
          tech
          name
          size
          color
        }
      }
    }
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 200)
          snippet
          html
          id
          frontmatter {
            title
            date(formatString: "DD-MM-YYYY")
            tags
          }
          fields {
            slug
            readingTime {
              text
            }
          }
        }
      }
    }
  }
`;

export default PostList;
