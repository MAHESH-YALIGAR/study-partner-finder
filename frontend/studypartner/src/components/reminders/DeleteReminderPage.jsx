import { useParams, useEffect } from "react";
import axios from "axios";

function DeleteReminderPage() {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.delete(`http://localhost:7000/api/reminder/${id}`)
        .then(() => alert("Reminder deleted successfully!"))
        .catch(() => alert("Failed to delete reminder."));
    }
  }, [id]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Processing deletion...</h2>
    </div>
  );
}

export default DeleteReminderPage;
