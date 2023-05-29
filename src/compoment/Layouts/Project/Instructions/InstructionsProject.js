import React, { useState } from "react";

const InstructionsProject = (props) => {
  const projectProducts = props.projectProducts;
  const literCuve = props.literCuve;

  return (
    <>
      {/* <div className="blocRightView">
        <div className="instructionViewProject">
          <p>Dans mon Bac j'ai :</p>
          {projectProducts.map((product) => (
            <div key={product.id}>
              <p>{product.name_living}</p>
              <p>Nombre pour composer un banc : {product.number_min}</p>
              <p>
                Maximum possible dans votre bac :
                {Math.round(
                  ((literCuve / product.liter_min) * product.number_max) / 4
                ) * product.number_max}
              </p>
              <p>literCuve :{literCuve}</p>
              <p>product.liter_min :{product.liter_min}</p>
              <p>product.number_max :{product.number_max}</p>
              <p>product.number_min :{product.number_min}</p>
              <p>product.living_quantity :{product.living_quantity}</p>
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
};
export default InstructionsProject;
