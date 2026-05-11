function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">

        <h1>Modernizing the Job Search Experience</h1>

        <p>
          Search thousands of jobs from top companies and find the role that fits your career.
        </p>

        <div className="hero-search-box">
          <span className="search-icon">🔍</span>
          <input placeholder="Search jobs, skills, companies..." />
          <button>Search</button>
        </div>

        <div className="tags">
          <span>#React</span>
          <span>#Node.js</span>
          <span>#Remote</span>
          <span>#UIUX</span>
          <span>#Internship</span>
        </div>

      </div>

    </section>
  );
}
export default Hero;