import Dashboard from "../components/Dashboard";
import { Plus } from "lucide-react";
import CategoryList from "../components/CategoryList";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm";
import { isDuplicateCategory, validateCategory } from "../util/validation";
import toast from "react-hot-toast";
import EditCategoryForm from "../components/EditCategoryForm";

const Category = () => {
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategoryDetails = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.CATEGORIES);
      if (response.status === 200) {
        setCategoryData(response.data);
      }
    } catch (error) {
      console.error("Error fetching category details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  const handleAddCategory = async (category) => {
    const error = validateCategory({ category });
    if (error) {
      toast.error(error);
      return;
    }

    if(isDuplicateCategory(categoryData, category)) {
      toast.error("Category already exists.");
      return;
    }

    try {
      setLoading(true);
      const res = await axiosConfig.post(API_ENDPOINTS.CATEGORIES, category);
      if (res.status === 201) {
        toast.success("Category added successfully!");
        setOpenAddCategoryModal(false);
        fetchCategoryDetails();
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onEditCategory = (category) => {
    setSelectedCategory(category);
    setOpenEditCategoryModal(true);    
  };
  
  const handleUpdateCategory = async (category) => { 
        const error = validateCategory({ category });
    if (error) {
      toast.error(error);
      return;
    }

    if(isDuplicateCategory(categoryData, category)) {
      toast.error("Category already exists.");
      return;
    }

    try {
      setLoading(true);
      const res = await axiosConfig.put(`${API_ENDPOINTS.CATEGORIES}/${category.id}`, category);
      if (res.status === 200) {
        toast.success("Category updated successfully!");
        setOpenEditCategoryModal(false);
        fetchCategoryDetails();
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dashboard>
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">All Categories</h2>
          <button
            onClick={() => setOpenAddCategoryModal(true)}
            className="add-btn flex items-center gap-1"
          >
            <Plus size={15} />
            Add Category
          </button>
        </div>

        <CategoryList
          categories={categoryData}
          onEditCategory={onEditCategory}
        />

        <Modal
          title="Add Category"
          isOpen={openAddCategoryModal}
          onClose={() => setOpenAddCategoryModal(false)}
        >
          <AddCategoryForm onAddCategory={handleAddCategory} isLoading={loading} />
        </Modal>

        <Modal
          title="Update Category"
          isOpen={openEditCategoryModal}
          onClose={() => setOpenEditCategoryModal(false)}
        >
          <EditCategoryForm
            category={selectedCategory}
            setCategory={setSelectedCategory}
            onUpdateCategory={handleUpdateCategory}
            isLoading={loading}
          />
        </Modal>
      </div>
    </Dashboard>
  );
};

export default Category;
