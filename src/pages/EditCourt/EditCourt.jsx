import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUploadDocument } from "../../hooks/useUploadDocument";
import styles from "./EditCourt.module.css";

const EditCourt = () => {
  const { id } = useParams();
  const { document: court, loading } = useFetchDocument("courts", id);
  const { user } = useAuthValue();
  const { updateDocument, response: updateResponse } = useUpdateDocument("courts");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (court) {
      setName(court.name);
      setPrice(court.price.toString());
      setCurrentImage(court.image);
    }
  }, [court]);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    let imageUrl = currentImage;
    if (image) {
      imageUrl = await useUploadDocument(image, "courts");
    }

    const data = {
      name,
      price: parseFloat(price),
      image: imageUrl,
    };

    if (!name || !price) {
      setFormError("Por favor, preencha todos os campos.");
      return;
    }

    await updateDocument(id, data);

    if (!updateResponse.error) {
      navigate("/dashboard"); // Ou qualquer que seja o caminho de redirecionamento desejado
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.editCourt}>
      {court && (
        <>
          <h2>Editando Quadra: {court.name}</h2>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Nome da Quadra:</span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              <span>Preço da Reserva (em R$):</span>
              <input
                type="text"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <label>
              <span>Imagem da Quadra (URL):</span>
              <input
                type="file"
                onChange={handleImageChange}
              />
              {currentImage && (
                <>
                  <p>Preview da imagem atual:</p>
                  <img src={currentImage} alt="Preview da quadra" style={{ maxWidth: "500px", maxHeight: "300px" }} />
                </>
              )}
            </label>
            {!updateResponse.loading && <button className="btn">Salvar Alterações</button>}
            {updateResponse.loading && <button className="btn" disabled>Aguarde...</button>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditCourt;