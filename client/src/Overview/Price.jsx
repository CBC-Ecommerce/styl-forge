import React from 'react';

export default function Price({ selectedStyle }) {
  const price = selectedStyle.original_price;
  const salePrice = selectedStyle.sale_price;

  return (
    <div className="price" data-testid="price">
      {salePrice ? (
        <>
          <div className="sale-price">
            Sale: $
            { salePrice }
          </div>
          <div className="original-price">
            $
            { price }
          </div>
        </>
      ) : (
        <div className="unsale-price">
          $
          { price }
        </div>
      )}
    </div>
  );
}
