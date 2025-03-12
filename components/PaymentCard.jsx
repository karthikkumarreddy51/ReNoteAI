import Image from 'next/image'

const PaymentCard = ({ type }) => {
  const getCardImage = (type) => {
    return `/placeholder.svg?height=30&width=50&text=${type}`
  }

  return (
    <Image
      src={getCardImage(type)}
      alt={`${type} card`}
      width={50}
      height={30}
      style={{ width: 'auto', height: 'auto' }}
    />
  )
}

export default PaymentCard
