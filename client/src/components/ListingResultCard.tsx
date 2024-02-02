import { CreateListingFormData } from '../types'
import { formatCurrency } from '../utils/FormatCurrency'
import { Link } from 'react-router-dom'
import { MdBed, MdBathroom, MdLocationOn } from 'react-icons/md'

interface Props {
  cardData: CreateListingFormData
}

const ListingResultCard = ({ cardData }: Props) => {
  const truncatedDescription = cardData.description.slice(0, 100) + '...'
  return (
    <>
      <Link to={`/listing/${cardData._id}`}>
        <div
          className="w-[300px] h-[430px] border rounded-lg overflow-hidden
        bg-white shadow-md hover:scale-105 duration-200 ease-in-out"
        >
          <img
            src={cardData.imageUrls[0]}
            alt="card image"
            className="w-full h-[200px] object-cover rounded-t-lg"
          />
          <div className="mt-2 flex flex-col gap-2 p-2">
            <span>
              {cardData.propertyType.charAt(0).toUpperCase() +
                cardData.propertyType.slice(1)}
              {' - '}
              {cardData.listingType.charAt(0).toUpperCase() +
                cardData.listingType.slice(1)}
            </span>
            <div className="flex items-center gap-1">
              <MdLocationOn className="text-sm sm:text-[18px] text-primary" />
              <h3 className="font-semibold overflow-hidden overflow-ellipsis">
                {cardData.address}
              </h3>
            </div>
            <p className="overflow-hidden overflow-ellipsis">
              {truncatedDescription}
            </p>
            <span className="font-semibold">
              {formatCurrency(cardData.price)}
            </span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <MdBed className="text-sm sm:text-[18px] text-primary" />
                <span className="font-semibold">{cardData.bedrooms}</span>
              </div>
              <div className="flex items-center gap-1">
                <MdBathroom className="text-sm sm:text-[18px] text-primary" />
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
