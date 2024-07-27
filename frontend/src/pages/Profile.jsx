import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";
import { BACKEND_URL } from "../config";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState();
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({});
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.log(error);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(
        `${BACKEND_URL}/api/user/update/${currentUser?.id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `${BACKEND_URL}/api/user/delete/${currentUser?.id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      localStorage.setItem("token", "");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      localStorage.setItem("token", "");
      dispatch(signOutUserSuccess());
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto mb-16">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          onChange={(e) => {
            const selectedFile = e.target.files?.[0];
            if (selectedFile) {
              setFile(selectedFile);
            }
          }}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />

        <div
          className="relative self-center mt-2 cursor-pointer"
          onClick={() => fileRef.current?.click()}
        >
          <img
            src={formData.avatar || currentUser?.avatar}
            alt="profile"
            className="rounded-full h-32 w-32 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 p-4">
            <span className="text-white text-sm text-center">
              Click to upload new profile picture
            </span>
          </div>
        </div>

        <p className="text-sm self-center font-medium">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
          defaultValue={currentUser?.username}
        />
        <input
          type="email"
          placeholder="email"
          defaultValue={currentUser?.email}
          onChange={handleChange}
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          onChange={handleChange}
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 mt-3 font-medium"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between">
        <span
          className="text-red-700 cursor-pointer hover:underline font-medium"
          onClick={handleDeleteUser}
        >
          Delete account
        </span>
        <span
          onClick={handleSignOut}
          className="text-red-700 cursor-pointer hover:underline font-medium"
        >
          Sign out
        </span>
      </div>

      <p className="text-red-700 mt-5 text-center font-semibold">
        {error ? error : ""}
      </p>

      <p className="text-green-700 mt-5 text-center font-semibold">
        {updateSuccess ? "User is updated successfully!" : ""}
      </p>
    </div>
  );
}
