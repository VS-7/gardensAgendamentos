// CSS
import styles from "./Publication.module.css"; // Assegure-se de criar e importar este arquivo CSS

// Hooks
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments"; // Utilize ou adapte seu hook para buscar os documentos

// Components
import PostDetail from "../../components/PostDetail";

import { FaGear } from "react-icons/fa6"; // Importe o ícone de configuração

const Publication = () => {
  const [query, setQuery] = useState();
  const { documents: posts, loading: loadingPosts } = useFetchDocuments("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className={styles.publication}>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input className={styles.input} type="text" placeholder="Busque por tags..." onChange={(e) => setQuery(e.target.value)} />
        <button className={styles.btnSearch}>Pesquisar</button>
      </form>
      <div>
        <h3 className={styles.h3}>Publicações</h3>
        {loadingPosts && <p>Carregando...</p>}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className={styles.postCreate}>Seja o primeiro a publicar!</Link>
          </div>
        )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Publication;