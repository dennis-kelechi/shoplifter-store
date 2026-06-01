const SkeletonCard = () => (
  <div className="life" style={{ animation: 'pulse 1.5s infinite' }}>
    <div style={{ height: '220px', background: '#e2e8f0', borderRadius: '16px' }} />
    <div style={{ height: '1.2rem', width: '70%', background: '#e2e8f0', marginTop: '16px', borderRadius: '8px' }} />
    <div style={{ height: '0.8rem', width: '40%', background: '#e2e8f0', marginTop: '8px', borderRadius: '8px' }} />
    <div style={{ height: '2rem', width: '50%', background: '#e2e8f0', marginTop: '12px', borderRadius: '8px' }} />
  </div>
);
export default SkeletonCard;