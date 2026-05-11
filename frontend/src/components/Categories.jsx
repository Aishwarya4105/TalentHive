import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Software Development", icon: "💻" },
  { name: "Data Science", icon: "📊" },
  { name: "UI/UX Design", icon: "🎨" },
  { name: "Marketing", icon: "📢" },
  { name: "Finance", icon: "💰" },
  { name: "Sales", icon: "📈" },
  { name: "Customer Support", icon: "🎧" },
  { name: "Human Resources", icon: "👥" }
];

function Categories() {
  const navigate = useNavigate();

  return (
    <div className="categories-section">

      <div className="section-header">
        <h2>Explore Categories</h2>
        <p>Find jobs by category</p>
      </div>

      <div className="categories-grid">
        {categories.map((cat, index) => (
          
          <div
            key={index}
            className="category-card"
            onClick={() =>
              navigate(`/jobs?search=${encodeURIComponent(cat.name)}`)
            }
          >

            <div className="cat-icon">{cat.icon}</div>

            <h3>{cat.name}</h3>
<p className="cat-sub">Explore roles</p>

          </div>

        ))}
      </div>

    </div>
  );
}

export default Categories;