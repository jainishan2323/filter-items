import React from 'react';

export default function itemView(item) {
    return (
        <div className={`item card-level-1 ${item.collectionStatus}`} key={item.tag}>
            <img src={item.src} />
            <div className="item-specs">
                <h3>{item.tag}</h3>
                <p>Created In: {item.createdIn}</p>
            </div>
        </div>
    );
}