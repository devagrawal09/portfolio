# Portfolio Website

This context describes the language used to discuss the portfolio website's public content model and presentation boundaries.

## Language

**Content data**:
The project, writing, talk, video, profile, proof, and contact information shown by portfolio pages. In this codebase, this is the content the owner wants colocated with the route that presents it.
_Avoid_: Metadata, registry data

**SEO metadata**:
Search and social sharing information such as page titles, descriptions, Open Graph tags, canonical links, and structured data.
_Avoid_: Metadata when discussing portfolio content data

**Route-owned content data**:
Content data that belongs to one public route family and should be colocated with that route family instead of stored in a site-wide data registry. Projects and Content are the first route families targeted for this ownership model.
_Avoid_: Global content registry, metadata module

**Presentational component**:
A shared component that renders values supplied by a route but does not import route-owned content data itself.
_Avoid_: Data-owning component

**Content route**:
A public route file that owns the content for one portfolio item, such as one project or one article. The route file is the source of truth for that page's content instead of a lookup entry in a shared registry.
_Avoid_: Dynamic content lookup, item metadata entry

**List-only content**:
Content that appears only as items in a public list page and does not have an individual public detail URL. The list route owns this content directly.
_Avoid_: Content route for a list item

**Rendered content**:
Content that is actually visible on a public page or used for that page's search and sharing presentation. Content fields that are not rendered should not be carried into new content routes by default.
_Avoid_: Preserved registry fields, unused content data

**Content summary**:
The small subset of a content route's data that an index page needs to render a card or list item. A content summary is exported by the content route and imported by the relevant index page.
_Avoid_: Registry entry, metadata entry

**Project artwork**:
An actual generated image asset used as the visual background for a project card. Each project artwork should represent one project while sharing a unified visual language with the rest of the project set.
_Avoid_: Generic image, thumbnail, screenshot

**Article body**:
The full readable prose for a writing page. Article bodies should live in the article's content route rather than in Markdown files with frontmatter.
_Avoid_: Markdown content source, frontmatter body

**Original publication**:
An external URL where a writing item also appears, such as PowerSync, DEV, Medium, or Clerk. The portfolio keeps this as provenance for a local article rather than treating it as a replacement for the article route.
_Avoid_: External-only article

**Public URL**:
An externally reachable portfolio path that may already be linked from search results, social posts, resumes, articles, or other sites. Public URLs should remain stable during content ownership changes.
_Avoid_: Route name when discussing link stability

**Redirect map**:
A small route-behavior map that translates legacy public URLs to current public URLs. A redirect map is not a content registry and should not contain display content.
_Avoid_: Writing registry, content data map

## Example Dialogue

Developer: "Should this project description live in shared content data?"

Owner: "No. Put content data directly in the route that renders that project."

Developer: "Should I remove SEO metadata too?"

Owner: "No. SEO metadata is separate from content data and should stay where pages need search and sharing tags."

Developer: "Should profile, proof, and contact data move at the same time?"

Owner: "No. Start with route-owned content data for Projects and Content, then decide other ownership boundaries separately."

Developer: "Should project and article detail pages stay dynamic?"

Owner: "No. Make each project or article detail page a content route."

Developer: "Can the rearchitecture rename existing project or article paths?"

Owner: "No. Preserve public URLs and legacy redirects while changing where content lives."

Developer: "Should index pages duplicate card data?"

Owner: "No. Detail content routes export content summaries, and index pages import those summaries."

Developer: "Should long-form writing stay in Markdown files?"

Owner: "No. Inline article bodies into their content routes and remove frontmatter-based parsing."

Developer: "Should external publication links replace local article pages?"

Owner: "No. Every current writing item should have a local content route; external links are original publications."

Developer: "Should old project fields be preserved when making static project routes?"

Owner: "No. Keep only rendered content unless a page is intentionally expanded."

Developer: "Can hidden feature flags or categories stay for ordering/filtering?"

Owner: "No. Delete hidden fields; make ordering explicit where an index renders it."

Developer: "Can shared components import route-owned content data for convenience?"

Owner: "No. Routes own content data and pass rendered values into presentational components."

Developer: "Should videos, conferences, podcasts, and meetups each get item detail pages?"

Owner: "No. They are list-only content and should be inlined in their list routes."

Developer: "Can legacy redirects use a shared map?"

Owner: "Yes. A shared redirect map is acceptable route behavior as long as it does not become a content registry."

Developer: "Should old Projects and Content data modules stay around after migration?"

Owner: "No. Delete targeted Projects and Content data modules once their imports are removed."

Developer: "Does route-owned content require duplicating all route markup?"

Owner: "No. Reuse presentational page components while keeping content constants inside route files."

Developer: "Where should static content routes live?"

Owner: "Use direct route files like `projects/specter.tsx` and `content/writing/isomorphic.tsx`; remove dynamic detail route files."
