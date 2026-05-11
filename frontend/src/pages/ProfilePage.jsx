import ProfileCompletion from "./ProfileCompletion";
import RecruiterProfile from "./RecruiterProfile";

export default function ProfilePage() {
  const role = localStorage.getItem("role");

  if (role === "employer") {
    return <RecruiterProfile />;
  } else {
    return <ProfileCompletion />;
  }
}