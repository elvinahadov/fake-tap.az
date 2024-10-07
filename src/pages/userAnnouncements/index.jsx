import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [user, setUser] = useState({});
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAnnouncements = () => {
      if (!userEmail) {
        alert("Please log in to view your announcements.");
        navigate("/login");
        return;
      }

      const fetchUser = async () => {
        try {
          const usersResponse = await fetch("http://localhost:3001/users");
          const usersData = await usersResponse.json();

          const currentUser = usersData.find(
            (user) => user.email === userEmail
          );

          if (currentUser) {
            setUser(currentUser);

            const userId = currentUser.id;
            const announcementsResponse = await fetch(
              `http://localhost:3001/announcements?userId=${userId}`
            );
            const announcementsData = await announcementsResponse.json();

            setAnnouncements(announcementsData);
          } else {
            console.error("User not found");
          }
        } catch (error) {
          console.error("Error fetching announcements:", error);
        }
      };

      fetchUser();
    };

    fetchUserAnnouncements();
  }, [userEmail]);

  const handleDelete = async (announcementId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/announcements/${announcementId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setAnnouncements((prevAnnouncements) =>
          prevAnnouncements.filter(
            (announcement) => announcement.id !== announcementId
          )
        );
      } else {
        console.error("Failed to delete announcement.");
      }
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  const handleEditClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedAnnouncement(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const updatedAnnouncement = {
      ...selectedAnnouncement,
      title: e.target.title.value,
      description: e.target.description.value,
      price: e.target.price.value,
      location: e.target.location.value,
      contactEmail: e.target.contactEmail.value,
      contactPhone: e.target.contactPhone.value,
    };

    try {
      const response = await fetch(
        `http://localhost:3001/announcements/${selectedAnnouncement.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedAnnouncement),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        setAnnouncements((prevAnnouncements) =>
          prevAnnouncements.map((announcement) =>
            announcement.id === updatedData.id ? updatedData : announcement
          )
        );
        handleModalClose();
        setTimeout(() => {
          toast("Announcement updated successfully!",{type:"success"})
        }, 300);
      } else {
        setTimeout(() => {
          toast("Can not update Announcement!",{type:"error"})
        }, 300);
      }
    } catch (error) {
      setTimeout(() => {
        toast("Can not update Announcement!",{type:"error"})
      }, 300);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">{`${user.name}'s Announcements`}</h2>
      <ToastContainer position="top-center"/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="p-4 border border-gray-300 rounded shadow-md"
            >
              <img
                src={announcement.imageUrl}
                className="w-full object-center object-contain h-48 mb-3"
                alt={announcement.title}
              />
              <h3 className="text-lg font-semibold">{announcement.title}</h3>
              <p className="mt-2 overflow-hidden">{announcement.description}</p>
              <p className="mt-2 text-gray-500">
                Location: {announcement.location}
              </p>
              <p className="mt-2 text-gray-500">
                Contact Email: {announcement.contactEmail}
              </p>
              <p className="mt-2 text-gray-500">
                Contact Phone: {announcement.contactPhone}
              </p>
              <p className="mt-2 font-bold">Price: {announcement.price} ₼</p>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleDelete(announcement.id)}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Delete Announcement
                </button>
                <button
                  onClick={() => handleEditClick(announcement)}
                  className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                >
                  Edit Announcement
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No announcements found.</p>
        )}
      </div>

      {isModalOpen && selectedAnnouncement && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-semibold mb-4">Edit Announcement</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  defaultValue={selectedAnnouncement.title}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  defaultValue={selectedAnnouncement.description}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  defaultValue={selectedAnnouncement.location}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  defaultValue={selectedAnnouncement.price}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="contactEmail"
                  className="block text-sm font-medium"
                >
                  Contact Info
                </label>
                <input
                  type="text"
                  id="contactEmail"
                  defaultValue={selectedAnnouncement.contactEmail}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="contactPhone"
                  className="block text-sm font-medium"
                >
                  Contact Info
                </label>
                <input
                  type="text"
                  id="contactPhone"
                  defaultValue={selectedAnnouncement.contactPhone}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-4 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAnnouncements;
