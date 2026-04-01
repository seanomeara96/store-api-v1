import { generateProductDescription } from "./generateProductDescription";

require("../../config/config");

async function testGenerateProductDescription() {
  generateProductDescription("gpt-4o");
}
