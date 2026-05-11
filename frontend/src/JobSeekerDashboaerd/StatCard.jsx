import { FaFileAlt, FaHeart, FaCalendarAlt, FaEye } from "react-icons/fa";

function StatCard({ type, value }) {

const data = {
applied: { icon: <FaFileAlt />, title: "Jobs Applied" },
saved: { icon: <FaHeart />, title: "Saved Jobs" },
interviews: { icon: <FaCalendarAlt />, title: "Interviews Scheduled" },
views: { icon: <FaEye />, title: "Available Jobs" },
};

return (

<div className="stat">

<div className="stat-card ">
<span className="icon">{data[type].icon}</span>
<h4>{data[type].title}</h4>
<h2>{value}</h2>
</div>


</div>

);

}

export default StatCard;