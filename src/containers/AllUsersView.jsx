import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'evergreen-ui';
import { Users } from '../Firebase';
import '../App.css';

const AllUsersView = () => {
  const [profiles, setProfiles] = useState([]);

  const getDate = (date) => date && new Date(parseInt(date, 10)).getDate();

  useEffect(() => {
    const unsubscribeTodoList = Users.getProfile(null, (snapshot) => {
      if (snapshot.val()) {
        const data = Object.entries(snapshot.val());
        const listOfUsers = data.map(([key, item]) => ({ key, ...item }));
        setProfiles(listOfUsers.sort((a, b) => b.created_at - a.created_at));
      } else {
        setProfiles([]);
      }
    });
    return () => {
      if (unsubscribeTodoList) {
        unsubscribeTodoList();
      }
    };
  }, []);

  return (
    <div className="main-container">
      <div className="todos-list-container">
        <Table>
          <Table.Head>
            <Table.TextHeaderCell>NAME</Table.TextHeaderCell>
            <Table.TextHeaderCell>EMAIL</Table.TextHeaderCell>
            <Table.TextHeaderCell>MEMBER SINCE</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body height={240}>
            {profiles.map((profile) => (
              <Table.Row is={Link} key={profile.email} isSelectable to={`/profiles/${profile.key}`}>
                <Table.TextCell>{profile.name}</Table.TextCell>
                <Table.TextCell>{profile.email}</Table.TextCell>
                <Table.TextCell isNumber>{getDate(profile.created_at || '')}</Table.TextCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default AllUsersView;
