import Image from 'next/image';

interface PaymentCardProps {
  type: string;
}

const PaymentCard = ({ type }: PaymentCardProps) => {
  const getCardImage = (type: string) => {
    return `/placeholder.svg?height=30&width=50&text=${type}`;
  };

  return (
    <div className="relative w-[50px] h-[30px]">
      <Image
        src={getCardImage(type)}
        alt={`${type} card`}
        fill
        sizes="50px"
        className="object-contain"
      />
    </div>
  );
};

export default PaymentCard;
