export function MarkdownContent(props: { html: string; onClick?: () => void }) {
  return (
    <div
      class="markdown-content"
      // eslint-disable-next-line solid/no-innerhtml
      innerHTML={props.html}
      onClick={() => props.onClick?.()}
    />
  );
}
