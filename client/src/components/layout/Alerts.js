import React, { useContext } from "react";
import alertContext from "../../context/alert/alertContext";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Alerts = () => {
  const { alerts } = useContext(alertContext);

  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <AiOutlineInfoCircle /> {alert.msg}
      </div>
    ))
  );
};

export default Alerts;
