import React from "react"
import { Badge } from "react-bootstrap"
import jekyllLogo from "../../images/icons/jekyll.png"
import netlifyLogo from "../../images/icons/netlify.png"
import awsLogo from "../../images/icons/aws.png"
import discordLogo from "../../images/icons/discord.png"
import travisLogo from "../../images/icons/travis.png"
import droneLogo from "../../images/icons/drone.png"

const ToolBadge = ({ color, backgroundColor, children }) => (
  <Badge
    pill
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

const ImgBadge = ({ src }) => <img src={src} style={{ height: `0.9rem` }} />

export const TSBadge = () => (
  <ToolBadge color="white" backgroundColor="#007acc">
    <i className="devicon-typescript-plain" /> TypeScript
  </ToolBadge>
)

export const ReactBadge = () => (
  <ToolBadge color="black" backgroundColor="#61DBFB">
    <i className="devicon-react-original" /> React
  </ToolBadge>
)

export const AngularBadge = () => (
  <ToolBadge color="white" backgroundColor="#dd0031">
    <i className="devicon-angularjs-plain" /> Angular
  </ToolBadge>
)

export const ExpressBadge = () => (
  <ToolBadge color="white" backgroundColor="#444444">
    <i className="devicon-express-original" /> Express
  </ToolBadge>
)

export const NestBadge = () => (
  <ToolBadge color="white" backgroundColor="#df234f">
    <i className="devicon-nestjs-plain" /> Nest
  </ToolBadge>
)

export const PostgresBadge = () => (
  <ToolBadge color="white" backgroundColor="#336791">
    <i className="devicon-postgresql-plain" /> PostgreSQL
  </ToolBadge>
)

export const MongoBadge = () => (
  <ToolBadge color="black" backgroundColor="#4faa41">
    <i className="devicon-mongodb-plain" /> MongoDB
  </ToolBadge>
)

export const HerokuBadge = () => (
  <ToolBadge color="white" backgroundColor="#6762a6">
    <i className="devicon-heroku-line" /> Heroku
  </ToolBadge>
)

export const DockerBadge = () => (
  <ToolBadge color="white" backgroundColor="#019bc6">
    <i className="devicon-docker-plain" /> Docker
  </ToolBadge>
)

export const LinuxBadge = () => (
  <ToolBadge color="white" backgroundColor="black">
    <i className="devicon-linux-plain" /> Linux
  </ToolBadge>
)

export const AWSBadge = () => (
  <ToolBadge color="black" backgroundColor="#f7a80d">
    <ImgBadge src={awsLogo} /> AWS
  </ToolBadge>
)

export const JekyllBadge = () => (
  <ToolBadge color="white" backgroundColor="#d80101">
    <ImgBadge src={jekyllLogo} /> Jekyll
  </ToolBadge>
)

export const NetlifyBadge = () => (
  <ToolBadge color="black" backgroundColor="#40a0b7">
    <ImgBadge src={netlifyLogo} /> Netlify
  </ToolBadge>
)

export const TravisBadge = () => (
  <ToolBadge color="white" backgroundColor="#3EAAAF">
    <ImgBadge src={travisLogo} /> Travis CI
  </ToolBadge>
)

export const DroneBadge = () => (
  <ToolBadge color="white" backgroundColor="#1e375a">
    <ImgBadge src={droneLogo} /> Drone CI
  </ToolBadge>
)

export const DiscordBadge = () => (
  <ToolBadge color="white" backgroundColor="#5560e9">
    <ImgBadge src={discordLogo} /> Discord
  </ToolBadge>
)
