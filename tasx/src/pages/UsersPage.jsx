import React from "react";

import { Table, Switch, Button } from "antd";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../firebase/config";
import PageLayout from "../components/PageLayout";

function UsersPage() {
  const usersRef = firestore.collection("users");
  const usersQuery = usersRef;
  const [users] = useCollectionData(usersQuery, { idField: "id" });

  const toggleAdmin = (userId, isAdmin) => {
    const userRef = firestore.doc(`/users/${userId}`);
    userRef.update({ isAdmin });
  };

  const deleteUser = (userId) => {
    const userRef = firestore.doc(`/users/${userId}`);
    userRef.delete();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Is admin",
      render: (_, user) => (
        <Switch
          checked={user.isAdmin}
          onChange={(checked) => {
            toggleAdmin(user.id, checked);
          }}
        />
      ),
      width: 200,
    },
    {
      title: "Actions",
      render: (_, user) => (
        <Button
          danger
          onClick={() => {
            deleteUser(user.id);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <PageLayout>
      <Table columns={columns} dataSource={users} />
    </PageLayout>
  );
}

export default UsersPage;
