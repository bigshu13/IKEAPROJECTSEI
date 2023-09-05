export default function FavoriteItem({ favorites, activeFavorites, handleFavoriteItem }) {
    const favoriteItems = favorites.map(f =>
      <FavoriteItem
        favorite={f}
        isSelected={f === activeFavorites}
        handleFavoriteItem={handleFavoriteItem}
        key={f._id}
      />
    );
    
    return (
      <main className={styles.FavoriteItem}>
        {favoriteItems.length ?
          favoriteItems
          :
          <span className={styles.noFavorites}>No Favorites</span>
        }
      </main>
    );
    }