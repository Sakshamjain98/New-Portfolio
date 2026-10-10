export function JsonLd({ data }: { data: object }): React.ReactElement {
  return (
    <script
      type="application/ld+json"
      // "<" escaped so content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}
