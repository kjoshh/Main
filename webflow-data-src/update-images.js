require("dotenv").config();
const { WebflowClient } = require("webflow-api");

const webflow = new WebflowClient({
  accessToken: process.env.WEBFLOW_API_TOKEN,
});
const siteId = process.env.WEBFLOW_SITE_ID;

async function updateImages() {
  try {
    // 1. Get the site
    const site = await webflow.sites.list();
    console.log(`Connected to site: ${site.name}`);

    // 2. Get all pages in the site
    const pages = await webflow.sites.getPages({ siteId });
    console.log(`Found ${pages.length} pages.`);

    // 3. Iterate through each page and update the images
    for (const page of pages) {
      console.log(`Processing page: ${page.name} (${page.id})`);

      // 4. Get the page HTML
      const pageData = await webflow.sites.getPage({ pageId: page.id });
      let html = pageData.html;

      // 5. Parse the HTML
      const root = parse(html);

      // 6. Find all <img> tags and modify them
      const images = root.querySelectorAll("img");
      images.forEach((img) => {
        if (img.attributes.src) {
          img.setAttribute("data-src", img.attributes.src);
          img.setAttribute("src", "");
          img.classList.add("lazy-image");
        }
      });

      // 7. Serialize the modified HTML
      const modifiedHtml = root.toString();

      // 8. Update the page in Webflow
      await webflow.sites.updatePage({
        siteId: siteId,
        pageId: page.id,
        html: modifiedHtml,
      });

      console.log(`Page ${page.name} updated successfully.`);
    }

    console.log("All pages updated!");
  } catch (error) {
    console.error("Error updating images:", error);
  }
}

updateImages();
