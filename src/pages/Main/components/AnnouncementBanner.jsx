import { useState, useEffect, useRef } from "react";
import { Bell, Heart, MessageCircle } from "lucide-react";
import axios from "../../../utils/axios";

export default function AnnouncementBanner() {
  const [announcements, setAnnouncements] = useState([]);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState({});
  const [likesCount, setLikesCount] = useState({});
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const lastFetchedId = useRef(null);

  // ✅ Fetch announcements on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/announcements");
        if (res.data?.data) {
          setAnnouncements(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    };
    fetchData();
  }, []);

  // ✅ Auto rotate banner
  useEffect(() => {
    if (announcements.length > 0) {
      const timer = setInterval(() => {
        setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [announcements]);

  // ✅ Current announcement (safe lookup)
  const announcement = announcements[currentAnnouncement] || null;

  // ✅ Fetch comments only when announcement changes
  useEffect(() => {
    const fetchComments = async () => {
      if (!announcement?.id || lastFetchedId.current === announcement.id) return;
      try {
        const res = await axios.get(`/announcements/${announcement.id}/comments`);
        if (res.data?.data) {
          setComments((prev) => ({
            ...prev,
            [announcement.id]: res.data.data,
          }));
          lastFetchedId.current = announcement.id;
        }
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchComments();
  }, [announcement?.id]);

 // ✅ Fetch like status + count
useEffect(() => {
  const fetchLikeStatus = async () => {
    if (!announcement?.id || !user?.id) return;
    try {
      const [statusRes, countRes] = await Promise.all([
        axios.get(`/announcements/${announcement.id}/liked`, {
          params: { userId: user.id },
        }),
        axios.get(`/announcements/${announcement.id}/likes`),
      ]);



     if (statusRes.data?.data?.liked !== undefined) {
       setLiked((prev) => ({
         ...prev,
         [announcement.id]: statusRes.data.data.liked,
       }));
     }

     if (countRes.data?.data?.likesCount !== undefined) {
       setLikesCount((prev) => ({
         ...prev,
         [announcement.id]: countRes.data.data.likesCount,
       }));
     }
    } catch (err) {
      console.error("Error fetching like info:", err);
    }
  };

  fetchLikeStatus();
}, [announcement?.id, user?.id]);


  // ✅ Toggle Like
  const toggleLike = async () => {
    if (!announcement || !user?.id) return;
    try {
      setLoading(true);
      if (liked[announcement.id]) {
        await axios.post(`/announcements/${announcement.id}/unlike`, { userId: user.id });
        setLiked((prev) => ({ ...prev, [announcement.id]: false }));
        setLikesCount((prev) => ({
          ...prev,
          [announcement.id]: (prev[announcement.id] || 1) - 1,
        }));
      } else {
        await axios.post(`/announcements/${announcement.id}/like`, { userId: user.id });
        setLiked((prev) => ({ ...prev, [announcement.id]: true }));
        setLikesCount((prev) => ({
          ...prev,
          [announcement.id]: (prev[announcement.id] || 0) + 1,
        }));
      }
    } catch (err) {
      console.error("Error updating like:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add Comment
  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !announcement) return;

    try {
      const res = await axios.post(`/announcements/${announcement.id}/comment`, {
        comment: newComment,
      });

      if (res.data?.data) {
        setComments((prev) => ({
          ...prev,
          [announcement.id]: [...(prev[announcement.id] || []), res.data.data],
        }));
        setNewComment("");
      }
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const currentComments = announcement ? comments[announcement.id] || [] : [];

  // ✅ If still loading announcements
  if (announcements.length === 0) {
    return (
      <div className="bg-blue-500 text-white p-4 text-center rounded-lg shadow">
        Loading announcements...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 shadow-lg">
      <div className="max-w-4xl mx-auto">
        {/* Banner Info */}
        <div className="flex items-center space-x-3">
          <Bell className="h-5 w-5 animate-pulse flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-lg">{announcement.title}</h3>
            <p className="text-sm opacity-90">{announcement.description}</p>
          </div>
        </div>

        {/* Photo */}
        {announcement.photo && (
          <img
            src={`${import.meta.env.VITE_API_URL}${announcement.photo}`}
            alt={announcement.title}
            className="mt-3 rounded-lg shadow-md max-h-48 object-cover"
          />
        )}

        {/* Actions */}
        <div className="flex items-center space-x-4 mt-4">
          <button
            onClick={toggleLike}
            disabled={loading}
            className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm ${
              liked[announcement.id]
                ? "bg-red-600"
                : "bg-white/20 hover:bg-white/30"
            }`}
          >
            <Heart
              className={`h-4 w-4 ${
                liked[announcement.id] ? "fill-white" : "text-white"
              }`}
            />
            <span>
              {liked[announcement.id] ? "Liked" : "Like"} (
              {likesCount[announcement.id] || 0})
            </span>
          </button>

          <div className="flex items-center space-x-1 text-sm">
            <MessageCircle className="h-4 w-4" />
            <span>{currentComments.length} Comments</span>
          </div>
        </div>

        {/* Comments */}
        <div className="mt-4 bg-white text-gray-800 rounded-lg p-3 max-h-40 overflow-y-auto">
          {currentComments.length > 0 ? (
            currentComments.map((c) => (
              <div key={c.id} className="border-b last:border-0 py-2">
                <p className="text-sm font-medium">{c.user?.name || "User"}</p>
                <p className="text-xs">{c.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-sm italic text-gray-500">No comments yet</p>
          )}
        </div>

        {/* Add Comment */}
        <form onSubmit={handleComment} className="mt-3 flex space-x-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-blue-700 text-white rounded-lg text-sm hover:bg-blue-800"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
