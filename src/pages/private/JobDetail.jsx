import { useParams } from "react-router-dom";
import PagePlaceholder from "../../components/PagePlaceholder";

function JobDetail() {
  const { id } = useParams();

  return (
    <PagePlaceholder
      title={`Detalle del empleo ${id}`}
      description="Información completa de la vacante y opción para postularse."
    />
  );
}

export default JobDetail;