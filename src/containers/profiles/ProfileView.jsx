import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Spinner,
  Pane,
  Button,
  toaster,
  Dialog,
} from 'evergreen-ui';
import { FirebaseContext, Users } from '../../Firebase';
import TextField from '../../components/TextField';
import '../../App.css';

const Profiles = () => {
  const { user } = useContext(FirebaseContext);
  const [profile, setProfile] = useState({});
  const [isShown, setIsShown] = useState(false);
  const [name, setName] = useState('');
  const { key } = useParams();

  const navigate = useNavigate();

  const handleNameUpdate = () => {
    Users.updateOrDestroyProfile({ ...profile, created_at: Date.now().toString(), name }, key)
      .then(() => {
        toaster.success('Name updated successfully');
      })
      .catch(() => {
        toaster.warning('Something went wrong');
      });
  };

  const handleDelete = () => {
    setIsShown(false);
    Promise.all([Users.updateOrDestroyProfile(null, key), Users.deleteUser(user)])
      .then(() => {
        navigate('/logout');
      })
      .catch(() => {
        toaster.warning('Something went wrong');
      });
  };

  useEffect(() => {
    const unsubscribeProfile = Users.getProfile(key, (snapshot) => {
      const profileData = snapshot.val();
      if (profileData) {
        setName(profileData.name);
        setProfile(profileData);
      } else {
        toaster.warning('Profile not found or deleted');
      }
    });
    return () => {
      if (unsubscribeProfile) {
        unsubscribeProfile();
      }
    };
  }, [key]);

  if (!user || !profile?.name) return <Spinner marginX="auto" marginTop="50px" />;

  return (
    <div className="main-container">
      <div className="todos-list-container">
        <Pane
          className="profile-data"
          elevation={1}
          background="white"
          padding={5}
        >
          <TextField
            id="name-field"
            value={name}
            setValue={setName}
            type="text"
            onSubmit={handleNameUpdate}
            label="Type Name and submit to update"
          />

          <p>{profile.email}</p>

          {user?.email === profile.email
            && (

              <Pane>
                <Dialog
                  isShown={isShown}
                  title="Delete Account"
                  intent="danger"
                  onCloseComplete={() => setIsShown(false)}
                  confirmLabel="Delete"
                  onConfirm={handleDelete}
                >
                  Are you sure you want to delete your account?
                </Dialog>

                <Button id="delete-button" textAlign="center" onClick={() => setIsShown(true)}>Delete Account</Button>
              </Pane>

            )}
        </Pane>
      </div>
    </div>
  );
};

export default Profiles;
