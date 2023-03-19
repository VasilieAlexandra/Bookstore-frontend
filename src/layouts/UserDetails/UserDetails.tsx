import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import React, { createRef, useEffect, useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { useAuth } from "../../provider/AuthProvider";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from "@mui/material/TextField";

import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

interface UserData {
  displayName?: string | null,
  photoUrl?: string | null
}

export const UserDetails = () => {

  const { user, updateUser } = useAuth();
  const [userData, setUserData] = useState<UserData>({ displayName: user?.displayName, photoUrl: user?.photoURL });
  
  useEffect(() => {
    async function getData() {
        console.log( user?.photoURL);
    }
    getData();
}, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.currentTarget.files!.length) {
      setUserData({
        photoUrl: URL.createObjectURL(e.currentTarget.files![0]),
      });
console.log(e.currentTarget.value);
    }

  };
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserData({
      ...userData,
      [e.currentTarget.name]: e.currentTarget.value
    });
    console.log(e.currentTarget);
  };

  //   const handleUpload = async e => {
  //     e.preventDefault();
  //     const formData = new FormData();
  //     formData.append("image", image.raw);

  //     await fetch("YOUR_URL", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "multipart/form-data"
  //       },
  //       body: formData
  //     });
  //   };

  return (
    <div className="d-flex row justify-content-between mt-5">
      <label htmlFor="upload-button">
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <AddCircleIcon />
          }
        >
          <Avatar
            src={userData.photoUrl!}
            sx={{ width: 100, height: 100 }} />
        </Badge>

      </label>
      <input
        type="file"
        name="photoUrl"
        id="upload-button"
        style={{ display: "none" }}
        onChange={handleChange}
        //defaultValue={userData.photoUrl!}
      />
      <TextField name="displayName" id="outlined-basic" defaultValue={userData.displayName}
        label="username" variant="outlined" onChange={handleTextChange} />
      <TextField name="email" id="outlined-basic" defaultValue={user?.email}
        label="email" variant="standard" disabled />
      <div className="d-flex justify-content-end">
        <Button className="" size="small" onClick={() => { updateUser(user!, userData) }}>Save</Button>
      </div>
      <Divider />
    </div>
  );
}

