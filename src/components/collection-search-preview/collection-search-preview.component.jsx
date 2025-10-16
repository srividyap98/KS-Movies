import React from 'react';

import './collection-search-preview.styles.scss';
import CollectionItem from '../collection-item/collection-item.component';

const CollectionSearchPreview = ({ searchTerm, genreTerm, collections }) => (
    <div className='collection-search-preview'>
        {
            (() => {

                let filtered = collections


                if (genreTerm == "All") {
                    filtered = collections
                } else {
                    filtered = collections.filter((movie) => {
                        return movie["Genre"].toLowerCase().indexOf(genreTerm.toLowerCase()) >= 0
                    })  
                }

                filtered = filtered.filter((movie) => {
                    return movie["Title"].toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
                })
                

               


                return(filtered.map(({ imdbID, ...otherCollectionProps }) => 
                        <CollectionItem key={imdbID} imdbID={imdbID} {...otherCollectionProps} />
                ))

            })()
        }
    </div>
)

export default CollectionSearchPreview;