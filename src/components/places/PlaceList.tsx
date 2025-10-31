import React from "react";
import {PlaceItem} from "./PlaceItem";
import {Place} from "../../types";

interface Props {
    places: Place[];
    onEdit: (place: Place) => void;
    onDelete: (id: string) => void;
}

export const PlaceList: React.FC<Props> = ({places, onEdit, onDelete}) => {
    if (places.length === 0) return <p>Ще немає місць у цій подорожі.</p>;

    return (
        <div>
            {places.map((place) => (
                <PlaceItem
                    key={place.id}
                    place={place}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

