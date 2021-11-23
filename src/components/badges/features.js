import React from "react"
import { Badge } from "react-bootstrap"

const ToolBadge = ({ color, backgroundColor, children }) => (
  <Badge
    style={{
      color,
      backgroundColor,
      fontSize: `0.9rem`,
      marginLeft: `3px`,
      height: `22.2px`,
      fontFamily: `"Roboto Mono"`,
    }}
  >
    {children}
  </Badge>
)

export const DDDBadge = () => (
  <ToolBadge color="white" backgroundColor="#35524A">
    Domain-Driven Design
  </ToolBadge>
)

export const DistributedBadge = () => (
  <ToolBadge color="white" backgroundColor="#627C85">
    Distributed
  </ToolBadge>
)

export const CloudBadge = () => (
  <ToolBadge color="black" backgroundColor="#9C9CDB">
    Multi-Cloud
  </ToolBadge>
)

export const DevopsBadge = () => (
  <ToolBadge color="black" backgroundColor="#A2E8DD">
    DevOps
  </ToolBadge>
)

export const IntegrationBadge = () => (
  <ToolBadge color="black" backgroundColor="#32DE8A">
    External Integration
  </ToolBadge>
)

export const RBACBadge = () => (
  <ToolBadge color="black" backgroundColor="#FCAA67">
    Role-Based Access
  </ToolBadge>
)

export const E2EBadge = () => (
  <ToolBadge color="white" backgroundColor="#B0413E">
    E2E Testing
  </ToolBadge>
)

export const MicroservicesBadge = () => (
  <ToolBadge color="white" backgroundColor="#FF007F">
    Microservices
  </ToolBadge>
)
