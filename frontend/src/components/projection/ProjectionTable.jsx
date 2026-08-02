import "./ProjectionTable.css";
import { projectionTable } from "./projectionData";

const ProjectionTable = () => {
  return (
    <div className="projection-table-container">

      <h3>Projection Summary</h3>

      <table className="projection-table">

        <thead>
          <tr>
            <th>Month</th>
            <th>Target</th>
            <th>Forecast</th>
            <th>Achievement</th>
          </tr>
        </thead>

        <tbody>

          {projectionTable.map((item)=>(

            <tr key={item.id}>

              <td>{item.month}</td>

              <td>{item.target}</td>

              <td>{item.forecast}</td>

              <td>

                <span className="achievement">

                  {item.achievement}

                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default ProjectionTable;