import { useCollections } from "../contexts/CollectionsContext";
import CollectionsGridItem from "./CollectionsGridItem";

function CollectionsGrid({ setDeleteItemId, setIsDeleteModalOpened }) {
  const { collections } = useCollections();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {collections?.map((collection) => (
        <CollectionsGridItem
          collection={collection}
          setDeleteItemId={setDeleteItemId}
          setIsDeleteModalOpened={setIsDeleteModalOpened}
          key={collection.id}
        />
      ))}
    </div>
  );
}

export default CollectionsGrid;
