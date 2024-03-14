import styles from "./CreatePost.module.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { useUploadDocument } from '../../hooks/useUploadDocument';
import { FiImage, FiLink, FiTag } from 'react-icons/fi';
import { BiFontFamily } from "react-icons/bi";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();
  const navigate = useNavigate();
  const { insertDocument, response } = useInsertDocument("posts");

  const [showTitleInput, setShowTitleInput] = useState(true);
  const [showImageInput, setShowImageInput] = useState(false);
  const [showTagsInput, setShowTagsInput] = useState(false);

  const toggleInputVisibility = (inputType) => {
    switch (inputType) {
      case "title":
        setShowTitleInput(!showTitleInput);
        break;
      case "image":
        setShowImageInput(!showImageInput);
        break;
      case "tags":
        setShowTagsInput(!showTagsInput);
        break;
      default:
        break;
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!title || !body) {
      setFormError("Título e corpo da publicação são obrigatórios.");
      return;
    }

    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase()).filter(tag => tag !== "");

    try {
      const imageUrl = await useUploadDocument(image, "posts");
      await insertDocument({
        title,
        image: imageUrl,
        body,
        tags: tagsArray,
        links: linksArray,
        uid: user.uid,
        createdBy: user.displayName,
      });
      navigate("/");
    } catch (error) {
      setFormError("Erro ao fazer upload da imagem. Tente novamente.");
    }
  };

  return (
    <div className={styles.create_post}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {showTitleInput && (
          <input
            type="text"
            required
            placeholder="Título da publicação"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={styles.input}
          />
        )}
        <textarea
          required
          placeholder="O que anda pesquisando?"
          onChange={(e) => setBody(e.target.value)}
          value={body}
          className={styles.textarea}
        ></textarea>

        <div className={styles.buttons}>
          <button type="button" onClick={() => toggleInputVisibility("title")} className={styles.iconButton}><BiFontFamily /></button>
          <button type="button" onClick={() => toggleInputVisibility("image")} className={styles.iconButton}><FiImage /></button>
          <button type="button" onClick={() => toggleInputVisibility("tags")} className={styles.iconButton}><FiTag /></button>
        </div>

        {showImageInput && (
          <input
            type="file"
            className={styles.fileInput}
            accept="image/*"
            onChange={handleImageChange}
          />
        )}
        {showTagsInput && (
          <input
            type="text"
            placeholder="Insira as tags separadas por vírgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        )}

        {!response.loading && <button type="submit" className={styles.button}>Publicar</button>}
        {response.loading && <button className={styles.button} disabled>Publicando...</button>}
        {(response.error || formError) && <p className={styles.error}>{response.error || formError}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
