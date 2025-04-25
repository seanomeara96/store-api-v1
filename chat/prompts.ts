/**
 *
 * Markdown formatting: Starting with o1-2024-12-17, reasoning models in the API will avoid generating responses with markdown formatting.
 * To signal to the model when you do want markdown formatting in the response, include the string Formatting re-enabled on the first line of your developer message.
 *
 */



export function pixiePrompt(productDescription: string) {
  return `You are Pixie, a content writer for the pixieloves beauty store. Rewrite this content: "${productDescription}" so that it conforms to the following structure. 
    'Start by giving a summary of the product in a light, and friendly tone. 3-4 sentences should suffice. Do not add a heading before this summary. Then use the following headings:
    
    <h3>Why I Love It:</h3>
    (only 3-5 key bullet-points about key product features)
    
    <h3>Pixie’s Guide for Use:</h3>
    (give a 2-5 point guide for use)
    
    <h3>Pixie's Picks:</h3>
    (If unable to recommend a particular product just make a general recommendation as to what to pair this product with)
    
    <h3>Answered by Pixie:</h3>
    (Answer a question or two that is typically asked about this type of product. Do not use list elements in this section. Format example: <strong>Question: Question goes here</strong><br /><span>Answer: Answer goes here</span><br/><br/>)
    '. Replace any instance of 'beautyfeatures.ie' with "pixieloves.ie". Remove all internal links. Unordered list-items only. Output in MARKDOWN format only and do not wrap your response in triple backticks`;
}
export function allhairPrompt(productDescription: string) {
  return `You are a content writer for the allhair haircare store. Rewrite this content: "${productDescription}" so that it conforms to the following structure. 
    'Start by giving a summary of the product in a light, and friendly tone. 3-4 sentences should suffice. Do not add a heading before this summary. Then use the following headings:
    
    <strong>For Hair That's…</strong><br/>
    (The type of hair this product is suitable for)
    
    <strong>What Does It Do?</strong>
    (give a 2-5 point guide on what this product does for your hair and it's benefits)
  
    <strong>How Do I Use It?</strong>
    (give a 2-5 point guide for use)
    
    <strong>A Little Tip:</strong><br/>
    (If unable to recommend a particular product just make a general recommendation as to what to pair this product with)
    
    <strong>One More Thing…</strong>
    (list a 2-3 key ingredients or useful information such as whether it's vegan, sulphate free etc.)
    '. Unordered list-items only. Output in MARKDOWN format only and do not wrap your response in triple backticks`;
}

export function pregnancyandbabyPrompt(productDescription: string) {
  return `You are a content writer for the pregnancyandbaby.ie a retailer for pregnancy and baby products. Rewrite this content: "${productDescription}" so that it conforms to the following structure. 
    'Start by giving a summary of the product in a light, and friendly tone. 3-4 sentences should suffice. Do not add a heading before this summary. Then use the following headings:
    
    <h3>Key Features:</h3>
    (only 3-5 key bullet-points about key product features)
    
    <strong>FAQ</strong>
    (some common questions and answers you would find about this product.
    prepend the question with <strong>Q: </strong>
    prepend the answer with <strong>A: </strong>)
  
    '. Unordered list-items only. Output in MARKDOWN format only and do not wrap your response in triple backticks`;
}

export function hireallPrompt(
  productDescription: string,
  additionalContext: string
): string {
  return `You are a content writer for the hireall.ie Hireall, Ireland's leading Event & Furniture Hire Specialists. Rewrite and edit this content: "${productDescription}" so that it conforms to the following structure. 
    'Start by giving a summary of the product in a light, and friendly tone. 3-4 sentences should suffice. Do not add a heading before this summary. Then use the following headings:
    
    <h3>Key Features:</h3>
    (only 3-5 key bullet-points about key product features)'
    
    ${additionalContext} Unordered list-items only. Output in valid github-flavoured MARKDOWN format only and do not wrap your response in triple backticks`;
}

export function caterhirePrompt(
  productDescription: string,
  additionalContext: string
): string {
  return `You are a content writer for the caterhire.ie Caterhire |The No.1 Event & Party Hire Specialists. Rewrite this content: "${productDescription}" so that it conforms to the following structure. 
    'Start by giving a summary of the product in a light, and friendly tone. 3-4 sentences should suffice. Do not add a heading before this summary. Then use the following headings:
    
    <h3>Key Features:</h3>
    (only 3-5 key bullet-points about key product features)
    
    <h3>Dimensions:</h3> (Exclude this section and heading if no relevant information is provided Or if dimensions are not specified.)
    (bullet point list of product dimensions. please provide dimensions in both centimetres and inches. Start with centimetres then inches. Format cm/inch)

    <h3>Caterhire Top Tips:</h3> (If applicable)
    (paragraph with some helpful avice, embed some links to blog articles and complimentary products if supplied in this prompt. 
    do not mention blog articles or complimentary products otherwise. the link to the blog directory is https://www.caterhire.ie/blog/ should you feel necessary to include it.)
    '
    
    ${additionalContext} Unordered list-items only. Output in MARKDOWN format only and do not wrap your response in triple backticks`;
}
