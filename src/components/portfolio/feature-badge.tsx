import React from "react";
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap"
import type { IFeature } from '../../data/tech/features/type'

export const FeatureBadge: React.FC<{ feature: IFeature, projectId: string }> = ({ feature, projectId }) => (
  <OverlayTrigger
    placement="top"
    overlay={<Tooltip id={`${projectId}:${feature.id}`}>{feature.description}</Tooltip>}
  >
    <Badge
      style={{
        color: feature.color,
        backgroundColor: feature.bgColor,
        fontSize: `0.9rem`,
        marginLeft: `3px`,
        height: `22.2px`,
        fontFamily: `"Roboto Mono"`,
      }}
    >
      {feature.name}
    </Badge>
  </OverlayTrigger>
)