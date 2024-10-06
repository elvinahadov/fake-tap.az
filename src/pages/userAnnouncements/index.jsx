import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [user, setUser] = useState({});
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
        alert("Announcement deleted successfully.");
      } else {
        console.error("Failed to delete announcement.");
      }
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">{`${user.name}'s Announcements`}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="p-4 border border-gray-300 rounded shadow-md"
            >
              <img
                src={announcement.imageUrl}
                className="w-full object-center object-contain h-48"
                alt={announcement.title}
              />
              <h3 className="text-lg font-semibold">{announcement.title}</h3>
              <p className="mt-2 overflow-hidden">{announcement.description}</p>
              <p className="mt-2 text-gray-500">
                Location: {announcement.location}
              </p>
              <div className="flex items-center justify-between">
                <p className="mt-2 font-bold">Price: {announcement.price} ₼</p>
                <button
                  onClick={() => handleDelete(announcement.id)}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Delete Announcement
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No announcements found.</p>
        )}
      </div>
    </div>
  );
};

export default UserAnnouncements;
