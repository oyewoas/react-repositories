import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_REACT_REPOSITORIES } from "../graphql/query";
import { map } from "lodash/fp";
import { Table, Spin } from "antd";
import { StarTwoTone, ForkOutlined } from "@ant-design/icons";

import styled from "styled-components";

const LoadingSpinnerContainer = styled.div`
  margin: 0 auto;
  padding: 300px;
`;
const PageHeading = styled.h1`
  color: black;
`;
interface ITableData {
  name: string;
  stars: number;
  forks: number;
  url: string;
}

const ReactRepositories: React.FC = () => {
  const { data, error, loading } = useQuery(GET_REACT_REPOSITORIES);
  const [reactRepositories, setReactRepositories] = useState<ITableData[]>([]);
  const paginationProps = {
    pageSizeOptions: ["10", "20"],
    defaultPageSize: 10,
    showSizeChanger: true,
  };

  useEffect(() => {
    if (data) {
      const tableData: ITableData[] = map(
        (repo: any) => ({
          key: repo.node.name,
          name: repo.node.name,
          stars: repo.node.stargazers.totalCount,
          forks: repo.node.forks.totalCount,
          url: repo.node.url,
        }),
        data.search.edges
      );
      setReactRepositories(tableData);
    }
  }, [data]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <a href={record.url} target="_blank" rel="noreferrer" title="name">
          {text}
        </a>
      ),
    },
    {
      title: "Stars",
      dataIndex: "stars",
      key: "stars",
      render: (text: string) => (
        <p title="stars">
          <StarTwoTone twoToneColor="gold" /> {text}
        </p>
      ),
    },
    {
      title: "Forks",
      dataIndex: "forks",
      key: "forks",
      render: (text: string) => (
        <p title="forks">
          <ForkOutlined style={{ color: "grey" }} /> {text}
        </p>
      ),
    },
  ];

  if (error) {
    <p>An Error Occured</p>;
  }
  return (
    <>
      <PageHeading>React Repositories</PageHeading>

      {reactRepositories.length && !loading ? (
        <Table
          columns={columns}
          pagination={paginationProps}
          dataSource={reactRepositories}
        />
      ) : (
        <LoadingSpinnerContainer>
          {" "}
          <Spin size="large" /> Loading...
        </LoadingSpinnerContainer>
      )}
    </>
  );
};

export default ReactRepositories;
