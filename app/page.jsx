//this is the page where we want to fetch the notion page wala thing
import { getPageContent , getPageBlocks} from "@/lib/notion";



export default async function Home() {
  const page_id = '155d11214c594cb49a109a7c2a4cb9d2'
  const pageContent = await getPageContent(page_id)
  // console.log('Here goes the page content:', pageContent)
  //get page blocks
  const pageBlocks = await getPageBlocks(page_id)
  console.log('Here goes the page blocks:', pageBlocks)
  return (
    <>
      <div>
        {/* render the details on the page  */}
        <div>
          {pageContent.properties.title.title[0].text.content}
        </div>
        <div>
          {
            pageBlocks.map((block) => {
              switch (block.type) {
                case 'paragraph':
                  return <p key={block.id}>{block.paragraph.rich_text[0]?.text.content}</p>;
                case 'heading_1':
                  return <h1 key={block.id}>{block.heading_1.rich_text[0]?.text.content}</h1>;
                case 'heading_2':
                  return <h2 key={block.id}>{block.heading_2.rich_text[0]?.text.content}</h2>;
                case 'heading_3':
                  return <h3 key={block.id}>{block.heading_3.rich_text[0]?.text.content}</h3>;
                case 'image':
                  const imageUrl = block.image.type === 'external' 
                    ? block.image.external.url 
                    : block.image.file.url;
                  return (
                    <img 
                      key={block.id} 
                      src={imageUrl} 
                      alt={block.image.caption[0]?.plain_text || 'Notion Image'} 
                    />
                  );
                default:
                  return <div key={block.id}>Unsupported block type: {block.type}</div>;
              }
            })
          }
        </div>
      </div>
    </>
  );
}
