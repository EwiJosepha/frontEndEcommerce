import "./nav.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Categories() {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/category`);

      return res.data;
    },
  });

  console.log(data);

  const handleselect = (id) => {
    console.log(id);

    const categery = data.find((cat) => cat.categoryId == id);
    console.log(categery.productCategory);
  };

  return (
    <>
      <select id="cat" onChange={(e) => handleselect(e.target.value)}>
        {data?.map((categories, index) => (
          <option key={index} value={categories.categoryId}>
            {categories.productCategory}
          </option>
        ))}
      </select>
    </>
  );
}

export default Categories;
