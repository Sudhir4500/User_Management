// components/Pagination.jsx
const Pagination = ({ page, setPage }) => (
  <div className="join mt-4">
    <button className="join-item btn" onClick={() => setPage((p) => Math.max(p - 1, 1))}>← Prev</button>
    {[1, 2, 3, 4, 5].map((num) => (
      <button key={num} className={`join-item btn ${page === num ? "btn-active" : ""}`} onClick={() => setPage(num)}>
        {num}
      </button>
    ))}
    <button className="join-item btn" onClick={() => setPage((p) => p + 1)}>Next →</button>
  </div>
);

export default Pagination;