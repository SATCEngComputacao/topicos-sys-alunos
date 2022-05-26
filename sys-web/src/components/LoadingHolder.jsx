export default function LoadingHolder({ loading = false, children, ...props }) {
  if (!!loading) {
    return (
      <div className="position-relative" {...props}>
        {children}
        <div
          className="position-absolute top-0 left-0 right-0 bottom-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            minHeight: 390,
            zIndex: 100,
            backgroundColor: "rgba(255, 255, 255, 0.65)",
          }}>
          <div className="spinner-border" style={{ width: 45, height: 45 }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
