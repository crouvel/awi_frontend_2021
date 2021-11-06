import React from 'react';

import './CategoryIngredientCard.css'


const CategoryIngredientCard = (props) => {
        const {data} = props
        return(
          <>
            <div class="card card-1">
              <div class="card__icon"><i class="fas fa-bolt"></i></div>
              <p class="card__exit"><i class="fas fa-times"></i></p>
              <h2 class="card__title">{data.libellé}</h2>
              <p class="card__apply">
                <a class="card__link" href="#">Apply Now <i class="fas fa-arrow-right"></i></a>
              </p>
            </div>
          </>
        )
}

export {
  CategoryIngredientCard
};

/*
// <div class="card card-1">
              // <div class="card__icon"><i class="fas fa-bolt"></i></div>
              // <p class="card__exit"><i class="fas fa-times"></i></p>
              <h2 class="card__title">{data.libellé}</h2>
              // <p class="card__apply">
                // <a class="card__link" href="#">Apply Now <i class="fas fa-arrow-right"></i></a>
              // </p>
            // </div>
*/