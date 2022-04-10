import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap"
import type { ITool } from '../../data/tech/tools/type'

export const ToolBadge: React.FC<{ tool: ITool, projectId: string }> = ({ tool, projectId }) => (
  <OverlayTrigger
    placement="top"
    overlay={<Tooltip id={`${projectId}:${tool.id}`}>{tool.description}</Tooltip>}
  >
    <Badge
      pill
      style={{
        color: tool.color,
        backgroundColor: tool.bgColor,
        fontSize: `0.9rem`,
        marginLeft: `3px`,
        height: `22.2px`,
        fontFamily: `"Roboto Mono"`,
      }}
    >
      {tool.devicon ?
        <i className={`devicon-${tool.devicon}`} /> :
        tool.iconPng ?
          <GatsbyImage
            image={getImage(tool.iconPng)}
            alt={`${tool.name} icon`}
          />
          : null
      } {tool.name}
    </Badge>
  </OverlayTrigger>
)