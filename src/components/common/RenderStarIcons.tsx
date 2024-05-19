import React from 'react';
import { ReactComponent as StarIcon } from "../../assets/star.svg";
import { ReactComponent as HalfStarIcon } from "../../assets/halfStar.svg";

interface IRenderStartIcons {
  starCount: number;
}

const RenderStarIcons: React.FC<IRenderStartIcons> = ({ starCount }) => {
  const stars = Math.floor(starCount);
  const hasHalfStar = starCount % 1 !== 0;
  const starIcons = [];

  for (let i = 0; i < stars; i++) {
    starIcons.push(
      <StarIcon key={i} className='lg:w-5 lg:h-5 h-3 w-3 translate-y-[-1px]' />
    );
  }

  if (hasHalfStar) {
    starIcons.push(
      <HalfStarIcon
        key="half-star"
        className="lg:w-5 lg:h-5 h-3 w-3 translate-y-[-1px]"
      />
    );
  }

  return <div className='flex pr-2'>{starIcons}</div>;
};

export default RenderStarIcons;
