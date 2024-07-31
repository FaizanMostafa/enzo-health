// TagComponent.tsx
import React from 'react';
import { tagsColor } from '../data';

interface TagComponentProps {
  tag: string;
}

const TagComponent: React.FC<TagComponentProps> = ({ tag }) => {
  const tagStyle = tagsColor[tag] || tagsColor.science; // Fallback to science if tag not found

  return (
    <span 
      className={tagStyle.badge}
      style={{
        color: tagStyle.textColor,
        backgroundColor: tagStyle.bgColor,
        borderColor: tagStyle.borderColor,
        borderWidth: '1px',
        borderStyle: 'solid'
      }}
    >
      {tag}
    </span>
  );
};

export default TagComponent;