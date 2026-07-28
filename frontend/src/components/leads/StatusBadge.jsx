import "./StatusBadge.css";

const StatusBadge = ({ status }) => {

  return (
    <span className={`status ${status.toLowerCase().replace(/\s/g,"-")}`}>
      {status}
    </span>
  );

};

export default StatusBadge;