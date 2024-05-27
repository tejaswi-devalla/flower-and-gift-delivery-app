import { Link } from "react-router-dom";

import {
  ProductContainer,
  ProductName,
  ProductPrice,
  ProductImage,
  ProductContentCont,
  Button,
  ButtonContainer,
} from "./styledComponents";

const AdminProductItem = ({
  id,
  name,

  price,
  img,
  handleDeleteProduct,
}) => {
  const handleDelete = async () => {
    handleDeleteProduct(id);
  };

  return (
    <ProductContainer>
      <ProductImage src={img} alt={name} style={{ width: "100%" }} />
      <ProductContentCont>
        <ProductName>{name}</ProductName>
        <ProductPrice>${price}</ProductPrice>
        <ButtonContainer>
          <Link to={`/admin/product-update/${id}`} className="btn btn-primary">
            Update
          </Link>
          <Button onClick={handleDelete} className="btn btn-danger">
            Delete
          </Button>
        </ButtonContainer>
        {/* <div>
        <label>Quantity: </label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div> */}
      </ProductContentCont>
    </ProductContainer>
  );
};

export default AdminProductItem;
