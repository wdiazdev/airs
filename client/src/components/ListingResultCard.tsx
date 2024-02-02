import React from 'react'
import { CreateListingFormData } from '../types'
import { formatCurrency } from '../utils/FormatCurrency'
import { Link } from 'react-router-dom'

interface Props {
  cardData: CreateListingFormData
}

const ListingResultCard = ({ cardData }: Props) => {
  return (
    <>
      <Link to={`/listing/${cardData._id}`}>
        <div
          className="w-[300px] h-[400px] border rounded-lg overflow-hidden
        bg-white shadow-md"
        >
          <img
            src={cardData.imageUrls[0]}
            alt="card image"
            className="w-full h-[200px] object-cover rounded-t-lg"
          />
          <div className="mt-2 flex flex-col gap-2 p-2">
            <h3 className="font-semibold">{cardData.address}</h3>
            <p className="whitespace-nowrap overflow-hidden overflow-ellipsis">
              {cardData.description}
            </p>
            <p>{formatCurrency(cardData.price)}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <span className="font-semibold">{cardData.bedrooms}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold">{cardData.bathrooms}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default ListingResultCard
