import { Client } from '@notionhq/client';

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_INTEGRATION_TOKEN });

//function to get the page data
export async function getPageContent(pageId) {
    const response = await notion.pages.retrieve({ page_id: pageId });
    // console.log('Here goes the response from notion :', response)
    return response;
  }

//this function needs to be imported to the page where we want to show our content 

export async function getPageBlocks(blockId) {
    // Initialize an empty array to store the blocks
    const blocks = [];

    // Initialize the cursor to manage pagination
    let cursor;

    // Loop to fetch blocks, will break once all blocks are fetched
    while (true) {
        // Fetch blocks from the Notion API using the blockId and cursor for pagination
        const { results, next_cursor } = await notion.blocks.children.list({
            block_id: blockId,  // The ID of the block to retrieve children blocks from
            start_cursor: cursor,  // The cursor for the current batch of results
        });
        
        // Append the fetched blocks to the blocks array
        blocks.push(...results);
        
        // If there is no next_cursor, it means we've fetched all blocks, so break the loop
        if (!next_cursor) break;
        
        // Set the cursor to the next_cursor for the next batch of results
        cursor = next_cursor;
    }
        // Return the array containing all the blocks
        return blocks;
}