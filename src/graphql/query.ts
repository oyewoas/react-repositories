import gql from "graphql-tag";

export const GET_REACT_REPOSITORIES = gql`
  query GetReactRepositories($after: String) {
    search(
      query: "is:public topic:react"
      after: $after
      type: REPOSITORY
      first: 100
    ) {
      pageInfo {
        startCursor
        hasNextPage
        endCursor
      }
      repositoryCount
      edges {
        cursor
        node {
          ... on Repository {
            name
            url
            descriptionHTML
            stargazers {
              totalCount
            }
            forks {
              totalCount
            }
            updatedAt
          }
        }
      }
    }
  }
`;
