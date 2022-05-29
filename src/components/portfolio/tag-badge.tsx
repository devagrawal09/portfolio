import React from "react"
import { Badge } from "react-bootstrap"
import { ITag } from "../../data/blog/type"

export const TagBadge: React.FC<{ tag: ITag }> = ({ tag }) => (
  <Badge
    style={{
      color: tag.color,
      backgroundColor: tag.bgColor,
      marginRight: `3px`,
      fontFamily: `"Roboto Mono"`,
    }}
  >
    {tag.name}
  </Badge>
)
