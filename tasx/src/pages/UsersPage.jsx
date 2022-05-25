import React from "react";

import { Table } from "antd";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../firebase/config";
import PageLayout from "../components/PageLayout";

function UsersPage() {
  const usersRef = firestore.collection("users");
  const usersQuery = usersRef;
  const [users] = useCollectionData(usersQuery, { idField: "id" });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },

    {
      title: "Action",
      render: (text, user) => {
        return <div></div>;
      },
    },
  ];

  return (
    <PageLayout>
      <Table columns={columns} dataSource={users} />
    </PageLayout>
  );
}

export default UsersPage;
